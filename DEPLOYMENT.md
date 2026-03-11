# 🚀 EZIHE MOVIE BOX - Deployment Guide

## Deploy to Render (Recommended - Free Tier Available)

### Method 1: Using GitHub (Recommended)

1. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create a New Repository**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it: `ezihe-movie-box`
   - Make it Public
   - Click "Create repository"

3. **Push Your Code to GitHub**
   ```bash
   # Initialize git in your project folder
   git init
   
   # Add all files
   git add .
   
   # Commit the files
   git commit -m "Initial commit - EZIHE MOVIE BOX"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/ezihe-movie-box.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Render**
   - Go to https://render.com
   - Sign up for free (you can use your GitHub account)
   - Click "New +" and select "Web Service"
   - Connect your GitHub account
   - Select the `ezihe-movie-box` repository
   - Configure:
     - **Name**: ezihe-movie-box
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `node server.js`
   - Click "Create Web Service"

5. **Wait for Deployment**
   - Render will automatically build and deploy your app
   - Once complete, you'll get a URL like: `https://ezihe-movie-box.onrender.com`
   - Your app is now live! 🎉

### Method 2: Using Render CLI (Alternative)

1. Install Render CLI:
   ```bash
   npm install -g render-cli
   ```

2. Login to Render:
   ```bash
   render login
   ```

3. Deploy:
   ```bash
   render deploy
   ```

---

## Alternative Deployment Options

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Your app will be deployed instantly

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

## 📦 How to Download and Run Locally

### Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- npm (comes with Node.js)

### Steps

1. **Download the project**
   - If from GitHub: Click "Code" → "Download ZIP"
   - Extract the ZIP file

2. **Navigate to project folder**
   ```bash
   cd ezihe-movie-box
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   - Open your browser to `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

7. **Run with Node server (like in production)**
   ```bash
   npm run build
   node server.js
   ```
   - Open your browser to `http://localhost:3000`

---

## 🔧 Environment Configuration

The app uses The Movie Database (TMDB) API with a public API key included for demo purposes.

**For production use:**
1. Get your own API key from https://www.themoviedb.org/settings/api
2. Replace the API_KEY in `src/App.tsx` and `src/components/MovieModal.tsx`

---

## 📁 Project Structure

```
ezihe-movie-box/
├── src/
│   ├── components/
│   │   ├── MovieCard.tsx      # Movie card component
│   │   ├── MovieModal.tsx     # Modal with details & trailer
│   │   └── FilterBar.tsx      # Search and filter controls
│   ├── App.tsx                # Main application
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── dist/                      # Production build (generated)
├── server.js                  # Express server for deployment
├── render.yaml                # Render deployment config
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🎬 Features

✅ **200,000+ Movies** from TMDB API  
✅ **Watch Trailers** in real-time (YouTube integration)  
✅ **Download Movies** feature  
✅ **Search** by title  
✅ **Filter** by genre and year  
✅ **Sort** by popularity, rating, release date  
✅ **Responsive Design** (mobile, tablet, desktop)  
✅ **Fast & Modern** (React + Vite + Tailwind CSS)

---

## 🆘 Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port already in use
```bash
# Change port in server.js or kill the process
lsof -ti:3000 | xargs kill -9  # macOS/Linux
```

### API not working
- Check your internet connection
- The TMDB API key might have reached its limit
- Get your own API key from https://www.themoviedb.org/

---

## 📝 License

This project is open source and available for educational purposes.

---

## 🎉 You're All Set!

Your EZIHE MOVIE BOX is ready to deploy and share with the world! 🚀
