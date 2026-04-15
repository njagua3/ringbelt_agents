import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Building2, Bed, Bath, Maximize } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { db, collection, onSnapshot, query, orderBy } from '@/lib/firebase';
import { sampleProperties } from '@/constants/initialData';

const categories = [
  'All',
  '1 Bedroom',
  '2 Bedroom',
  'Bedsitters',
  'Single Rooms',
  'Student Hostels',
  'Business Shops',
  'Commercial Spaces',
  'Premium Properties',
];

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  category: string;
  available: boolean;
  beds?: number;
  baths?: number;
  size?: string;
}

export default function Properties() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize with sample data for instant load (Marketing Gimmick)
  const [properties, setProperties] = useState<Property[]>(
    sampleProperties.map((p, i) => ({ id: `initial-${i}`, ...p }))
  );
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(24); // Show all 24 by default for speed

  useEffect(() => {
    const q = query(
      collection(db, 'properties'), 
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const props = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      setProperties(props);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching properties:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesCategory = activeCategory === 'All' || prop.category === activeCategory;
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayProperties = filteredProperties.slice(0, displayLimit);
  const hasMore = filteredProperties.length > displayLimit;

  // Helper to optimize Unsplash URLs - Aggressive for speed
  const optimizeImage = (url: string) => {
    if (url.includes('unsplash.com')) {
      // Lower quality (q=45) and smaller width (w=500) for faster loading
      return `${url.split('?')[0]}?auto=format&fit=crop&q=45&w=500`;
    }
    return url;
  };

  return (
    <div className="pt-24 pb-20 dark:bg-brand-navy min-h-screen transition-colors duration-500">
      {/* Header */}
      <section className="relative py-32 overflow-hidden bg-brand-blue dark:bg-brand-navy transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury Home"
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
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Curated Collection</span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-10 leading-none tracking-tighter">
              Discover Your <br />
              <span className="text-gradient-gold italic">Perfect Space</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              From sophisticated urban apartments to expansive commercial hubs, find the asset that defines your ambition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="glass dark:glass-dark p-8 rounded-[3rem] shadow-3xl border border-white/10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold group-focus-within:scale-110 transition-transform" size={22} />
                <input
                  type="text"
                  placeholder="Search by location, title..."
                  className="w-full pl-16 pr-6 py-5 bg-white/5 dark:bg-black/40 border border-white/20 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-brand-blue dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar lg:pb-0">
              <div className="p-4 bg-brand-gold/10 rounded-2xl shrink-0">
                <Filter className="text-brand-gold" size={22} />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-8 py-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold whitespace-nowrap transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-brand-gold text-brand-blue shadow-xl scale-105" 
                      : "bg-white/10 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-brand-blue dark:text-white">
            {loading ? 'Curating assets...' : (filteredProperties.length > 0 ? `Showing ${filteredProperties.length} Properties` : 'Featured Collections')}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-[3.5rem] overflow-hidden border border-slate-100 dark:border-white/5 h-[600px] animate-pulse">
                <div className="h-80 bg-slate-200 dark:bg-white/10" />
                <div className="p-10 space-y-6">
                  <div className="h-4 bg-slate-200 dark:bg-white/10 w-1/4 rounded" />
                  <div className="h-8 bg-slate-200 dark:bg-white/10 w-3/4 rounded" />
                  <div className="h-20 bg-slate-200 dark:bg-white/10 w-full rounded-2xl" />
                  <div className="h-12 bg-slate-200 dark:bg-white/10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {displayProperties.map((prop, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                key={prop.id}
                className="group relative bg-white dark:bg-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl hover:shadow-brand-gold/20 transition-all duration-700 border border-slate-100 dark:border-white/5"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={optimizeImage(prop.image)}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-brand-gold text-brand-blue px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                      {prop.category}
                    </span>
                    {prop.id.startsWith('feat-') && (
                      <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl">
                      <span className="text-white text-2xl font-serif font-bold">{prop.price}</span>
                    </div>
                  </div>

                  {!prop.available && (
                    <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md flex items-center justify-center">
                      <span className="bg-red-500/20 border border-red-500/40 text-red-500 px-8 py-3 rounded-full font-bold uppercase tracking-[0.3em] text-xs backdrop-blur-xl">
                        Occupied
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-10">
                  <div className="flex items-center gap-2 text-brand-gold mb-4">
                    <MapPin size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{prop.location}</span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-brand-blue dark:text-white mb-8 group-hover:text-brand-gold transition-colors duration-500">
                    {prop.title}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-100 dark:border-white/10 mb-10">
                    <div className="flex flex-col items-center gap-2">
                      <Bed size={20} className="text-brand-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-200">{prop.beds || 0} Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Bath size={20} className="text-brand-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-200">{prop.baths || 0} Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Maximize size={20} className="text-brand-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-200">{prop.size || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-grow bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
                      View Asset
                    </button>
                    <a
                      href={`https://wa.me/254700000000?text=I'm interested in ${prop.title} at ${prop.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-gold/10 dark:bg-white/5 text-brand-gold p-5 rounded-2xl hover:bg-brand-gold hover:text-brand-blue transition-all duration-500"
                    >
                      <Building2 size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-400 dark:text-slate-500" size={40} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-blue dark:text-white mb-2">No properties found</h3>
            <p className="text-slate-700 dark:text-slate-200">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-6 text-brand-gold font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {hasMore && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setDisplayLimit(prev => prev + 6)}
              className="px-12 py-5 bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-2xl"
            >
              Load More Assets
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
