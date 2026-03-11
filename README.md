# 🎬 EZIHE MOVIE BOX

<div align="center">
  <h3>Your Ultimate Movie Discovery & Download Platform</h3>
  <p><strong>Access 200,000+ movies with real-time trailers and downloads</strong></p>
</div>

---

## ✨ Features

### 🎥 Watch Trailers in Real-Time
- **YouTube Integration** - Watch official movie trailers directly in the app
- **Full-Screen Player** - Immersive trailer viewing experience
- **Auto-Play** - Trailers start automatically when opened
- **High Quality** - HD trailers from official sources

### 🎬 Massive Movie Library
- **200,000+ Movies** from The Movie Database (TMDB)
- **All Eras**: Movies from 1900s to 2025
- **Real-time Updates** - Always current with latest releases
- **High-Quality Images** - Professional posters and backdrops

### 🔍 Advanced Search & Filtering
- **Smart Search** - Find any movie by title instantly
- **19+ Genres**: Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Fantasy, History, Horror, Music, Mystery, Romance, Science Fiction, TV Movie, Thriller, War, Western
- **Year Filter** - Browse movies from 1900 to present
- **8 Sort Options**:
  - Popularity (High/Low)
  - Release Date (Newest/Oldest)
  - Rating (High/Low)
  - Title (A-Z/Z-A)

### 📱 Modern User Interface
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Beautiful Gradients** - Purple and pink theme
- **Smooth Animations** - Professional hover effects and transitions
- **Custom Logo** - Branded EZIHE MOVIE BOX experience

### 🎯 Detailed Movie Information
- Full movie details including:
  - Title, year, runtime, rating
  - Cast, crew, production companies
  - Synopsis and overview
  - High-resolution images
- **Watch Trailer Button** - Instant access to trailers
- **Download Button** - Integrated download functionality

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- npm (included with Node.js)

### Installation

1. **Download the project**
   ```bash
   # Option 1: Clone from GitHub
   git clone https://github.com/yourusername/ezihe-movie-box.git
   cd ezihe-movie-box
   
   # Option 2: Download ZIP and extract
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   - Open http://localhost:5173 in your browser

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run production server**
   ```bash
   node server.js
   ```
   - Open http://localhost:3000 in your browser

---

## 🌐 Deploy to the Web

### Deploy to Render (Easiest - FREE)

See detailed instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick Steps:**
1. Push code to GitHub
2. Sign up at https://render.com
3. Connect your GitHub repository
4. Click "Deploy"
5. Your app is live in minutes! 🎉

**Other Options:**
- Vercel
- Netlify
- Heroku
- Railway

Full deployment guide available in [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📂 Project Structure

```
ezihe-movie-box/
├── src/
│   ├── components/
│   │   ├── MovieCard.tsx      # Movie grid cards
│   │   ├── MovieModal.tsx     # Details modal with trailer
│   │   └── FilterBar.tsx      # Search and filters
│   ├── App.tsx                # Main application logic
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── dist/                      # Production build (auto-generated)
├── server.js                  # Express server for deployment
├── render.yaml                # Render deployment config
├── DEPLOYMENT.md              # Deployment instructions
└── README.md                  # This file
```

---

## 🎮 How to Use

### 1. Browse Movies
- Scroll through popular movies on the homepage
- View movie posters, ratings, and genres

### 2. Search
- Type a movie name in the search bar
- Results update instantly

### 3. Filter & Sort
- Select a genre from the dropdown
- Choose a year range
- Sort by popularity, rating, or date

### 4. Watch Trailers
- Click on any movie card
- Click "Watch Trailer" button
- Enjoy the trailer in full-screen mode

### 5. Download Movies
- Click "Download Movie" in the modal
- Follow the download instructions

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP requests |
| **Express** | Production server |
| **TMDB API** | Movie data source |

---

## 📊 Statistics

- 🎬 **Movies**: 200,000+
- 📅 **Years**: 1900 - 2025
- 🎭 **Genres**: 19+
- 📺 **Trailers**: Thousands available
- 🌍 **Languages**: Multiple
- ⭐ **Ratings**: Real user ratings

---

## 🔑 API Key

The app uses The Movie Database (TMDB) API. A demo key is included, but for production use:

1. Create an account at https://www.themoviedb.org/
2. Get your API key from https://www.themoviedb.org/settings/api
3. Replace the key in:
   - `src/App.tsx`
   - `src/components/MovieModal.tsx`

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in server.js or:
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Trailers Not Playing
- Check your internet connection
- Ensure YouTube is accessible
- Try a different movie

---

## 📜 License

This project is open source and available for educational purposes.

**Note**: Movie data and images are provided by The Movie Database (TMDB) and subject to their terms of use.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📧 Support

For questions or issues:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
2. Review the troubleshooting section above
3. Open an issue on GitHub

---

<div align="center">
  <h2>🎉 Enjoy EZIHE MOVIE BOX! 🎉</h2>
  <p>Your gateway to unlimited movie entertainment</p>
  <p>⭐ Star this repo if you like it! ⭐</p>
</div>
