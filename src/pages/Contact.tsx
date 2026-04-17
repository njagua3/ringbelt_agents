import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, Facebook, Music } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialLinks = [
    { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61567743868381', label: 'Facebook' },
    { Icon: Music, href: 'https://vm.tiktok.com/ZS9LqxarPWbgP-EG1RH/', label: 'TikTok' },
  ];

  return (
    <div className="pt-24 pb-20 dark:bg-brand-navy min-h-screen transition-colors duration-500">
      {/* Header */}
      <section className="relative py-32 overflow-hidden bg-brand-blue dark:bg-brand-navy transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1920"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 dark:from-brand-navy/80 via-transparent to-brand-blue dark:to-brand-navy" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Get In Touch</span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-10 leading-none tracking-tighter">
              Let's Start A <br />
              <span className="text-gradient-gold italic">Conversation</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're looking for your next home or a strategic investment, our experts are ready to guide you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-blue dark:text-white mb-12">Contact Details</h2>
              <div className="space-y-10">
                {[
                  { icon: Phone, title: 'Call Us', details: ['0707 046 253', '0715 324 620'] },
                  { icon: Mail, title: 'Email Us', details: ['ringbelt2011@gmail.com'] },
                  { icon: MapPin, title: 'Our Offices', details: [
                    'Nyeri (H.O): Umoja Chambers, 1st Flr, Rm 4 (Opp. Mathari Stage)',
                    'Murang\'a: Waguta Plaza, Uhuru Highway'
                  ] },
                  { icon: Clock, title: 'Office Hours', details: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 bg-brand-gold/10 dark:bg-brand-red/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors duration-500">
                      <item.icon className="text-brand-gold group-hover:text-white transition-colors duration-500" size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-blue dark:text-brand-red mb-2 uppercase tracking-widest text-[10px]">{item.title}</h4>
                      {item.details.map((detail, j) => (
                        <p key={j} className="text-slate-600 dark:text-slate-400 font-light text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media links */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-brand-blue dark:text-white">Follow Our Community</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 group shadow-lg"
                  >
                    <Icon size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-brand-blue dark:bg-white/5 p-12 rounded-[3.5rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="font-serif text-2xl font-bold mb-6">Concierge Chat</h3>
              <p className="text-white/60 text-lg mb-10 font-light leading-relaxed">Need immediate assistance? Connect with our luxury concierge on WhatsApp.</p>
              <a
                href="https://wa.me/254707046253"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 bg-[#25D366] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl"
              >
                <MessageCircle size={22} /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="glass dark:glass-dark p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white/10 relative overflow-hidden">
              <h2 className="font-serif text-4xl font-bold text-brand-blue dark:text-white mb-12">Send A Message</h2>
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="text-brand-gold w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-brand-blue dark:text-white mb-4">Message Received</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-light">Thank you for reaching out. Our team will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-blue dark:text-brand-gold uppercase tracking-[0.2em] ml-2">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-8 py-5 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-brand-blue dark:text-white"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-blue dark:text-brand-gold uppercase tracking-[0.2em] ml-2">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full px-8 py-5 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-brand-blue dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-brand-blue dark:text-brand-gold uppercase tracking-[0.2em] ml-2">Inquiry Type</label>
                    <select className="w-full px-8 py-5 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all appearance-none text-brand-blue dark:text-white">
                      <option className="bg-white dark:bg-brand-navy">Property Inquiry</option>
                      <option className="bg-white dark:bg-brand-navy">Property Management</option>
                      <option className="bg-white dark:bg-brand-navy">Asset Advisory</option>
                      <option className="bg-white dark:bg-brand-navy">Other</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-brand-blue dark:text-brand-gold uppercase tracking-[0.2em] ml-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-8 py-5 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all resize-none text-brand-blue dark:text-white"
                      placeholder="How can we assist you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue py-6 rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-2xl"
                  >
                    Send Message <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="h-[600px] rounded-[4rem] overflow-hidden shadow-3xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.8794324178475!2d36.9472!3d-0.4215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18285dfa0904fb31%3A0x6bba31d368e5454b!2sRingbelt%20Agents%20Limited!5e0!3m2!1sen!2ske!4v1713330000000!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
