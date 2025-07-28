# Security Guidelines 

# Security Checklist 🛡️

This document outlines critical security practices for applications, especially those handling user information or leveraging AI.

---

## 1. API Keys are Ticking Time Bombs

> Never, ever expose API keys on the frontend. One exposed OpenAI key can lead to a $10,000 bill overnight.

-   **Store Securely:** Use a service like Supabase Vault to store keys in an encrypted format.
-   **Use Edge Functions:** Route all calls involving sensitive keys through server-side edge functions.
-   **Rotate Keys:** Make it a policy to rotate all API keys every 90 days.

---

## 2. Enable Row Level Security (RLS)

> By default, database tables (like in Supabase) are public. Without RLS, anyone can read your entire database, delete all your users, or steal sensitive data.

Enabling RLS is a quick process that is essential for preventing catastrophic data breaches.

---

## 3. Rate Limit Everything

> While your auth system might have built-in limits, your custom API endpoints are often left wide open. A single DDoS attack can cost thousands in API fees.

Implement the following limits for every API route:
-   **Per IP:** 100 requests per minute.
-   **Per User:** 1,000 requests per hour.
-   **Failures:** Use exponential backoff for repeated failed requests from the same source.

---

## 4. Audit Like a Hacker Would

> Open your browser's DevTools and inspect the Network tab. If you can see a vulnerability, a hacker can exploit it.

Look for:
-   **Exposed API Keys:** Check request headers and bodies for any leaked credentials.
-   **Over-fetching:** Ensure endpoints only return the data necessary, not entire table records.
-   **Missing Auth:** Verify that every sensitive endpoint correctly checks for authentication and authorization.
-   **Unencrypted Data:** Confirm that sensitive data is not being sent as plaintext.

---

## 5. Use the Right Hosting for Production

> Services like Netlify are excellent for MVPs but often lack the enterprise-grade DDoS protection needed for a production application. The extra $20/month for a more robust host can save you from a $20,000 attack.

For production apps, choose a provider with stronger security features:
-   **Recommended Providers:** Vercel or Cloudflare.
-   **Key Features:** Look for built-in firewalls, "Under Attack" mode, and geographic request blocking.

---

## 6. Authentication Done Right

> Managing password authentication yourself adds complexity and security risks.

Use established OAuth providers to handle authentication for a better UX and stronger security:
-   **B2B Apps:** Google
-   **Consumer Apps:** Apple
-   **Developer Tools:** GitHub

---

## 7. The 3-Layer Defense

> Never trust a single layer of security. A multi-layered approach ensures that what one layer misses, another catches.

1.  **Frontend Validation:** Provides immediate feedback for a good UX.
2.  **API Middleware Checks:** Enforces rules and improves performance before requests hit your core logic.
3.  **Database RLS Policies:** Acts as the ultimate source of truth for data access and security.

---

## Common Security Vulnerabilities & Fixes

### Trusting Client Data
-   **Vulnerability:** Using form/URL input directly on the server.
-   **Fix:** Always validate and sanitize all input on the server-side. Escape all data before rendering it in the UI to prevent XSS.

### Secrets in Frontend Code
-   **Vulnerability:** Including API keys or other credentials in client-side code (e.g., React, Next.js).
-   **Fix:** Keep all secrets on the server-side. Use environment variables and ensure your `.env` file is listed in `.gitignore`.

### Weak Authorization
-   **Vulnerability:** Only checking *if* a user is logged in, but not if they have *permission* to perform a specific action or view specific data.
-   **Fix:** The server must verify user permissions for **every** action and resource request.

### Leaky Error Messages
-   **Vulnerability:** Showing detailed stack traces or database errors directly to the user.
-   **Fix:** Return generic, user-friendly error messages. Log the detailed errors on the server for developers to review.

### Insecure Direct Object References (IDOR)
-   **Vulnerability:** Allowing User A to access or edit User B's data by guessing predictable IDs in URLs (e.g., `/profile/124`).
-   **Fix:** The server must always confirm that the currently authenticated user owns or has explicit permission to access the requested resource ID.

### Ignoring Database-Level Security
-   **Vulnerability:** Bypassing powerful database features like Row Level Security (RLS) for fine-grained access control.
-   **Fix:** Define data access rules and policies directly within your database itself.

### Unprotected APIs & Sensitive Data
-   **Vulnerability:** APIs missing rate limits; sensitive data being stored or transmitted unencrypted.
-   **Fix:** Implement rate limiting on all API endpoints. Encrypt sensitive data at rest and always use HTTPS for data in transit.

