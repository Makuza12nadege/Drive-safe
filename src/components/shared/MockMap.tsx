import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Compass, Plus, Minus } from 'lucide-react';
import { SimulationStatus, Garage, Mechanic } from '../../types';

interface MockMapProps {
  status: SimulationStatus;
  driverCoords?: { lat: number; lng: number };
  garage: Garage | null;
  mechanic: Mechanic | null;
  height?: string;
  showDetails?: boolean;
}

export function MockMap({
  status,
  driverCoords = { lat: -1.9462, lng: 30.0612 }, // default Kiyovu
  garage,
  mechanic,
  height = 'h-full',
  showDetails = true
}: MockMapProps) {
  const [zoom, setZoom] = useState(1.4);
  const [progress, setProgress] = useState(0);

  // Bounds mapping
  // x: lng (30.03 to 30.09), y: lat (-1.93 to -1.98)
  const getXY = (lat: number, lng: number) => {
    const x = ((lng - 30.03) / 0.06) * 100;
    const y = ((lat - (-1.93)) / (-0.05)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const driverXY = getXY(driverCoords.lat, driverCoords.lng);
  
  // Define route paths from garages to driver
  const getRoutePoints = (garageId: string) => {
    const gXY = garage ? getXY(garage.lat, garage.lng) : { x: 50, y: 50 };
    switch (garageId) {
      case 'g1': // Kiyovu - short straight-ish road
        return [
          gXY,
          { x: gXY.x - 2, y: gXY.y + 1 },
          { x: driverXY.x - 1, y: driverXY.y - 1 },
          driverXY
        ];
      case 'g2': // Nyabugogo - longer road
        return [
          gXY,
          { x: 30, y: 22 },
          { x: 42, y: 26 },
          { x: 48, y: 30 },
          driverXY
        ];
      case 'g3': // Gikondo
        return [
          gXY,
          { x: 70, y: 65 },
          { x: 60, y: 50 },
          { x: 55, y: 40 },
          driverXY
        ];
      default:
        return [gXY, driverXY];
    }
  };

  const routePoints = garage ? getRoutePoints(garage.id) : [driverXY, driverXY];

  // Animate mechanic along route
  useEffect(() => {
    if (status === 'en_route') {
      setProgress(0);
      const duration = 12000; // 12 seconds journey
      const intervalTime = 50;
      const step = intervalTime / duration;
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + step;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    } else if (['arrived', 'diagnosing', 'repaired', 'completed'].includes(status)) {
      setProgress(1);
    } else {
      setProgress(0);
    }
  }, [status, garage]);

  // Calculate current mechanic position along the polyline path
  const getInterpolatedPosition = (points: { x: number; y: number }[], t: number) => {
    if (points.length < 2) return { x: 50, y: 50 };
    if (t <= 0) return points[0];
    if (t >= 1) return points[points.length - 1];

    const sectionCount = points.length - 1;
    const scaledT = t * sectionCount;
    const index = Math.floor(scaledT);
    const localT = scaledT - index;

    const pA = points[index];
    const pB = points[index + 1];

    return {
      x: pA.x + (pB.x - pA.x) * localT,
      y: pA.y + (pB.y - pA.y) * localT
    };
  };

  const mechanicXY = getInterpolatedPosition(routePoints, progress);

  return (
    <div className={`relative w-full ${height} bg-slate-950 overflow-hidden flex flex-col`}>
      {/* Map Control buttons */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
          className="p-2 bg-slate-900/90 text-white rounded-xl shadow-lg border border-slate-800 hover:bg-slate-800 transition-colors"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
          className="p-2 bg-slate-900/90 text-white rounded-xl shadow-lg border border-slate-800 hover:bg-slate-800 transition-colors"
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Map Viewport */}
      <div className="flex-1 w-full relative">
        <motion.div
          animate={{ scale: zoom }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="w-full h-full origin-center relative"
        >
          <svg className="w-full h-full select-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Custom Grid / Road Network Background */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Rivers / Lakes */}
            <path
              d="M -10,90 Q 20,85 45,75 T 90,80 T 110,85"
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="4"
              opacity="0.3"
            />

            {/* Major Highways */}
            <path d="M 0,20 L 100,35" fill="none" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
            <path d="M 25,0 L 40,100" fill="none" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
            <path d="M 50,0 Q 55,50 50,100" fill="none" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
            <path d="M 0,80 L 100,75" fill="none" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />

            {/* Main Roads & Streets */}
            <path d="M 10,20 Q 24,18 24,35 T 24,70" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.4" />
            <path d="M 24,35 Q 35,40 52,32 T 80,30" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.4" />
            <path d="M 52,32 Q 60,50 70,65 T 80,76" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.4" />
            <path d="M 24,18 Q 40,20 53,28 T 80,30" fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.4" />
            <path d="M 10,80 Q 30,70 50,78 T 80,76" fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.4" />

            {/* District Areas Names */}
            <text x="52" y="37" fill="#64748b" fontSize="2.5" fontWeight="bold" textAnchor="middle" opacity="0.5">KIYOVU</text>
            <text x="24" y="24" fill="#64748b" fontSize="2.5" fontWeight="bold" textAnchor="middle" opacity="0.5">NYABUGOGO</text>
            <text x="75" y="70" fill="#64748b" fontSize="2.5" fontWeight="bold" textAnchor="middle" opacity="0.5">GIKONDO</text>
            <text x="65" y="15" fill="#64748b" fontSize="2" fontWeight="bold" textAnchor="middle" opacity="0.4">KIGALI HEIGHTS</text>

            {/* Active Navigation Route Highlight */}
            {garage && ['en_route', 'arrived', 'diagnosing', 'repaired', 'completed'].includes(status) && (
              <>
                {/* Underglow route */}
                <polyline
                  points={routePoints.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
                {/* Active path dashed */}
                <polyline
                  points={routePoints.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1,1"
                />
              </>
            )}

            {/* Searching Radar Scanner */}
            {status === 'searching' && (
              <g>
                <circle cx={driverXY.x} cy={driverXY.y} r="18" fill="none" stroke="#f97316" strokeWidth="0.2" opacity="0.4" />
                <motion.circle
                  cx={driverXY.x}
                  cy={driverXY.y}
                  r="18"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="0.5"
                  initial={{ scale: 0.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={driverXY.x}
                  cy={driverXY.y}
                  r="10"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="0.5"
                  initial={{ scale: 0.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.7 }}
                />
              </g>
            )}
          </svg>

          {/* DRIVER PIN */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
            style={{ left: `${driverXY.x}%`, top: `${driverXY.y}%` }}
          >
            <div className="relative">
              <span className="absolute -inset-1.5 rounded-full bg-orange-500/30 animate-ping"></span>
              <div className="w-8 h-8 rounded-full bg-navy-800 border-2 border-white flex items-center justify-center shadow-lg">
                <MapPin size={16} className="text-orange-500 fill-orange-500" />
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md mt-1 shadow-sm whitespace-nowrap">
              You (KN 3 Rd)
            </div>
          </div>

          {/* GARAGE PIN */}
          {garage && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
              style={{ left: `${getXY(garage.lat, garage.lng).x}%`, top: `${getXY(garage.lat, garage.lng).y}%` }}
            >
              <div className="w-8 h-8 rounded-xl bg-white border-2 border-orange-500 flex items-center justify-center shadow-md">
                <img src={garage.logo} alt={garage.name} className="w-7 h-7 rounded-lg object-cover" />
              </div>
              <div className="bg-orange-600 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md mt-1 shadow-sm whitespace-nowrap">
                {garage.name}
              </div>
            </div>
          )}

          {/* MECHANIC VEHICLE PIN (Animating along the route) */}
          {garage && mechanic && ['en_route', 'arrived', 'diagnosing', 'repaired', 'completed'].includes(status) && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-25"
              style={{ left: `${mechanicXY.x}%`, top: `${mechanicXY.y}%` }}
            >
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center shadow-xl"
              >
                <Navigation size={14} className="text-white fill-white rotate-45" />
              </motion.div>
              <div className="bg-slate-900 border border-slate-800 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md mt-1 shadow-md whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {mechanic.name.split(' ')[0]}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Map Footer Details overlay */}
      {showDetails && (
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl shadow-xl backdrop-blur-sm z-20 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-orange-500 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <p className="text-[10px] text-slate-400 font-medium">CURRENT COORDINATES</p>
              <p className="text-xs font-semibold font-mono text-orange-400">1.9462° S, 30.0612° E</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-medium">GPS STATUS</p>
            <p className="text-xs font-semibold text-emerald-400 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Connected
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
