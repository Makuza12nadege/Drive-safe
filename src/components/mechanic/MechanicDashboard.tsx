import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, MapPin, User, Check, X, Wrench, Phone, MessageSquare,
  Navigation, CheckCircle2, Upload, AlertCircle, Sparkles, LogOut, ArrowRight, ShieldAlert
} from 'lucide-react';
import { AppState, Mechanic, EmergencyRequest } from '../../types';
import { MockMap } from '../shared/MockMap';
import logo from '../../Logo.png';

interface MechanicDashboardProps {
  state: AppState;
  activeMechanic: Mechanic;
  onUpdateStatus: (status: EmergencyRequest['status'], notes?: string, photo?: string) => void;
  onCallDriver: () => void;
  onMessageDriver: () => void;
}

export function MechanicDashboard({
  state,
  activeMechanic,
  onUpdateStatus,
  onCallDriver,
  onMessageDriver
}: MechanicDashboardProps) {
  const [online, setOnline] = useState(true);
  const [showCallOverlay, setShowCallOverlay] = useState(false);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  
  // Repair report fields
  const [repairNotes, setRepairNotes] = useState('');
  const [repairPhoto, setRepairPhoto] = useState<string | null>(null);

  // Active assignment filter
  const activeReq = state.driverRequest && state.driverRequest.mechanic?.id === activeMechanic.id ? state.driverRequest : null;

  // Simulate repair photo attachment
  const attachRepairPhoto = () => {
    // alternator repair or patch tyre
    const photos = [
      'https://images.unsplash.com/photo-1517524006039-e8b44957122e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // alternator repair
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ];
    setRepairPhoto(photos[0]);
  };

  const renderMechanicApp = () => {
    if (!online) {
      return (
        <div className="h-full bg-slate-900 text-white flex flex-col justify-between p-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-4">
              <LogOut size={24} />
            </div>
            <h3 className="font-extrabold text-sm mb-1">You are Offline</h3>
            <p className="text-[10px] text-slate-400 max-w-[200px]">
              Set your status to online to start receiving roadside rescue assignments in Kigali.
            </p>
          </div>
          <button
            onClick={() => setOnline(true)}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all"
          >
            Go Online
          </button>
        </div>
      );
    }

    if (!activeReq) {
      return (
        <div className="h-full bg-slate-900 text-white flex flex-col justify-between">
          {/* Header */}
          <div className="px-5 pt-8 pb-4 bg-slate-950 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <img src={activeMechanic.avatar} alt="Mechanic" className="w-8 h-8 rounded-lg object-cover" />
              <div>
                <h4 className="font-extrabold text-xs">{activeMechanic.name}</h4>
                <span className="text-[8px] bg-orange-500/10 text-orange-500 border border-orange-500/20 font-black px-1.5 py-0.2 rounded-full uppercase">
                  {activeMechanic.services[0]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Drive Safe" className="w-5 h-5 object-contain opacity-50" />
              <button
                onClick={() => setOnline(false)}
                className="text-[9px] font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl"
              >
                Go Offline
              </button>
            </div>
          </div>

          {/* Map & Scan */}
          <div className="flex-1 relative flex flex-col justify-center items-center text-center px-6">
            <div className="absolute inset-0 opacity-20">
              <MockMap status="idle" garage={null} mechanic={null} showDetails={false} />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-4 relative">
                <span className="absolute -inset-2 rounded-full bg-orange-500/5 animate-ping"></span>
                <Wrench size={22} className="animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <h3 className="font-extrabold text-sm mb-1">Waiting for assignments</h3>
              <p className="text-[10px] text-slate-400 max-w-[220px]">
                Drive Safe dispatchers are looking for drivers stranded near Kiyovu & KN 3 Rd.
              </p>
            </div>
          </div>

          {/* Location status overlay */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
            <span className="text-[8px] text-slate-500 font-bold block mb-1">GPS TRACKER STATUS</span>
            <span className="text-[9px] font-black text-emerald-400 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live • Kigali Center Lat: {activeMechanic.lat.toFixed(4)}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-slate-950 text-white flex flex-col justify-between relative">
        {/* Map Header details */}
        <div className="px-5 pt-8 pb-4 bg-slate-950 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <div>
              <h4 className="font-black text-xs">ACTIVE SOS JOB</h4>
              <p className="text-[8px] text-slate-400 font-semibold">Incident #{activeReq.id}</p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-lg uppercase">
            {activeReq.status.replace('_', ' ')}
          </span>
        </div>

        {/* Small Navigation Viewport */}
        <div className="h-40 relative border-b border-slate-800">
          <MockMap 
            status={activeReq.status} 
            garage={activeReq.garage} 
            mechanic={activeMechanic} 
            showDetails={false} 
          />
          <div className="absolute bottom-2 left-2 bg-slate-950/80 border border-slate-800 text-[8px] px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Navigation size={10} className="rotate-45 text-orange-500" /> Route Active
          </div>
        </div>

        {/* Driver/Incident info - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Driver Card details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
            <div className="flex justify-between items-start border-b border-slate-800 pb-2 mb-2">
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">DRIVER INFORMATION</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCallOverlay(true)}
                  className="w-7 h-7 rounded-lg bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Phone size={12} />
                </button>
                <button
                  onClick={onMessageDriver}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <MessageSquare size={12} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={activeReq.driver.avatar} alt="Driver" className="w-10 h-10 rounded-xl object-cover border border-slate-800" />
              <div>
                <h5 className="font-bold text-xs">{activeReq.driver.name}</h5>
                <p className="text-[9px] text-slate-400 font-semibold">{activeReq.driver.phone}</p>
                <p className="text-[10px] text-orange-500 font-extrabold mt-0.5">
                  {activeReq.driver.vehicle.model} • {activeReq.driver.vehicle.plate}
                </p>
              </div>
            </div>
          </div>

          {/* Job Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-1">INCIDENT DETAILS</span>
            <p className="text-xs font-black text-white flex items-center gap-1.5 mb-1.5">
              <Wrench size={13} className="text-orange-500" /> {activeReq.problemType}
            </p>
            <p className="text-[10px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-normal italic">
              "{activeReq.details || 'No message left by driver.'}"
            </p>
            {activeReq.photo && (
              <div className="mt-2">
                <span className="text-[8px] text-slate-500 font-bold block mb-1">INCIDENT PICTURE</span>
                <img src={activeReq.photo} alt="Puncture or engine" className="rounded-xl w-full h-24 object-cover" />
              </div>
            )}
          </div>

          {/* Complete Repair Form */}
          {showCompleteForm && (
            <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-orange-500 uppercase tracking-wider">SUBMIT SERVICE REPORT</span>
                <button onClick={() => setShowCompleteForm(false)} className="text-slate-400 hover:text-white">
                  <X size={14} />
                </button>
              </div>

              <div>
                <label className="text-[8px] font-bold text-slate-500 block mb-1">REPAIR NOTES & NOTES</label>
                <textarea
                  value={repairNotes}
                  onChange={(e) => setRepairNotes(e.target.value)}
                  placeholder="Describe repair actions (e.g. patched right rear tyre, checked pressure, tested battery recharge)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-[10px] text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 min-h-[50px] resize-none"
                />
              </div>

              <div>
                <label className="text-[8px] font-bold text-slate-500 block mb-1">COMPLETED JOB PHOTO</label>
                {!repairPhoto ? (
                  <button
                    onClick={attachRepairPhoto}
                    className="w-full py-3 border border-dashed border-slate-800 bg-slate-950 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-300"
                  >
                    <Upload size={14} className="mb-0.5" />
                    <span className="text-[9px] font-bold">Simulate Repair Picture</span>
                  </button>
                ) : (
                  <div className="relative h-20 rounded-xl overflow-hidden border border-slate-800">
                    <img src={repairPhoto} alt="Repair Done" className="w-full h-full object-cover" />
                    <button onClick={() => setRepairPhoto(null)} className="absolute top-1 right-1 bg-black/85 p-0.5 rounded-full text-white">
                      <X size={10} />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onUpdateStatus('completed', repairNotes, repairPhoto || undefined);
                  setShowCompleteForm(false);
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Submit & Close Ticket
              </button>
            </div>
          )}
        </div>

        {/* Update Job Status Timeline Controls */}
        {!showCompleteForm && (
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            {activeReq.status === 'mechanic_assigned' && (
              <button
                onClick={() => onUpdateStatus('en_route')}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-98"
              >
                Start Journey (On the Way)
                <ArrowRight size={14} />
              </button>
            )}

            {activeReq.status === 'en_route' && (
              <button
                onClick={() => onUpdateStatus('arrived')}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-98"
              >
                Mark as Arrived
                <Check size={14} />
              </button>
            )}

            {activeReq.status === 'arrived' && (
              <button
                onClick={() => onUpdateStatus('diagnosing')}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-98"
              >
                Start Diagnostics
                <Wrench size={14} />
              </button>
            )}

            {activeReq.status === 'diagnosing' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCompleteForm(true)}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={14} /> Complete Repair
                </button>
                <button
                  onClick={() => {
                    const towGarage = state.garages.find(g => g.id === 'g2');
                    alert('Towing vehicle dispatched from ' + (towGarage ? towGarage.name : 'Nyabugogo speedy towing') + '!');
                    onUpdateStatus('completed', 'Towing required. Vehicle towed to workshop.', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80');
                  }}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-red-400 font-extrabold text-xs uppercase tracking-wider rounded-2xl border border-slate-800 flex items-center justify-center gap-1 transition-all"
                >
                  <ShieldAlert size={14} /> Tow Car
                </button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- CALL OVERLAY (SIMULATED) -------------------- */}
        <AnimatePresence>
          {showCallOverlay && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-between p-12 text-white"
            >
              <div className="flex flex-col items-center mt-20">
                <div className="w-24 h-24 bg-white/10 rounded-full border border-white/20 p-2 animate-pulse mb-6">
                  <img 
                    src={activeReq.driver.avatar} 
                    alt="Driver" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-black">{activeReq.driver.name}</h3>
                <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mt-1">Dialing Driver...</p>
                <p className="text-slate-400 text-xs mt-3">{activeReq.driver.phone}</p>
              </div>

              <button
                onClick={() => setShowCallOverlay(false)}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-red-600 transition-colors active:scale-90"
              >
                <Phone size={24} className="rotate-[135deg]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative bg-slate-900">
      {/* Mobile Shell Status Bar Simulation */}
      <div className="absolute top-0 inset-x-0 h-8 bg-black/20 z-40 px-6 flex justify-between items-center text-[10px] font-bold text-white/60">
        <span>12:30</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
          <span className="w-2.5 h-1.5 bg-white/60 rounded-xs"></span>
          <span>92%</span>
        </div>
      </div>

      {/* Screen Content Wrapper with Status Bar padding */}
      <div className="flex-1 pt-8 overflow-hidden relative">
        {renderMechanicApp()}
      </div>
    </div>
  );
}
