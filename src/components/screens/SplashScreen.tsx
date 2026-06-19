import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '../../types';
import logo from '../../Logo.png';

export function SplashScreen({
  onNavigate
}: {onNavigate: (screen: Screen) => void;}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('Auth');
    }, 2500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="h-full w-full bg-navy-800 flex flex-col items-center justify-center text-white p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center">

        {/* Logo */}
        <div className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 shadow-2xl overflow-hidden bg-white/5 border border-white/10">
          <img src={logo} alt="Drive Safe Logo" className="w-24 h-24 object-contain" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-3">Drive Safe</h1>

        {/* Car illustration */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 70 }}
          className="w-64 h-28 my-4 flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 240 110" fill="none">
            {/* Road */}
            <rect x="0" y="90" width="240" height="20" rx="4" fill="#0f172a" opacity="0.4"/>
            <rect x="20" y="98" width="30" height="3" rx="1.5" fill="white" opacity="0.3"/>
            <rect x="70" y="98" width="30" height="3" rx="1.5" fill="white" opacity="0.3"/>
            <rect x="120" y="98" width="30" height="3" rx="1.5" fill="white" opacity="0.3"/>
            <rect x="170" y="98" width="30" height="3" rx="1.5" fill="white" opacity="0.3"/>
            {/* Car body */}
            <path d="M 20 72 L 32 48 C 38 40 55 36 72 36 L 148 36 C 164 36 178 44 185 52 L 210 68 C 218 70 222 76 222 84 L 222 92 L 18 92 L 18 84 Z" fill="#1e3a5f"/>
            {/* Car roof highlights */}
            <path d="M 72 38 L 148 38 C 160 38 170 44 176 50 L 148 50 L 72 50 Z" fill="#1e4976" opacity="0.6"/>
            {/* Windshield */}
            <path d="M 148 40 L 170 40 L 182 52 L 148 52 Z" fill="#38bdf8" opacity="0.25"/>
            {/* Side windows */}
            <path d="M 72 40 L 142 40 L 142 52 L 72 52 Z" fill="#38bdf8" opacity="0.18"/>
            {/* Orange accent stripe */}
            <path d="M 24 74 L 208 74" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/>
            {/* Headlights */}
            <rect x="206" y="70" width="12" height="6" rx="3" fill="#fbbf24" opacity="0.9"/>
            <rect x="22" y="70" width="10" height="6" rx="3" fill="#fed7aa" opacity="0.5"/>
            {/* Front wheel */}
            <circle cx="60" cy="92" r="18" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3"/>
            <circle cx="60" cy="92" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
            <circle cx="60" cy="92" r="3" fill="#f97316"/>
            {/* Rear wheel */}
            <circle cx="172" cy="92" r="18" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3"/>
            <circle cx="172" cy="92" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
            <circle cx="172" cy="92" r="3" fill="#f97316"/>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-orange-300 text-center text-sm font-semibold max-w-[260px] italic">
          "Reliable Vehicle Assistance Anytime, Anywhere."
        </motion.p>
      </motion.div>
    </div>
  );
}