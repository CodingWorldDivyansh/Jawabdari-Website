'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, MapPin, Users, HardHat, Menu, X } from 'lucide-react';

interface NavbarProps {
  onExportCsv?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExportCsv }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Track Area', href: '/', icon: MapPin },
    { label: 'MLAs', href: '/mlas', icon: Users },
    { label: 'Contractors', href: '/contractors', icon: HardHat },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6EAF0] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex flex-col min-w-0">
            <h2 className="text-xl font-extrabold text-[#0B1B2F] tracking-tight font-sans m-0 leading-tight">
              Jawabdari
            </h2>
            <div className="flex items-center text-[11px] font-semibold uppercase tracking-wider text-[#0B1B2F]/70 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFC21A] shadow-[0_0_6px_#FFC21A] mr-1.5"></span>
              <span className="truncate">Ludhiana Public Works & MLALADS</span>
            </div>
          </Link>

          {/* Navigation Links — desktop only */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                    isActive
                      ? 'bg-[#0B1B2F]/5 text-[#0B1B2F] font-semibold border border-[#0B1B2F]/10'
                      : 'text-[#0B1B2F]/70 hover:text-[#0B1B2F] hover:bg-[#0B1B2F]/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF7A00]' : 'text-[#0B1B2F]/40'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 shrink-0">
            {onExportCsv && (
              <button
                onClick={onExportCsv}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0B1B2F] bg-[#FF7A00] rounded-lg hover:bg-[#E56E00] transition-colors shadow-xs cursor-pointer"
                title="Export data to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export Data</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#0B1B2F] hover:bg-[#0B1B2F]/5 transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-[#E6EAF0] py-2" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex w-full items-center space-x-1.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#0B1B2F]/5 text-[#0B1B2F] font-semibold border border-[#0B1B2F]/10'
                      : 'text-[#0B1B2F]/70 hover:text-[#0B1B2F] hover:bg-[#0B1B2F]/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF7A00]' : 'text-[#0B1B2F]/40'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {onExportCsv && (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onExportCsv();
                }}
                className="mt-1 flex w-full items-center space-x-1.5 px-3 py-2.5 text-sm font-semibold text-[#0B1B2F] bg-[#FF7A00] rounded-lg hover:bg-[#E56E00] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
