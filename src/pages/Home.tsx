import { motion } from 'motion/react';
import { ArrowRight, Building2, Star, Clock, MapPin, Users, Shield, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';

const features = [
  {
    title: 'Property Management',
    description: 'Professional oversight of your residential and commercial assets, ensuring maximum ROI and tenant satisfaction.',
    icon: Shield,
  },
  {
    title: 'Real Estate Sales',
    description: 'Expert guidance in buying and selling properties in Nyeri and beyond. We handle the complexity, you get the results.',
    icon: Star,
  },
  {
    title: 'Rental Services',
    description: 'Finding the perfect home or office space has never been easier. We match quality tenants with premium spaces.',
    icon: Users,
  },
];

const featuredProperties = [
  {
    id: 1,
    title: 'The Zenith Penthouse',
    location: 'Nyeri, Skuta',
    price: 'Ksh 45,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    category: 'Premium Properties',
  },
  {
    id: 2,
    title: 'Golden Gates Villa',
    location: 'Nyeri, King\'ong\'o',
    price: 'Ksh 85,000',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    category: 'Premium Properties',
  },
  {
    id: 3,
    title: 'Ringbelt Commercial Hub',
    location: 'Nyeri, CBD',
    price: 'Ksh 120,000',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    category: 'Commercial Spaces',
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden dark:bg-brand-navy">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1920"
            alt="Premium Real Estate"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/40 to-transparent dark:from-brand-navy/95 dark:via-brand-navy/60 dark:to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 mb-8 md:mb-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                  "Honesty, integrity and Professionalism are our pillars"
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-brand-gold w-4 h-4" />
                <span className="text-white/60 text-[9px] uppercase tracking-widest font-bold">EARB Registered Agency</span>
              </div>
            </motion.div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 md:mb-12 tracking-tighter">
              The Gold Standard <br />
              <span className="text-white italic">In Property Leasing</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-2xl mb-10 md:mb-16 leading-relaxed max-w-2xl font-light">
              Ringbelt Agents Limited: A registered agency with the Estate Agents Registration Board (EARB), carrying over 14 years of licensed excellence in property management, valuation, and advisory across Central Kenya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/properties"
                className="group relative overflow-hidden bg-brand-red text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-4 shadow-3xl hover:shadow-brand-red/40 active:scale-95"
              >
                <span className="relative z-10">View Listings</span>
                <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                to="/services"
                className="glass text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-base md:text-lg transition-all text-center active:scale-95 hover:bg-white/20"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-60">
          <div className="w-px h-24 bg-gradient-to-b from-brand-gold to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-white font-bold [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-brand-blue dark:bg-brand-navy py-20 border-y border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            {[
              { label: 'Properties Managed', value: '230+', icon: Building2 },
              { label: 'Occupancy Rate', value: '97.6%', icon: Users },
              { label: 'Years of Trust', value: '14+', icon: Clock },
              { label: 'Market Presence', value: 'Nyeri & Murang\'a', icon: MapPin },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-brand-gold mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Partner Logos / Trust Bar */}
          <div className="pt-20 border-t border-white/5">
            <p className="text-center text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold mb-12">Trusted by Leading Institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              {['KCB Bank', 'Equity Bank', 'NCBA', 'Absa', 'HF Group'].map((partner) => (
                <span key={partner} className="text-white font-serif text-2xl md:text-3xl font-bold tracking-tighter whitespace-nowrap">{partner}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-mesh relative dark:bg-brand-navy transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-8 leading-tight">
                Comprehensive <br />
                <span className="italic font-normal text-brand-gold">Asset Solutions</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                We don't just manage properties; we cultivate value. Our holistic approach to real estate ensures that every client receives personalized, high-impact service.
              </p>
            </div>
            <Link to="/services" className="group flex items-center gap-4 text-brand-blue dark:text-brand-gold font-bold text-lg">
              View All Services 
              <div className="w-12 h-12 rounded-full border border-brand-blue/20 dark:border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-blue transition-all">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="w-16 h-16 bg-brand-blue dark:bg-brand-gold rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-lg">
                  <feature.icon className="text-brand-gold dark:text-brand-blue w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-blue dark:text-white mb-6">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-light">{feature.description}</p>
                <div className="h-px w-12 bg-brand-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 bg-slate-50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Curated Selection</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-brand-blue dark:text-white mb-6">Featured Listings</h2>
              <p className="text-slate-600 dark:text-slate-400">Discover the most sought-after properties in Nyeri's prime locations.</p>
            </div>
            <Link to="/properties" className="bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl">
              Explore All Listings
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProperties.map((prop, i) => (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-transparent dark:border-white/5"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-brand-gold/90 backdrop-blur-md text-brand-blue px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {prop.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-brand-gold mb-3">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{prop.location}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-blue dark:text-white mb-6 group-hover:text-brand-gold transition-colors">{prop.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                    <span className="text-2xl font-bold text-brand-blue dark:text-brand-gold">{prop.price}<span className="text-sm font-normal text-slate-400">/mo</span></span>
                    <Link to="/contact" className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white dark:bg-brand-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Client Perspectives</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-8 leading-tight">
              A Legacy of <br /> <span className="italic font-normal text-brand-gold">Satisfied Owners</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Ringbelt's management style is effortless. I've had my commercial property in Nyeri CBD managed by them for 5 years with zero vacancies.",
                author: "Dr. James Kamau",
                role: "Commercial Property Owner",
                image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200"
              },
              {
                text: "Their advisory on asset valuation was eye-opening. They helped me reposition my portfolio for 15% higher returns in just one year.",
                author: "Sarah Wanjiku",
                role: "Real Estate Investor",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
              },
              {
                text: "Professionalism at its best. From the initial consultation to the final rental handshake, everything was documented and transparent.",
                author: "Mervyn Omondi",
                role: "Tenant & Business Owner",
                image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&q=80&w=200"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-white/5 p-12 rounded-[3rem] border border-slate-100 dark:border-white/10 relative group"
              >
                <div className="absolute top-12 right-12 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors">
                  <Star size={64} fill="currentColor" />
                </div>
                <p className="text-slate-600 dark:text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 relative z-10 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-6">
                  <img src={t.image} alt={t.author} className="w-16 h-16 rounded-2xl object-cover shadow-xl" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-serif text-xl font-bold text-brand-blue dark:text-white">{t.author}</h4>
                    <p className="text-brand-gold text-[10px] uppercase font-bold tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto bg-brand-blue dark:bg-brand-gold rounded-[4rem] p-16 md:p-24 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-gold/10 dark:bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-gold/10 dark:bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="font-serif text-5xl md:text-8xl font-bold text-white dark:text-brand-blue mb-10 leading-none tracking-tighter">
              Your Future <br />
              <span className="italic font-normal">Starts Here</span>
            </h2>
            <p className="text-white/60 dark:text-brand-blue/70 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're looking for a luxury home or professional property management, Ringbelt is your definitive partner in Nyeri.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="bg-brand-red text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl">
                Get in Touch
              </Link>
              <Link to="/about" className="bg-white/10 dark:bg-black/10 text-white dark:text-brand-blue border border-white/20 dark:border-black/20 px-12 py-6 rounded-full font-bold text-xl hover:bg-white/20 dark:hover:bg-black/20 transition-all">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
