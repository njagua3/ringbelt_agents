import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Check, X, Image as ImageIcon, 
  LayoutDashboard, Building2, LogOut, Search, Filter, MapPin 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/Toast';
import { 
  db, collection, onSnapshot, query, orderBy, 
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp 
} from '@/lib/firebase';
import { categories, sampleProperties } from '@/constants/initialData';

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

export default function Admin() {
  const { showToast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState('All');
  const [isSaving, setIsSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    image: '',
    category: categories[0],
    available: true,
    beds: 0,
    baths: 0,
    size: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const props = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      setProperties(props);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        const propRef = doc(db, 'properties', editingId);
        await updateDoc(propRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        showToast('Property updated successfully', 'success');
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'properties'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast('New property added successfully', 'success');
        setIsAdding(false);
      }
      setFormData({
        title: '',
        location: '',
        price: '',
        image: '',
        category: categories[0],
        available: true,
        beds: 0,
        baths: 0,
        size: '',
      });
    } catch (error) {
      console.error("Error saving property:", error);
      showToast('Failed to save property. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (prop: Property) => {
    setEditingId(prop.id);
    setFormData({
      title: prop.title,
      location: prop.location,
      price: prop.price,
      image: prop.image,
      category: prop.category,
      available: prop.available,
      beds: prop.beds || 0,
      baths: prop.baths || 0,
      size: prop.size || '',
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'properties', id));
      showToast('Property deleted successfully', 'success');
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting property:", error);
      showToast('Failed to delete property.', 'error');
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'properties', id), {
        available: !currentStatus,
        updatedAt: serverTimestamp(),
      });
      showToast(`Property marked as ${!currentStatus ? 'Available' : 'Occupied'}`, 'info');
    } catch (error) {
      console.error("Error toggling availability:", error);
      showToast('Failed to update status.', 'error');
    }
  };

  const filteredAdminProperties = properties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
                          prop.location.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesCategory = adminCategory === 'All' || prop.category === adminCategory;
    return matchesSearch && matchesCategory;
  });

  const optimizeImage = (url: string) => {
    if (url.includes('unsplash.com')) {
      return `${url.split('?')[0]}?auto=format&fit=crop&q=60&w=200`;
    }
    return url;
  };

  const handleSeedData = async () => {
    try {
      const existingTitles = new Set(properties.map(p => p.title.toLowerCase()));
      const newProperties = sampleProperties.filter(p => !existingTitles.has(p.title.toLowerCase()));

      if (newProperties.length === 0) {
        showToast('All sample properties are already present.', 'info');
        return;
      }

      showToast(`Seeding ${newProperties.length} unique properties...`, 'info');
      for (const prop of newProperties) {
        await addDoc(collection(db, 'properties'), {
          ...prop,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      showToast(`${newProperties.length} New properties added successfully!`, 'success');
    } catch (error) {
      console.error("Error seeding data:", error);
      showToast('Failed to seed data.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-navy flex">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-navy dark:bg-black/60 text-white hidden lg:flex flex-col fixed h-full border-r border-white/5">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center shadow-2xl">
              <Building2 className="text-brand-blue w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl leading-none">Ringbelt</span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-brand-gold">Admin Console</span>
            </div>
          </div>
          
          <nav className="space-y-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full flex items-center gap-4 p-4 bg-brand-gold text-brand-blue rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl"
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button 
              onClick={() => document.getElementById('property-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-4 p-4 text-white/60 hover:bg-white/10 hover:text-white rounded-2xl transition-all uppercase tracking-widest text-[10px] font-bold"
            >
              <Building2 size={18} /> Properties
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-white/60 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-8 md:p-12 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
            <div>
              <h1 className="text-5xl font-serif font-bold text-brand-blue dark:text-white mb-4 tracking-tighter">Asset Management</h1>
              <p className="text-slate-700 dark:text-slate-200 font-light text-lg">Curate and oversee your premium property portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSeedData}
                className="bg-white dark:bg-white/5 text-brand-blue dark:text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-xl active:scale-95"
              >
                Seed Data
              </button>
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); }}
                className="bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-3xl active:scale-95"
              >
                <Plus size={20} /> New Asset
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Total Assets', value: properties.length, color: 'text-brand-blue dark:text-white' },
              { label: 'Available', value: properties.filter(p => p.available).length, color: 'text-green-600 dark:text-green-400' },
              { label: 'Occupied', value: properties.filter(p => !p.available).length, color: 'text-brand-gold' },
            ].map((stat, i) => (
              <div key={i} className="glass dark:glass-dark p-10 rounded-[2.5rem] shadow-xl border border-white/10">
                <div className="text-brand-blue/60 dark:text-brand-gold/80 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{stat.label}</div>
                <div className={`text-5xl font-serif font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Property List */}
          <div id="property-list" className="mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold group-focus-within:scale-110 transition-transform" size={18} />
              <input 
                type="text"
                placeholder="Search assets..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white transition-all shadow-lg"
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <button 
                onClick={() => setAdminCategory('All')}
                className={cn(
                  "px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  adminCategory === 'All' ? "bg-brand-blue text-white shadow-lg" : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                )}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setAdminCategory(cat)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                    adminCategory === cat ? "bg-brand-blue text-white shadow-lg" : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="glass dark:glass-dark rounded-[3rem] shadow-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] text-brand-blue/60 dark:text-brand-gold font-bold">Asset</th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] text-brand-blue/60 dark:text-brand-gold font-bold">Classification</th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] text-brand-blue/60 dark:text-brand-gold font-bold">Valuation</th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] text-brand-blue/60 dark:text-brand-gold font-bold">Status</th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] text-brand-blue/60 dark:text-brand-gold font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-32 text-center text-slate-600 dark:text-slate-400 font-light italic">Synchronizing assets...</td>
                    </tr>
                  ) : filteredAdminProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                            <img 
                              src={optimizeImage(prop.image)} 
                              className="w-full h-full object-cover" 
                              alt="" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-brand-blue dark:text-white text-lg group-hover:text-brand-gold transition-colors">{prop.title}</div>
                            <div className="text-xs text-slate-700 dark:text-slate-200 font-light">{prop.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <span className="px-4 py-1.5 bg-brand-gold/10 text-brand-gold rounded-full text-[9px] font-bold uppercase tracking-widest border border-brand-gold/20">
                          {prop.category}
                        </span>
                      </td>
                      <td className="p-8 font-serif font-bold text-brand-blue dark:text-brand-gold text-xl">{prop.price}</td>
                      <td className="p-8">
                        <button 
                          onClick={() => toggleAvailability(prop.id, prop.available)}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all",
                            prop.available 
                              ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                              : "bg-red-500/10 text-red-500 border border-red-500/20"
                          )}
                        >
                          {prop.available ? 'Available' : 'Occupied'}
                        </button>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <button 
                            onClick={() => window.open('/properties', '_blank')}
                            className="p-3 text-brand-blue/60 dark:text-white/60 hover:text-brand-gold hover:bg-brand-gold/10 rounded-xl transition-all"
                            title="View on Site"
                          >
                            <Search size={18} />
                          </button>
                          <button 
                            onClick={() => handleEdit(prop)}
                            className="p-3 text-brand-blue/60 dark:text-white/60 hover:text-brand-gold hover:bg-brand-gold/10 rounded-xl transition-all"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => setConfirmDelete(prop.id)}
                            className="p-3 text-brand-blue/60 dark:text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSaving && setIsAdding(false)}
              className="absolute inset-0 bg-brand-blue/40 dark:bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-brand-navy w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-transparent dark:border-white/10"
            >
              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                {/* Image Preview Sidebar */}
                <div className="w-full md:w-80 bg-slate-100 dark:bg-black/20 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5">
                  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-white/5 flex items-center justify-center relative group">
                    {formData.image ? (
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                    ) : (
                      <div className="text-center p-6">
                        <ImageIcon size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Image Preview</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 text-center">
                    <h4 className="font-serif font-bold text-brand-blue dark:text-white text-xl mb-2">{formData.title || 'Asset Title'}</h4>
                    <p className="text-xs text-brand-gold font-bold uppercase tracking-widest">{formData.category}</p>
                  </div>
                </div>

                {/* Form Area */}
                <div className="flex-grow p-8 md:p-12 overflow-y-auto">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif font-bold text-brand-blue dark:text-white">
                      {editingId ? 'Refine Asset' : 'New Listing'}
                    </h2>
                    <button onClick={() => setIsAdding(false)} disabled={isSaving} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white disabled:opacity-50">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Asset Designation</label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white placeholder:text-slate-400"
                          placeholder="e.g. The Zenith Penthouse"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Location / District</label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white placeholder:text-slate-400"
                          placeholder="e.g. Nyeri, Skuta"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Valuation (Price)</label>
                        <input
                          type="text"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white placeholder:text-slate-400"
                          placeholder="e.g. Ksh 45,000"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Asset Classification</label>
                        <div className="relative">
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white appearance-none cursor-pointer"
                          >
                            {categories.map(cat => <option key={cat} value={cat} className="bg-white dark:bg-brand-navy">{cat}</option>)}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
                            <Filter size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Visual Asset URL (Unsplash preferred)</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                        <input
                          type="url"
                          required
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white placeholder:text-slate-400"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Beds</label>
                        <input
                          type="number"
                          value={formData.beds}
                          onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value) || 0})}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Baths</label>
                        <input
                          type="number"
                          value={formData.baths}
                          onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value) || 0})}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-brand-gold/60 ml-1">Dimensions</label>
                        <input
                          type="text"
                          value={formData.size}
                          onChange={(e) => setFormData({...formData, size: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 dark:text-white placeholder:text-slate-400"
                          placeholder="1,200 sqft"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                      <div 
                        onClick={() => setFormData({...formData, available: !formData.available})}
                        className={cn(
                          "w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300",
                          formData.available ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                          formData.available ? "left-7" : "left-1"
                        )} />
                      </div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest cursor-pointer">
                        Asset is currently Available
                      </label>
                    </div>

                    <div className="flex gap-6 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        disabled={isSaving}
                        className="flex-grow py-5 border border-slate-200 dark:border-white/10 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 transition-all uppercase tracking-widest text-[10px] disabled:opacity-50"
                      >
                        Discard
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-grow py-5 bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-2xl uppercase tracking-widest text-[10px] disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          editingId ? 'Commit Changes' : 'Authorize Listing'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)}
              className="absolute inset-0 bg-brand-blue/40 dark:bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-brand-navy w-full max-w-md rounded-[2.5rem] shadow-3xl overflow-hidden p-10 text-center border border-white/10"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trash2 className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-blue dark:text-white mb-4">Decommission Asset?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-10 font-light">
                This action is permanent. The property record will be purged from the central database.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-grow py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Abort
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="flex-grow py-4 bg-red-500 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
                >
                  Purge Asset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
