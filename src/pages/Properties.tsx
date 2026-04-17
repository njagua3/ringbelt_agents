import { useState, useEffect, memo } from 'react';
import { Search, Filter, MapPin, Building2, Bed, Bath, Maximize, ArrowRight, Sparkles, Home, Building, GraduationCap, Briefcase, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/Toast';
import { db, collection, onSnapshot, query, orderBy, limit } from '@/lib/firebase';
import { sampleProperties } from '@/constants/initialData';

const categories = [
  'All',
  'Featured',
  '1 Bedroom',
  '2 Bedroom',
  'Bedsitters',
  'Single Rooms',
  'Student Hostels',
  'Business Shops',
  'Commercial Spaces',
  'Premium Properties',
];

const assetClasses = [
  { name: 'Premium Estates', icon: Sparkles, count: 'Exclusive', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', category: 'Premium Properties' },
  { name: 'Urban Residential', icon: Home, count: 'High Demand', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', category: '2 Bedroom' },
  { name: 'Commercial Hubs', icon: Briefcase, count: 'Prime Yield', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', category: 'Commercial Spaces' },
  { name: 'Student Living', icon: GraduationCap, count: 'Strategic', image: 'https://images.unsplash.com/photo-1555854816-809d28af903d?auto=format&fit=crop&q=80&w=800', category: 'Student Hostels' },
];

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  category: string;
  available: boolean;
  featured?: boolean;
  beds?: number;
  baths?: number;
  size?: string;
}

const optimizeImage = (url: string, width: number = 400) => {
  if (url.includes('unsplash.com')) {
    return `${url.split('?')[0]}?auto=format&fit=crop&q=40&w=${width}`;
  }
  return url;
};

const PropertyCard = memo(({ prop }: { prop: Property }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className="group"
  >
    <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden mb-12 shadow-3xl">
      <img
        src={optimizeImage(prop.image, 500)}
        alt={prop.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
      />
      
      {/* Status Badges */}
      <div className="absolute top-10 left-10 flex flex-col gap-3">
        <span className="bg-white/90 dark:bg-brand-navy/90 backdrop-blur-md text-brand-blue dark:text-white px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-2xl">
          {prop.category}
        </span>
        {(prop.featured || prop.id.startsWith('feat-')) && (
          <span className="bg-brand-gold text-brand-blue px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2">
            <Sparkles size={12} /> Featured
          </span>
        )}
      </div>

      {/* Price & Availability */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="bg-brand-blue/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 px-8 py-5 rounded-3xl">
          <span className="text-white text-3xl font-serif font-bold">{prop.price}</span>
          <span className="text-white/60 text-[10px] block uppercase tracking-widest mt-1">Monthly Valuation</span>
        </div>
        
        {!prop.available && (
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/40 px-6 py-3 rounded-2xl">
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Occupied</span>
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-brand-blue/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
        <Link 
          to="/contact"
          className="bg-white text-brand-blue px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-3"
        >
          View Full Asset <ArrowRight size={16} />
        </Link>
      </div>
    </div>

    <div className="px-6">
      <div className="flex items-center gap-3 text-brand-gold mb-6">
        <MapPin size={16} />
        <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{prop.location}</span>
      </div>
      <h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-10 group-hover:text-brand-gold transition-colors duration-500 leading-tight">
        {prop.title}
      </h3>
      
      <div className="flex items-center gap-12 text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-10">
        <div className="flex items-center gap-3 group/icon">
          <Bed size={20} className="text-brand-gold/60 group-hover/icon:text-brand-gold transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{prop.beds || 0} Beds</span>
        </div>
        <div className="flex items-center gap-3 group/icon">
          <Bath size={20} className="text-brand-gold/60 group-hover/icon:text-brand-gold transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{prop.baths || 0} Baths</span>
        </div>
        <div className="flex items-center gap-3 group/icon">
          <Maximize size={20} className="text-brand-gold/60 group-hover/icon:text-brand-gold transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{prop.size || 'N/A'}</span>
        </div>
      </div>
    </div>
  </motion.div>
));

export default function Properties() {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(
    sampleProperties.map((p, i) => ({ id: `initial-${i}`, ...p }))
  );
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(12);

  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbProps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Property[];
      if (dbProps.length > 0) {
        setProperties(dbProps);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching properties:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesCategory = activeCategory === 'All' || 
                           (activeCategory === 'Featured' ? prop.featured : prop.category === activeCategory);
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayProperties = filteredProperties.slice(0, displayLimit);
  const hasMore = filteredProperties.length > displayLimit;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your request has been submitted successfully.', 'success');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pt-20 pb-32 dark:bg-brand-navy min-h-screen transition-colors duration-500">
      {/* Editorial Hero */}
      <section className="relative min-h-[100vh] lg:min-h-[110vh] flex items-start pt-48 pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=70&w=1600"
            alt="Luxury Estate"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-blue/70 dark:bg-brand-navy/80 backdrop-blur-[1px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-brand-gold font-bold uppercase tracking-[0.6em] text-[10px] mb-8 block">The Ringbelt Standard</span>
              <h1 className="font-serif text-7xl md:text-[10rem] font-bold text-white mb-10 leading-[0.8] tracking-tighter">
                Curated <br />
                <span className="text-gradient-gold italic font-normal">Portfolio</span>
              </h1>
              <p className="text-white/70 text-xl md:text-2xl max-w-xl font-light leading-relaxed border-l-2 border-brand-gold/30 pl-10 mt-12">
                Discover a collection of assets that transcend the ordinary. From high-yield commercial hubs to sanctuary-like residences.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent" />
        </div>
      </section>

      {/* Asset Class Explorer */}
      <section className="max-w-7xl mx-auto px-6 -mt-32 md:-mt-48 relative z-30 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assetClasses.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(item.category)}
              className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl"
            >
              <img 
                src={optimizeImage(item.image, 400)} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.name}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-brand-gold/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all">
                  <item.icon size={24} className="text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <h3 className="text-white font-serif text-2xl font-bold mb-1">{item.name}</h3>
                <p className="text-brand-gold/60 text-[10px] uppercase tracking-widest font-bold">{item.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Filter & Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="max-w-xl">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Asset Discovery</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white leading-tight">
              Refine Your <br /> <span className="italic font-normal text-brand-gold">Search</span>
            </h2>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold/50 group-focus-within:text-brand-gold transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by location, title, or asset class..."
                className="w-full pl-16 pr-6 py-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all text-brand-blue dark:text-white shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-3.5 rounded-xl text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue shadow-lg scale-105" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-brand-gold/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="relative min-h-[400px]">
          {loading && properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <Loader2 className="w-12 h-12 text-brand-gold animate-spin mb-4" />
              <p className="text-slate-400 font-light tracking-widest text-xs uppercase">Syncing Live Portfolio...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              {displayProperties.length > 0 ? (
                <motion.div 
                  key="grid"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32"
                >
                  {displayProperties.map((prop) => (
                    <PropertyCard key={prop.id} prop={prop} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-40"
                >
                  <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10">
                    <Search className="text-slate-300" size={40} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-brand-blue dark:text-white mb-4">No assets match your criteria</h3>
                  <p className="text-slate-500 font-light text-lg mb-10">Try broadening your search or exploring different categories.</p>
                  <button
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                    className="text-brand-gold font-bold uppercase tracking-widest text-xs border-b-2 border-brand-gold pb-2 hover:opacity-70 transition-opacity"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {hasMore && (
          <div className="mt-40 text-center">
            <button
              onClick={() => setDisplayLimit(prev => prev + 6)}
              className="group relative px-20 py-7 bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue rounded-3xl font-bold uppercase tracking-[0.4em] text-[10px] overflow-hidden shadow-3xl transition-all hover:scale-105"
            >
              <span className="relative z-10">Load More Assets</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        )}
      </section>

      {/* Property Finder Lead Magnet */}
      <section className="max-w-7xl mx-auto px-6 mt-48 mb-32">
        <div className="bg-brand-gold/10 dark:bg-white/5 border border-brand-gold/20 dark:border-white/10 rounded-[5rem] p-16 md:p-24 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Personalized Search</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-blue dark:text-white mb-8 leading-tight">Can't Find Your <br /> <span className="italic font-normal">Ideal Asset?</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-light leading-relaxed mb-10">
              Our off-market portfolio contains exclusive listings not visible on this grid. Tell us your requirements and let our acquisition experts find it for you.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <img key={i} src={`https://picsum.photos/seed/agent${i}/100/100`} className="w-14 h-14 rounded-full border-4 border-white dark:border-brand-navy object-cover" alt="Agent" referrerPolicy="no-referrer" />
                ))}
              </div>
              <p className="text-brand-blue dark:text-brand-gold font-bold text-sm">Join 500+ investors in our network.</p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Desired Location" required className="w-full px-10 py-6 bg-white dark:bg-black/20 border border-brand-gold/20 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />
              <input type="text" placeholder="Property Type (e.g. 2 Bed, Commercial)" required className="w-full px-10 py-6 bg-white dark:bg-black/20 border border-brand-gold/20 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />
              <button type="submit" className="w-full bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue py-7 rounded-3xl font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-[1.02] transition-all">
                Submit Acquisition Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-60">
        <div className="bg-brand-blue dark:bg-white/5 rounded-[5rem] p-20 md:p-32 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Exclusive Access</span>
            <h2 className="font-serif text-6xl md:text-8xl font-bold text-white mb-10">Stay Ahead of <br /> <span className="text-brand-gold italic font-normal">The Market</span></h2>
            <p className="text-white/60 text-xl mb-16 font-light leading-relaxed">Join our inner circle to receive early access to off-market premium listings and quarterly market intelligence reports.</p>
            <form className="flex flex-col sm:flex-row gap-6" onSubmit={handleFormSubmit}>
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="flex-grow px-10 py-6 bg-white/10 border border-white/20 rounded-[2rem] text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50 backdrop-blur-md"
              />
              <button type="submit" className="bg-brand-gold text-brand-blue px-12 py-6 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl">
                Join Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
