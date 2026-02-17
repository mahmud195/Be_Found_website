import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3769127/3769127-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex flex-col items-center justify-center">
        <button
          className="group mb-20"
          aria-label="Play video"
        >
          <div className="w-24 h-24 rounded-full border border-white/60 flex items-center justify-center transition-all duration-700 group-hover:border-[#E56A54] group-hover:scale-105" style={{
            animation: 'breathe 4s ease-in-out infinite'
          }}>
            <Play className="w-8 h-8 text-white/80 ml-1 group-hover:text-[#E56A54] transition-colors duration-700" fill="currentColor" />
          </div>
        </button>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <p className="text-white text-lg tracking-[0.15em] font-light italic" style={{ letterSpacing: '0.1em' }}>
            a self-expression journey
          </p>
        </div>
      </div>
    </section>
  );
}
