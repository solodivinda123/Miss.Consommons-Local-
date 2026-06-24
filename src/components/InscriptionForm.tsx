import React, { useState, useEffect } from "react";
import {
  User,
  GraduationCap,
  Sparkles,
  FileDown,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Upload,
  Heart,
  CheckCircle2,
  Trash2,
  Lock,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function InscriptionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Identité
    fullName: "",
    stageName: "",
    dateOfBirth: "",
    age: "",
    placeOfBirth: "",
    nationality: "Congolaise",
    otherNationality: "",
    provinceOfOrigin: "",
    municipalityOfResidence: "",
    fullAddress: "",
    phone: "",
    whatsapp: "",
    email: "",
    size: "",
    chest: "",
    waist: "",
    hip: "",
    shoeSize: "",

    // Step 2: Parcours & Profil
    education: "",
    profession: "",
    languages: [] as string[],
    tiktok: "",
    instagram: "",
    facebook: "",
    competition: "Non",
    competitionDetails: "",

    // Step 3: Engagement "Consommons Local"
    motivation: "",
    projectTitle: "",
    problemToSolve: "",
    solution: "",
    prizeUsage: "",
    product1: "",
    product2: "",
    product3: "",
    product4: "",
    product5: "",

    // Step 4: Documents Checkbox & Upload lists
    checkedDocs: [] as string[],
    uploadedFiles: [] as { name: string; size: string; type: string }[],

    // Step 5: Engagement & Signatures
    city: "",
    signatureDate: "",
    candidateSignature: "",
    parentSignature: ""
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-calculate age based on birth date relative to July 30, 2026
  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const targetDate = new Date("2026-07-30");
      let calculatedAge = targetDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = targetDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setFormData((prev) => ({ ...prev, age: calculatedAge.toString() }));
    }
  }, [formData.dateOfBirth]);

  const handleLanguageCheckbox = (lang: string) => {
    const exists = formData.languages.includes(lang);
    if (exists) {
      setFormData({ ...formData, languages: formData.languages.filter((l) => l !== lang) });
    } else {
      setFormData({ ...formData, languages: [...formData.languages, lang] });
    }
  };

  const handleDocCheck = (doc: string) => {
    const exists = formData.checkedDocs.includes(doc);
    if (exists) {
      setFormData({ ...formData, checkedDocs: formData.checkedDocs.filter((d) => d !== doc) });
    } else {
      setFormData({ ...formData, checkedDocs: [...formData.checkedDocs, doc] });
    }
  };

  // Simulate file upload local state
  const handleFileUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f: any) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: f.type
      }));
      setFormData({ ...formData, uploadedFiles: [...formData.uploadedFiles, ...newFiles] });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData({ ...formData, uploadedFiles: formData.uploadedFiles.filter((_, i) => i !== index) });
  };

  // Step validation
  const validateStep = (): boolean => {
    const errors: string[] = [];

    if (step === 1) {
      if (!formData.fullName) errors.push("Nom complet est requis.");
      if (!formData.dateOfBirth) errors.push("Date de naissance est requise.");
      if (!formData.placeOfBirth) errors.push("Lieu de naissance est requis.");
      if (!formData.provinceOfOrigin) errors.push("Province d'origine est requise.");
      if (!formData.municipalityOfResidence) errors.push("Commune de résidence est requise.");
      if (!formData.fullAddress) errors.push("Adresse complète est requise.");
      if (!formData.phone) errors.push("Numéro de téléphone est requis.");
      if (!formData.whatsapp) errors.push("Numéro WhatsApp est requis.");
      if (!formData.email) errors.push("Adresse e-mail est requise.");
      if (!formData.size) errors.push("Taille en centimètres est requise.");
    }

    if (step === 2) {
      if (!formData.education) errors.push("Niveau d'études / Diplôme est requis.");
      if (!formData.profession) errors.push("Profession ou activité actuelle est requise.");
      if (formData.languages.length === 0) errors.push("Veuillez sélectionner au moins une langue.");
    }

    if (step === 3) {
      if (!formData.motivation) errors.push("Motivation de candidature est requise.");
      if (formData.motivation.length > 300) errors.push("La motivation ne doit pas dépasser 300 caractères.");
      if (!formData.projectTitle) errors.push("Le titre de votre projet social est requis.");
      if (!formData.problemToSolve) errors.push("La description du problème à résoudre est requise.");
      if (!formData.solution) errors.push("La solution Made in Congo proposée est requise.");
      if (!formData.prizeUsage) errors.push("Veuillez préciser l'utilisation attendue du prix.");
      if (!formData.product1 || !formData.product2 || !formData.product3 || !formData.product4 || !formData.product5) {
        errors.push("Veuillez citer 5 produits Made in Congo que vous consommez.");
      }
    }

    if (step === 4) {
      // Validate that at least portraits and ID copy are attached
      if (formData.uploadedFiles.length === 0) {
        errors.push("Veuillez joindre au moins un document justificatif (Photo, carte d'identité).");
      }
    }

    if (step === 5) {
      if (!formData.city) errors.push("Lieu de signature requis.");
      if (!formData.signatureDate) errors.push("Date de signature requise.");
      if (!formData.candidateSignature) errors.push("Signature de la candidate requise.");
      const candidateAge = parseInt(formData.age || "0");
      if (candidateAge > 0 && candidateAge < 21 && !formData.parentSignature) {
        errors.push("La signature du parent/tuteur est obligatoire pour les moins de 21 ans.");
      }
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    } else {
      // scroll to error
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setFormErrors([]);
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitted(true);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  // Steps headers metadata
  const stepsMeta = [
    { num: 1, title: "Identité", icon: User },
    { num: 2, title: "Profil", icon: GraduationCap },
    { num: 3, title: "Engagement", icon: Compass },
    { num: 4, title: "Documents", icon: Upload },
    { num: 5, title: "Signature", icon: ShieldCheck }
  ];

  const StepIcon = stepsMeta[step - 1].icon;

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main headline banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Formulaire de Candidature Officiel</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Déposez Votre Candidature
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          <p className="text-stone-300 text-sm leading-relaxed">
            Devenez l'ambassadrice d'impact de votre commune pour promouvoir l'autonomie alimentaire, l'artisanat et la culture Made in Congo.
          </p>
        </div>

        {/* Stepper progress headers */}
        {!isSubmitted && (
          <div className="bg-stone-900/40 rounded-2xl border border-stone-800 p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-5 gap-2 relative">
              
              {/* Stepper Line Background */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-stone-800 -translate-y-1/2 z-0 hidden sm:block" />

              {stepsMeta.map((s, idx) => {
                const MetaIcon = s.icon;
                const isCompleted = step > s.num;
                const isActive = step === s.num;

                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                        isCompleted
                          ? "bg-forest-600 border-forest-600 text-white shadow-forest-600/10"
                          : isActive
                          ? "bg-gold-500 border-gold-500 text-stone-950 shadow-md font-bold scale-110"
                          : "bg-stone-900 border-stone-800 text-stone-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-xs font-mono">{s.num}</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold tracking-wide uppercase transition-colors hidden sm:block ${
                        isActive ? "text-gold-400" : isCompleted ? "text-forest-400" : "text-stone-500"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form area card */}
        <div className="bg-stone-900/40 rounded-3xl border border-stone-800 shadow-sm overflow-hidden p-6 sm:p-10">
          
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success Screen Card
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4 space-y-6 max-w-lg mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-forest-950/40 border border-forest-500/20 flex items-center justify-center text-forest-400 mx-auto animate-bounce shadow shadow-forest-600/5">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Candidature Enregistrée !
                  </h3>
                  <p className="text-forest-400 font-semibold text-xs uppercase tracking-wider font-mono">
                    ID Dossier: MACC/2026/KIN{Math.floor(1000 + Math.random() * 9000)}
                  </p>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed font-sans">
                  Félicitations, <strong>{formData.fullName}</strong> ! Votre dossier pour représenter la commune de <strong>{formData.municipalityOfResidence}</strong> a été transmis au comité de validation. Un e-mail de confirmation vient de vous être envoyé.
                </p>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-left space-y-2 text-xs text-stone-400">
                  <p className="font-bold text-stone-200 uppercase tracking-widest text-[9px] font-mono">Prochaines Étapes :</p>
                  <p>1. Validation de la conformité administrative par notre secrétariat de Gombe sous 72h.</p>
                  <p>2. Invitation formelle par SMS/WhatsApp pour l'épreuve écrite de casting (Phase 2).</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                      setFormData({
                        fullName: "", stageName: "", dateOfBirth: "", age: "", placeOfBirth: "", nationality: "Congolaise",
                        otherNationality: "", provinceOfOrigin: "", municipalityOfResidence: "", fullAddress: "", phone: "",
                        whatsapp: "", email: "", size: "", chest: "", waist: "", hip: "", shoeSize: "", education: "",
                        profession: "", languages: [], tiktok: "", instagram: "", facebook: "", competition: "Non",
                        competitionDetails: "", motivation: "", projectTitle: "", problemToSolve: "", solution: "",
                        prizeUsage: "", product1: "", product2: "", product3: "", product4: "", product5: "",
                        checkedDocs: [], uploadedFiles: [], city: "", signatureDate: "", candidateSignature: "", parentSignature: ""
                      });
                    }}
                    className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-stone-950 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Nouvelle Inscription
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById("faq");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-3 rounded-xl border border-stone-250 hover:bg-stone-50 text-stone-600 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Consulter la FAQ
                  </button>
                </div>
              </motion.div>
            ) : (
              // Active Step Form Panel
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleFinalSubmit}
                className="space-y-8"
              >
                
                {/* Step indicator header inside card */}
                <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
                  <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-600">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Section {step} / 5</span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight">
                      {step === 1 && "Identité de la Candidate"}
                      {step === 2 && "Parcours & Profil Personnel"}
                      {step === 3 && "Engagement « Consommons Local » (Impact)"}
                      {step === 4 && "Documents Justificatifs & Photos"}
                      {step === 5 && "Déclaration sur l'Honneur & Signatures"}
                    </h3>
                  </div>
                </div>

                {/* Form Errors summary block */}
                {formErrors.length > 0 && (
                  <div className="p-5 rounded-2xl bg-red-50 border border-red-100 space-y-1.5" role="alert">
                    <p className="text-xs font-bold text-red-800 uppercase tracking-wider font-mono">Veuillez corriger les anomalies suivantes :</p>
                    <ul className="list-disc pl-5 text-xs text-red-700 leading-relaxed font-medium">
                      {formErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step Form Fields Router */}
                <div className="space-y-6">
                  
                  {/* STEP 1 FIELDS: Identité */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Nom complet *</label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Ex: Sarah Mwamba"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Nom de scène (si différent)</label>
                          <input
                            type="text"
                            value={formData.stageName}
                            onChange={(e) => setFormData({ ...formData, stageName: e.target.value })}
                            placeholder="Ex: Princess Sarah"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Date de naissance *</label>
                          <input
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Âge au 30/07/2026 (Calculé)</label>
                          <input
                            type="text"
                            readOnly
                            value={formData.age ? `${formData.age} ans` : "En attente de date..."}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-500 text-sm outline-none bg-stone-100 font-semibold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Lieu de naissance *</label>
                          <input
                            type="text"
                            required
                            value={formData.placeOfBirth}
                            onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                            placeholder="Ex: Gombe, Kinshasa"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Nationalité *</label>
                          <div className="flex items-center gap-4 py-2.5">
                            <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                              <input
                                type="radio"
                                name="nationality"
                                value="Congolaise"
                                checked={formData.nationality === "Congolaise"}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="text-gold-500 focus:ring-gold-500/20"
                              />
                              <span>Congolaise</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                              <input
                                type="radio"
                                name="nationality"
                                value="Autre"
                                checked={formData.nationality === "Autre"}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="text-gold-500 focus:ring-gold-500/20"
                              />
                              <span>Autre</span>
                            </label>
                          </div>
                        </div>

                        {formData.nationality === "Autre" && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-stone-600 block">Précisez si autre</label>
                            <input
                              type="text"
                              value={formData.otherNationality}
                              onChange={(e) => setFormData({ ...formData, otherNationality: e.target.value })}
                              placeholder="Indiquez votre nationalité"
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Province d'origine *</label>
                          <input
                            type="text"
                            required
                            value={formData.provinceOfOrigin}
                            onChange={(e) => setFormData({ ...formData, provinceOfOrigin: e.target.value })}
                            placeholder="Ex: Kongo-Central"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Commune de résidence à Kinshasa *</label>
                          <input
                            type="text"
                            required
                            value={formData.municipalityOfResidence}
                            onChange={(e) => setFormData({ ...formData, municipalityOfResidence: e.target.value })}
                            placeholder="Ex: Gombe, Ngaliema, Bandalungwa..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-600 block">Adresse complète *</label>
                        <textarea
                          required
                          rows={2}
                          value={formData.fullAddress}
                          onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                          placeholder="Numéro, Avenue, Quartier, Références..."
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Téléphone *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Ex: +243 890 000 00"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="Numéro WhatsApp actif"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Adresse e-mail *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Ex: sarah@gmail.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Taille (cm) *</label>
                          <input
                            type="number"
                            required
                            min={0}
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            placeholder="Ex: 175"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Poitrine (cm)</label>
                          <input
                            type="number"
                            min={0}
                            value={formData.chest}
                            onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                            placeholder="Ex: 85"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Taille tour (cm)</label>
                          <input
                            type="number"
                            min={0}
                            value={formData.waist}
                            onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                            placeholder="Ex: 60"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Hanche (cm)</label>
                          <input
                            type="number"
                            min={0}
                            value={formData.hip}
                            onChange={(e) => setFormData({ ...formData, hip: e.target.value })}
                            placeholder="Ex: 90"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2 sm:col-span-1">
                          <label className="text-xs font-semibold text-stone-600 block">Pointure</label>
                          <input
                            type="text"
                            value={formData.shoeSize}
                            onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
                            placeholder="Ex: 39"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 FIELDS: Parcours & Profil */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Niveau d'études / Diplôme obtenues *</label>
                          <input
                            type="text"
                            required
                            value={formData.education}
                            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                            placeholder="Ex: Graduée en Agronomie, Diplôme d'État..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Profession / Activité actuelle *</label>
                          <input
                            type="text"
                            required
                            value={formData.profession}
                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                            placeholder="Ex: Étudiante, Micro-entrepreneuse..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>

                      {/* Languages check box */}
                      <div className="space-y-2 border-t border-stone-100 pt-4">
                        <label className="text-xs font-semibold text-stone-600 block">Langues parlées couramment *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                          {["Lingala", "Swahili", "Tshiluba", "Kikongo", "Français", "Anglais"].map((lang) => (
                            <label
                              key={lang}
                              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer text-sm text-stone-700"
                            >
                              <input
                                type="checkbox"
                                checked={formData.languages.includes(lang)}
                                onChange={() => handleLanguageCheckbox(lang)}
                                className="text-gold-500 focus:ring-gold-500/10 rounded"
                              />
                              <span>{lang}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Social handles */}
                      <div className="space-y-3 border-t border-stone-100 pt-4">
                        <label className="text-xs font-semibold text-stone-600 block">Liens vers vos réseaux sociaux</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-mono text-stone-400">TikTok</label>
                            <input
                              type="text"
                              value={formData.tiktok}
                              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                              placeholder="@votre_username"
                              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-stone-800 text-sm outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-mono text-stone-400">Instagram</label>
                            <input
                              type="text"
                              value={formData.instagram}
                              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                              placeholder="@votre_username"
                              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-stone-800 text-sm outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-mono text-stone-400">Facebook</label>
                            <input
                              type="text"
                              value={formData.facebook}
                              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                              placeholder="Lien vers votre profil"
                              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-stone-800 text-sm outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Previous pageants */}
                      <div className="space-y-1.5 border-t border-stone-100 pt-4">
                        <label className="text-xs font-semibold text-stone-600 block">Avez-vous déjà participé à un concours de beauté ou d'éloquence ?</label>
                        <div className="flex items-center gap-4 py-1.5">
                          <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                            <input
                              type="radio"
                              name="competition"
                              value="Oui"
                              checked={formData.competition === "Oui"}
                              onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                              className="text-gold-500 focus:ring-gold-500/20"
                            />
                            <span>Oui</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                            <input
                              type="radio"
                              name="competition"
                              value="Non"
                              checked={formData.competition === "Non"}
                              onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                              className="text-gold-500 focus:ring-gold-500/20"
                            />
                            <span>Non</span>
                          </label>
                        </div>

                        {formData.competition === "Oui" && (
                          <div className="space-y-1.5 pt-2">
                            <label className="text-xs font-semibold text-stone-600 block">Si oui, le(s)quel(s) et quel rang avez-vous obtenu ?</label>
                            <textarea
                              rows={2}
                              value={formData.competitionDetails}
                              onChange={(e) => setFormData({ ...formData, competitionDetails: e.target.value })}
                              placeholder="Ex: Concours national d'art oratoire 2023 - Finaliste..."
                              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-stone-800 text-sm outline-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 FIELDS: Engagement "Consommons Local" */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-600 block">Pourquoi souhaitez-vous devenir Ambassadrice de la Consommation Locale ? *</label>
                        <textarea
                          required
                          rows={3}
                          maxLength={300}
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          placeholder="Écrivez ici en 3 lignes maximum (Maximum 300 caractères)"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-stone-850 text-sm outline-none"
                        />
                        <div className="flex justify-end">
                          <span className="text-[10px] font-mono text-stone-400">
                            {formData.motivation.length} / 300 caractères
                          </span>
                        </div>
                      </div>

                      {/* Social project */}
                      <div className="border-t border-stone-100 pt-4 space-y-4">
                        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">Votre Projet Social « Impact local »</h4>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Titre de votre projet *</label>
                          <input
                            type="text"
                            required
                            value={formData.projectTitle}
                            onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                            placeholder="Ex: Valorisation des résidus de manioc à Masina"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 text-sm outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Problème concret à résoudre dans votre commune de Kinshasa *</label>
                          <textarea
                            required
                            rows={2}
                            value={formData.problemToSolve}
                            onChange={(e) => setFormData({ ...formData, problemToSolve: e.target.value })}
                            placeholder="Décrivez brièvement le défi local (Ex: Pertes de récoltes, manque de valorisation...)"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Votre Solution « Made in Congo » proposée *</label>
                          <textarea
                            required
                            rows={2}
                            value={formData.solution}
                            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            placeholder="Décrivez votre idée innovante pour valoriser les ressources locales..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Si vous gagnez, comment utiliserez-vous le financement du Prix ? *</label>
                          <textarea
                            required
                            rows={2}
                            value={formData.prizeUsage}
                            onChange={(e) => setFormData({ ...formData, prizeUsage: e.target.value })}
                            placeholder="Décrivez l'impact concret de cette subvention sur votre projet..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none"
                          />
                        </div>
                      </div>

                      {/* Made in Congo products */}
                      <div className="border-t border-stone-100 pt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">Vos habitude de consommation</h4>
                          <p className="text-xs text-stone-400 mt-1">Citez précisément 5 produits d'origine congolaise que vous consommez régulièrement :</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400">Produit 1 *</label>
                            <input
                              type="text"
                              required
                              value={formData.product1}
                              onChange={(e) => setFormData({ ...formData, product1: e.target.value })}
                              placeholder="Manioc"
                              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400">Produit 2 *</label>
                            <input
                              type="text"
                              required
                              value={formData.product2}
                              onChange={(e) => setFormData({ ...formData, product2: e.target.value })}
                              placeholder="Café de Kalehe"
                              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400">Produit 3 *</label>
                            <input
                              type="text"
                              required
                              value={formData.product3}
                              onChange={(e) => setFormData({ ...formData, product3: e.target.value })}
                              placeholder="Miel du Pool"
                              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400">Produit 4 *</label>
                            <input
                              type="text"
                              required
                              value={formData.product4}
                              onChange={(e) => setFormData({ ...formData, product4: e.target.value })}
                              placeholder="Piment N'sele"
                              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400">Produit 5 *</label>
                            <input
                              type="text"
                              required
                              value={formData.product5}
                              onChange={(e) => setFormData({ ...formData, product5: e.target.value })}
                              placeholder="Chikwangue"
                              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 FIELDS: Documents checkboxes & uploads */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-stone-600 block">Cochez les pièces prêtes à joindre :</label>
                        <div className="space-y-2">
                          {[
                            "Photo portrait couleur sans filtre, unie background",
                            "Photo en pied dans une tenue simple de présentation",
                            "Vidéo de présentation de 2 minutes maximum",
                            "Copie certifiée de pièce d'identité (carte d'électeur/passeport)",
                            "Autorisation parentale légalisée (uniquement si moins de 21 ans)"
                          ].map((docName) => (
                            <label
                              key={docName}
                              className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-150 hover:bg-stone-50 cursor-pointer text-xs text-stone-700"
                            >
                              <input
                                type="checkbox"
                                checked={formData.checkedDocs.includes(docName)}
                                onChange={() => handleDocCheck(docName)}
                                className="text-gold-500 rounded mt-0.5"
                              />
                              <span className="leading-tight font-medium">{docName}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Drag & drop file area */}
                      <div className="border-t border-stone-100 pt-4 space-y-4">
                        <label className="text-xs font-semibold text-stone-600 block">Joindre les fichiers justificatifs *</label>
                        
                        <div className="border-2 border-dashed border-stone-250 rounded-2xl p-8 text-center bg-stone-50/50 hover:bg-stone-50 hover:border-gold-400 transition-all relative">
                          <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,application/pdf,video/mp4"
                            onChange={handleFileUploadSimulate}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                          <p className="text-sm font-semibold text-stone-800">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</p>
                          <p className="text-xs text-stone-400 mt-1">Formats acceptés: JPG, PNG, PDF, MP4. Taille max par fichier: 15 Mo.</p>
                        </div>

                        {/* Uploaded files list */}
                        {formData.uploadedFiles.length > 0 && (
                          <div className="space-y-2 mt-4">
                            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider font-mono">Fichiers rattachés ({formData.uploadedFiles.length}) :</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {formData.uploadedFiles.map((f, idx) => (
                                <div key={idx} className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs shadow-xs">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <div className="truncate">
                                      <p className="font-semibold text-stone-800 truncate">{f.name}</p>
                                      <p className="text-[10px] text-stone-400">{f.size}</p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(idx)}
                                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                          <span>Frais de traitement du dossier :</span>
                        </div>
                        <span className="font-bold font-mono">GRATUIT (Édition 2026)</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 5 FIELDS: Signature & final commitment */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed font-sans space-y-2">
                        <p className="font-bold text-stone-850">Déclaration d'Engagement Moral :</p>
                        <p>
                          Je certifie sur l'honneur que toutes les informations fournies dans ce formulaire de candidature sont exactes et véridiques. J'accepte sans réserve le règlement intérieur du concours national Miss Consommons Local. J'autorise expressément le Comité National de Gombe à utiliser mon image à des fins de promotion éthique et d'éducation civique.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Fait à *</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Ex: Kinshasa, Gombe"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Date du jour *</label>
                          <input
                            type="date"
                            required
                            value={formData.signatureDate}
                            onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none bg-stone-50/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-600 block">Signature de la Candidate (Saisir votre nom complet) *</label>
                          <textarea
                            required
                            rows={2}
                            value={formData.candidateSignature}
                            onChange={(e) => setFormData({ ...formData, candidateSignature: e.target.value })}
                            placeholder="Nom complet servant de signature numérique"
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none"
                          />
                        </div>

                        {/* Show parent signature ONLY if calculated age is < 21 */}
                        {parseInt(formData.age || "25") < 21 ? (
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-stone-600 block text-red-700">Signature du Parent/Tuteur légal (Obligatoire moins de 21 ans) *</label>
                            <textarea
                              required
                              rows={2}
                              value={formData.parentSignature}
                              onChange={(e) => setFormData({ ...formData, parentSignature: e.target.value })}
                              placeholder="Nom complet du représentant légal"
                              className="w-full px-4 py-2.5 rounded-xl border border-red-200 focus:border-red-500 text-sm outline-none bg-red-50/10"
                            />
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-400 flex items-center gap-2 h-fit self-end">
                            <Lock className="w-4 h-4 text-stone-400" />
                            <span>Contreseing parental non requis (Âge ≥ 21 ans)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer buttons navigators */}
                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-xl border border-stone-250 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continuer</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-700/10"
                      id="registration-submit-btn"
                    >
                      <ShieldCheck className="w-4.5 h-4.5" />
                      <span>Déposer le Dossier d'Impact</span>
                    </button>
                  )}
                </div>

              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
