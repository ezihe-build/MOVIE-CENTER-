export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14 bg-gradient-to-br from-gold via-yellow-500 to-gold rounded-lg flex items-center justify-center shadow-2xl shadow-gold/50 border-2 border-gold animate-pulse-slow">
        <svg
          className="w-9 h-9 text-black"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-sm animate-rainbow-spin"></div>
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold neon-rainbow-text tracking-wider">
          EZIHE PREMIUM
        </h1>
        <p className="text-lg font-semibold text-gold tracking-widest -mt-1">MOVIE CENTER</p>
        <p className="text-gold/80 text-xs md:text-sm font-medium">Download Unlimited Movies</p>
      </div>
    </div>
  );
}
