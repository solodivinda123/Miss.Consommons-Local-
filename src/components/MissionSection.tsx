import React, { useState } from "react";
import { 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Globe, 
  Building2, 
  Coins, 
  TrendingUp, 
  Calendar, 
  Gift, 
  Tv, 
  Award, 
  Compass, 
  Users, 
  Heart 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Premium Modern Design Vectors as requested
function PremiumAgricultureIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22V10" />
      <path d="M12 14c4 0 6-2 6-6 0-2-.5-3-2-3-3 0-4 3-4 6v3" />
      <path d="M12 11c-4 0-6-2-6-6 0-2 .5-3 2-3 3 0 4 3 4 6v3" />
      <path d="M3 22h18" />
      <path d="M19 17a7 7 0 0 1-14 0" className="opacity-40" />
    </svg>
  );
}

function PremiumCommunesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M12 3a10 10 0 0 1 7.07 17.07M12 3a10 10 0 0 0-7.07 17.07" className="opacity-30" />
      <path d="M12 6a7 7 0 0 1 4.95 11.95M12 6a7 7 0 0 0-4.95 11.95" />
      <path d="M12 21v-5" />
    </svg>
  );
}

function PremiumCrownIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M3 20h18" />
      <circle cx="2" cy="4" r="1" fill="currentColor" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="22" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

export default function MissionSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const cards = [
    {
      title: "Agriculture Locale",
      desc: "Mettre en avant la richesse des filières agricoles de proximité, la qualité biologique, et la durabilité des productions maraîchères de la périphérie de Kinshasa.",
      icon: PremiumAgricultureIcon,
      color: "from-forest-500/20 to-forest-600/5",
      iconColor: "text-forest-400",
      borderColor: "group-hover:border-forest-500/30"
    },
    {
      title: "24 Communes, 24 Voix",
      desc: "Chaque commune désigne sa représentante officielle : une ambassadrice d'excellence investie au plus près des réalités de sa commune pour sensibiliser les citoyens.",
      icon: PremiumCommunesIcon,
      color: "from-gold-500/15 to-forest-500/5",
      iconColor: "text-gold-400",
      borderColor: "group-hover:border-gold-500/30"
    },
    {
      title: "Une Couronne d'Impact",
      desc: "Une grande finale nationale récompensant l'élégance et la pertinence du projet social. Une tribune majeure pour propulser l'entrepreneuriat féminin congolais.",
      icon: PremiumCrownIcon,
      color: "from-gold-500/20 to-gold-600/5",
      iconColor: "text-gold-500",
      borderColor: "group-hover:border-gold-500/30"
    }
  ];

  return (
    <section id="mission" className="relative py-24 bg-black overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-400 font-mono text-xs uppercase tracking-widest font-semibold">
            Engagement &amp; Souveraineté Alimentaire
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Notre Mission
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          
          <div className="text-stone-300 font-sans text-base sm:text-lg leading-relaxed pt-4 space-y-4">
            <p>
              Le concours Miss Ambassadrice CONSOMME LOCALE 2026 ambitionne de faire de chaque Ambassadrice municipale une véritable porte-parole du développement économique local.
            </p>
            <p>
              Sa mission : mettre en lumière les produits, les entreprises et le savoir-faire de sa commune. À travers les réseaux sociaux et les outils numériques, les Ambassadrices contribueront à promouvoir la consommation locale et à renforcer la visibilité des produits « Made in RD Congo » sur les scènes nationale et internationale.
            </p>
          </div>

          {/* Clickable Button for Rich Details */}
          <div className="pt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold-500/30 hover:border-gold-500 bg-gradient-to-r from-stone-900 to-stone-950 text-gold-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              id="mission-readmore-btn"
            >
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
              <span>{isExpanded ? "Fermer la charte" : "Rôle complet & Prix à gagner"}</span>
              <span className={`text-base font-bold transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>↓</span>
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden text-left"
              >
                <div className="mt-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/95 border border-gold-500/20 space-y-12">
                  
                  {/* Header Title inside Accordion */}
                  <div className="text-center space-y-2 border-b border-stone-800 pb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-gold-500/10 text-gold-400 tracking-wider">
                      Charte Officielle 2026
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                      RÔLE DES AMBASSADRICES DANS LA PROMOTION DES PRODUITS LOCAUX ET DU "MADE IN RD CONGO"
                    </h3>
                  </div>

                  {/* 1. VISION DU PROJET */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        1
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        Vision du Projet
                      </h4>
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed pl-11">
                      Le concours Miss Ambassadrice CONSOMME LOCALE 2026 ambitionne de faire de chaque Ambassadrice municipale une véritable porte-parole du développement économique local.
                      <br className="mb-2" />
                      Sa mission : mettre en lumière les produits, les entreprises et le savoir-faire de sa commune. À travers les réseaux sociaux et les outils numériques, les Ambassadrices contribueront à promouvoir la consommation locale et à renforcer la visibilité des produits « Made in RD Congo » sur les scènes nationale et internationale.
                    </p>
                  </div>

                  {/* 2. MISSION DES AMBASSADRICES */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        2
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        Mission des Ambassadrices
                      </h4>
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed pl-11 mb-2">
                      Chaque Ambassadrice aura pour mission de :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-11">
                      {[
                        "Promouvoir les produits locaux de sa commune sur ses plateformes numériques (Facebook, TikTok, Instagram, YouTube, WhatsApp, etc.).",
                        "Produire du contenu de qualité : réaliser des vidéos captivantes, des photos professionnelles, des interviews et des reportages d'immersion avec les producteurs et artisans.",
                        "Sensibiliser activement la population locale à l'importance civique et économique de consommer local.",
                        "Valoriser les ressources culturelles, agricoles, artisanales et industrielles de sa propre communauté municipale.",
                        "Participer de manière structurée à la grande campagne nationale de promotion et de labellisation « Made in RD Congo »."
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-forest-400 shrink-0 mt-0.5" />
                          <span className="text-stone-300 text-xs leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. ACCOMPAGNEMENT & KIT CREATOR */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        3
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        Accompagnement des Lauréates
                      </h4>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-stone-300 text-sm leading-relaxed">
                        Pour leur permettre de mener à bien leur mission de communication avec un rendu professionnel, chaque Ambassadrice municipale recevra un **« Kit Pro Content Creator »** composé de :
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-forest-950/20 border border-forest-500/20 text-center space-y-2">
                          <Smartphone className="w-6 h-6 text-forest-400 mx-auto" />
                          <h5 className="font-semibold text-xs text-white uppercase tracking-wider font-mono">Smartphone Pro</h5>
                          <p className="text-stone-400 text-[11px] leading-relaxed">Appareil photo de dernière génération à haute performance optique.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-forest-950/20 border border-forest-500/20 text-center space-y-2">
                          <Tv className="w-6 h-6 text-forest-400 mx-auto" />
                          <h5 className="font-semibold text-xs text-white uppercase tracking-wider font-mono">Micro Professionnel</h5>
                          <p className="text-stone-400 text-[11px] leading-relaxed">Prise de son haute fidélité pour des interviews et reportages limpides.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-forest-950/20 border border-forest-500/20 text-center space-y-2">
                          <Award className="w-6 h-6 text-forest-400 mx-auto" />
                          <h5 className="font-semibold text-xs text-white uppercase tracking-wider font-mono">Accessoires Studio</h5>
                          <p className="text-stone-400 text-[11px] leading-relaxed">Trépied stable, anneau lumineux de studio et extensions mémoire de stockage.</p>
                        </div>
                      </div>
                      <p className="text-xs text-stone-400 italic">
                        Cet équipement complet sera activement exploité pour alimenter des contenus de haute qualité graphique destinés à promouvoir les PME et initiatives de chaque commune.
                      </p>
                    </div>
                  </div>

                  {/* 4. LA PLATEFORME CONSOMME LOCAL */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        4
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        La Plateforme « Consomme Local »
                      </h4>
                    </div>
                    <div className="pl-11 space-y-3">
                      <p className="text-stone-300 text-sm leading-relaxed">
                        La plateforme numérique « Consomme Local », composée d’un site web officiel et de réseaux sociaux certifiés, servira de vitrine nationale et internationale pour les produits congolais. Elle permettra de :
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Répertorier l'ensemble des produits et services innovants des 24 communes de Kinshasa et des provinces.",
                          "Présenter les fiches techniques des entreprises locales, leurs réussites exceptionnelles et leurs coordonnées.",
                          "Diffuser de manière centralisée les reportages de terrain créés par les Ambassadrices.",
                          "Faciliter les opportunités de mise en relation directe entre producteurs, consommateurs finaux, investisseurs nationaux et partenaires.",
                          "Renforcer puissamment la marque du label « Made in RD Congo » sur les marchés nationaux et étrangers."
                        ].map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 mt-1.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 text-xs text-stone-300 font-mono leading-relaxed text-center">
                        <strong>Objectif ultime :</strong> créer un écosystème numérique solide qui favorise activement la croissance des PME locales et augmente durablement la consommation nationale des produits congolais.
                      </div>
                    </div>
                  </div>

                  {/* 5. REPRÉSENTATION DES ENTREPRISES */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        5
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        Représentation des Entreprises Locales
                      </h4>
                    </div>
                    <div className="pl-11 space-y-3">
                      <p className="text-stone-300 text-sm leading-relaxed">
                        Lors de la Grande Finale, chaque Miss municipale représentera officiellement **5 entreprises phares** de sa commune en tant que marraine d'impact. Cette initiative offrira :
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-stone-950 border border-stone-850 rounded-xl">
                          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block mb-1">Impact 01</span>
                          <span className="text-xs text-stone-200">Visibilité premium sur scène devant un jury d'investisseurs.</span>
                        </div>
                        <div className="p-3 bg-stone-950 border border-stone-850 rounded-xl">
                          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block mb-1">Impact 02</span>
                          <span className="text-xs text-stone-200">Promotion des produits auprès des réseaux médias nationaux.</span>
                        </div>
                        <div className="p-3 bg-stone-950 border border-stone-850 rounded-xl">
                          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block mb-1">Impact 03</span>
                          <span className="text-xs text-stone-200">Génération d'opportunités d’affaires et de partenariats B2B.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6. FONDS AGRINNOVATION */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        6
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        Fonds Agrinnovation+
                      </h4>
                    </div>
                    <div className="pl-11 space-y-3">
                      <p className="text-stone-300 text-sm leading-relaxed">
                        Le projet intègre une dimension économique forte. **Les 24 entreprises lauréates (une par commune de Kinshasa)** bénéficieront d'un accès privilégié au **Fonds Agrinnovation+** pour :
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
                          <span>Soutenir les projets agroalimentaires innovants</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
                          <span>Encourager l'entrepreneuriat féminin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
                          <span>Renforcer la création d'emplois locaux durables</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
                          <span>Promouvoir la transformation locale sur place</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 7. IMPACT ATTENDU & SLOGAN */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        7
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        Impact Attendue &amp; Vision Civique
                      </h4>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-stone-300 text-sm leading-relaxed">
                        Grâce à cette initiative majeure, les Ambassadrices deviendront des modèles inspirants de leadership féminin et des agents actifs du développement local.
                      </p>
                      
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-forest-950 to-stone-950 border border-forest-500/30 text-center">
                        <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block mb-2 font-bold">
                          Slogan Officiel
                        </span>
                        <p className="font-serif text-base sm:text-lg italic text-white font-medium">
                          « Une Commune, Une Ambassadrice, Une Fierté Locale pour un Congo qui Consomme et Valorise ses Produits. »
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 8. LA GRANDE FINALE 2026 */}
                  <div className="space-y-4 border-t border-stone-800 pt-8">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-mono font-bold text-xs">
                        8
                      </span>
                      <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider">
                        La Grande Finale 2026
                      </h4>
                    </div>
                    
                    <div className="pl-11 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                        <div className="flex items-center gap-2 text-gold-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs font-semibold font-mono uppercase tracking-wider">Détails de l'Événement</span>
                        </div>
                        <p className="text-sm text-stone-200">
                          **Lieu :** Palais du Peuple, Kinshasa, RDC
                          <br />
                          **Date :** [À déterminer] 2026
                        </p>
                        <p className="text-xs text-stone-400 leading-relaxed pt-1 border-t border-stone-900 mt-2">
                          Les 24 Ambassadrices Communales de Kinshasa s'affronteront pour la couronne suprême de **Miss Ambassadrice de la Consommation Locale de Kinshasa 2026**.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/40 to-stone-950 border border-gold-500/30 space-y-3">
                        <div className="flex items-center gap-2 text-gold-400">
                          <Gift className="w-4.5 h-4.5 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider font-mono">LISTE DES PRIX À GAGNER</span>
                        </div>
                        
                        <ul className="text-xs text-stone-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                          <li><strong>Véhicule de fonction</strong> (Réservé aux missions officielles)</li>
                          <li>Contrat d'ambassadrice de marque d'un an avec <strong>Lambano Pro</strong> et d'autres marques</li>
                          <li><strong>Fonds d'accompagnement de projet</strong> financier pour la commune</li>
                          <li><strong>Bourse d'études</strong> + Formation de prestige en leadership</li>
                          <li>Mission de Représentation Internationale (Promotion du label Made in RD Congo)</li>
                          <li>Tournée Nationale de sensibilisation dans 10 provinces</li>
                          <li>Voyages d'échange internationaux</li>
                          <li>Pack financier + Dotations personnelles importantes</li>
                          <li>Contrats de sponsoring publicitaire exclusifs</li>
                          <li>De nombreux autres prestigieux cadeaux</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative rounded-2xl border border-stone-800 bg-stone-900/40 p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Decorative Hover Accent Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />

                <div className="space-y-6">
                  {/* Icon Area */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center border border-stone-800`}>
                    <IconComponent className={`w-6 h-6 ${card.iconColor} group-hover:scale-110 transition-transform`} />
                  </div>

                  {/* Text */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-semibold text-white group-hover:text-gold-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Micro Action link */}
                <button 
                  onClick={() => {
                    const el = document.getElementById("faq");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="pt-6 border-t border-stone-800 mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-gold-400 transition-colors cursor-pointer text-left w-full"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.article>
            );
          })}
        </div>

        {/* Highlight Banner / Citation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-forest-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 shrink-0 text-gold-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-white">Le Défi du Consommer Congolais</h4>
              <p className="text-sm text-stone-300 leading-relaxed max-w-2xl mt-1">
                La RDC possède un potentiel agricole immense, pourtant la majorité des produits de consommation quotidienne sont importés. Ensemble, impulsons le changement à travers nos communes.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById("calendrier");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-3 rounded-lg bg-gold-500 text-stone-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-md hover:shadow-gold-500/20 shrink-0 cursor-pointer"
          >
            Voir notre action
          </button>
        </motion.div>
      </div>
    </section>
  );
}
