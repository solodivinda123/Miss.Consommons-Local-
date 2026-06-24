import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Général",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setFeedbackMsg("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    setStatus("sending");
    
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFeedbackMsg("Votre message a été transmis avec succès. Le secrétariat vous recontactera sous 48h.");
      setFormData({ name: "", email: "", subject: "Général", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      
      {/* Decorative Blur Background circles */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Mail className="w-4 h-4" />
            <span>Formuler un Message Direct</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Contactez l'Organisation
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-forest-500 mx-auto rounded" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Presse, demandes de sponsoring, proposition de partenariat média ou question spécifique ? Remplissez notre formulaire, notre bureau de Bandalungwa vous répondra rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left Info Columns */}
          <div className="lg:col-span-5 bg-forest-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between space-y-8 border border-forest-900 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl font-serif font-bold text-white">Bureau National</h3>
              <p className="text-stone-300 text-sm leading-relaxed font-sans">
                N'hésitez pas à nous rendre visite ou à nous appeler directement pour toute consultation d'envergure.
              </p>
            </div>

            {/* Info details */}
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/10 text-gold-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white">Adresse Physique</p>
                  <p className="text-stone-300 mt-0.5">2732; Av Inga Q/ Adoula C/ Bandalungwa, Kinshasa, RDC</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/10 text-gold-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white">Secrétariat WhatsApp</p>
                  <p className="text-stone-300 mt-0.5">
                    +243 830 969 818<br />
                    +243 831 700 110
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/10 text-gold-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white">E-mail de Contact</p>
                  <p className="text-stone-300 mt-0.5">lanbanopro@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Micro quote */}
            <div className="pt-6 border-t border-forest-900/60 relative z-10 text-xs text-gold-400/80 font-mono">
              Consommer Local, c'est préserver notre futur.
            </div>

          </div>

          {/* Right Contact Form Card */}
          <div className="lg:col-span-7 bg-stone-900/40 rounded-3xl p-8 sm:p-10 border border-stone-800 shadow-sm flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-stone-300 block">Nom Complet *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Sarah Mwamba"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-800 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-white text-sm outline-none transition-all bg-stone-950"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-stone-300 block">Adresse E-mail *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: sarah@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-800 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-white text-sm outline-none transition-all bg-stone-950"
                  />
                </div>
              </div>

              {/* Subject dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-stone-300 block">Objet du Message</label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-800 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-white text-sm outline-none transition-all bg-stone-950"
                >
                  <option value="Général">Renseignement Général</option>
                  <option value="Casting">Inscription & Casting</option>
                  <option value="Sponsoring">Devenir Sponsor / Partenaire</option>
                  <option value="Presse">Demande Presse / Interview</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-stone-300 block">Votre Message *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Écrivez votre message ici de manière détaillée..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-800 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 text-white text-sm outline-none transition-all bg-stone-950"
                />
              </div>

              {/* Status Indicator Alerts */}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-200" role="alert">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-400" />
                  <p className="font-medium">{feedbackMsg}</p>
                </div>
              )}

              {status === "success" && (
                <div className="p-4 rounded-xl bg-forest-950/40 border border-forest-500/20 flex items-start gap-2.5 text-xs text-forest-200" role="alert">
                  <CheckCircle className="w-4.5 h-4.5 shrink-0 text-forest-400" />
                  <p className="font-medium">{feedbackMsg}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>{status === "sending" ? "Transmission en cours..." : "Transmettre le Message"}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
