import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  isDark?: boolean;
  scrolled?: boolean;
}

import { Users, Key, Home, Settings } from 'lucide-react';

export default function Logo({ className, isDark = false, scrolled = false }: LogoProps) {
  const isLogoDark = scrolled || isDark;
  const brandBlue = "#003B95"; // Vibrant brand blue from image
  const brandRed = "#ED3237";

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
            <path d="M30 15V25H38V18L30 15Z" fill={brandBlue} />
            
            {/* Roof - Left Shadow Part */}
            <path d="M10 40L50 10V25L20 45L10 40Z" fill={brandBlue} />
            
            {/* Roof - Right Main Part */}
            <path d="M50 10L90 40L80 45L50 22V10Z" fill={brandRed} />
            
            {/* Window Panes */}
            <rect x="47" y="27" width="3" height="3" fill={brandBlue} />
            <rect x="52" y="27" width="3" height="3" fill={brandBlue} />
            <rect x="47" y="32" width="3" height="3" fill={brandBlue} />
            <rect x="52" y="32" width="3" height="3" fill={brandBlue} />
            
            {/* Swoosh Underneath */}
            <path 
              d="M10 50C30 45 70 45 90 50" 
              stroke={isLogoDark ? brandBlue : "white"} 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="transition-colors duration-500"
            />
          </svg>
        </div>

        {/* Logo Text Section */}
        <div className="flex flex-col">
          <h1 className={cn(
            "font-sans font-black text-2xl md:text-3xl leading-none tracking-tight transition-colors duration-500 uppercase",
            isLogoDark ? "text-[#003B95]" : "text-white"
          )}>
            RINGBELT
          </h1>
          
          {/* AGENTS Section */}
          <div className="flex items-center gap-2 mt-0.5">
            <div className={cn(
              "h-[2px] grow transition-colors duration-500 bg-[#ED3237]"
            )} />
            <span className={cn(
              "text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] transition-colors duration-500 text-[#ED3237]"
            )}>
              AGENTS
            </span>
            <div className={cn(
              "h-[2px] grow transition-colors duration-500 bg-[#ED3237]"
            )} />
          </div>

          {/* LIMITED Section */}
          <div className="flex items-center gap-2 mt-0.5">
            <div className={cn(
              "h-[1px] grow transition-colors duration-500",
              isLogoDark ? "bg-[#003B95]" : "bg-white/40"
            )} />
            <span className={cn(
              "text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] transition-colors duration-500",
              isLogoDark ? "text-[#003B95]" : "text-white"
            )}>
              LIMITED
            </span>
            <div className={cn(
              "h-[1px] grow transition-colors duration-500",
              isLogoDark ? "bg-[#003B95]" : "bg-white/40"
            )} />
          </div>
        </div>
      </div>
      
      {/* Enhanced Tagline with Icons */}
      <div className={cn(
        "hidden lg:flex items-center gap-6 mt-3 transition-all duration-500",
        isLogoDark ? "text-[#003B95]" : "text-white"
      )}>
        {[
          { text: "Tenant Management", icon: Users },
          { text: "Rental Agency", icon: Key },
          { text: "Real Estate Sales", icon: Home },
          { text: "Property Management", icon: Settings },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 group">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
              idx % 2 === 0 ? "bg-[#003B95] text-white" : "bg-[#ED3237] text-white"
            )}>
              <item.icon size={12} />
            </div>
            <span className="text-[6px] font-black uppercase tracking-wider">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
