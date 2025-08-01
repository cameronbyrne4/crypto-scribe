-- Nous Database Schema
-- Version 1.0
-- Optimized for PostgreSQL/Supabase with Clerk authentication integration

-- 1. Custom Types (ENUMs)
CREATE TYPE public.query_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE public.subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled');
CREATE TYPE public.plan_type AS ENUM ('free', 'premium');

-- 2. Profiles Table
-- Stores public-facing user data. Integrates with Clerk authentication.
CREATE TABLE public.profiles (
 id uuid NOT NULL PRIMARY KEY, -- Maps to Clerk user ID
 email text NOT NULL UNIQUE,
 full_name text,
 avatar_url text,
 clerk_user_id text NOT NULL UNIQUE, -- Clerk's external user ID
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profiles synced from Clerk authentication.';
COMMENT ON COLUMN public.profiles.clerk_user_id IS 'External Clerk user identifier for webhooks.';

-- 3. Subscriptions Table
-- Tracks user subscription plans and query limits.
CREATE TABLE public.subscriptions (
 id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
 user_id uuid NOT NULL UNIQUE,
 stripe_customer_id text UNIQUE, -- Stripe customer ID
 stripe_subscription_id text UNIQUE, -- Stripe subscription ID  
 plan_type public.plan_type NOT NULL DEFAULT 'free',
 status public.subscription_status NOT NULL DEFAULT 'active',
 query_limit integer NOT NULL DEFAULT 2, -- 2 for free, 200 for premium
 queries_used integer NOT NULL DEFAULT 0, -- Monthly usage counter
 current_period_end timestamptz,
 reset_date date NOT NULL DEFAULT CURRENT_DATE, -- Monthly reset date
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.subscriptions IS 'User subscription data with Stripe integration and query limits.';

-- 4. Queries Table  
-- Comprehensive query logging with structured data and caching.
CREATE TABLE public.queries (
 id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
 user_id uuid NOT NULL,
 natural_language_input text NOT NULL,
 structured_query_json jsonb, -- Parsed NLP output
 status public.query_status NOT NULL DEFAULT 'pending',
 error_message text,
 executed_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.queries IS 'Complete log of user queries with NLP parsing results.';
COMMENT ON COLUMN public.queries.structured_query_json IS 'Machine-readable query from NLP layer.';

-- 5. Blockchain Results Table
-- Cached blockchain query results with entity labeling.
CREATE TABLE public.blockchain_results (
 id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
 query_id uuid NOT NULL,
 chain text NOT NULL, -- e.g., 'ethereum', 'base'
 wallet_addresses jsonb NOT NULL, -- Array of wallet addresses found
 transactions jsonb NOT NULL, -- Transaction details with timestamps
 entity_labels jsonb, -- Applied labels: {'address': '0x123', 'label': 'whale', 'confidence': 0.85}
 flow_diagram text, -- SVG or JSON representation of transaction flows
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT blockchain_results_query_id_fkey FOREIGN KEY (query_id) REFERENCES public.queries(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.blockchain_results IS 'Cached blockchain data results with entity analysis.';

-- 6. Entities Table
-- Master registry of analyzed blockchain addresses.
CREATE TABLE public.entities (
 id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
 address text NOT NULL,
 chain text NOT NULL,
 first_seen_at timestamptz NOT NULL DEFAULT now(),
 last_analyzed_at timestamptz,
 CONSTRAINT entities_address_chain_unique UNIQUE (address, chain)
);

COMMENT ON TABLE public.entities IS 'Registry of unique blockchain addresses across all supported chains.';

-- 7. Labels Table
-- Master list of entity classification labels.
CREATE TABLE public.labels (
 id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
 name text NOT NULL UNIQUE,
 description text,
 category text, -- e.g., 'behavior', 'institution', 'protocol'
 created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.labels IS 'Classification labels for blockchain entities (whale, MEV bot, etc.).';

-- 8. Entity Labels Join Table
-- Many-to-many relationship between entities and labels with confidence scoring.
CREATE TABLE public.entity_labels (
 entity_id uuid NOT NULL,
 label_id uuid NOT NULL,
 source text, -- Data source that provided this label
 confidence_score numeric(3, 2) CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
 applied_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (entity_id, label_id),
 CONSTRAINT entity_labels_entity_id_fkey FOREIGN KEY (entity_id) REFERENCES public.entities(id) ON DELETE CASCADE,
 CONSTRAINT entity_labels_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.entity_labels IS 'Entity-label relationships with confidence scoring.';

-- 9. Products Table
-- Stripe product definitions for subscription plans.
CREATE TABLE public.products (
 id text NOT NULL PRIMARY KEY, -- Stripe Product ID
 active boolean NOT NULL DEFAULT true,
 name text NOT NULL,
 description text,
 query_limit integer NOT NULL,
 price_monthly integer, -- Price in cents
 created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.products IS 'Stripe product definitions for subscription plans.';

-- 10. Performance Indexes
CREATE INDEX idx_queries_user_id_executed ON public.queries(user_id, executed_at DESC);
CREATE INDEX idx_blockchain_results_chain ON public.blockchain_results(chain);
CREATE INDEX idx_blockchain_results_query_id ON public.blockchain_results(query_id);
CREATE INDEX idx_entity_labels_entity_id ON public.entity_labels(entity_id);
CREATE INDEX idx_entities_address_chain ON public.entities(address, chain);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- 11. Automatic Timestamp Updates
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Apply timestamp triggers
CREATE TRIGGER update_profiles_timestamp
   BEFORE UPDATE ON public.profiles
   FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_subscriptions_timestamp
   BEFORE UPDATE ON public.subscriptions
   FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- 12. Row-Level Security (RLS) Policies
-- User data protection
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles 
   FOR SELECT USING (auth.uid()::text = clerk_user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles 
   FOR UPDATE USING (auth.uid()::text = clerk_user_id);

ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own queries" ON public.queries 
   FOR SELECT USING (auth.uid()::text = (SELECT clerk_user_id FROM public.profiles WHERE id = user_id));
CREATE POLICY "Users can insert their own queries" ON public.queries 
   FOR INSERT WITH CHECK (auth.uid()::text = (SELECT clerk_user_id FROM public.profiles WHERE id = user_id));

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscription" ON public.subscriptions 
   FOR SELECT USING (auth.uid()::text = (SELECT clerk_user_id FROM public.profiles WHERE id = user_id));

-- Public read-only tables
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.entities 
   FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.labels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.labels 
   FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.entity_labels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.entity_labels 
   FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.products 
   FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.blockchain_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view results from their queries" ON public.blockchain_results 
   FOR SELECT USING (auth.uid()::text = (
       SELECT p.clerk_user_id 
       FROM public.profiles p 
       JOIN public.queries q ON p.id = q.user_id 
       WHERE q.id = query_id
   ));

-- 13. Seed Data
-- Insert default labels
INSERT INTO public.labels (name, description, category) VALUES
('Whale', 'High-value wallet with significant holdings', 'behavior'),
('MEV Bot', 'Automated MEV extraction bot', 'behavior'),
('Exchange', 'Centralized exchange wallet', 'institution'),
('DeFi Protocol', 'Decentralized finance protocol contract', 'protocol'),
('Bridge', 'Cross-chain bridge contract', 'protocol'),
('Unlabeled', 'No classification available', 'unknown');

-- Insert default products
INSERT INTO public.products (id, name, description, query_limit, price_monthly) VALUES
('free_tier', 'Free Plan', '2 queries per day', 2, 0),
('premium_tier', 'Premium Plan', '200 queries per month', 200, 2999);

