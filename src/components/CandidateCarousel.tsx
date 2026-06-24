import React, { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Award, BookOpen } from "lucide-react";
import { Commune, Ambassadrice } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { CropData, getCandidateCropStyle } from "../utils/imageCropper";

interface CandidateCarouselProps {
  communes: Commune[];
  selectedYear: string;
  crops: Record<string, CropData>;
  onCardClick: (commune: Commune) => void;
}

interface CandidateCardProps {
  commune: Commune;
  ambassadrice: Ambassadrice;
  selectedYear: string;
  crops: Record<string, CropData>;
  onCardClick: (commune: Commune) => void;
}

function CandidateCard({
  commune,
  ambassadrice,
  selectedYear,
  crops,
  onCardClick,
}: CandidateCardProps) {
  let displayImageUrl = ambassadrice.imageUrl;
  if (selectedYear === "2025") {
    displayImageUrl = "https://civil-purple-cjpvsfcf.edgeone.app/2.jpg";
  } else if (selectedYear === "2024") {
    displayImageUrl = "https://incredible-turquoise-n7j8y6js.edgeone.app/3.jpg";
  } else {
    const isCandidateActive = ambassadrice.status === "Candidate active" || !ambassadrice.status;
    if (isCandidateActive) {
      displayImageUrl = "https://naughty-coffee-radk7s2v.edgeone.app/1.jpg";
    }
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      {/* Image Card top */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03] overflow-hidden">
          <img
            src={displayImageUrl}
            alt={`Ambassadrice ${commune.name}`}
            className="w-full h-full object-cover"
            style={
              selectedYear === "2026" &&
              ambassadrice.imageUrl.includes(
                "les_24_ambassadrices_group_1782295188623.jpg"
              )
                ? getCandidateCropStyle(commune.id, crops)
                : undefined
            }
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        {/* Dark gradient shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* District Tag */}
        <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-[10px] font-mono font-semibold text-white px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
          {commune.district}
        </span>

        {/* Badge de status (Dauphine, Lauréate, etc) */}
        {ambassadrice.status && (
          <span className="absolute top-3 right-3 bg-[#FFD100] text-stone-950 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-[#FFD100]/20">
            <Award className="w-3 h-3 text-stone-950 fill-stone-950" />
            <span>{ambassadrice.status}</span>
          </span>
        )}

        {/* Name & Project overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#FFD100] font-bold">
            {commune.name}
          </p>
          <h3 className="text-lg font-serif font-bold tracking-tight">
            {ambassadrice.name}, {ambassadrice.age} ans
          </h3>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Project title */}
          <div className="space-y-1 text-left">
            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">Projet Social</p>
            <h4 className="text-sm font-semibold text-stone-850 line-clamp-2 group-hover:text-gold-700 transition-colors">
              {ambassadrice.projectTitle}
            </h4>
          </div>

          {/* Featured product */}
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-150 flex items-start gap-2 text-left">
            <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-mono text-[9px] uppercase tracking-wider text-stone-400">Produit Vedette</p>
              <p className="font-medium text-stone-800 line-clamp-1">{ambassadrice.featuredProduct}</p>
            </div>
          </div>
        </div>

        {/* Button trigger modal */}
        <button
          onClick={() => onCardClick(commune)}
          className="mt-5 w-full py-2.5 rounded-xl border border-stone-250 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-white hover:bg-gold-600 hover:border-gold-600 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Consulter le Dossier</span>
        </button>
      </div>
    </div>
  );
}

export default function CandidateCarousel({
  communes,
  selectedYear,
  crops,
  onCardClick,
}: CandidateCarouselProps) {
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
  }, [emblaApi, isMobile, communes.length]);

  // Render Grid for Desktop >= 768px
  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {communes.map((commune, index) => {
            const ambassadrice = commune.ambassadrices[selectedYear];
            if (!ambassadrice) return null;

            return (
              <motion.article
                key={commune.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="h-full"
              >
                <CandidateCard
                  commune={commune}
                  ambassadrice={ambassadrice}
                  selectedYear={selectedYear}
                  crops={crops}
                  onCardClick={onCardClick}
                />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }

  // Render Embla Carousel for Mobile < 768px
  return (
    <div className="block md:hidden select-none">
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
            {communes.map((commune) => {
              const ambassadrice = commune.ambassadrices[selectedYear];
              if (!ambassadrice) return null;

              return (
                <div key={commune.id} className="flex-[0_0_100%] min-w-0 px-2 h-full">
                  <CandidateCard
                    commune={commune}
                    ambassadrice={ambassadrice}
                    selectedYear={selectedYear}
                    crops={crops}
                    onCardClick={onCardClick}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons (Arrows) - Left */}
        <button
          onClick={() => {
            if (emblaApi) emblaApi.scrollPrev();
          }}
          disabled={!canScrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-900/95 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          aria-label="Candidate précédente"
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
          aria-label="Candidate suivante"
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
                  : "bg-stone-400 hover:bg-stone-500"
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
