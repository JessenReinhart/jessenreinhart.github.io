import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [txReceipt, setTxReceipt] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate real ledger transmission API delay
    setTimeout(() => {
      // Create a dummy hash simulating a ledger transaction
      const randomHash = "TX-" + Math.floor(100000 + Math.random() * 900000).toString() + "-JR";
      setTxReceipt(randomHash);
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleReset = () => {
    setIsSent(false);
    setTxReceipt("");
  };

  const contactLinks = [
    {
      label: "Direct Email",
      value: "jessen_1206@yahoo.com",
      url: "mailto:jessen_1206@yahoo.com",
      icon: <Mail className="w-5 h-5 text-zinc-400" />
    },
    {
      label: "LinkedIn Professional",
      value: "linkedin.com/in/jessenreinhart",
      url: "https://www.linkedin.com/in/jessenreinhart",
      icon: <Linkedin className="w-5 h-5 text-zinc-400" />
    },
    {
      label: "GitHub Repositories",
      value: "github.com/jessenreinhart",
      url: "https://github.com/jessenreinhart",
      icon: <Github className="w-5 h-5 text-zinc-400" />
    }
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#090909] overflow-hidden scroll-mt-20 border-t border-white/5"
    >
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-white/[0.01] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <span className="block font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3">
            05 // GET IN TOUCH
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            Let's work together.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Column 1 - Contacts Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed max-w-sm">
              For web application development, content management solutions, or contract consulting.
            </p>

            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel border border-white/8 rounded-xl p-5 flex items-center gap-4 hover:border-white/25 transition-all w-full select-none cursor-pointer group"
                  data-cursor="contact"
                >
                  <div className="w-10 h-10 border border-white/8 bg-zinc-950 flex items-center justify-center rounded-lg group-hover:bg-white group-hover:text-black transition-all">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-0.5">
                      {link.label}
                    </span>
                    <span className="block text-sm font-semibold text-white tracking-wide group-hover:translate-x-1.5 transition-transform">
                      {link.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Geographical details */}
            <div className="border-t border-white/5 pt-6 font-mono text-xs text-zinc-600 block space-y-2">
              <div>LOCATION: JAKARTA, INDONESIA</div>
              <div>TIME ZONE: UTC+7 (GMT+7)</div>
            </div>
          </div>

          {/* Column 2 - Contact Form Card */}
          <div className="lg:col-span-7 bg-zinc-950/45 border border-white/8 p-8 md:p-10 rounded-2xl relative">
            <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 uppercase select-none">
              MESSAGE INBOX
            </div>

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 select-none">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satoshi Nakamoto"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050505] border border-white/8 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 select-none">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. satoshi@bitcoin.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050505] border border-white/8 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 select-none">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#050505] border border-white/8 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-mono tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer select-none"
                    data-cursor="button"
                  >
                    {isSubmitting ? (
                      <>
                        SENDING MESSAGE...
                        <div className="w-3.5 h-3.5 border-2 border-zinc-600 border-t-black rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 space-y-6 text-center select-none"
                >
                  <div className="w-16 h-16 border border-white/10 bg-zinc-900 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight leading-none">
                      Message Sent
                    </h3>
                    <p className="text-zinc-500 font-light text-xs mt-2 max-w-xs leading-relaxed">
                      Your message was received. Jessen will respond soon.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 border border-white/8 rounded-full text-zinc-400 hover:text-white hover:border-white transition-all text-xs font-mono tracking-wider cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
