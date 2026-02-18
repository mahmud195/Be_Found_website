import heroVideo from '../assets/videos/BeFound Design Studio Video For Website.mp4';

export default function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#25282A]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto opacity-80"
      >
        <source
          src={heroVideo}
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[#25282A]/20 via-transparent to-[#25282A]" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[#E6F0F0] text-sm tracking-[0.4em] font-light uppercase opacity-80">
          a self-expression journey
        </p>
      </div>
    </section>
  );
}
