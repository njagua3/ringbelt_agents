import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  isDark?: boolean;
  scrolled?: boolean;
}

export default function Logo({ className, isDark = false, scrolled = false }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center md:items-start select-none", className)}>
      <div className="flex items-center gap-3 md:gap-4">
        {/* Logo Icon Layer */}
        <div className="relative shrink-0 w-14 h-10 md:w-16 md:h-12">
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Chimney */}
            <path d="M30 15V25H38V18L30 15Z" className="fill-brand-blue" />
            
            {/* Roof - Left Shadow Part */}
            <path d="M10 40L50 10V25L20 45L10 40Z" className="fill-brand-blue" />
            
            {/* Roof - Right Main Part */}
            <path d="M50 10L90 40L80 45L50 22V10Z" className="fill-brand-red" />
            
            {/* Window Panes */}
            <rect x="47" y="27" width="3" height="3" className="fill-brand-blue" />
            <rect x="52" y="27" width="3" height="3" className="fill-brand-blue" />
            <rect x="47" y="32" width="3" height="3" className="fill-brand-blue" />
            <rect x="52" y="32" width="3" height="3" className="fill-brand-blue" />
            
            {/* Swoosh Underneath */}
            <path 
              d="M10 50C30 45 70 45 90 50" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className={cn(
                "transition-colors duration-500",
                (scrolled || isDark) ? "text-brand-blue" : "text-white/80"
              )}
            />
          </svg>
        </div>

        {/* Logo Text Section */}
        <div className="flex flex-col">
          <h1 className={cn(
            "font-sans font-black text-2xl md:text-3xl leading-none tracking-tight transition-colors duration-500 uppercase",
            (scrolled || isDark) ? "text-brand-blue" : "text-white"
          )}>
            RINGBELT
          </h1>
          
          <div className="flex items-center gap-2 mt-0.5">
            <div className={cn(
              "h-[1.5px] grow transition-colors duration-500",
              (scrolled || isDark) ? "bg-brand-red" : "bg-white/40"
            )} />
            <span className={cn(
              "text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] transition-colors duration-500",
              (scrolled || isDark) ? "text-brand-red" : "text-white"
            )}>
              AGENTS
            </span>
            <div className={cn(
              "h-[1.5px] grow transition-colors duration-500",
              (scrolled || isDark) ? "bg-brand-red" : "bg-white/40"
            )} />
          </div>
        </div>
      </div>
      
      {/* Services Tagline (Optional/Conditional for Desktop) */}
      <div className={cn(
        "hidden lg:flex items-center gap-1.5 mt-1 text-[6px] uppercase tracking-[0.1em] font-bold transition-all duration-500 whitespace-nowrap",
        (scrolled || isDark) ? "text-brand-blue/40" : "text-white/30"
      )}>
        <span>Tenant Management</span>
        <span className="w-0.5 h-2 bg-current" />
        <span>Rental Agency</span>
        <span className="w-0.5 h-2 bg-current" />
        <span>Real Estate Sales</span>
        <span className="w-0.5 h-2 bg-current" />
        <span>Property Management</span>
      </div>
    </div>
  );
}
