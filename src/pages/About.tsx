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
                  <span className="text-gradient-brand italic font-normal">In Every Detail</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-12 font-light italic">
                  "Honesty, integrity and Professionalism are our pillars"
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12 font-light">
                  Ringbelt Agents Limited is a registered agency with the Estate Agents Registration Board (EARB) and a reputable real estate firm with over 14 years of experience in the industry. We specialize in property leasing, valuation, and management, offering tailored solutions to maximize returns for our clients.
                </p>
                <div className="grid grid-cols-2 gap-12 border-t border-slate-100 dark:border-white/5 pt-12">
                  <div>
                    <div className="text-5xl font-serif font-bold text-brand-blue dark:text-brand-red mb-2">14+</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-widest font-bold">Years of Trust</div>
                  </div>
                  <div>
                    <div className="text-5xl font-serif font-bold text-brand-blue dark:text-brand-red mb-2">230+</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-widest font-bold">Properties Managed</div>
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
                title: 'Proven Market Record',
                desc: 'Achieving an industry-leading 97.6% occupancy rate for all properties under our care. Our prompt monthly payment cycle ensures financial stability for every property owner.',
                icon: Award
              },
              {
                title: 'Dedicated Team',
                desc: 'Skilled agents with in-depth local knowledge and a commitment to personalized service tailored to your unique property goals.',
                icon: ShieldCheck
              },
              {
                title: 'Aggressive Marketing',
                desc: 'Access to a strong network of premium buyers, tenants, and investors, reducing vacancy periods and maximizing your asset\'s visibility.',
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
                  { step: '01', title: 'Consultation', desc: 'Initial meeting to understand your goals and current property portfolio.' },
                  { step: '02', title: 'Assessment', desc: 'In-depth evaluation of your property\'s potential and market positioning.' },
                  { step: '03', title: 'Customized Plan', desc: 'A tailored strategy for leasing, management, or advisory services.' },
                  { step: '04', title: 'Execution', desc: 'Full-service handling of all operations while keeping you informed with transparent reporting.' },
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
