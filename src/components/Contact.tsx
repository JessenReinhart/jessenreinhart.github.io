import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/jessenreinharts@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      });
      if (res.ok) {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => { setIsSent(false); };

  const contactLinks = [
    { label: t.contactEmail, value: "jessenreinharts@gmail.com", url: "mailto:jessenreinharts@gmail.com", icon: <Mail className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} /> },
    { label: t.contactLinkedin, value: "linkedin.com/in/jessenreinhart", url: "https://www.linkedin.com/in/jessenreinhart", icon: <Linkedin className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} /> },
    { label: t.contactGithub, value: "github.com/jessenreinhart", url: "https://github.com/jessenreinhart", icon: <Github className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} /> },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20 border-t" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 text-left">
          <span className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>{t.contactSection}</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.contactTitle}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          <div className="lg:col-span-5 space-y-8 text-left">
            <p className="font-light text-base md:text-lg leading-relaxed max-w-sm" style={{ color: "var(--color-text-muted)" }}>{t.contactDesc}</p>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="glass-panel rounded-xl p-5 flex items-center gap-4 transition-all w-full select-none cursor-pointer group" data-cursor="contact">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg transition-all" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-card)" }}>{link.icon}</div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono tracking-wider uppercase mb-0.5" style={{ color: "var(--color-text-muted)" }}>{link.label}</span>
                    <span className="block text-sm font-semibold tracking-wide group-hover:translate-x-1.5 transition-transform" style={{ color: "var(--color-text-primary)" }}>{link.value}</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="pt-6 font-mono text-xs block space-y-2" style={{ borderTop: "1px solid var(--color-border-primary)", color: "var(--color-text-dim)" }}>
              <div>{t.contactLocation}</div>
              <div>{t.contactTimezone}</div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl relative glass-panel">
            <div className="absolute top-4 right-4 font-mono text-[9px] uppercase select-none" style={{ color: "var(--color-text-dim)" }}>{t.contactInbox}</div>
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest mb-2 select-none" style={{ color: "var(--color-text-muted)" }}>{t.contactName}</label>
                    <input type="text" required placeholder={t.contactNamePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest mb-2 select-none" style={{ color: "var(--color-text-muted)" }}>{t.contactEmailLabel}</label>
                    <input type="email" required placeholder={t.contactEmailPlaceholder} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest mb-2 select-none" style={{ color: "var(--color-text-muted)" }}>{t.contactMessage}</label>
                    <textarea required rows={4} placeholder={t.contactMessagePlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors resize-none" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }} />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-full font-bold text-xs font-mono tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer select-none" style={{ backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }} data-cursor="button">
                    {isSubmitting ? <>{t.contactSending}<div className="w-3.5 h-3.5 border-2 rounded-full animate-spin" style={{ borderColor: "var(--color-text-dim)", borderTopColor: "var(--color-bg-primary)" }} /></> : <>{t.contactSend}<Send className="w-3.5 h-3.5" /></>}
                  </button>
                </motion.form>
              ) : (
                <motion.div key="receipt" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-10 space-y-6 text-center select-none">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-card)" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "var(--color-text-primary)" }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.contactSent}</h3>
                    <p className="font-light text-xs mt-2 max-w-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{t.contactSentDesc}</p>
                  </div>
                  <button onClick={handleReset} className="px-6 py-2.5 rounded-full transition-all text-xs font-mono tracking-wider cursor-pointer" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}>{t.contactSendAnother}</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
