import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import MissionSection from "./components/MissionSection";
import CommunesGrid from "./components/CommunesGrid";
import TimelineSection from "./components/TimelineSection";
import OrganisationJury from "./components/OrganisationJury";
import PartnersSection from "./components/PartnersSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import InscriptionForm from "./components/InscriptionForm";
import Footer from "./components/Footer";
import { Sparkles, ArrowUp, Compass, Calendar, User, Award } from "lucide-react";
import { BrandLogoIcon } from "./components/BrandLogo";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "ambassadrices" | "inscription">("home");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle views navigation
  const handleNavigation = (view: string, year?: string) => {
    if (view === "ambassadrices") {
      setCurrentView("ambassadrices");
      if (year) {
        setSelectedYear(year);
      }
    } else if (view === "inscription") {
      setCurrentView("inscription");
    } else {
      setCurrentView("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Listen to scroll to display scroll-to-top button
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black font-sans antialiased text-stone-100 selection:bg-gold-500/30 selection:text-white">
      
      {/* Universal Top Navigation Header */}
      <Navbar currentView={currentView} onNavigate={handleNavigation} />

      {/* Main Page Layout Content Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: HOME PAGE */}
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-0"
            >
              {/* Immersive Slide Carousel */}
              <HeroCarousel onNavigate={handleNavigation} />

              {/* Mission Statement and challenges */}
              <MissionSection />

              {/* Main Communes Grid previewing 2026 */}
              <CommunesGrid initialYear="2026" />

              {/* Roadmaps & Phase Timelines */}
              <TimelineSection />

              {/* Committee Members and Juries */}
              <OrganisationJury />

              {/* Partner Logos Strip */}
              <PartnersSection />

              {/* FAQs Accordions */}
              <FAQSection />

              {/* Direct Mail Contact Card */}
              <ContactSection />
            </motion.div>
          )}

          {/* VIEW 2: ALL AMBASSADRICES DIRECTORY */}
          {currentView === "ambassadrices" && (
            <motion.div
              key="ambassadrices"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="pt-24 min-h-[80vh] space-y-0"
            >
              {/* Premium Breadcrumb and header */}
              <div className="bg-gradient-to-b from-stone-900 to-stone-950 text-white py-16 border-b border-stone-850 relative">
                <div className="absolute top-0 right-0 w-80 h-full bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                  {/* Breadcrumb nav */}
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <button onClick={() => handleNavigation("home")} className="hover:text-gold-400 transition-colors">
                      Accueil
                    </button>
                    <span>/</span>
                    <span className="text-stone-300 font-semibold">Ambassadrices {selectedYear}</span>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-2 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight flex items-center gap-3">
                      <BrandLogoIcon className="h-10 sm:h-12 w-auto shrink-0" />
                      <span>Les Ambassadrices de l'Édition {selectedYear}</span>
                    </h1>
                    <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
                      Découvrez les porte-paroles officielles de la consommation locale pour chacune des 24 communes de Kinshasa pour la cohorte {selectedYear}. Parcourez leurs projets d'impact social pour valoriser le terroir Made in Congo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Communes Grid component loading specific selected year */}
              <CommunesGrid initialYear={selectedYear} />
            </motion.div>
          )}

          {/* VIEW 3: REGISTRATION APPLICATION FORM */}
          {currentView === "inscription" && (
            <motion.div
              key="inscription"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="pt-24 min-h-[80vh] space-y-0"
            >
              {/* Header card for sub-page */}
              <div className="bg-gradient-to-b from-stone-900 to-stone-950 text-white py-16 border-b border-stone-850 relative">
                <div className="absolute top-0 left-0 w-80 h-full bg-forest-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                  {/* Breadcrumb nav */}
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <button onClick={() => handleNavigation("home")} className="hover:text-gold-400 transition-colors">
                      Accueil
                    </button>
                    <span>/</span>
                    <span className="text-stone-300 font-semibold">Inscriptions 2026</span>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-2 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight flex items-center gap-2">
                      <Sparkles className="w-8 h-8 text-gold-400 animate-pulse shrink-0" />
                      <span>Inscrivez-vous au Concours 2026</span>
                    </h1>
                    <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
                      Saisissez l'opportunité de représenter dignement votre commune ! Présentez votre projet d'impact social axé sur le développement durable, l'éveil patriotique, ou l'agro-alimentaire Made in Congo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Render dynamic registration wizard */}
              <InscriptionForm />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigation} />

      {/* Modern Floating Action Buttons */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-stone-950 border border-gold-400/20 shadow-xl transition-all cursor-pointer hover:-translate-y-0.5"
            aria-label="Remonter en haut de page"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-5 h-5 font-bold" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
