import { motion } from 'motion/react';
import { Target, Eye, CheckCircle2, Award, Shield, Zap, MapPin, ShieldCheck, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 dark:bg-brand-navy transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920"
            alt="Modern Architecture"
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-brand-navy via-transparent to-white dark:to-brand-navy" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-8">
                  Our Legacy
                </span>
                <h1 className="font-serif text-6xl md:text-8xl font-bold text-brand-blue dark:text-white mb-10 leading-[0.9] tracking-tighter">
                  Excellence <br />
                  <span className="text-gradient-gold italic">In Every Detail</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-12 font-light">
                  Ringbelt Real Estate Agents was established to redefine the property landscape in Nyeri. We don't just manage buildings; we curate lifestyles, protect multi-generational investments, and provide a sanctuary for those who value the finer things in life.
                </p>
                <div className="grid grid-cols-2 gap-12 border-t border-slate-100 dark:border-white/5 pt-12">
                  <div>
                    <div className="text-5xl font-serif font-bold text-brand-blue dark:text-brand-gold mb-2">12+</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-widest font-bold">Years of Excellence</div>
                  </div>
                  <div>
                    <div className="text-5xl font-serif font-bold text-brand-blue dark:text-brand-gold mb-2">250+</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-widest font-bold">Premium Assets</div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 rounded-[4rem] overflow-hidden shadow-3xl aspect-[4/5]"
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
                  alt="Premium Real Estate"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent" />
              </motion.div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl" />
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-32 bg-slate-50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-6 block">The Ringbelt Advantage</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-8">Why Discerning Clients <br /> Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Unmatched Local Intelligence',
                desc: 'We possess a granular understanding of Nyeri\'s neighborhoods, from the quiet suburbs of Mweiga to the bustling CBD. This data-driven insight ensures your assets are always positioned for maximum yield.',
                icon: MapPin
              },
              {
                title: 'High-Touch Management',
                desc: 'Our management style is proactive, not reactive. We anticipate maintenance needs and tenant concerns before they become issues, preserving the long-term value of your property.',
                icon: ShieldCheck
              },
              {
                title: 'Elite Marketing Network',
                desc: 'Your property isn\'t just listed; it\'s showcased. We leverage a high-net-worth network and premium digital marketing to find the right tenants and buyers faster than anyone else.',
                icon: TrendingUp
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-white dark:bg-white/5 rounded-[3rem] shadow-xl border border-slate-100 dark:border-white/5 group hover:bg-brand-blue transition-all duration-500"
              >
                <div className="w-20 h-20 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-gold transition-colors">
                  <item.icon className="text-brand-gold w-10 h-10 group-hover:text-brand-blue transition-colors" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brand-blue dark:text-white mb-6 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Our Methodology</span>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-12">A Seamless Path to <br /> <span className="italic font-normal text-brand-gold">Asset Growth</span></h2>
              
              <div className="space-y-12">
                {[
                  { step: '01', title: 'Consultation', desc: 'We begin by understanding your specific goals, whether it\'s passive income or capital appreciation.' },
                  { step: '02', title: 'Strategy', desc: 'We develop a bespoke management or sales plan tailored to your property\'s unique profile.' },
                  { step: '03', title: 'Execution', desc: 'Our team handles every detail with precision, from marketing to legal compliance.' },
                  { step: '04', title: 'Optimization', desc: 'Continuous monitoring and reporting to ensure your investment is performing at its peak.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="font-serif text-4xl font-bold text-brand-gold/30 group-hover:text-brand-gold transition-colors">{item.step}</span>
                    <div>
                      <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-2">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl" alt="Office" />
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl" alt="Property" />
                </div>
                <div className="space-y-6">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl" alt="Building" />
                  <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl" alt="Meeting" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-brand-blue dark:bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-8">Our Philosophy</h2>
            <p className="text-white/60 text-lg font-light">
              We believe that real estate is more than just square footage. It's about potential, security, and the foundation of growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Our Mission',
                desc: 'To provide seamless, transparent, and professional real estate services that empower property owners and satisfy tenants through innovation and integrity.',
                icon: Target,
                color: 'bg-brand-gold'
              },
              {
                title: 'Our Vision',
                desc: 'To be the leading real estate agency in Kenya, recognized for setting the gold standard in property management and asset trading.',
                icon: Eye,
                color: 'bg-white'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 p-16 rounded-[3.5rem] border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all"
              >
                <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform`}>
                  <item.icon className="text-brand-blue w-10 h-10" />
                </div>
                <h3 className="font-serif text-4xl font-bold text-white mb-8">{item.title}</h3>
                <p className="text-white/60 text-xl leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Core Principles</span>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white leading-tight">
                The Pillars of <br />
                <span className="italic font-normal text-brand-gold">Our Success</span>
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
              Our values aren't just words on a wall; they are the DNA of every interaction we have with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', desc: 'Absolute transparency in every transaction.', icon: Shield },
              { title: 'Excellence', desc: 'Uncompromising quality in service delivery.', icon: Award },
              { title: 'Innovation', desc: 'Leveraging tech for modern real estate.', icon: Zap },
              { title: 'Reliability', desc: 'A partner you can trust with your future.', icon: CheckCircle2 },
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-slate-100 dark:border-white/5 group hover:bg-brand-gold transition-all duration-500"
              >
                <value.icon className="text-brand-gold dark:text-brand-gold w-12 h-12 mb-8 group-hover:text-brand-blue transition-colors" />
                <h3 className="font-serif text-2xl font-bold text-brand-blue dark:text-white mb-4 group-hover:text-brand-blue transition-colors">{value.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed group-hover:text-brand-blue/80 transition-colors">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Contact CTA */}
      <section className="py-32 bg-mesh">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-12">
            Ready to Experience <br />
            <span className="italic font-normal text-brand-gold">The Difference?</span>
          </h2>
          <div className="flex justify-center">
            <a href="/contact" className="bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue px-16 py-6 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl">
              Work With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
