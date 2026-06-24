import React, { useState, useMemo } from "react";
import { Search, MapPin, Award, Filter, Calendar, Sparkles, BookOpen, X } from "lucide-react";
import { KINSHASA_COMMUNES } from "../data/communes";
import { Commune, Ambassadrice } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { loadSavedCrops, getCandidateCropStyle, CANDIDATE_CROP_DEFAULTS, CropData } from "../utils/imageCropper";
import CandidateCarousel from "./CandidateCarousel";

interface CommunesGridProps {
  initialYear?: string;
  onNavigate?: (view: string, year?: string) => void;
}

export default function CommunesGrid({ initialYear = "2026", onNavigate }: CommunesGridProps) {
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCommune, setActiveCommune] = useState<Commune | null>(null);

  // Dynamic cropping controls for 2026 candidate faces
  const [crops] = useState<Record<string, CropData>>(loadSavedCrops);

  const districts = ["All", "Lukunga", "Funa", "Mont-Amba", "Tshangu"];
  const years = ["2026", "2025", "2024"];

  // Filter logic
  const filteredCommunes = useMemo(() => {
    return KINSHASA_COMMUNES.filter((commune) => {
      // District check
      const matchesDistrict = selectedDistrict === "All" || commune.district === selectedDistrict;

      // Search check
      const ambassadrice = commune.ambassadrices[selectedYear];
      const matchesSearch =
        commune.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ambassadrice && ambassadrice.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ambassadrice && ambassadrice.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ambassadrice && ambassadrice.featuredProduct.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDistrict && matchesSearch;
    });
  }, [selectedDistrict, searchQuery, selectedYear]);

  // Handle active details
  const currentAmbassadrice = activeCommune ? activeCommune.ambassadrices[selectedYear] : null;

  return (
    <section id="ambassadrices" className="py-24 bg-stone-100/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Les Étoiles du Terroir Kinois</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Les 24 Communes &amp; Ambassadrices
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Parcourez la ville-province de Kinshasa à travers ses représentantes dévouées pour promouvoir le consommer local, l'excellence agricole, et le dynamisme entrepreneurial par quartier.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une commune, une ambassadrice, un produit ou projet..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-700 text-sm bg-stone-50/50 transition-all outline-none"
              />
            </div>

            {/* Year Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedYear === year
                      ? "bg-gold-500 text-stone-950 shadow"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{year}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* District Buttons Selector */}
          <div className="border-t border-stone-100 pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-stone-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Districts :</span>
            </span>
            {districts.map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  selectedDistrict === district
                    ? "bg-forest-900 border-forest-900 text-white shadow-sm"
                    : "bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900"
                }`}
              >
                {district === "All" ? "Tous les Districts" : `${district}`}
              </button>
            ))}
          </div>
        </div>



        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-mono text-stone-400">
            {filteredCommunes.length} commune{filteredCommunes.length > 1 ? "s" : ""} trouvée{filteredCommunes.length > 1 ? "s" : ""} pour l'édition {selectedYear}
          </p>
          {searchQuery || selectedDistrict !== "All" ? (
            <button
              onClick={() => { setSearchQuery(""); setSelectedDistrict("All"); }}
              className="text-xs font-semibold text-gold-600 hover:text-gold-700 underline focus:outline-none cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          ) : null}
        </div>

        {/* Communes Card Carousel & Grid */}
        <div className="mt-2">
          <CandidateCarousel
            communes={filteredCommunes}
            selectedYear={selectedYear}
            crops={crops}
            onCardClick={setActiveCommune}
          />
        </div>

        {/* Empty State */}
        {filteredCommunes.length === 0 && (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl mt-6 shadow-sm">
            <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-serif font-bold text-stone-800">Aucune commune ne correspond</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto mt-2">
              Nous n'avons trouvé aucune candidate pour "{searchQuery}" ou dans la région "{selectedDistrict}" pour l'édition {selectedYear}. Veuillez modifier vos critères de recherche.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedDistrict("All"); }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Tous les dossiers
            </button>
          </div>
        )}

        {/* Premium Detail Slide-over / Modal Dialog */}
        <AnimatePresence>
          {activeCommune && currentAmbassadrice && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCommune(null)}
                className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-stone-200 z-10 grid grid-cols-1 md:grid-cols-2"
              >
                {/* Close Button absolute */}
                <button
                  onClick={() => setActiveCommune(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-stone-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Visual side */}
                <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-stone-100 min-h-[300px]">
                  {(() => {
                    let displayImageUrl = currentAmbassadrice.imageUrl;
                    if (selectedYear === "2025") {
                      displayImageUrl = "https://civil-purple-cjpvsfcf.edgeone.app/2.jpg";
                    } else if (selectedYear === "2024") {
                      displayImageUrl = "https://incredible-turquoise-n7j8y6js.edgeone.app/3.jpg";
                    } else {
                      const isCandidateActive = currentAmbassadrice.status === "Candidate active" || !currentAmbassadrice.status;
                      if (isCandidateActive) {
                        displayImageUrl = "https://naughty-coffee-radk7s2v.edgeone.app/1.jpg";
                      }
                    }
                    return (
                      <img
                        src={displayImageUrl}
                        alt={currentAmbassadrice.name}
                        className="w-full h-full object-cover"
                        style={selectedYear === "2026" && currentAmbassadrice.imageUrl.includes("les_24_ambassadrices_group_1782295188623.jpg") ? getCandidateCropStyle(activeCommune.id, crops) : undefined}
                        referrerPolicy="no-referrer"
                      />
                    );
                  })()}
                  {/* Overlay grad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Absolute visual text overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-gold-500 text-stone-950 font-semibold uppercase">
                      Édition {selectedYear}
                    </span>
                    <h3 className="text-2xl font-serif font-bold tracking-tight">
                      {currentAmbassadrice.name}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm font-mono flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>Commune de {activeCommune.name} ({activeCommune.district})</span>
                    </p>
                  </div>
                </div>

                {/* Right detail text side */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    {/* Commune description */}
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">À propos de la commune</p>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">{activeCommune.description}</p>
                    </div>

                    <div className="h-px bg-stone-100" />

                    {/* Representative detailed metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Âge</p>
                        <p className="text-sm font-semibold text-stone-800">{currentAmbassadrice.age} ans</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Status</p>
                        <p className="text-sm font-semibold text-gold-700">{currentAmbassadrice.status || "Candidate active"}</p>
                      </div>
                    </div>

                    {/* Social Project Content */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Projet Social « Impact Local »</p>
                      <h4 className="text-base font-serif font-bold text-stone-900 leading-snug">
                        {currentAmbassadrice.projectTitle}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {currentAmbassadrice.projectDesc}
                      </p>
                    </div>

                    <div className="h-px bg-stone-100" />

                    {/* Featured Product details */}
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-700" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold">Produit Vedette du Terroir</span>
                      </div>
                      <p className="text-xs text-stone-700 font-semibold leading-relaxed">
                        {currentAmbassadrice.featuredProduct}
                      </p>
                    </div>

                    {selectedYear === "2026" && (
                      <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">Position sur l'affiche collective</p>
                        <div className="relative h-14 w-full rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
                          <img
                            src="https://muddy-purple-qdu9kf1t.edgeone.app/les_24_ambassadrices_group_1782295188623.jpg"
                            alt="Affiche collective"
                            className="w-full h-full object-cover opacity-60"
                            referrerPolicy="no-referrer"
                          />
                          <div
                            className="absolute w-5 h-5 border border-gold-500 bg-gold-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse flex items-center justify-center"
                            style={{
                              left: `${crops[activeCommune.id]?.x ?? CANDIDATE_CROP_DEFAULTS[activeCommune.id]?.x ?? 50}%`,
                              top: `${crops[activeCommune.id]?.y ?? CANDIDATE_CROP_DEFAULTS[activeCommune.id]?.y ?? 50}%`,
                            }}
                          >
                            <div className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Call to action direct support */}
                  <button
                    onClick={() => {
                      setActiveCommune(null);
                      onNavigate?.("inscription");
                    }}
                    className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Vous aussi, déposez votre projet !</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
