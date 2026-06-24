import React from "react";
import { Handshake } from "lucide-react";
import { motion } from "motion/react";

// Premium Modern Simple Vector Icon Set On Stock Vector Style
function AgricultureMinistryIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-all duration-300`}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8M12 11c1.5-1 3-1 3-1M12 13c-1.5-1-3-1-3-1" />
    </svg>
  );
}

function RtncBroadcastIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-all duration-300`}>
      <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M12 2v12M12 18v4" />
      <path d="M5 12a10 10 0 0 1 14 0" />
      <path d="M8.5 15.5a5 5 0 0 1 7 0" />
    </svg>
  );
}

function YouthPatriotismIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-all duration-300`}>
      <path d="M12 2L2 22h20L12 2z" className="opacity-30" />
      <path d="M12 6l-5 10h10L12 6z" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

export default function PartnersSection() {
  const officialPartners = [
    {
      name: "Ministère de l'Agriculture, Pêche et Élevage",
      subtitle: "République Démocratique du Congo",
      role: "Parrainage d'État & Appui Technique",
      icon: AgricultureMinistryIcon,
      logo: "https://nosy-white-pr6ggcj9.edgeone.app/partenaire-1.png",
      color: "border-forest-200 text-forest-700 bg-forest-50"
    },
    {
      name: "Radio-Télévision Nationale Congolaise (RTNC)",
      subtitle: "Média Public Officiel",
      role: "Couverture & Diffusion Nationale des Galas",
      icon: RtncBroadcastIcon,
      logo: "https://conceptual-pink-tgj1zsid.edgeone.app/rtnc.jpg",
      color: "border-gold-200 text-gold-700 bg-gold-50"
    },
    {
      name: "Ministère de la Jeunesse & Éveil Patriotique",
      subtitle: "Gouvernement de la RDC",
      role: "Promotion du Leadership & Mobilisation Citoyenne",
      icon: YouthPatriotismIcon,
      logo: "https://cautious-magenta-lyin7eml.edgeone.app/images%20(1).png",
      color: "border-forest-200 text-forest-700 bg-forest-50"
    },
    {
      name: "Fonds de Garantie de l'Entrepreneuriat au Congo",
      subtitle: "FOGEC · Établissement Public RDC",
      role: "Garantie, Financement & Accompagnement",
      icon: undefined,
      logo: "https://cuddly-green-ziw8sqho.edgeone.app/logo-black-3.png",
      color: "border-gold-200 bg-white"
    }
  ];

  return (
    <section id="partenaires" className="py-24 bg-stone-50 overflow-hidden border-t border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Handshake className="w-4 h-4" />
            <span>Soutiens Institutionnels et Corporatifs</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Partenaires &amp; Médias
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Nous collaborons étroitement avec les institutions publiques, les médias phares, et des entrepreneurs engagés pour propulser l'éco-système de production locale en RDC.
          </p>
        </div>

        {/* Major Partners Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {officialPartners.map((partner, idx) => {
            const IconComp = partner.icon;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border border-stone-200/60 bg-white flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md hover:border-gold-500/30 transition-all group`}
              >
                <div className="space-y-4">
                  {/* Icon or Logo Area */}
                  {partner.logo ? (
                    <div className="h-10 flex items-center justify-start">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        referrerPolicy="no-referrer"
                        className="h-9 w-auto object-contain max-w-[160px] transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    IconComp && (
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${partner.color}`}>
                        <IconComp className="w-5 h-5 shrink-0" />
                      </div>
                    )
                  )}
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-stone-900 leading-snug group-hover:text-gold-600 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-mono tracking-tight leading-tight uppercase font-medium">
                      {partner.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 text-[11px] font-sans font-semibold text-stone-600">
                  <span className="text-stone-400 block font-mono text-[9px] uppercase tracking-wider mb-0.5">Rôle Officiel</span>
                  <span className="text-stone-700">{partner.role}</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Secondary Partners Slide-over Banner */}
        <div className="text-center pt-6">
          <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-4">Rejoindre la dynamique</p>
          <div className="inline-flex flex-wrap justify-center gap-3">
            {[
              "Coopératives de Maraîchers du Pool",
              "Alliance Congolaise pour l'Industrialisation",
              "Kin-Agro Hub",
              "Sponsors Privés & Donateurs",
              "Kinshasa Éco-Tourisme Association"
            ].map((name, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-forest-950/20 border border-gold-500/10 text-xs font-semibold text-stone-300 font-sans hover:border-gold-500/30 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl border border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/5 text-gold-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Devenir Partenaire ou Sponsor Officiel
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
