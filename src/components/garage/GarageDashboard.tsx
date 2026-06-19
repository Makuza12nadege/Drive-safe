import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, AlertTriangle, MapPin, Check, X, Wrench, Clock, Star,
  Plus, Users, History, MessageSquare, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, Garage, Mechanic } from '../../types';
import logo from '../../Logo.png';

interface GarageDashboardProps {
  state: AppState;
  activeGarage: Garage;
  onAcceptRequest: () => void;
  onDeclineRequest: () => void;
  onAssignMechanic: (mechanic: Mechanic) => void;
  onAddMechanic: (name: string, phone: string, services: string[]) => void;
  onToggleSOS: (active: boolean) => void;
}

export function GarageDashboard({
  state,
  activeGarage,
  onAcceptRequest,
  onDeclineRequest,
  onAssignMechanic,
  onAddMechanic,
  onToggleSOS,
}: GarageDashboardProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'mechanics' | 'history' | 'reviews'>('requests');
  const [sosEnabled, setSosEnabled] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mechName, setMechName] = useState('');
  const [mechPhone, setMechPhone] = useState('');
  const [mechSkills, setMechSkills] = useState('Diagnostics, Flat tire, Engine');
  const [workingHours, setWorkingHours] = useState('08:00 AM – 08:00 PM');
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [towDispatched, setTowDispatched] = useState(false);

  // Floating notification toast for garage
  const [garageNotif, setGarageNotif] = useState<{title: string; message: string} | null>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevNotifCount = useRef(state.garageNotifications.length);

  useEffect(() => {
    const current = state.garageNotifications.length;
    if (current > prevNotifCount.current) {
      const latest = state.garageNotifications[0];
      if (latest) {
        setGarageNotif({ title: latest.title, message: latest.message });
        if (notifTimer.current) clearTimeout(notifTimer.current);
        notifTimer.current = setTimeout(() => setGarageNotif(null), 6000);
      }
    }
    prevNotifCount.current = current;
  }, [state.garageNotifications]);

  const garageMechanics = state.mechanics.filter((m) => m.garageId === activeGarage.id);
  const activeReq =
    state.driverRequest && state.driverRequest.garage?.id === activeGarage.id
      ? state.driverRequest
      : null;

  const tabs = [
    { key: 'requests', label: 'SOS', icon: AlertTriangle },
    { key: 'mechanics', label: 'Team', icon: Users },
    { key: 'history', label: 'History', icon: History },
    { key: 'reviews', label: 'Reviews', icon: Star },
  ] as const;

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col overflow-hidden relative">

      {/* ── FLOATING NOTIFICATION TOAST ── */}
      <AnimatePresence>
        {garageNotif && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute top-12 inset-x-3 z-50"
          >
            <div className="bg-slate-950 border border-orange-500/30 rounded-2xl px-4 py-3 flex items-start gap-3 shadow-2xl">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bell size={14} className="text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-white leading-tight">{garageNotif.title}</p>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-snug line-clamp-3">{garageNotif.message}</p>
              </div>
              <button
                onClick={() => setGarageNotif(null)}
                className="text-slate-500 hover:text-white shrink-0 mt-0.5"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <div className="bg-slate-950 px-4 pt-9 pb-3 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src={activeGarage.logo}
            alt={activeGarage.name}
            className="w-9 h-9 rounded-xl object-cover border border-slate-800"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-black tracking-tight leading-none">{activeGarage.name}</h2>
              {activeGarage.verified && (
                <span className="bg-emerald-500/10 text-emerald-400 font-extrabold text-[7px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-500/20">
                  <ShieldCheck size={8} /> VERIFIED
                </span>
              )}
            </div>
            <p className="text-[9px] text-slate-400 font-medium mt-0.5">Kigali Operations Desk</p>
          </div>
        </div>

        {/* SOS toggle + logo */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <span className="text-[7px] text-slate-500 font-bold block uppercase tracking-widest">SOS Desk</span>
            <span className={`text-[9px] font-black ${sosEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>
              {sosEnabled ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
          <button
            onClick={() => { const v = !sosEnabled; setSosEnabled(v); onToggleSOS(v); }}
            className={`w-10 h-5 rounded-full p-0.5 transition-all duration-300 ${sosEnabled ? 'bg-orange-500' : 'bg-slate-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${sosEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
          <img src={logo} alt="Drive Safe" className="w-5 h-5 object-contain opacity-40" />
        </div>
      </div>

      {/* ── TOP TAB BAR ── */}
      <div className="bg-slate-950 px-3 pb-2 flex gap-1 shrink-0 border-b border-slate-800">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex flex-col items-center py-2 rounded-xl text-[9px] font-black uppercase tracking-wide transition-all relative ${
              activeTab === key
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Icon size={13} className="mb-0.5" />
            {label}
            {key === 'requests' && activeReq && (activeReq.status === 'requested' || activeReq.status === 'towing') && (
              <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-ping ${
                activeReq.status === 'towing' ? 'bg-amber-400' : 'bg-red-500'
              }`} />
            )}
          </button>
        ))}
      </div>

      {/* ── SCROLLABLE MAIN CONTENT ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ════════════════ REQUESTS TAB ════════════════ */}
        {activeTab === 'requests' && (
          <div className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-white">Emergency Dispatch</h3>
              <span className="text-[8px] text-slate-500 font-medium">Monitoring Kigali GPS</span>
            </div>

            {activeReq ? (
              <>
                {/* Status badge */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${
                  activeReq.status === 'requested'
                    ? 'border-red-500/50 bg-red-500/5'
                    : 'border-orange-500/30 bg-orange-500/5'
                }`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    activeReq.status === 'requested' ? 'bg-red-500 animate-ping' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-extrabold text-white uppercase tracking-wider truncate">
                      {activeReq.status === 'requested' ? 'INCOMING EMERGENCY REQUEST' : 'ACTIVE ASSISTANCE JOB'}
                    </p>
                  </div>
                  <span className="text-[8px] font-black text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full shrink-0 uppercase">
                    {activeReq.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Driver card */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center gap-3">
                  <img src={activeReq.driver.avatar} alt="Driver" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs truncate">{activeReq.driver.name}</h5>
                    <p className="text-[9px] text-slate-400 font-semibold">{activeReq.driver.phone}</p>
                    <p className="text-[9px] text-slate-300 font-bold">{activeReq.driver.vehicle.model} · {activeReq.driver.vehicle.plate}</p>
                  </div>
                </div>

                {/* Problem & location */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2">
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">PROBLEM</span>
                    <span className="text-xs font-extrabold text-orange-400 flex items-center gap-1.5">
                      <Wrench size={12} /> {activeReq.problemType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">GPS LOCATION</span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1">
                      <MapPin size={10} className="text-slate-500 shrink-0" /> Kigali, Kiyovu · KN 3 Rd
                    </span>
                  </div>
                  {activeReq.details ? (
                    <div>
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">DRIVER NOTES</span>
                      <p className="text-[9px] text-slate-300 italic bg-slate-900 p-2 rounded-xl border border-slate-800 leading-relaxed">
                        "{activeReq.details}"
                      </p>
                    </div>
                  ) : null}
                  {activeReq.photo ? (
                    <img src={activeReq.photo} alt="Issue" className="rounded-xl w-full h-24 object-cover border border-slate-800" />
                  ) : null}
                </div>

                {/* Accept / Decline */}
                {activeReq.status === 'requested' && (
                  <div className="flex gap-2">
                    <button
                      onClick={onAcceptRequest}
                      className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-all"
                    >
                      <Check size={13} /> Accept
                    </button>
                    <button
                      onClick={onDeclineRequest}
                      className="py-2.5 px-4 bg-slate-900 border border-slate-800 text-slate-400 font-extrabold text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-all hover:bg-slate-800"
                    >
                      <X size={13} /> Decline
                    </button>
                  </div>
                )}

                {activeReq.status === 'accepted' && (
                  <div className="bg-slate-950 border border-orange-500/30 rounded-2xl p-3 text-center">
                    <p className="text-[9px] font-bold text-orange-400 animate-pulse flex items-center justify-center gap-1">
                      <Clock size={10} /> ACCEPTED — ASSIGN A MECHANIC BELOW
                    </p>
                  </div>
                )}

                {activeReq.mechanic && !['requested', 'accepted'].includes(activeReq.status) && (
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={activeReq.mechanic.avatar} className="w-7 h-7 rounded-lg object-cover" alt="Mech" />
                      <div>
                        <p className="text-[8px] text-slate-500 font-semibold">DISPATCHED</p>
                        <p className="text-[10px] font-bold text-white">{activeReq.mechanic.name}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border ${
                      activeReq.status === 'towing'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {activeReq.status === 'towing' ? '🚛 Towing' : 'En Route'}
                    </span>
                  </div>
                )}

                {/* Towing alert for garage */}
                {activeReq.status === 'towing' && (
                  <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 3h15v13H1z" strokeLinejoin="round"/>
                          <path d="M16 8h4l3 3v5h-7V8z" strokeLinejoin="round"/>
                          <circle cx="5.5" cy="18.5" r="2.5"/>
                          <circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-white">🚛 Tow Required</p>
                        <p className="text-[9px] text-slate-400 leading-snug">
                          <span className="font-bold text-orange-400">{activeReq.mechanic?.name}</span> says vehicle cannot be fixed on-site.
                        </p>
                      </div>
                    </div>

                    {/* Job details */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 space-y-0.5">
                      <p className="text-[9px] text-slate-300 font-semibold">
                        Driver: <span className="text-white font-bold">{activeReq.driver.name}</span>
                      </p>
                      <p className="text-[9px] text-slate-300 font-semibold">
                        Vehicle: <span className="text-white font-bold">{activeReq.driver.vehicle.model} · {activeReq.driver.vehicle.plate}</span>
                      </p>
                      <p className="text-[9px] text-slate-300 font-semibold">
                        Location: <span className="text-amber-400 font-bold">Kigali, Kiyovu · KN 3 Rd</span>
                      </p>
                    </div>

                    {/* Action */}
                    {!towDispatched ? (
                      <button
                        onClick={() => setTowDispatched(true)}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 3h15v13H1z" strokeLinejoin="round"/>
                          <path d="M16 8h4l3 3v5h-7V8z" strokeLinejoin="round"/>
                          <circle cx="5.5" cy="18.5" r="2.5"/>
                          <circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                        Confirm Tow Dispatch
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <p className="text-[9px] text-emerald-300 font-bold">
                          ✓ Tow truck dispatched — En route to driver location
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Mechanic assignment list (shown when accepted) */}
                {activeReq.status === 'accepted' && (
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">AVAILABLE MECHANICS</p>
                    {garageMechanics.map((mech) => {
                      const isAssigned = activeReq.mechanic?.id === mech.id;
                      return (
                        <div
                          key={mech.id}
                          className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${
                            isAssigned ? 'border-orange-500 bg-orange-500/5' : 'border-slate-800 bg-slate-950'
                          }`}
                        >
                          <img src={mech.avatar} alt={mech.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">{mech.name}</p>
                            <div className="flex items-center gap-1.5 text-[8px] mt-0.5">
                              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                <Star size={8} className="fill-amber-500" /> {mech.rating}
                              </span>
                              <span className="text-slate-600">·</span>
                              <span className={`font-bold flex items-center gap-1 ${mech.status === 'available' ? 'text-emerald-400' : 'text-slate-500'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${mech.status === 'available' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                                {mech.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          {mech.status === 'available' && (
                            <button
                              onClick={() => onAssignMechanic(mech)}
                              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[9px] uppercase tracking-wide rounded-lg transition-all shrink-0"
                            >
                              Assign
                            </button>
                          )}
                          {isAssigned && (
                            <span className="text-[8px] font-black text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-lg uppercase shrink-0">
                              Assigned
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              /* No active request */
              <div className="border border-dashed border-slate-800 rounded-3xl py-10 px-5 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-3 animate-pulse">
                  <AlertTriangle size={22} />
                </div>
                <h4 className="font-extrabold text-xs text-slate-300 mb-1">No Active SOS Calls</h4>
                <p className="text-[9px] text-slate-500 max-w-[220px]">
                  Drive Safe is monitoring Kiyovu, Nyabugogo, and Gikondo. Pings appear here instantly.
                </p>
              </div>
            )}

            {/* Working hours card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1">
                  <Clock size={9} className="text-orange-500" /> WORKING HOURS
                </span>
                {!isEditingHours && (
                  <button onClick={() => setIsEditingHours(true)} className="text-[9px] text-orange-500 font-bold hover:underline">Edit</button>
                )}
              </div>
              {isEditingHours ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 text-[10px] rounded-lg px-2 py-1 text-white focus:outline-none focus:border-orange-500"
                  />
                  <button onClick={() => setIsEditingHours(false)} className="bg-orange-500 text-white text-[9px] px-3 py-1 font-bold rounded-lg">Save</button>
                </div>
              ) : (
                <p className="text-[10px] font-black text-slate-300">{workingHours}</p>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ MECHANICS TAB ════════════════ */}
        {activeTab === 'mechanics' && (
          <div className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-white">Mechanics Roster</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9px] uppercase px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
              >
                <Plus size={11} /> {showAddForm ? 'Close' : 'Add'}
              </button>
            </div>

            {showAddForm && (
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ADD NEW MECHANIC</p>
                <input
                  type="text" value={mechName} onChange={(e) => setMechName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="tel" value={mechPhone} onChange={(e) => setMechPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text" value={mechSkills} onChange={(e) => setMechSkills(e.target.value)}
                  placeholder="Skills (comma separated)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => {
                    if (mechName && mechPhone) {
                      onAddMechanic(mechName, mechPhone, mechSkills.split(',').map((s) => s.trim()));
                      setMechName(''); setMechPhone(''); setShowAddForm(false);
                    }
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase py-2 rounded-xl transition-all"
                >
                  Save Mechanic
                </button>
              </div>
            )}

            <div className="space-y-2">
              {garageMechanics.map((mech) => {
                const live = state.mechanics.find(m => m.id === mech.id) ?? mech;
                return (
                  <div key={mech.id} className={`bg-slate-950 border rounded-2xl p-3 flex items-center gap-3 ${
                    live.status === 'on_duty' ? 'border-orange-500/30' : 'border-slate-800'
                  }`}>
                    <div className="relative shrink-0">
                      <img src={mech.avatar} alt={mech.name} className="w-11 h-11 rounded-xl object-cover border border-slate-800" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                        live.status === 'available' ? 'bg-emerald-400 animate-pulse'
                        : live.status === 'on_duty' ? 'bg-orange-400 animate-pulse'
                        : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-xs truncate">{mech.name}</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">{mech.phone}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[8px] text-amber-500 font-bold flex items-center gap-0.5">
                          <Star size={8} className="fill-amber-500" /> {mech.rating}
                        </span>
                        <span className="text-[8px] text-slate-500">· {mech.reviews} jobs</span>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full border shrink-0 ${
                      live.status === 'available'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : live.status === 'on_duty'
                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}>
                      {live.status === 'available' ? 'Available' : live.status === 'on_duty' ? 'On Duty' : 'Offline'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════ HISTORY TAB ════════════════ */}
        {activeTab === 'history' && (
          <div className="p-3 space-y-3">
            <h3 className="text-xs font-extrabold text-white">Job History</h3>
            {state.registeredHistory
              .filter((h) => h.garage?.id === activeGarage.id)
              .map((hist) => (
                <div key={hist.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={hist.driver.avatar} alt="Driver" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{hist.driver.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{hist.driver.vehicle.plate}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[8px] text-slate-500 font-medium">{hist.timestamp}</p>
                      {hist.rating && (
                        <span className="text-[9px] text-amber-500 font-black flex items-center gap-0.5 justify-end">
                          <Star size={9} className="fill-amber-500" /> {hist.rating}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-slate-800 pt-2">
                    <span className="text-[9px] font-bold text-orange-400 flex items-center gap-1">
                      <Wrench size={10} /> {hist.problemType}
                    </span>
                    {hist.mechanic && (
                      <>
                        <span className="text-slate-700">·</span>
                        <span className="text-[9px] text-slate-400 font-medium">{hist.mechanic.name}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            {state.registeredHistory.filter((h) => h.garage?.id === activeGarage.id).length === 0 && (
              <div className="text-center py-10">
                <p className="text-[10px] text-slate-500">No job history yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ════════════════ REVIEWS TAB ════════════════ */}
        {activeTab === 'reviews' && (
          <div className="p-3 space-y-3">
            {/* Rating summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-black text-white leading-none">{activeGarage.rating}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={10} className={s <= Math.round(activeGarage.rating) ? 'fill-amber-500 text-amber-500' : 'text-slate-700'} />
                  ))}
                </div>
                <p className="text-[8px] text-slate-500 mt-0.5">{activeGarage.reviews} reviews</p>
              </div>
              <div className="flex-1 space-y-1">
                {[5,4,3,2,1].map((star) => {
                  const count = state.registeredHistory.filter(
                    (h) => h.garage?.id === activeGarage.id && h.rating === star
                  ).length;
                  const total = state.registeredHistory.filter(
                    (h) => h.garage?.id === activeGarage.id && h.rating
                  ).length || 1;
                  return (
                    <div key={star} className="flex items-center gap-1.5">
                      <span className="text-[8px] text-slate-400 w-2">{star}</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all"
                          style={{ width: `${(count / total) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <h3 className="text-xs font-extrabold text-white">Customer Reviews</h3>
            {state.registeredHistory
              .filter((h) => h.garage?.id === activeGarage.id && h.review)
              .map((hist) => (
                <div key={hist.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={hist.driver.avatar} alt="Driver" className="w-7 h-7 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold truncate">{hist.driver.name}</p>
                        <p className="text-[8px] text-slate-500">{hist.problemType} · {hist.mechanic?.name}</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-amber-500 font-black bg-amber-500/10 px-2 py-0.5 rounded-lg flex items-center gap-0.5 shrink-0">
                      <Star size={9} className="fill-amber-500" /> {hist.rating}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 italic pl-9 border-l-2 border-orange-500/40 leading-relaxed">
                    "{hist.review}"
                  </p>
                </div>
              ))}
            {state.registeredHistory.filter((h) => h.garage?.id === activeGarage.id && h.review).length === 0 && (
              <div className="text-center py-8">
                <p className="text-[10px] text-slate-500">No reviews yet.</p>
              </div>
            )}
          </div>
        )}

      </div>{/* end scrollable */}
    </div>
  );
}
