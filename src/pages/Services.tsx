import { motion } from 'motion/react';
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight, MapPin, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Property Management',
    description: 'We handle everything from tenant screening to rent collection and maintenance. Our goal is to make property ownership stress-free for landlords.',
    icon: Building2,
    benefits: ['Tenant Screening', 'Rent Collection', 'Maintenance & Repairs', 'Financial Reporting'],
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Real Estate Sales',
    description: 'Looking to buy or sell? Our expert agents provide market analysis and strategic marketing to ensure you get the best value for your property.',
    icon: TrendingUp,
    benefits: ['Market Valuation', 'Professional Photography', 'Strategic Marketing', 'Legal Assistance'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Rental Agency',
    description: 'Finding the right tenant is crucial. We market your property across multiple platforms to find reliable tenants quickly.',
    icon: Key,
    benefits: ['Wide Marketing Reach', 'Lease Agreement Drafting', 'Move-in Inspections', 'Deposit Management'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Asset Advisory',
    description: 'Strategic consulting for real estate investments. We help you identify high-yield opportunities in the Nyeri market.',
    icon: ShieldCheck,
    benefits: ['Investment Analysis', 'Portfolio Growth', 'Risk Assessment', 'Market Insights'],
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623abe5?auto=format&fit=crop&q=80&w=800'
  },
];

export default function Services() {
  return (
    <div className="pt-24 pb-20 dark:bg-brand-navy transition-colors duration-500">
      {/* Header */}
      <section className="relative py-32 overflow-hidden bg-brand-blue dark:bg-brand-navy transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920"
            alt="Premium Real Estate"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 dark:from-brand-navy/80 via-transparent to-brand-blue dark:to-brand-navy" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Our Expertise</span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-10 leading-none tracking-tighter">
              Bespoke <br />
              <span className="text-gradient-gold italic">Asset Solutions</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Comprehensive real estate and asset management solutions tailored to the sophisticated needs of Nyeri's property owners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-32">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20`}
              >
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-brand-gold/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative rounded-[4rem] overflow-hidden shadow-3xl aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent" />
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="w-20 h-20 bg-brand-gold/10 border border-brand-gold/20 rounded-3xl flex items-center justify-center mb-10">
                    <service.icon className="text-brand-gold w-10 h-10" />
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-8 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-12 font-light">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {service.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                        <CheckCircle className="text-brand-gold w-6 h-6 shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-4 bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl"
                  >
                    Inquire Now
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-slate-50 dark:bg-black/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-mesh opacity-5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-6 block">The Ringbelt Advantage</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-8">Why Partner With Us?</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-light max-w-2xl mx-auto">
              We bring professional standards and a luxury touch to the local real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Local Expertise', description: 'Deep understanding of the Nyeri property market and emerging trends.', icon: MapPin },
              { title: 'Transparency', description: 'Absolute integrity and clear communication in every transaction.', icon: ShieldCheck },
              { title: 'Client Centric', description: 'Your goals are our priority. We tailor every solution to your needs.', icon: Users },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-12 bg-white dark:bg-white/5 rounded-[3rem] shadow-xl border border-slate-100 dark:border-white/5 group hover:bg-brand-gold transition-all duration-500"
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-10 group-hover:bg-brand-blue transition-colors">
                  <item.icon className="text-brand-gold w-10 h-10 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brand-blue dark:text-white mb-6 group-hover:text-brand-blue transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed group-hover:text-brand-blue/80 transition-colors">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
