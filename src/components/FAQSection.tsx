import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, FileText, Phone, Award, Key } from "lucide-react";
import { MCL_FAQ } from "../data/communes";
import { motion, AnimatePresence } from "motion/react";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Candidature", "Conditions", "Sélection", "Casting", "Prix"];

  const filteredFaqs = selectedCategory === "All"
    ? MCL_FAQ
    : MCL_FAQ.filter(faq => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Foire aux Questions</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Questions Fréquentes
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Trouvez les réponses immédiates à vos questions concernant les inscriptions, le déroulement des épreuves communales de Kinshasa et le règlement intérieur.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setActiveIndex(null); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold-500 border-gold-500 text-stone-950 shadow"
                  : "bg-stone-900 border-stone-800 text-stone-300 hover:border-gold-500/50 hover:text-white"
              }`}
            >
              {cat === "All" ? "Toutes les questions" : cat}
            </button>
          ))}
        </div>

        {/* Accordions list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <article
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif font-semibold text-white hover:text-gold-400 hover:bg-stone-900/40 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg tracking-tight">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-stone-300 leading-relaxed font-sans space-y-4 border-t border-stone-800">
                        <p>{faq.answer}</p>

                        {/* Extra contextual data if the category is Candidature/Conditions to make it extremely rich */}
                        {faq.category === "Candidature" && (
                          <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-100 mt-3 space-y-2">
                            <p className="font-semibold text-xs text-gold-400 uppercase tracking-wider font-mono">Dossier de candidature direct :</p>
                            <p className="text-xs text-stone-300 leading-relaxed">
                              Inscrivez-vous directement sur notre plateforme (via l'onglet "Inscription" ci-dessus). L'inscription est 100% GRATUITE. Nos équipes de coordination de Gombe valideront votre dossier sous 72 heures.
                            </p>
                          </div>
                        )}

                        {faq.category === "Conditions" && (
                          <div className="p-4 rounded-xl bg-forest-950/40 border border-forest-500/20 mt-3">
                            <p className="font-semibold text-xs text-forest-400 uppercase tracking-wider font-mono mb-2">Critères obligatoires :</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 list-disc pl-4">
                              <li>Minimum Diplôme d'État</li>
                              <li>Âge : 18 à 40 ans au maximum</li>
                              <li>Résidente de la commune candidate</li>
                              <li>Éloquence et élégance naturelles</li>
                            </ul>
                          </div>
                        )}

                        {faq.category === "Prix" && (
                          <div className="p-4 rounded-xl bg-stone-950 text-stone-300 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border border-stone-800">
                            <div className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Voiture de Mandat</p>
                                <p className="text-stone-400">Pour assurer les missions d'ambassade.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Enveloppe Financière</p>
                                <p className="text-stone-400">Pour propulser et financer le projet social local.</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>

        {/* Contact WhatsApp highlight inside FAQ */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-stone-900/30 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-forest-500/20 text-forest-400 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-white">Besoin d'une assistance immédiate ?</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Notre secrétariat de casting est disponible sur WhatsApp pour vous guider en direct dans vos formalités d'inscription.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/243831700110"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-forest-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-forest-500 transition-colors flex items-center gap-1.5 shrink-0 shadow shadow-forest-600/10"
            id="faq-whatsapp-btn"
          >
            <span>WhatsApp Direct</span>
          </a>
        </div>

      </div>
    </section>
  );
}
