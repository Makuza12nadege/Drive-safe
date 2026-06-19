import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, AlertTriangle, MapPin, CheckCircle2 } from 'lucide-react';
import { Screen } from '../../types';
export function EmergencyScreen({
  onNavigate


}: {onNavigate: (screen: Screen) => void;}) {
  const [status, setStatus] = useState<'idle' | 'locating' | 'found'>('idle');
  const handleEmergency = () => {
    setStatus('locating');
    setTimeout(() => {
      setStatus('found');
    }, 3000);
  };
  return (
    <div className="h-full w-full bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Pulse Effect */}
      {status === 'locating' &&
      <motion.div
        animate={{
          scale: [1, 2, 3],
          opacity: [0.5, 0.2, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500 rounded-full blur-3xl" />

      }

      <div className="bg-transparent px-6 pt-14 pb-4 sticky top-0 z-10 flex items-center gap-4">
        <button
          onClick={() => onNavigate('Home')}
          className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-900">
          
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 z-10">
        <AnimatePresence mode="wait">
          {status === 'idle' &&
          <motion.div
            key="idle"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}
            className="flex flex-col items-center text-center">
            
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Need Help Now?
              </h1>
              <p className="text-gray-500 mb-12 max-w-[250px]">
                Press the button below to instantly alert nearby mechanics.
              </p>

              <button onClick={handleEmergency} className="relative group">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative w-48 h-48 bg-gradient-to-b from-red-500 to-red-600 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white">
                  <AlertTriangle size={48} className="text-white mb-2" />
                  <span className="text-white font-bold text-xl tracking-wide">
                    SOS
                  </span>
                </div>
              </button>
            </motion.div>
          }

          {status === 'locating' &&
          <motion.div
            key="locating"
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0
            }}
            className="flex flex-col items-center text-center">
            
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 relative">
                <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear'
                }}
                className="absolute inset-0 border-4 border-red-100 border-t-red-500 rounded-full" />
              
                <MapPin size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Detecting Location...
              </h2>
              <p className="text-gray-500">
                Searching for the nearest available mechanic
              </p>
            </motion.div>
          }

          {status === 'found' &&
          <motion.div
            key="found"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="flex flex-col items-center text-center w-full">
            
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Help is on the way!
              </h2>
              <p className="text-gray-500 mb-8">
                A nearby mechanic has been notified and will contact you
                shortly.
              </p>

              <div className="bg-white w-full rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 mb-8 text-left">
                <img
                src="https://images.unsplash.com/photo-1504222490345-c075b6008014?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Mechanic"
                className="w-16 h-16 rounded-2xl object-cover" />
              
                <div>
                  <h3 className="font-bold text-gray-900">Speedy Motors</h3>
                  <p className="text-sm text-gray-500">
                    3.8 km away • Arriving in ~10 mins
                  </p>
                </div>
              </div>

              <button
              onClick={() => onNavigate('Home')}
              className="w-full bg-navy-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-navy-800/20">
              
                Return to Home
              </button>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}