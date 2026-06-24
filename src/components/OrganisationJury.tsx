import React, { useState, useEffect, useRef } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

// Premium modern simple vectors for Organisation & Jury
function PremiumPresidentIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function PremiumDirectorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );
}

function PremiumExpertIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2v2" />
    </svg>
  );
}

export default function OrganisationJury() {
  const members = [
    {
      role: "Présidence du Jury",
      name: "À confirmer",
      desc: "Personnalité reconnue du leadership féminin ou du secteur de la transformation industrielle locale.",
      icon: PremiumPresidentIcon,
      imageUrl: "https://costly-copper-04nhvwvw.edgeone.app/commune-kasa-vubu.png"
    },
    {
      role: "Direction du Concours",
      name: "Comité Organisateur",
      desc: "Équipe coordinatrice assurant la synergie avec les 24 communes de la ville-province de Kinshasa.",
      icon: PremiumDirectorIcon,
      imageUrl: "https://grotesque-plum-y9khciev.edgeone.app/commune-matete.png"
    },
    {
      role: "Expertise Agricole & RDC",
      name: "À confirmer",
      desc: "Scientifique ou entrepreneur chevronné du secteur agro-alimentaire évaluant la viabilité des projets.",
      icon: PremiumExpertIcon,
      imageUrl: "https://excess-red-ucynrtg4.edgeone.app/organisation-jury-president.png"
    }
  ];

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const autoplayActive = useRef<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor viewport size to toggle between carousel and grid
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    if (!emblaApi) return;

    timerRef.current = setInterval(() => {
      if (autoplayActive.current && emblaApi) {
        emblaApi.scrollNext();
      }
    }, 4000);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const pauseAutoplay = () => {
    autoplayActive.current = false;
    stopAutoplay();
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const resumeAutoplayAfterInactivity = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      autoplayActive.current = true;
      startAutoplay();
    }, 3000);
  };

  // Manage Embla callbacks and custom autoplay
  useEffect(() => {
    if (!emblaApi || !isMobile) {
      stopAutoplay();
      return;
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Pause on drag start, resume on drag end
    emblaApi.on("pointerDown", pauseAutoplay);
    emblaApi.on("pointerUp", resumeAutoplayAfterInactivity);

    // Initial play start
    autoplayActive.current = true;
    startAutoplay();

    return () => {
      stopAutoplay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (emblaApi) {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
        emblaApi.off("pointerDown", pauseAutoplay);
        emblaApi.off("pointerUp", resumeAutoplayAfterInactivity);
      }
    };
  }, [emblaApi, isMobile, members.length]);

  const renderMemberCard = (member: typeof members[0]) => {
    const IconComponent = member.icon;
    return (
      <div className="group bg-stone-950/40 rounded-2xl border border-stone-800 p-6 flex flex-col justify-between items-center text-center space-y-5 hover:border-gold-500/30 transition-all duration-300 shadow-lg h-full">
        {/* Member Image Portrait with elegant design */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-stone-800 group-hover:border-gold-400 transition-colors duration-300">
          <img
            src={member.imageUrl}
            alt={member.role}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
            {member.role}
          </span>
          <h3 className="text-lg font-serif font-bold text-white tracking-tight">
            {member.name}
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed font-sans px-2">
            {member.desc}
          </p>
        </div>

        {/* Status indicator pill */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-[10px] uppercase tracking-wider font-mono font-bold group-hover:bg-gold-500 group-hover:text-stone-950 transition-all">
            <IconComponent className="w-3 h-3" />
            <span>Dossier Expert</span>
          </span>
        </div>
      </div>
    );
  };

  const renderMembersContent = () => {
    if (!isMobile) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="h-full"
            >
              {renderMemberCard(member)}
            </motion.div>
          ))}
        </div>
      );
    }

    // Render Embla Carousel for Mobile < 768px
    return (
      <div className="block md:hidden select-none max-w-lg mx-auto">
        <div
          className="relative px-8"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplayAfterInactivity}
          onTouchStart={pauseAutoplay}
          onTouchEnd={resumeAutoplayAfterInactivity}
        >
          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {members.map((member, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 px-2 h-full">
                  {renderMemberCard(member)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons (Arrows) - Left */}
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-900/95 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Membre précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Navigation Buttons (Arrows) - Right */}
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollNext();
            }}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-900/95 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Membre suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        {scrollSnaps.length > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 px-4 max-w-xs mx-auto">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (emblaApi) emblaApi.scrollTo(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === selectedIndex
                    ? "bg-[#FFD100] scale-125 shadow-md shadow-[#FFD100]/25"
                    : "bg-stone-600 hover:bg-stone-500"
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="organisation" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      
      {/* Decorative Forest-green and gold ambient glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-forest-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Garantie d'Éthique et de Viabilité</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Organisation &amp; Jury
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-400 to-forest-500 mx-auto rounded" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Le concours est placé sous le patronage d'un comité d'experts multidisciplinaires assurant la transparence du processus de notation et de casting.
          </p>
        </div>

        {/* Members Grid / Carousel */}
        {renderMembersContent()}

      </div>
    </section>
  );
}
