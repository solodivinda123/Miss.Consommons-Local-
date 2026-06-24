import React from "react";
import { Award, Heart, Facebook, Instagram, Twitter, Phone } from "lucide-react";
import { BrandLogoIcon } from "./BrandLogo";

interface FooterProps {
  onNavigate: (view: string, year?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Notre Mission", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Les 24 Communes", action: () => { onNavigate("ambassadrices", "2026"); } },
    { label: "Calendrier & Finale", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("calendrier")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Formulaire d'Inscription", action: () => onNavigate("inscription") },
    { label: "Contact Officiel", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); } }
  ];

  return (
    <footer className="bg-stone-950 text-white pt-16 pb-8 border-t border-stone-900 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-900">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-5">
            <button
              onClick={() => { onNavigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center group focus:outline-none"
            >
              <BrandLogoIcon className="h-10 sm:h-12 w-auto" />
            </button>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-sans">
              Première plateforme nationale d'impact alliant le leadership féminin, la beauté intellectuelle et la promotion active de la souveraineté alimentaire Made in Congo.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="p-2.5 rounded-xl bg-stone-900 border border-stone-850 text-stone-400 hover:text-white hover:border-stone-700 transition-all"
                aria-label="Suivre sur Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-stone-900 border border-stone-850 text-stone-400 hover:text-white hover:border-stone-700 transition-all"
                aria-label="Suivre sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-stone-900 border border-stone-850 text-stone-400 hover:text-white hover:border-stone-700 transition-all"
                aria-label="Suivre sur Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/243830969818"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-stone-900 border border-stone-850 text-stone-400 hover:text-white hover:border-stone-700 transition-all"
                aria-label="Contact direct WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-gold-400 font-bold">
              Raccourcis Utiles
            </h4>
            <ul className="space-y-2 text-sm text-stone-400 font-sans">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={link.action}
                    className="hover:text-gold-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Mandate / Legal info */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-gold-400 font-bold">
              Le Bureau Central
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed font-sans">
              2732; Av Inga Q/ Adoula,<br />
              Commune de Bandalungwa,<br />
              Kinshasa, République Démocratique du Congo<br />
              Tél: +243 830 969 818 / +243 831 700 110
            </p>
            <p className="text-xs text-stone-500 font-mono">
              Enregistrement Ministériel : No. MACC/CO-2026-08
            </p>
          </div>

        </div>

        {/* Bottom Credits and signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <p>
            © {currentYear} Miss Consommons Local. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1">
            <span>Propulsé avec</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>pour le Made in Congo</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
