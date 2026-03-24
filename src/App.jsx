import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [activePlanet, setActivePlanet] = useState(null);

  // ⭐ Stars (with better depth)
  const stars = Array.from({ length: 120 }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    const moveX = (Math.random() - 0.5) * 200;
    const moveY = -Math.random() * 1000;

    return (
      <div
        key={i}
        className="star"
        style={{
          width: size + "px",
          height: size + "px",
          top: Math.random() * 100 + "vh",
          left: Math.random() * 100 + "vw",
          animationDuration: Math.random() * 60 + 40 + "s",
          animationDelay: Math.random() * 5 + "s",
          "--x": moveX + "px",
          "--y": moveY + "px",
        }}
      />
    );
  });

  // 🚀 Loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // ✨ Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // 🚀 Animations
  useEffect(() => {
    gsap.to(".rocket", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      y: -900,
      scale: 1.5,
      rotation: 30,
      ease: "none",
    });

    gsap.to(".zoom-container", {
      scale: 1.5,
      scrollTrigger: {
        trigger: ".zoom-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.utils.toArray(".section").forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  // ✅ Loading screen
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white text-3xl space-y-4">
        <div className="text-6xl animate-bounce">🚀</div>
        <p className="animate-pulse">Launching Mission...</p>
      </div>
    );
  }

  return (
    <div
      className="bg-black text-white min-h-screen relative overflow-x-hidden"
      onMouseMove={(e) => {
        gsap.to(".rocket", {
          x: (e.clientX - window.innerWidth / 2) / 20,
          y: (e.clientY - window.innerHeight / 2) / 20,
          duration: 0.5,
        });
      }}
    >

      {/* ⭐ Stars */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="stars">{stars}</div>
      </div>

      {/* 🚀 Rocket */}
      <div className="rocket fixed top-[60%] left-[50%] -translate-x-1/2 text-5xl z-20">
        🚀
      </div>

      {/* 🌌 MAIN CONTENT (ZOOM) */}
      <div className="relative z-10 zoom-container will-change-transform">

        {/* HERO */}
        <section className="section h-screen flex flex-col items-center justify-center text-center px-4 space-y-6">
          <h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
            style={{ textShadow: "0 0 25px rgba(255,255,255,0.7)" }}
          >
            🚀 Journey to Mars
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl">
            Experience the journey from Earth to Mars through an immersive interactive story.
          </p>
        </section>

        {/* EARTH */}
        <section className="section h-screen flex items-center justify-center bg-blue-900">
          <div
            onClick={() => setActivePlanet("earth")}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:scale-110 hover:bg-white/20 transition duration-300 cursor-pointer"
          >
            <h1 className="text-4xl mb-4">🌍 Launch from Earth</h1>
            <p className="text-gray-300">The journey begins from our home planet.</p>
          </div>
        </section>

        {/* SPACE */}
        <section className="section h-screen flex items-center justify-center bg-black">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:scale-110 hover:bg-white/20 transition duration-300">
            <h1 className="text-4xl mb-4">🌌 Traveling Through Space</h1>
            <p className="text-gray-300">Navigate through the vast darkness of space.</p>
          </div>
        </section>

        {/* MARS */}
        <section className="section h-screen flex items-center justify-center bg-red-900">
          <div
            onClick={() => setActivePlanet("mars")}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:scale-110 hover:bg-white/20 transition duration-300 cursor-pointer"
          >
            <h1 className="text-4xl mb-4">🔴 Landing on Mars</h1>
            <p className="text-gray-300">The red planet awaits human exploration.</p>
          </div>
        </section>

        {/* END */}
        <section className="section h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:scale-110 hover:bg-white/20 transition duration-300">
            <h1 className="text-4xl mb-4">🚀 Future of Humanity</h1>
            <p className="text-gray-300">Mars could be the next home for mankind.</p>
          </div>
        </section>

      </div>

      {/* ✅ POPUP (OUTSIDE ZOOM — FIXED) */}
      {activePlanet && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl text-center max-w-md border border-white/20 backdrop-blur-md">

            {activePlanet === "earth" && (
              <>
                <h2 className="text-2xl mb-4">🌍 Earth</h2>
                <p>Our home planet. Launch point for humanity’s journey to Mars.</p>
              </>
            )}

            {activePlanet === "mars" && (
              <>
                <h2 className="text-2xl mb-4">🔴 Mars</h2>
                <p>The red planet. Future home for human exploration.</p>
              </>
            )}

            <button
              onClick={() => setActivePlanet(null)}
              className="mt-6 px-4 py-2 bg-white text-black rounded hover:scale-110 transition"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;