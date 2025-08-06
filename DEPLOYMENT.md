# Deployment Strategy

## Branch Management

### **Main Branch (Production)**
- **Purpose**: Production deployment with waitlist enabled
- **Environment**: `VITE_ENABLE_WAITLIST=true`
- **Behavior**: All buttons route to `/waitlist`
- **Deployment**: Automatic deployment to production URL

### **Dev Branch (Development)**
- **Purpose**: Development with full app access
- **Environment**: `VITE_ENABLE_WAITLIST=false`
- **Behavior**: All buttons route to `/app`
- **Deployment**: Manual deployment for testing

## Environment Variables

### **Development (.env.development)**
```
VITE_ENABLE_WAITLIST=false
```

### **Production (.env.production)**
```
VITE_ENABLE_WAITLIST=true
```

### **Local Development (.env.local)**
```
VITE_ENABLE_WAITLIST=false  # Change to true to test waitlist
```

## Deployment Workflow

### **For Development:**
1. Work on `dev` branch
2. Set `VITE_ENABLE_WAITLIST=false` in `.env.local`
3. All buttons route to `/app` for development

### **For Production:**
1. Merge `dev` to `main` branch
2. Production automatically uses `VITE_ENABLE_WAITLIST=true`
3. All buttons route to `/waitlist`

### **Testing Waitlist Locally:**
1. Set `VITE_ENABLE_WAITLIST=true` in `.env.local`
2. Restart development server
3. All buttons route to `/waitlist`

## Vercel Configuration

- **Main Branch**: Auto-deploys to production with waitlist enabled
- **Dev Branch**: Can be deployed manually for testing
- **Environment Variables**: Set in Vercel dashboard for each environment

## Commands

```bash
# Switch to development
git checkout dev
# Set local environment for development
echo "VITE_ENABLE_WAITLIST=false" > .env.local

# Switch to production
git checkout main
# Set local environment for testing waitlist
echo "VITE_ENABLE_WAITLIST=true" > .env.local
``` 