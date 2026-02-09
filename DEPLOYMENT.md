# Deployment Guide for Notes App

This guide covers deploying both the frontend and backend of your MERN stack Notes application.

## 📋 Table of Contents
- [Backend Deployment (Node.js/Express)](#backend-deployment)
- [Frontend Deployment (React/Vite)](#frontend-deployment)
- [Environment Variables Setup](#environment-variables-setup)

---

## 🔧 Backend Deployment

### Option 1: Deploy to Render (Recommended - Free)

1. **Prepare your backend:**
   - Ensure your `package.json` has a start script:
     ```json
     "scripts": {
       "start": "node index.js"
     }
     ```

2. **Create a Render account:**
   - Go to [render.com](https://render.com)
   - Sign up using your GitHub account

3. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository with your code

4. **Configure the service:**
   - **Name**: `notes-app-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

5. **Add Environment Variables:**
   Click "Advanced" and add these environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   EMAIL_USER=your_gmail_address
   EMAIL_PASSWORD=your_gmail_app_password
   ```

6. **Set up MongoDB Atlas (Cloud Database):**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster (Free tier - M0)
   - Click "Connect" → "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/myNotesApp`)
   - Replace `<password>` with your database password
   - Use this as your `MONGODB_URI` environment variable

7. **Deploy:**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Your backend will be available at: `https://your-app-name.onrender.com`

---

### Option 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in the "Variables" tab
6. Railway will auto-detect and deploy your Node.js app

---

### Option 3: Deploy to Vercel (Serverless)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create `vercel.json` in your backend folder:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "index.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   cd backend
   vercel
   ```

4. Add environment variables in Vercel dashboard

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Vercel (Recommended - Free)

1. **Update your frontend `.env`:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL from above)

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

4. **Configure:**
   - Follow the prompts
   - Vercel will auto-detect Vite
   - Set up environment variables in Vercel dashboard

5. **Alternative (No CLI needed):**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root directory
   - Add environment variable: `VITE_API_BASE_URL`
   - Click "Deploy"

---

### Option 2: Deploy to Netlify

1. **Build your app:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy using Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Or use Netlify UI:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect to GitHub for continuous deployment

4. **Add environment variables:**
   - Go to Site settings → Environment variables
   - Add `VITE_API_BASE_URL` with your backend URL

---

### Option 3: Deploy to Render (Static Site)

1. Go to Render dashboard
2. Click "New +" → "Static Site"
3. Connect your repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add environment variable: `VITE_API_BASE_URL`
6. Click "Create Static Site"

---

## 🔐 Environment Variables Setup

### Backend Environment Variables

Create these in your deployment platform:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myNotesApp
ACCESS_TOKEN_SECRET=a6f7c728b822571b4985d64737e64aa2e59f70d7861fd8ff48db369157b1d0f3
EMAIL_USER=youremail@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

**Important Notes:**
- Never commit `.env` files to Git (already added to `.gitignore`)
- Use `.env.example` as a template for team members
- For Gmail, use App Password (not your regular password):
  1. Go to Google Account Settings
  2. Security → 2-Step Verification
  3. App passwords → Generate new app password
  4. Use this password in `EMAIL_PASSWORD`

### Frontend Environment Variables

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

---

## 🚀 Quick Deployment Steps Summary

### Backend:
1. Sign up for MongoDB Atlas and create a cluster
2. Get your MongoDB connection string
3. Sign up for Render.com
4. Create a new Web Service
5. Connect your GitHub repo
6. Set root directory to `backend`
7. Add all environment variables
8. Deploy and copy the URL

### Frontend:
1. Update `.env` with your backend URL
2. Sign up for Vercel.com
3. Import your GitHub repository
4. Set root directory to `frontend`
5. Add `VITE_API_BASE_URL` environment variable
6. Deploy

### CORS Update:
Don't forget to update your backend CORS settings in `index.js`:
```javascript
app.use(cors({ 
  origin: [
    "https://your-frontend-url.vercel.app",
    "http://localhost:5173"
  ] 
}));
```

---

## 🐛 Troubleshooting

### Backend Issues:
- **Database connection fails**: Check MongoDB Atlas IP whitelist (allow all: `0.0.0.0/0`)
- **Environment variables not working**: Make sure they're set in your deployment platform
- **Port issues**: Most platforms set `PORT` automatically, use `process.env.PORT`

### Frontend Issues:
- **API calls fail**: Check CORS settings on backend
- **Environment variables not working**: Ensure they start with `VITE_`
- **Build fails**: Check Node version compatibility

---

## 📝 Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] MongoDB Atlas is connected
- [ ] Email functionality works
- [ ] Frontend can reach backend API
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] SSL/HTTPS is enabled (provided by platforms)
- [ ] Test user registration, login, and note creation

---

## 🎉 Your App is Live!

Both your frontend and backend should now be deployed and working together. Share your frontend URL with users to access your Notes App!

**Frontend URL**: `https://your-app.vercel.app`  
**Backend URL**: `https://your-backend.onrender.com`

Good luck with your deployment! 🚀
