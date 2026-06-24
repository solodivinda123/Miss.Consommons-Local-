import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Award, Leaf, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-expect-error - Vite resolves the JPG asset dynamically
import ambassadricesImage from "../assets/images/les_24_ambassadrices_group_1782295188623.jpg";

interface HeroCarouselProps {
  onNavigate: (view: string, year?: string) => void;
}

const SLIDES = [
  {
    eyebrow: "24 Communes · 24 Voix",
    title: "Ambassadrices du « consommer local »",
    lead: "Une représentante d'élite par commune pour porter fièrement l'excellence du terroir congolais, quartier par quartier, marché par marché, jusqu'à la prestigieuse scène finale.",
    bgUrl: ambassadricesImage,
    icon: Award,
    cta1: "Découvrir la Grille",
    cta1Action: "communes",
    cta2: "Le Calendrier",
    cta2Action: "calendrier"
  },
  {
    eyebrow: "Agriculture & Marchés Locaux",
    title: "Du champ à l'assiette, célébrons le vivant",
    lead: "« Le concours met en lumière celles et ceux qui font tourner l'économie nationale, en alliant la promotion de la consommation locale avec le leadership féminin et l'entrepreneuriat durable. »",
    bgUrl: "https://territorial-scarlet-4z5dhqjz.edgeone.app/pic%20miss%203.jpg",
    icon: Leaf,
    cta1: "Notre Mission",
    cta1Action: "mission",
    cta2: "Les 24 Communes",
    cta2Action: "communes"
  },
  {
    eyebrow: "Grande Finale · Kinshasa",
    title: "Sous les projecteurs, une couronne pour la mission",
    lead: "Un show national unique où les finalistes s'affrontent avec éloquence et élégance : au-delà du titre suprême, c'est toute la richesse du Made in Congo qui rayonne.",
    bgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600&h=900",
    icon: Calendar,
    cta1: "S'inscrire Maintenant",
    cta1Action: "inscription",
    cta2: "Contact & Presse",
    cta2Action: "contact"
  }
];

export default function HeroCarousel({ onNavigate }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // 30 / 8 / 2026 => August 30, 2026 20:00:00 (Kinshasa WAT timezone: GMT+0100)
    const target = new Date("2026-08-30T20:00:00+01:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  // Slide transition timer
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 1;
      });
    }, 90); // ~9 seconds for a full slide

    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleCtaClick = (action: string) => {
    if (action === "inscription") {
      onNavigate("inscription");
    } else if (action === "communes") {
      onNavigate("ambassadrices", "2026");
    } else {
      document.getElementById(action)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ActiveIcon = SLIDES[current].icon;

  return (
    <section className="relative h-screen w-full bg-stone-950 overflow-hidden" aria-label="Présentation interactive">
      {/* Dynamic Background Image Zoom */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[current].bgUrl})` }}
          />
        </AnimatePresence>
        {/* Modern multi-layer dark backdrop overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/40 via-transparent to-gold-950/20" />
      </div>

      {/* Content Slide Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Slide Eyebrow */}
              <div className="flex items-center gap-2 text-gold-400 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold">
                <ActiveIcon className="w-4 h-4 animate-pulse" />
                <span>{SLIDES[current].eyebrow}</span>
              </div>

              {/* Slide Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {SLIDES[current].title}
              </h1>

              {/* Slide Lead */}
              <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed font-sans max-w-2xl">
                {SLIDES[current].lead}
              </p>

              {/* Dynamic Countdown Timer */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 backdrop-blur-md border border-gold-500/20 max-w-md shadow-xl shadow-black/40 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gold-400 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span>Compte à rebours de la Grande Finale 2026</span>
                  </div>
                  <div className="text-[10px] font-mono text-stone-400 bg-stone-950/80 px-2.5 py-0.5 rounded-full border border-stone-800">
                    30 Août 2026
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {/* Days */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-stone-950 to-stone-900/90 border border-stone-800 text-center">
                    <div className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1.5">Jours</div>
                  </div>

                  {/* Hours */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-stone-950 to-stone-900/90 border border-stone-800 text-center">
                    <div className="font-serif text-2xl sm:text-3xl font-black text-gold-400 tracking-tight leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1.5">Heures</div>
                  </div>

                  {/* Minutes */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-stone-950 to-stone-900/90 border border-stone-800 text-center">
                    <div className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1.5">Min</div>
                  </div>

                  {/* Seconds */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-stone-950 to-stone-900/90 border border-stone-800 text-center">
                    <div className="font-serif text-2xl sm:text-3xl font-black text-gold-400 tracking-tight leading-none">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1.5">Sec</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => handleCtaClick(SLIDES[current].cta1Action)}
                  className="px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-stone-950 font-semibold text-sm transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-gold-400/30 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {SLIDES[current].cta1}
                </button>
                <button
                  onClick={() => handleCtaClick(SLIDES[current].cta2Action)}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {SLIDES[current].cta2}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute bottom-10 right-4 sm:right-6 lg:right-12 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full border border-white/10 bg-black/30 text-stone-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Diapositive précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full border border-white/10 bg-black/30 text-stone-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Diapositive suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Slide Dots & Progress fill */}
      <div className="absolute bottom-12 left-4 sm:left-6 lg:left-12 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrent(idx); setProgress(0); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? "w-8 bg-gold-400" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Aller à la diapositive ${idx + 1}`}
            />
          ))}
        </div>
        <span className="hidden sm:inline text-xs font-mono text-stone-500">
          0{current + 1} / 0{SLIDES.length}
        </span>
      </div>

      {/* Top Animated Progress Indicator Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-forest-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
