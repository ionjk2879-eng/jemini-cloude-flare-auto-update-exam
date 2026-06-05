import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trash2, Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '폐기물 가이드', path: '/guide' },
    { name: '수거 맵', path: '/map' },
    { name: '나눔 커뮤니티', path: '/community' },
    { name: '성공 사례', path: '/success' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Trash2 size={20} className="text-white" />
          </div>
          <span>클린 <span className="text-green-500">가이드</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                isActive(link.path) ? 'text-green-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="tel:1599-0903" className="hidden sm:flex items-center gap-2 text-sm font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <Phone size={14} /> 1599-0903
          </a>
          <Link to="/truck" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
            수거 신청
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#020617] border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-bold ${
                  isActive(link.path) ? 'text-green-500' : 'text-slate-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-slate-500">무상수거 문의</span>
              <a href="tel:1599-0903" className="text-green-500 font-bold">1599-0903</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
