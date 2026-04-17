import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Info, Briefcase, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isAboutPage = location.pathname === '/about';
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname === '/admin';
  const needsDarkText = (isAboutPage || isLoginPage || isAdminPage) && !scrolled;

  if (isAdminPage || isLoginPage) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6',
        scrolled 
          ? 'bg-white/90 dark:bg-brand-navy/90 backdrop-blur-2xl shadow-2xl py-4' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-red rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
            <Building2 className="text-white w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-serif font-bold text-xl md:text-2xl leading-none tracking-tighter transition-colors duration-500",
              scrolled || needsDarkText ? "text-brand-blue dark:text-white" : "text-white"
            )}>
              Ringbelt
            </span>
            <span className={cn(
              "text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-500",
              scrolled || needsDarkText ? "text-brand-red" : "text-white/80"
            )}>
              Agents Limited
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-brand-gold relative py-2',
                location.pathname === link.href 
                  ? 'text-brand-gold' 
                  : (scrolled || needsDarkText ? 'text-brand-blue/60 dark:text-white/60' : 'text-white/70'),
                location.pathname === link.href && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-brand-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className={cn(
            "flex items-center gap-4 lg:gap-6 border-l pl-4 lg:pl-6 transition-colors",
            scrolled || needsDarkText 
              ? "border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-gold" 
              : "border-white/10 text-white"
          )}>
            <ThemeToggle />
            <Link
              to="/login"
              className="bg-brand-red hover:bg-brand-red/90 text-white px-6 lg:px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-brand-red/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className={cn(
          "flex items-center gap-2 md:hidden transition-colors",
          scrolled || needsDarkText ? "text-brand-blue dark:text-brand-gold" : "text-white"
        )}>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              scrolled || needsDarkText ? "text-brand-blue dark:text-white hover:bg-brand-blue/5 dark:hover:bg-white/5" : "text-white hover:bg-white/10"
            )}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-navy/95 backdrop-blur-2xl shadow-3xl md:hidden border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-2xl transition-all duration-300',
                    location.pathname === link.href
                      ? 'bg-brand-gold text-brand-blue font-bold shadow-lg'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <link.icon size={22} className={cn(location.pathname === link.href ? "text-brand-blue" : "text-brand-gold")} />
                  <span className="text-sm uppercase tracking-[0.2em] font-bold">{link.name}</span>
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-8 bg-brand-gold text-brand-blue p-5 rounded-2xl text-center font-bold uppercase tracking-widest text-sm shadow-2xl active:scale-95 transition-transform"
              >
                Contact Us Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
