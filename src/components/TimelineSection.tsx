import React from "react";
import { CALENDAR_TIMELINE } from "../data/communes";
import { Calendar, Trophy, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { motion } from "motion/react";

export default function TimelineSection() {
  return (
    <section id="calendrier" className="py-24 bg-stone-50 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Feuille de Route du Concours</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Calendrier &amp; Déroulement
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Suivez les grandes étapes de l'édition actuelle, depuis les premières mobilisations citoyennes de Kinshasa jusqu'au sacre solennel de notre Ambassadrice nationale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <span>Les Grandes Phases</span>
            </h3>

            <div className="relative border-l-2 border-stone-800 ml-4 pl-8 space-y-10">
              {CALENDAR_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                   {/* Icon indicator */}
                  <span className="absolute -left-[41px] top-1.5 p-1 rounded-full bg-stone-900 border-2 border-stone-800 group-hover:border-gold-500 transition-colors">
                    {item.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-forest-400 fill-forest-950/40" />
                    ) : item.status === "active" ? (
                      <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500" />
                      </span>
                    ) : (
                      <Circle className="w-4 h-4 text-stone-400" />
                    )}
                  </span>

                  {/* Content card */}
                  <div className="space-y-2 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm group-hover:shadow-md group-hover:border-gold-500/30 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-stone-100 text-stone-700 border border-stone-200">
                        {item.phase}
                      </span>
                      <span className="text-xs font-mono font-semibold text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded-md">
                        {item.period}
                      </span>
                    </div>
                    <h4 className="text-lg font-serif font-bold text-stone-900 group-hover:text-gold-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-stone-600 text-sm leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Highlight Box (Grande Finale) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-forest-950 p-8 sm:p-10 border border-forest-800 text-white overflow-hidden shadow-2xl flex flex-col justify-between h-full"
            >
              {/* Highlight Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-forest-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10 text-center">
                <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 w-fit mx-auto text-gold-400">
                  <Trophy className="w-10 h-10 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight uppercase">
                    GRANDE FINALE
                  </h3>
                  <p className="text-gold-400 font-mono text-xs uppercase tracking-widest font-semibold">
                    Le Show National
                  </p>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed max-w-sm mx-auto">
                  Un gala prestigieux réunissant le gouvernement, les institutions de transformation locale, et des invités de marque du monde entier.
                </p>

                {/* Show Items Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 text-left max-w-xs mx-auto">
                  {[
                    "Exhibition (Foire locale)",
                    "Orchestre & Music",
                    "Spectacles & Dance",
                    "Défilé en Tenues Locales",
                    "Défense de Projet",
                    "Sacre & Couronnement"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="text-xs font-medium text-stone-200">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-forest-800/80">
                  <p className="text-stone-400 text-[10px] uppercase tracking-widest font-mono">Date Prévue</p>
                  <p className="text-2xl font-serif font-bold text-gold-400 mt-1">1er Septembre 2026</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-[10px] font-semibold uppercase tracking-wider">
                    Lieu à confirmer très bientôt
                  </span>
                </div>
              </div>

              {/* Decorative visual pulsing line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-500 via-gold-500 to-forest-500 animate-pulse" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
