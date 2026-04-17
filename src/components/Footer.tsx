import { Link, useLocation } from 'react-router-dom';
import { Facebook, Music, Twitter, Mail, Phone, MapPin, Building2 } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const isLoginPage = location.pathname === '/login';

  if (isAdminPage || isLoginPage) return null;

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61567743868381', label: 'Facebook' },
    { Icon: Music, href: 'https://vm.tiktok.com/ZS9LqxarPWbgP-EG1RH/', label: 'TikTok' },
  ];

  return (
    <footer className="bg-brand-blue dark:bg-brand-navy text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-5" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        {/* Brand Section */}
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
              <Building2 className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl leading-none tracking-tighter">Ringbelt</span>
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-red">Agents Limited</span>
            </div>
          </Link>
          <p className="text-white/50 text-lg font-light leading-relaxed">
            "Honesty, integrity and Professionalism are our pillars"
          </p>
          <div className="flex gap-6">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <a 
                key={i} 
                href={href} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 group"
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-xl mb-10 text-brand-gold uppercase tracking-widest text-xs">Navigation</h4>
          <ul className="space-y-5 text-sm font-medium text-white/50">
            {['Home', 'Properties', 'Services', 'About', 'Contact', 'Admin Login'].map((item) => (
              <li key={item}>
                <Link to={item === 'Admin Login' ? '/login' : `/${item.toLowerCase()}`} className="hover:text-brand-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-serif font-bold text-xl mb-10 text-brand-gold uppercase tracking-widest text-xs">Portfolio</h4>
          <ul className="space-y-5 text-sm font-medium text-white/50">
            {['1 Bedroom Apartments', '2 Bedroom Apartments', 'Bedsitters', 'Commercial Spaces', 'Student Hostels'].map((item) => (
              <li key={item}>
                <Link to="/properties" className="hover:text-brand-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-serif font-bold text-xl mb-10 text-brand-gold uppercase tracking-widest text-xs">Connect</h4>
          <ul className="space-y-8 text-sm font-medium text-white/50">
            <li className="flex gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="text-brand-gold" size={18} />
              </div>
              <span className="leading-relaxed">
                Nyeri (H.O): Umoja Chambers, Rm 4 <br />
                Murang'a: Waguta Plaza
              </span>
            </li>
            <li className="flex gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Phone className="text-brand-gold" size={18} />
              </div>
              <div className="flex flex-col">
                <span>0707 046 253</span>
                <span>0715 324 620</span>
              </div>
            </li>
            <li className="flex gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="text-brand-gold" size={18} />
              </div>
              <span className="break-all">ringbelt2011@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
        <p>© {currentYear} Ringbelt Agents Limited.</p>
        <p>Honesty • Integrity • Professionalism</p>
      </div>
    </footer>
  );
}
