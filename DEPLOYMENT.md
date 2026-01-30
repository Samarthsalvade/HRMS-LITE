# HRMS Lite - Deployment Guide

This guide will help you deploy the HRMS Lite application to production.

## Prerequisites

- GitHub account
- Render/Railway account (for backend)
- Vercel/Netlify account (for frontend)

## Backend Deployment (Using Render)

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Fill in the details:
   - Name: `hrms-lite-db`
   - Database: `hrms_lite`
   - User: (auto-generated)
   - Region: Choose closest to you
4. Click "Create Database"
5. **Save the Internal Database URL** - you'll need this

### Step 2: Deploy Backend

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in the details:
   - Name: `hrms-lite-backend`
   - Environment: `Python 3`
   - Region: Same as database
   - Branch: `main`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   - `DATABASE_URL`: Paste your Internal Database URL from Step 1
   - `CORS_ORIGINS`: `*` (or your frontend URL after deploying)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. **Save your backend URL** (e.g., `https://hrms-lite-backend.onrender.com`)

### Step 3: Test Backend

Visit: `https://your-backend-url.onrender.com/docs`

You should see the Swagger API documentation.

## Frontend Deployment (Using Vercel)

### Step 1: Update Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: Your backend URL from Backend Step 2
6. Click "Deploy"
7. Wait for deployment to complete
8. **Save your frontend URL** (e.g., `https://hrms-lite.vercel.app`)

### Step 2: Update CORS

1. Go back to Render Dashboard
2. Navigate to your backend service
3. Go to "Environment"
4. Update `CORS_ORIGINS` to your frontend URL
5. Save changes (service will redeploy)

### Step 3: Test Application

Visit your frontend URL and test:
1. ✅ Dashboard loads
2. ✅ Can add employees
3. ✅ Can mark attendance
4. ✅ Data persists after refresh

## Alternative Deployment Options

### Backend - Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add PostgreSQL database from Railway
5. Set environment variables:
   - `DATABASE_URL`: (auto-set by Railway)
   - `CORS_ORIGINS`: Your frontend URL
6. Deploy

### Frontend - Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL
6. Deploy

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] API documentation (/docs) loads
- [ ] Frontend loads without errors
- [ ] Can create employees
- [ ] Can mark attendance
- [ ] Can view dashboard
- [ ] Data persists across page refreshes
- [ ] No CORS errors in browser console

## Common Issues & Solutions

### CORS Error

**Problem**: Frontend can't connect to backend

**Solution**: 
1. Check `CORS_ORIGINS` in backend environment variables
2. Must include your exact frontend URL (no trailing slash)
3. Redeploy backend after changing

### Database Connection Error

**Problem**: Backend crashes on startup

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Ensure database credentials are correct

### Environment Variables Not Working

**Problem**: Frontend can't find `VITE_API_URL`

**Solution**:
1. Environment variables must start with `VITE_` in Vite
2. Redeploy after adding/changing environment variables
3. Check spelling and case sensitivity

### 404 on Frontend Routes

**Problem**: Direct URL access gives 404

**Solution**:
1. Add `vercel.json` with rewrites (already included)
2. For Netlify, add `_redirects` file:
   ```
   /*    /index.html   200
   ```

## Monitoring & Maintenance

### Backend Logs

**Render**: Dashboard → Service → Logs

**Railway**: Dashboard → Project → Deployments → Logs

### Frontend Logs

**Vercel**: Dashboard → Project → Deployments → Function Logs

**Netlify**: Dashboard → Site → Deploys → Deploy Log

### Database Backups

**Render**: Automatic daily backups (paid plans)

**Railway**: Automatic backups enabled

## Updating the Application

### Update Backend

1. Push changes to GitHub
2. Render/Railway will auto-deploy
3. Monitor logs for errors

### Update Frontend

1. Push changes to GitHub
2. Vercel/Netlify will auto-deploy
3. Clear browser cache to see changes

## Security Recommendations

1. **Don't commit `.env` files** - use platform environment variables
2. **Use strong database passwords**
3. **Enable HTTPS** (automatic on Render/Vercel)
4. **Limit CORS origins** - don't use `*` in production
5. **Monitor API usage** - check for unusual activity

## Cost Considerations

### Free Tier Limits

**Render**:
- Web Service: 750 hours/month
- PostgreSQL: 90 days, then $7/month
- Note: Spins down after inactivity (30s cold start)

**Railway**:
- $5 free credit/month
- Pay as you go after

**Vercel**:
- 100 GB bandwidth/month
- Unlimited deployments

**Netlify**:
- 100 GB bandwidth/month
- 300 build minutes/month

## Support

For deployment issues:
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com

## Success! 🎉

Once deployed, you should have:
- ✅ Live backend API with database
- ✅ Live frontend application
- ✅ Working HRMS Lite system
- ✅ Public URLs to share

**Remember to update your README.md with the actual deployment URLs!**
