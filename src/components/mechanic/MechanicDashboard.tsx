import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Wrench, Phone, MessageSquare, Navigation, CheckCircle2,
  Upload, LogOut, ArrowRight, ShieldAlert, Users, Star
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
  state, activeMechanic, onUpdateStatus, onCallDriver, onMessageDriver
}: MechanicDashboardProps) {
  const [online, setOnline] = useState(true);
  const [showCallOverlay, setShowCallOverlay] = useState(false);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'job' | 'team'>('job');
  const [repairNotes, setRepairNotes] = useState('');
  const [repairPhoto, setRepairPhoto] = useState<string | null>(null);

  const activeReq = state.driverRequest?.mechanic?.id === activeMechanic.id
    ? state.driverRequest : null;

  const teamMechanics = state.mechanics.filter(m => m.garageId === activeMechanic.garageId);

  const liveMe = state.mechanics.find(m => m.id === activeMechanic.id) ?? activeMechanic;

  const dotClass = (s: Mechanic['status']) =>
    s === 'available' ? 'bg-emerald-400 animate-pulse'
    : s === 'on_duty' ? 'bg-orange-400 animate-pulse'
    : 'bg-slate-500';
  const textClass = (s: Mechanic['status']) =>
    s === 'available' ? 'text-emerald-400'
    : s === 'on_duty' ? 'text-orange-400'
    : 'text-slate-500';
  const label = (s: Mechanic['status']) =>
    s === 'available' ? 'Available' : s === 'on_duty' ? 'On Duty' : 'Offline';

  if (!online) {
    return (
      <div className="h-full flex flex-col relative bg-slate-900">
        <div className="absolute top-0 inset-x-0 h-8 bg-black/20 z-40 px-6 flex justify-between items-center text-[10px] font-bold text-white/60">
          <span>12:30</span><span>92%</span>
        </div>
        <div className="flex-1 pt-8 flex flex-col items-center justify-center text-center p-6 bg-slate-900 text-white">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-4"><LogOut size={24} /></div>
          <h3 className="font-extrabold text-sm mb-1">You are Offline</h3>
          <p className="text-[10px] text-slate-400 max-w-[200px] mb-6">Go online to start receiving assignments in Kigali.</p>
          <button onClick={() => setOnline(true)} className="w-full max-w-[240px] py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all">
            Go Online
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative bg-slate-900">
      {/* Status bar */}
      <div className="absolute top-0 inset-x-0 h-8 bg-black/20 z-40 px-6 flex justify-between items-center text-[10px] font-bold text-white/60">
        <span>12:30</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span>92%</span>
        </div>
      </div>

      <div className="flex-1 pt-8 overflow-hidden flex flex-col bg-slate-900 text-white">

        {/* HEADER */}
        <div className="px-4 pb-3 pt-1 bg-slate-950 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img src={activeMechanic.avatar} alt="" className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${dotClass(liveMe.status)}`} />
            </div>
            <div>
              <p className="font-extrabold text-xs leading-none">{activeMechanic.name}</p>
              <span className={`text-[8px] font-bold uppercase ${textClass(liveMe.status)}`}>
                {label(liveMe.status)}{activeReq ? ' · Job Active' : ''}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Drive Safe" className="w-5 h-5 object-contain opacity-40" />
            <button onClick={() => setOnline(false)} className="text-[9px] font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl">
              Offline
            </button>
          </div>
        </div>

        {/* TAB BAR */}
        <div className="flex px-3 pt-2 pb-1 gap-1.5 bg-slate-950 border-b border-slate-800 shrink-0">
          <button onClick={() => setActiveTab('job')}
            className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-wide flex items-center justify-center gap-1 transition-all relative ${activeTab === 'job' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>
            <Wrench size={11} /> My Job
            {activeReq && <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
          </button>
          <button onClick={() => setActiveTab('team')}
            className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-wide flex items-center justify-center gap-1 transition-all ${activeTab === 'team' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>
            <Users size={11} /> Team ({teamMechanics.length})
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto flex flex-col">

          {/* ── JOB TAB: no active job ── */}
          {activeTab === 'job' && !activeReq && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex-1 relative flex flex-col items-center justify-center text-center px-6">
                <div className="absolute inset-0 opacity-15"><MockMap status="idle" garage={null} mechanic={null} showDetails={false} /></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-3 relative">
                    <span className="absolute -inset-2 rounded-full bg-orange-500/5 animate-ping" />
                    <Wrench size={20} className="animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <h3 className="font-extrabold text-sm mb-1">No active job</h3>
                  <p className="text-[10px] text-slate-400 max-w-[200px]">Waiting for garage dispatch. Stay online to receive assignments.</p>
                </div>
              </div>
              <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
                <span className="text-[8px] text-slate-500 font-bold block mb-0.5">GPS TRACKER</span>
                <span className="text-[9px] font-black text-emerald-400 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live · {activeMechanic.lat.toFixed(4)}° S
                </span>
              </div>
            </div>
          )}

          {/* ── JOB TAB: active job ── */}
          {activeTab === 'job' && activeReq && (
            <div className="flex-1 flex flex-col">
              {/* Map */}
              <div className="h-36 relative border-b border-slate-800 shrink-0">
                <MockMap status={activeReq.status} garage={activeReq.garage} mechanic={activeMechanic} showDetails={false} />
                <div className="absolute top-2 left-2 bg-slate-950/90 border border-slate-800 text-[8px] px-2 py-0.5 rounded-lg flex items-center gap-1 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> SOS #{activeReq.id}
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-950/80 border border-slate-800 text-[8px] px-2 py-0.5 rounded-lg flex items-center gap-1 text-white">
                  <Navigation size={9} className="rotate-45 text-orange-500" /> Route Active
                </div>
              </div>

              {/* Scrollable job details */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {/* Driver */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                    <span className="text-[8px] text-slate-500 font-black uppercase tracking-wider">DRIVER</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => setShowCallOverlay(true)} className="w-7 h-7 rounded-lg bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white flex items-center justify-center transition-colors"><Phone size={12} /></button>
                      <button onClick={onMessageDriver} className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"><MessageSquare size={12} /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={activeReq.driver.avatar} alt="Driver" className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-xs">{activeReq.driver.name}</p>
                      <p className="text-[9px] text-slate-400">{activeReq.driver.phone}</p>
                      <p className="text-[9px] text-orange-400 font-bold">{activeReq.driver.vehicle.model} · {activeReq.driver.vehicle.plate}</p>
                    </div>
                  </div>
                </div>

                {/* Incident */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
                  <span className="text-[8px] text-slate-500 font-black uppercase tracking-wider block mb-1.5">INCIDENT</span>
                  <p className="text-xs font-black flex items-center gap-1.5 mb-1.5"><Wrench size={13} className="text-orange-500" /> {activeReq.problemType}</p>
                  <p className="text-[10px] text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800 italic leading-normal">"{activeReq.details || 'No message left by driver.'}"</p>
                  {activeReq.photo && <img src={activeReq.photo} alt="Issue" className="rounded-xl w-full h-20 object-cover mt-2" />}
                </div>

                {/* Repair report form */}
                {showCompleteForm && (
                  <div className="bg-slate-950 border border-orange-500/30 rounded-2xl p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-orange-500 uppercase">SERVICE REPORT</span>
                      <button onClick={() => setShowCompleteForm(false)} className="text-slate-400 hover:text-white"><X size={14} /></button>
                    </div>
                    <textarea value={repairNotes} onChange={(e) => setRepairNotes(e.target.value)}
                      placeholder="Describe repair actions..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-[10px] text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 min-h-[50px] resize-none" />
                    {!repairPhoto
                      ? <button onClick={() => setRepairPhoto('https://images.unsplash.com/photo-1517524006039-e8b44957122e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')}
                          className="w-full py-2.5 border border-dashed border-slate-800 bg-slate-900 rounded-xl flex items-center justify-center gap-1.5 text-slate-400 hover:text-slate-300 text-[9px] font-bold">
                          <Upload size={12} /> Attach Repair Photo
                        </button>
                      : <div className="relative h-16 rounded-xl overflow-hidden border border-slate-800">
                          <img src={repairPhoto} alt="Repair" className="w-full h-full object-cover" />
                          <button onClick={() => setRepairPhoto(null)} className="absolute top-1 right-1 bg-black/80 p-0.5 rounded-full text-white"><X size={10} /></button>
                        </div>
                    }
                    <button onClick={() => { onUpdateStatus('completed', repairNotes, repairPhoto || undefined); setShowCompleteForm(false); }}
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[10px] uppercase rounded-xl transition-all">
                      Submit & Close Ticket
                    </button>
                  </div>
                )}
              </div>

              {/* Action bar */}
              {!showCompleteForm && (
                <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
                  {activeReq.status === 'mechanic_assigned' && (
                    <button onClick={() => onUpdateStatus('en_route')}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all">
                      Start Journey (On the Way) <ArrowRight size={14} />
                    </button>
                  )}
                  {activeReq.status === 'en_route' && (
                    <button onClick={() => onUpdateStatus('arrived')}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all">
                      Mark as Arrived <Check size={14} />
                    </button>
                  )}
                  {activeReq.status === 'arrived' && (
                    <button onClick={() => onUpdateStatus('diagnosing')}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all">
                      Start Diagnostics <Wrench size={14} />
                    </button>
                  )}
                  {activeReq.status === 'diagnosing' && (
                    <div className="flex gap-2">
                      <button onClick={() => setShowCompleteForm(true)}
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase rounded-2xl flex items-center justify-center gap-1.5 transition-all">
                        <CheckCircle2 size={14} /> Complete
                      </button>
                      <button onClick={() => onUpdateStatus('towing', 'Vehicle cannot be repaired on site. Tow truck required.')}
                        className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-red-400 font-extrabold text-xs uppercase rounded-2xl border border-slate-800 flex items-center justify-center gap-1 transition-all">
                        <ShieldAlert size={14} /> Tow
                      </button>
                    </div>
                  )}
                  {activeReq.status === 'towing' && (
                    <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 flex items-center gap-2.5">
                      <ShieldAlert size={18} className="text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] font-extrabold text-amber-300">Tow Truck Dispatched</p>
                        <p className="text-[8px] text-slate-400 leading-snug">Garage notified. Stay with the driver until tow truck arrives.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── TEAM TAB ── */}
          {activeTab === 'team' && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-extrabold">Team Roster</h3>
                <span className="text-[9px] text-slate-400">
                  {teamMechanics.filter(m => m.status === 'available').length} available ·{' '}
                  {teamMechanics.filter(m => m.status === 'on_duty').length} on duty
                </span>
              </div>

              {teamMechanics.map((mech) => {
                const live = state.mechanics.find(m => m.id === mech.id) ?? mech;
                const isMe = mech.id === activeMechanic.id;
                return (
                  <div key={mech.id} className={`bg-slate-950 border rounded-2xl p-3 flex items-center gap-3 ${live.status === 'on_duty' ? 'border-orange-500/40' : 'border-slate-800'}`}>
                    <div className="relative shrink-0">
                      <img src={mech.avatar} alt={mech.name} className="w-10 h-10 rounded-xl object-cover border border-slate-800" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${dotClass(live.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold truncate">{mech.name}</p>
                        {isMe && <span className="text-[7px] bg-orange-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase shrink-0">You</span>}
                      </div>
                      <p className="text-[9px] text-slate-400">{mech.phone}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[8px] font-black ${textClass(live.status)} flex items-center gap-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotClass(live.status)}`} />
                          {label(live.status)}
                        </span>
                        {live.status === 'on_duty' && (
                          <span className="text-[7px] text-slate-500">· Not available for new jobs</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-0.5 justify-end mb-0.5">
                        <Star size={9} className="fill-amber-500 text-amber-500" />
                        <span className="text-[9px] font-bold text-amber-400">{mech.rating}</span>
                      </div>
                      <span className="text-[8px] text-slate-500">{mech.reviews} jobs</span>
                    </div>
                  </div>
                );
              })}

              {/* Legend */}
              <div className="mt-2 bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-1.5">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">STATUS LEGEND</p>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" /><span className="text-[9px] text-slate-300">Available — Ready for new assignments</span></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shrink-0" /><span className="text-[9px] text-slate-300">On Duty — Handling a job, not available</span></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" /><span className="text-[9px] text-slate-300">Offline — Not reachable</span></div>
              </div>
            </div>
          )}

        </div>{/* end scrollable body */}
      </div>{/* end flex-1 */}

      {/* CALL OVERLAY */}
      <AnimatePresence>
        {showCallOverlay && activeReq && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-between p-12 text-white">
            <div className="flex flex-col items-center mt-20">
              <div className="w-24 h-24 bg-white/10 rounded-full border border-white/20 p-2 animate-pulse mb-6">
                <img src={activeReq.driver.avatar} alt="Driver" className="w-full h-full rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-black">{activeReq.driver.name}</h3>
              <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mt-1">Dialing Driver...</p>
              <p className="text-slate-400 text-xs mt-3">{activeReq.driver.phone}</p>
            </div>
            <button onClick={() => setShowCallOverlay(false)}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-red-600 transition-colors active:scale-90">
              <Phone size={24} className="rotate-[135deg]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
