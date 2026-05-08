"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function LocationCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0f0f17] border border-white/[0.07] rounded-2xl p-8 flex flex-col justify-center items-center shadow-xl relative overflow-hidden transition-all duration-500 hover:border-white/[0.1] group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Map Pin Icon */}
      <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      <h3 className="text-lg font-bold font-heading text-[#f1f0f5] mb-2">Ahmedabad, India</h3>
      
      {/* Clock */}
        <div className="flex items-center gap-2 text-[#7a7a8c] font-mono text-sm bg-white/[0.03] px-4 py-2 rounded-full border border-white/[0.06] mt-4">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        {time || "Loading time..."} (IST)
      </div>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 md:mt-32 mb-8 md:mb-16 px-4 md:px-8">
      <div className="flex flex-col items-center text-center mb-8 md:mb-16">
        <h2 className="text-2xl font-bold font-heading text-[#f1f0f5] tracking-tight mb-3">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Connect</span>
        </h2>
        <p className="text-[#7a7a8c] font-[family-name:var(--font-jakarta)] text-xs max-w-sm mx-auto">
          Send a quick message or check out my local time.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-4xl mx-auto">
        {/* Left: Location Map Card */}
        <div className="w-full lg:w-1/2 min-h-[300px]">
          <LocationCard />
        </div>

        {/* Right: Compact Contact Form */}
        <div className="w-full lg:w-1/2">
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="w-full h-full bg-[#0f0f17] border border-white/[0.07] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-500 hover:border-white/[0.1]"
          >
            <div className="flex flex-col gap-4 mb-6 flex-grow">
              <input 
                required
                id="name"
                type="text" 
                placeholder="Name"
                className="w-full bg-[#0a0a12] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f1f0f5] placeholder:text-[#45454f] focus:outline-none focus:ring-1 focus:ring-indigo-400/30 transition-all font-sans text-sm"
              />
              <input 
                required
                id="email"
                type="email" 
                placeholder="Email Address"
                className="w-full bg-[#0a0a12] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f1f0f5] placeholder:text-[#45454f] focus:outline-none focus:ring-1 focus:ring-indigo-400/30 transition-all font-sans text-sm"
              />
              <textarea 
                required
                id="message"
                rows={3}
                placeholder="Your message..."
                className="w-full bg-[#0a0a12] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f1f0f5] placeholder:text-[#45454f] focus:outline-none focus:ring-1 focus:ring-indigo-400/30 transition-all font-sans resize-none text-sm flex-grow"
              />
            </div>

            <button 
              type="submit"
              disabled={status !== "idle"}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold font-sans rounded-xl py-3 transition-all hover:opacity-90 hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2 text-sm tracking-wide"
            >
              {status === "idle" && (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
              {status === "submitting" && (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              )}
              {status === "success" && (
                <>
                  Sent!
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
