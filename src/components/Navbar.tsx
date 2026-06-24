import React, { useState, useEffect } from "react";
import { Award, Menu, X, ChevronDown, PenTool, PhoneCall, Globe } from "lucide-react";
import { BrandLogoIcon } from "./BrandLogo";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, year?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Mission", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Calendrier", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("calendrier")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Organisation", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("organisation")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Partenaires", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("partenaires")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "FAQ", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100); } },
  ];

  const handleSubItemClick = (year: string) => {
    onNavigate("ambassadrices", year);
    setShowSubmenu(false);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 py-4 ${
          isScrolled
            ? "bg-forest-950/95 backdrop-blur-md shadow-lg border-b border-forest-800/30 py-3"
            : "bg-gradient-to-b from-forest-950/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => { onNavigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center group focus:outline-none py-1.5"
              id="nav-logo-btn"
            >
              <BrandLogoIcon className="h-9 sm:h-11 w-auto" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1.5">
              {/* Menu items */}
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => { item.action(); setIsOpen(false); }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-stone-200 hover:text-gold-400 hover:bg-forest-900/40 transition-all duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              {/* Submenu for Communes */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowSubmenu(true)}
                  onClick={() => setShowSubmenu(!showSubmenu)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    currentView === "ambassadrices"
                      ? "text-gold-400 bg-forest-900/40"
                      : "text-stone-200 hover:text-gold-400 hover:bg-forest-900/40"
                  }`}
                >
                  <span>24 Communes</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showSubmenu ? "rotate-180" : ""}`} />
                </button>

                {/* Submenu drop */}
                <AnimatePresence>
                  {showSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setShowSubmenu(false)}
                      className="absolute right-0 mt-2 w-52 rounded-xl bg-forest-950 border border-forest-800/60 p-2 shadow-2xl"
                    >
                      <div className="text-[10px] uppercase font-mono tracking-wider px-3 py-1.5 text-stone-500 border-b border-forest-900/60 mb-1">
                        Éditions Ambassadrices
                      </div>
                      <button
                        onClick={() => handleSubItemClick("2026")}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors flex items-center justify-between"
                      >
                        <span>Édition 2026</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gold-500/10 text-gold-400 font-semibold uppercase">Actuelle</span>
                      </button>
                      <button
                        onClick={() => handleSubItemClick("2025")}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors"
                      >
                        Édition 2025
                      </button>
                      <button
                        onClick={() => handleSubItemClick("2024")}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors"
                      >
                        Édition 2024
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="h-4 w-px bg-forest-800/60 mx-2" />

              <button
                onClick={() => onNavigate("inscription")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  currentView === "inscription"
                    ? "bg-gold-500 text-forest-950 shadow-gold-500/20"
                    : "bg-gold-600 text-white hover:bg-gold-500 shadow-md hover:shadow-gold-500/10"
                }`}
                id="nav-register-btn"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Inscrivez-vous</span>
              </button>

              <button
                onClick={() => { onNavigate("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase text-stone-300 hover:text-white border border-forest-800 hover:border-stone-500 hover:bg-forest-900/30 transition-all cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-forest-900/50 focus:outline-none transition-colors cursor-pointer"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                id="mobile-menu-toggle"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-forest-950 border-t border-forest-900 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { item.action(); setIsOpen(false); }}
                    className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Communes Toggle */}
                <div className="border-t border-forest-900/80 my-2 pt-2">
                  <div className="px-4 py-1 text-xs uppercase font-mono tracking-wider text-stone-500 mb-1">
                    Les 24 Communes
                  </div>
                  <button
                    onClick={() => handleSubItemClick("2026")}
                    className="w-full text-left px-6 py-2 rounded-lg text-sm font-medium text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors flex items-center justify-between"
                  >
                    <span>Édition 2026 (Actuelle)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  </button>
                  <button
                    onClick={() => handleSubItemClick("2025")}
                    className="w-full text-left px-6 py-2 rounded-lg text-sm font-medium text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors"
                  >
                    Édition 2025
                  </button>
                  <button
                    onClick={() => handleSubItemClick("2024")}
                    className="w-full text-left px-6 py-2 rounded-lg text-sm font-medium text-stone-300 hover:bg-forest-900 hover:text-gold-400 transition-colors"
                  >
                    Édition 2024
                  </button>
                </div>

                <div className="border-t border-forest-900/80 my-2 pt-2 space-y-2">
                  <button
                    onClick={() => { onNavigate("inscription"); setIsOpen(false); }}
                    className="w-full text-center px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide bg-gold-600 text-white hover:bg-gold-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>S'inscrire au Concours</span>
                  </button>

                  <button
                    onClick={() => { onNavigate("home"); setIsOpen(false); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                    className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide text-stone-300 hover:text-white border border-forest-850 hover:bg-forest-900 transition-colors"
                  >
                    Contactez-nous
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
