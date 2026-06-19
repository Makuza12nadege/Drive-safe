import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, MapPin, User, LogIn, ChevronRight, Car, Fuel, 
  Settings, Heart, Bell, Star, ArrowLeft, Upload, CheckCircle2, Phone, MessageSquare,
  Wrench, Battery, HelpCircle, LogOut, Navigation, X, ShieldAlert, Sparkles, HelpingHand
} from 'lucide-react';
import { AppState, Garage, Mechanic, EmergencyRequest } from '../../types';
import { MockMap } from '../shared/MockMap';
import logo from '../../Logo.png';

interface DriverAppProps {
  state: AppState;
  onNavigate: (screen: AppState['currentScreen']) => void;
  onRequestAssistance: (problem: string, details: string, photo: string | null) => void;
  onSelectGarage: (garage: Garage) => void;
  onCancelRequest: () => void;
  onClearDeclined: () => void;
  onSubmitReview: (rating: number, review: string) => void;
  onRegister: (name: string, phone: string, model: string, plate: string) => void;
  isRegisteredMode: boolean;
  setIsRegisteredMode: (val: boolean) => void;
}

export function DriverApp({
  state,
  onNavigate,
  onRequestAssistance,
  onSelectGarage,
  onCancelRequest,
  onClearDeclined,
  onSubmitReview,
  onRegister,
  isRegisteredMode,
  setIsRegisteredMode
}: DriverAppProps) {
  const [selectedProblem, setSelectedProblem] = useState<string>('');
  const [problemDetails, setProblemDetails] = useState<string>('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  
  // Call / Chat Modals
  const [showCallModal, setShowCallModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  // Rating & Review State
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Quick Register Modal (for Guest Journey Completion)
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regModel, setRegModel] = useState('Toyota RAV4');
  const [regPlate, setRegPlate] = useState('RAD 123 A');

  // On-duty mechanic toast
  const [onDutyToast, setOnDutyToast] = useState<string | null>(null);

  // Floating notification toast (latest unread)
  const [visibleNotif, setVisibleNotif] = useState<{title: string; message: string} | null>(null);
  const notifTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Watch for new notifications and show them as a floating toast
  const prevNotifCount = React.useRef(state.notifications.length);
  useEffect(() => {
    const current = state.notifications.length;
    if (current > prevNotifCount.current) {
      const latest = state.notifications[0];
      if (latest) {
        setVisibleNotif({ title: latest.title, message: latest.message });
        if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
        notifTimerRef.current = setTimeout(() => setVisibleNotif(null), 5000);
      }
    }
    prevNotifCount.current = current;
  }, [state.notifications]);

  // Problems List
  const problems = [
    { id: 'Battery problem', label: 'Battery problem', icon: Battery, desc: 'Jump start or replacement' },
    { id: 'Flat tire', label: 'Flat tire', icon: Wrench, desc: 'Puncture repair or change' },
    { id: 'Car won\'t start', label: 'Car won\'t start', icon: ShieldAlert, desc: 'Ignition or system issue' },
    { id: 'Engine issue', label: 'Engine issue', icon: Car, desc: 'Overheating, noises, etc.' },
    { id: 'Accident assistance', label: 'Accident assistance', icon: ShieldCheck, desc: 'Towing or safety help' },
    { id: 'Out of fuel', label: 'Out of fuel', icon: Fuel, desc: 'Emergency fuel delivery' },
    { id: 'Need inspection', label: 'Need inspection', icon: HelpCircle, desc: 'I don\'t know the problem' }
  ];

  // Auto transition Splash Screen (2.5s)
  useEffect(() => {
    if (state.currentScreen === 'Splash') {
      const timer = setTimeout(() => {
        onNavigate('Home');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.currentScreen]);

  // Handle Photo upload simulation
  const simulatePhotoUpload = () => {
    // A mock engine smoke/puncture photo
    const mockPhotos = [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Engine bay
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'  // Flat tire
    ];
    const chosen = selectedProblem.includes('tire') ? mockPhotos[1] : mockPhotos[0];
    setUploadedPhoto(chosen);
  };

  // Helper to render active screen in Driver App
  const renderDriverScreen = () => {
    switch (state.currentScreen) {
      case 'Splash':
        return (
          <div className="h-full bg-navy-900 text-white flex flex-col justify-between p-6">
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="w-28 h-28 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative mb-6 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-800 to-transparent opacity-40"></div>
                <img src={logo} alt="Drive Safe Logo" className="w-22 h-22 object-contain z-10 p-2" />
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-extrabold tracking-tight"
              >
                DRIVE<span className="text-orange-500 font-medium">SAFE</span>
              </motion.h1>
              
              {/* Car Vector Illustration */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 80 }}
                className="relative w-64 h-36 mt-8 flex items-center justify-center"
              >
                <svg className="w-full h-full" viewBox="0 0 240 110" fill="none">
                  {/* Road */}
                  <rect x="0" y="90" width="240" height="20" rx="4" fill="#0f172a" opacity="0.5"/>
                  <rect x="15" y="98" width="28" height="3" rx="1.5" fill="white" opacity="0.25"/>
                  <rect x="63" y="98" width="28" height="3" rx="1.5" fill="white" opacity="0.25"/>
                  <rect x="111" y="98" width="28" height="3" rx="1.5" fill="white" opacity="0.25"/>
                  <rect x="159" y="98" width="28" height="3" rx="1.5" fill="white" opacity="0.25"/>
                  <rect x="205" y="98" width="24" height="3" rx="1.5" fill="white" opacity="0.25"/>
                  {/* Car body */}
                  <path d="M 20 72 L 32 48 C 38 40 55 36 72 36 L 148 36 C 164 36 178 44 185 52 L 210 68 C 218 70 222 76 222 84 L 222 92 L 18 92 L 18 84 Z" fill="#1e3a5f"/>
                  {/* Car roof */}
                  <path d="M 72 38 L 148 38 C 160 38 170 44 176 50 L 148 50 L 72 50 Z" fill="#243e6b" opacity="0.7"/>
                  {/* Windshield */}
                  <path d="M 148 40 L 172 40 L 184 52 L 148 52 Z" fill="#38bdf8" opacity="0.25"/>
                  {/* Side windows */}
                  <path d="M 72 40 L 142 40 L 142 52 L 72 52 Z" fill="#38bdf8" opacity="0.18"/>
                  {/* Orange accent stripe */}
                  <path d="M 22 75 L 210 75" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/>
                  {/* Headlights */}
                  <rect x="207" y="70" width="12" height="6" rx="3" fill="#fbbf24" opacity="0.9"/>
                  <rect x="20" y="70" width="10" height="6" rx="3" fill="#fed7aa" opacity="0.4"/>
                  {/* Front wheel */}
                  <circle cx="60" cy="92" r="18" fill="#0f172a" stroke="#e2e8f0" strokeWidth="2.5"/>
                  <circle cx="60" cy="92" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
                  <circle cx="60" cy="92" r="3" fill="#f97316"/>
                  {/* Rear wheel */}
                  <circle cx="172" cy="92" r="18" fill="#0f172a" stroke="#e2e8f0" strokeWidth="2.5"/>
                  <circle cx="172" cy="92" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
                  <circle cx="172" cy="92" r="3" fill="#f97316"/>
                  {/* GPS pin above car */}
                  <circle cx="116" cy="18" r="6" fill="#f97316" opacity="0.9"/>
                  <circle cx="116" cy="18" r="2.5" fill="white"/>
                  <line x1="116" y1="24" x2="116" y2="32" stroke="#f97316" strokeWidth="1.5" opacity="0.6"/>
                </svg>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center pb-8"
            >
              <p className="text-orange-500 font-bold uppercase tracking-wider text-xs mb-2">GPS Powered Roadside Help • Rwanda</p>
              <p className="text-sm text-slate-300 font-medium max-w-[240px] mx-auto italic">
                "Reliable Vehicle Assistance Anytime, Anywhere."
              </p>
              <div className="mt-6 flex justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
              </div>
            </motion.div>
          </div>
        );

      case 'Home':
        return (
          <div className="h-full bg-white flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Drive Safe Logo" className="w-8 h-8 object-contain" />
                <span className="font-extrabold text-lg text-navy-900 tracking-tight">DRIVE<span className="text-orange-500 font-medium">SAFE</span></span>
              </div>
              <button 
                onClick={() => {
                  setIsRegisteredMode(!isRegisteredMode);
                  if(!isRegisteredMode) {
                    onNavigate('RegisteredDashboard');
                  }
                }}
                className="flex items-center gap-1 text-xs font-semibold text-navy-800 bg-navy-50 hover:bg-navy-100 px-3 py-1.5 rounded-xl transition-all border border-navy-100"
              >
                {isRegisteredMode ? <LogOut size={13} /> : <LogIn size={13} />}
                {isRegisteredMode ? 'Guest Mode' : 'Login / Register'}
              </button>
            </div>

            {/* Main Area */}
            <div className="flex-1 px-5 py-5 flex flex-col items-center text-center overflow-y-auto">
              <p className="text-navy-900/50 font-bold text-xs tracking-widest uppercase mb-1">Rwanda Road Emergency</p>
              <h2 className="text-2xl font-black text-navy-800 max-w-[280px] leading-tight mb-6">
                Stranded on the road? We have you covered.
              </h2>

              {/* SOS Emergency Assistance Button */}
              <button
                onClick={() => onNavigate('Problems')}
                className="relative group focus:outline-none mb-6"
              >
                {/* Double pulse layers */}
                <span className="absolute -inset-4 rounded-full bg-orange-500/10 animate-ping" style={{ animationDuration: '3s' }}></span>
                <span className="absolute -inset-8 rounded-full bg-orange-500/5 animate-pulse" style={{ animationDuration: '2s' }}></span>
                
                <div className="w-52 h-52 bg-gradient-to-tr from-orange-600 to-orange-500 rounded-full border-8 border-orange-50 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 group-hover:shadow-orange-500/30 group-hover:shadow-2xl">
                  <AlertTriangle size={48} className="text-white mb-2 animate-bounce" style={{ animationDuration: '2.5s' }} />
                  <span className="text-white font-extrabold text-center text-xs uppercase tracking-wider px-4 leading-tight">
                    REQUEST ROAD ASSISTANCE
                  </span>
                </div>
              </button>

              {/* Current GPS Location Badge */}
              <div className="bg-navy-50/80 border border-navy-100/50 rounded-2xl p-3 w-full flex items-center gap-3 text-left mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <MapPin size={20} className="animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-navy-900/50 font-bold uppercase tracking-wider">CURRENT GPS LOCATION</p>
                  <p className="text-xs font-semibold text-navy-900 truncate">Kigali, Kiyovu • KN 3 Rd</p>
                </div>
                <span className="ml-auto text-[9px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full shrink-0">
                  Active
                </span>
              </div>

              {/* Create Account / Login CTA */}
              <div className="w-full bg-navy-900 rounded-2xl p-4 flex items-center justify-between gap-3 mb-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <User size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Save Your History</p>
                    <p className="text-[9px] text-slate-400 font-medium leading-tight">Create account for faster future help</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('RegisteredDashboard')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-xl transition-all"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      setIsRegisteredMode(true);
                      onNavigate('RegisteredDashboard');
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-xl transition-all border border-white/10"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Help & Support */}
            <div className="p-5 bg-navy-900 text-white rounded-t-3xl shadow-up">
              <p className="text-[9px] text-navy-200/60 font-bold uppercase tracking-widest mb-3">HELP & SUPPORT</p>
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:912" className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Call Toll-Free</p>
                    <p className="text-[10px] text-orange-400 font-bold">912 (SOS)</p>
                  </div>
                </a>
                <div className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all border border-white/5 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center border border-white/10 shrink-0">
                    <img src={logo} alt="Drive Safe" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Verified Garages</p>
                    <p className="text-[10px] text-emerald-400 font-bold">24/7 Security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Problems':
        return (
          <div className="h-full bg-white flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 pt-8 pb-4 flex items-center gap-3 border-b border-slate-50">
              <button 
                onClick={() => onNavigate('Home')}
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-navy-800 hover:bg-slate-100"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h3 className="font-extrabold text-navy-900 text-base">Select Vehicle Problem</h3>
                <p className="text-[10px] text-slate-400 font-medium">Step 1 of 3 • Emergency Details</p>
              </div>
            </div>

            {/* Scrollable grid */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="text-xs font-bold text-navy-900/60 uppercase tracking-wider mb-3">WHAT IS THE ISSUE?</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {problems.map((prob) => {
                  const IconComp = prob.icon;
                  const isSelected = selectedProblem === prob.id;
                  return (
                    <button
                      key={prob.id}
                      onClick={() => {
                        setSelectedProblem(prob.id);
                        setUploadedPhoto(null); // Reset photo for new problem
                      }}
                      className={`flex flex-col items-start p-3 text-left rounded-2xl border-2 transition-all ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-500/5 text-navy-900' 
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mb-3 ${isSelected ? 'bg-orange-500 text-white' : 'bg-white text-navy-800 shadow-sm border border-slate-100'}`}>
                        <IconComp size={18} />
                      </div>
                      <span className="text-xs font-bold block mb-0.5">{prob.label}</span>
                      <span className="text-[9px] text-slate-400 leading-tight">{prob.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Text Description Box */}
              <div className="mb-5">
                <label className="text-xs font-bold text-navy-900/60 uppercase tracking-wider block mb-2">ADDITIONAL DETAILS</label>
                <textarea
                  value={problemDetails}
                  onChange={(e) => setProblemDetails(e.target.value)}
                  placeholder="Describe vehicle issues, exact location landmarks, or special tools required (e.g. key model, wheel lock size)..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 min-h-[70px] resize-none"
                />
              </div>

              {/* Photo Upload Simulator */}
              <div>
                <label className="text-xs font-bold text-navy-900/60 uppercase tracking-wider block mb-2">VEHICLE PHOTO (OPTIONAL)</label>
                {!uploadedPhoto ? (
                  <button
                    onClick={simulatePhotoUpload}
                    disabled={!selectedProblem}
                    className={`w-full py-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                      selectedProblem 
                        ? 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer' 
                        : 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Upload size={20} className="text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-600">Simulate Photo Upload</span>
                    <span className="text-[9px] text-slate-400">Click to upload mock repair picture</span>
                  </button>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-28 bg-slate-50">
                    <img src={uploadedPhoto} alt="Uploaded Vehicle" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadedPhoto(null)}
                      className="absolute top-2 right-2 bg-slate-900/80 text-white rounded-full p-1 hover:bg-slate-900"
                    >
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <CheckCircle2 size={8} /> Photo Attached
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 border-t border-slate-100">
              <button
                disabled={!selectedProblem}
                onClick={() => {
                  onRequestAssistance(selectedProblem, problemDetails, uploadedPhoto);
                  onNavigate('Searching');
                }}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  selectedProblem 
                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20 active:scale-98' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Find Garages
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        );

      case 'Searching':
        return (
          <div className="h-full bg-slate-950 flex flex-col justify-between relative">
            {/* Header overlay */}
            <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-slate-950 to-transparent p-5 pt-8 z-20 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onNavigate('Problems')}
                  className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft size={15} />
                </button>
                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white animate-spin" style={{ animationDuration: '4s' }}>
                  <Wrench size={14} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">Locating Garages</h3>
                  <p className="text-[8px] font-bold text-orange-500 uppercase tracking-wider">GPS Connected • Kiyovu</p>
                </div>
              </div>
              <button 
                onClick={onCancelRequest}
                className="text-[9px] font-extrabold text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Live searching Map */}
            <div className="flex-1 relative">
              <MockMap 
                status="searching" 
                garage={null} 
                mechanic={null} 
                showDetails={false} 
              />
              
              {/* Pulsing indicator dialog */}
              <div className="absolute bottom-6 inset-x-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur flex flex-col items-center text-center text-white shadow-2xl z-20">
                <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mb-3"></div>
                <h4 className="font-extrabold text-xs mb-1">Searching Kigali Verified Garages</h4>
                <p className="text-[10px] text-slate-400 max-w-[220px]">
                  Pinging nearest mechanics with your {selectedProblem.toLowerCase()} request...
                </p>
              </div>
            </div>
          </div>
        );

      case 'Garages':
        return (
          <div className="h-full bg-white flex flex-col justify-between">
            {/* On-duty toast */}
            <AnimatePresence>
              {onDutyToast && (
                <motion.div
                  initial={{ y: -60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  className="absolute top-10 inset-x-4 z-50 bg-slate-900 border border-orange-500/40 text-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <Wrench size={15} className="text-orange-400" />
                  </div>
                  <p className="text-[11px] font-semibold leading-snug flex-1">{onDutyToast}</p>
                  <button onClick={() => setOnDutyToast(null)} className="text-slate-400 hover:text-white shrink-0">
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Header */}
            <div className="px-5 pt-8 pb-4 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onNavigate('Problems')}
                  className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-navy-800 hover:bg-slate-100"
                >
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h3 className="font-extrabold text-navy-900 text-base">Nearby Verified Garages</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Step 2 of 3 • Choose Provider</p>
                </div>
              </div>
              <button 
                onClick={onCancelRequest}
                className="text-[9px] font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-xl"
              >
                Cancel
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <p className="text-xs font-bold text-navy-900/60 uppercase tracking-wider">AVAILABLE GARAGES IN KIGALI</p>
              
              {state.garages.map((gar) => {
                // Check if this garage handles the problem
                const handlesIssue = gar.services.includes(selectedProblem) || gar.services.includes(selectedProblem.toLowerCase());
                
                return (
                  <div 
                    key={gar.id}
                    className="border border-slate-100 rounded-3xl p-4 bg-slate-50/50 hover:border-slate-200 transition-all flex flex-col gap-3 shadow-sm hover:shadow"
                  >
                    <div className="flex items-start gap-3">
                      <img src={gar.logo} alt={gar.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-100" />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="font-extrabold text-sm text-navy-900 leading-snug">{gar.name}</h4>
                          {gar.verified && (
                            <span className="bg-orange-500/10 text-orange-500 rounded-full p-0.5 flex items-center justify-center">
                              <ShieldCheck size={11} strokeWidth={3} />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star size={11} className="fill-amber-500" /> {gar.rating}
                          </span>
                          <span>•</span>
                          <span>{gar.reviews} reviews</span>
                          <span>•</span>
                          <span>{gar.distance} km away</span>
                        </div>
                        {/* Mechanic availability */}
                        {(() => {
                          const garMechs = state.mechanics.filter(m => m.garageId === gar.id);
                          const availCount = garMechs.filter(m => m.status === 'available').length;
                          return (
                            <div className="flex items-center gap-1 mt-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${availCount > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
                              <span className={`text-[9px] font-bold ${availCount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {availCount > 0 ? `${availCount} mechanic${availCount > 1 ? 's' : ''} available` : 'All mechanics on duty'}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1">
                      {gar.services.slice(0, 3).map((serv, idx) => (
                        <span key={idx} className="bg-white text-[9px] font-bold text-slate-500 px-2 py-0.5 rounded-lg border border-slate-100 uppercase tracking-wide">
                          {serv}
                        </span>
                      ))}
                      {gar.services.length > 3 && (
                        <span className="text-[9px] font-bold text-slate-400 px-1 py-0.5">
                          +{gar.services.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Button and ETA */}
                    <div className="border-t border-slate-100 pt-3 mt-1 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">ESTIMATED ARRIVAL</span>
                        <span className="text-xs font-black text-orange-500 flex items-center gap-1">
                          <Navigation size={12} className="rotate-45" /> {gar.eta}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          // Check if this garage has any available mechanic
                          const garMechanics = state.mechanics.filter(m => m.garageId === gar.id);
                          const hasAvailable = garMechanics.some(m => m.status === 'available');
                          if (!hasAvailable && garMechanics.length > 0) {
                            setOnDutyToast(`All mechanics at ${gar.name} are currently on duty. Try another garage.`);
                            setTimeout(() => setOnDutyToast(null), 3500);
                            return;
                          }
                          onSelectGarage(gar);
                        }}
                        className="bg-navy-800 hover:bg-navy-950 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-2xl shadow-md active:scale-98 transition-all"
                      >
                        Request Assistance
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'Tracking':
        const activeReq = state.driverRequest;
        if (!activeReq) return null;

        // ── DECLINED by garage ──
        if (activeReq.status === 'declined') {
          return (
            <div className="h-full bg-white flex flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5"
              >
                <X size={36} className="text-red-500" strokeWidth={2.5} />
              </motion.div>
              <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                <h2 className="text-xl font-black text-navy-900 mb-2">Request Declined</h2>
                <p className="text-sm text-slate-500 mb-1">
                  <span className="font-bold text-navy-800">{activeReq.garage?.name}</span> is unable to assist right now.
                </p>
                <p className="text-xs text-slate-400 mb-8 max-w-[260px] mx-auto">
                  Don't worry — there are other verified garages nearby. Try another provider below.
                </p>

                {/* Garage quick-pick */}
                <div className="w-full space-y-3 mb-6">
                  {state.garages
                    .filter(g => g.id !== activeReq.garage?.id)
                    .map(g => (
                      <button
                        key={g.id}
                        onClick={() => onSelectGarage(g)}
                        className="w-full flex items-center gap-3 bg-slate-50 border border-slate-100 hover:border-orange-300 hover:bg-orange-50/40 rounded-2xl p-3 transition-all text-left"
                      >
                        <img src={g.logo} alt={g.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-navy-900 truncate">{g.name}</p>
                          <p className="text-[9px] text-slate-400 font-medium">{g.distance} km · ETA {g.eta}</p>
                        </div>
                        <span className="text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-2 py-1 rounded-xl shrink-0">
                          Request
                        </span>
                      </button>
                    ))}
                </div>

                <button
                  onClick={onClearDeclined}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-2xl transition-all"
                >
                  Go Back Home
                </button>
              </motion.div>
            </div>
          );
        }

        const timelineSteps = [
          { key: 'requested', label: 'Request received' },
          { key: 'accepted', label: 'Garage accepted' },
          { key: 'mechanic_assigned', label: 'Mechanic assigned' },
          { key: 'en_route', label: 'Mechanic on the way' },
          { key: 'arrived', label: 'Mechanic arrived' },
          { key: 'diagnosing', label: 'Vehicle diagnosed' },
          { key: 'towing', label: 'Tow truck dispatched' },
          { key: 'repaired', label: 'Service completed' }
        ];

        // Find index of current status
        const currentStepIndex = timelineSteps.findIndex(s => s.key === activeReq.status);

        return (
          <div className="h-full bg-slate-50 flex flex-col relative">
            {/* Map Area */}
            <div className="h-56 relative bg-slate-900 shrink-0">
              <MockMap 
                status={activeReq.status} 
                garage={activeReq.garage} 
                mechanic={activeReq.mechanic} 
                showDetails={false} 
              />
              
              {/* Floating Header info overlay */}
              <div className="absolute top-4 inset-x-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl text-white flex justify-between items-center shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('Garages')}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    title="Back to garages"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Navigation size={15} className="rotate-45" />
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">SERVICE TRACKING</p>
                    <p className="text-xs font-extrabold">{activeReq.garage?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={onCancelRequest}
                  className="text-[9px] font-extrabold text-red-400 bg-red-950/40 hover:bg-red-950 border border-red-900/50 px-2.5 py-1.5 rounded-xl transition-all"
                >
                  Cancel SOS
                </button>
              </div>
            </div>

            {/* Timeline & Mechanic Detail - Scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-4 pb-20 space-y-4">
              
              {/* Mechanic Assignment Card */}
              {activeReq.mechanic ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeReq.mechanic.avatar} 
                      alt={activeReq.mechanic.name} 
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-navy-900 leading-snug">{activeReq.mechanic.name}</h4>
                        <span className="bg-emerald-500/10 text-emerald-600 font-bold text-[9px] px-2 py-0.5 rounded-full">
                          On Duty
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold mb-0.5">{activeReq.garage?.name}</p>
                      <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase">
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star size={10} className="fill-amber-500" /> {activeReq.mechanic.rating}
                        </span>
                        <span>•</span>
                        <span>{activeReq.mechanic.reviews} jobs</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & ETA */}
                  <div className="border-t border-slate-50 pt-3 mt-1 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">ETA</span>
                      <span className="text-sm font-black text-orange-500">
                        {activeReq.status === 'en_route' ? '5-7 mins' : activeReq.status === 'arrived' ? 'Arrived!' : 'Estimating...'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowCallModal(true)}
                        className="w-9 h-9 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-500 flex items-center justify-center transition-colors"
                      >
                        <Phone size={15} />
                      </button>
                      <button
                        onClick={() => setShowChatModal(true)}
                        className="w-9 h-9 rounded-xl bg-navy-50 hover:bg-navy-100 text-navy-800 flex items-center justify-center transition-colors"
                      >
                        <MessageSquare size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 animate-pulse flex items-center justify-center text-orange-500">
                    <Wrench size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-navy-900">Assigning Mechanic...</h4>
                    <p className="text-[10px] text-slate-400">Garage is assigning the best nearby professional.</p>
                  </div>
                </div>
              )}

              {/* Towing Alert Banner */}
              {activeReq.status === 'towing' && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-navy-900 border border-orange-500/40 rounded-3xl p-4 flex flex-col gap-3 shadow-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 3h15v13H1z" strokeLinejoin="round"/>
                        <path d="M16 8h4l3 3v5h-7V8z" strokeLinejoin="round"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-white mb-1">🚛 Tow Truck on the Way!</p>
                      <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                        Your vehicle cannot be repaired on-site. A tow truck from{' '}
                        <span className="font-extrabold text-orange-400">{activeReq.garage?.name}</span>{' '}
                        has been dispatched to tow your car to the workshop.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
                    <p className="text-[10px] text-white font-semibold leading-snug">
                      Please stay with your vehicle. The mechanic will wait with you until the tow truck arrives.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Progress Timeline */}
              <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                <p className="text-[10px] font-extrabold text-navy-900/60 uppercase tracking-wider mb-4">REQUEST PROGRESS</p>
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {timelineSteps.map((step, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    const isFuture = idx > currentStepIndex;

                    return (
                      <div key={step.key} className="flex items-center gap-3.5 pl-1.5 relative z-10">
                        {isCompleted && (
                          <div className="w-3.5 h-3.5 rounded-full bg-navy-800 border-2 border-white flex items-center justify-center shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          </div>
                        )}
                        {isActive && (
                          <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center shadow-md animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          </div>
                        )}
                        {isFuture && (
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center shadow-sm">
                          </div>
                        )}
                        <span className={`text-xs font-bold ${
                          isActive 
                            ? 'text-orange-500' 
                            : isCompleted 
                              ? 'text-navy-900/80 font-semibold' 
                              : 'text-slate-400 font-medium'
                        }`}>
                          {step.label}
                        </span>
                        
                        {isActive && (
                          <span className="ml-auto text-[8px] bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded-full animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Completion':
        return (
          <div className="h-full bg-white flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
              <button
                onClick={() => onNavigate(isRegisteredMode ? 'RegisteredDashboard' : 'Home')}
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-navy-800 hover:bg-slate-100"
              >
                <ArrowLeft size={16} />
              </button>
              <h3 className="font-extrabold text-navy-900 text-base">Service Completed</h3>
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={14} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center shadow-inner mb-4 relative">
                <CheckCircle2 size={40} className="stroke-[2.5]" />
                <span className="absolute -inset-2 rounded-full bg-emerald-500/5 animate-pulse"></span>
              </div>

              <h2 className="text-xl font-black text-navy-800 mb-1">Assistance Successful!</h2>
              <p className="text-xs text-slate-400 max-w-[260px] mb-6">
                Your emergency request is now completed. Rate your experience below to help others.
              </p>

              {/* Summary card */}
              <div className="bg-slate-50 border border-slate-100 w-full rounded-2xl p-4 text-left flex items-center gap-3 mb-6">
                <img src={state.driverRequest?.mechanic?.avatar} alt="Mechanic" className="w-10 h-10 rounded-xl object-cover border" />
                <div>
                  <h4 className="font-extrabold text-xs text-navy-900">{state.driverRequest?.mechanic?.name}</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">{state.driverRequest?.garage?.name}</p>
                  <p className="text-[9px] text-orange-500 font-extrabold mt-0.5">Problem solved: {state.driverRequest?.problemType}</p>
                </div>
              </div>

              {/* 5-Star Rating System */}
              <div className="mb-6">
                <label className="text-[10px] font-bold text-navy-900/50 uppercase tracking-wider block mb-2">RATE SERVICE</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-amber-400 transition-transform active:scale-125 focus:outline-none"
                    >
                      <Star size={32} className={star <= rating ? 'fill-amber-400' : 'text-slate-200'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review input */}
              <div className="w-full mb-6">
                <label className="text-[10px] font-bold text-navy-900/50 uppercase tracking-wider block mb-2 text-left">WRITE A REVIEW</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share details about the repair speed, quality, and mechanic friendliness..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 min-h-[80px] resize-none"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  onSubmitReview(rating, reviewText);
                  setRating(5);
                  setReviewText('');
                  if (!isRegisteredMode) {
                    setShowRegisterPopup(true);
                  } else {
                    onNavigate('RegisteredDashboard');
                  }
                }}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        );

      case 'RegisteredDashboard':
        return (
          <div className="h-full bg-slate-50 flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 pt-8 pb-4 bg-navy-900 text-white flex justify-between items-center rounded-b-3xl shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-800 to-transparent opacity-60"></div>

              {/* Back button */}
              <button
                onClick={() => onNavigate('Home')}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 relative z-10"
                title="Back to Home"
              >
                <ArrowLeft size={14} />
              </button>

              <div className="flex items-center gap-3 relative z-10">
                <img src={state.activeDriver.avatar} alt="Driver" className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-md" />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-sm">{state.activeDriver.name}</h3>
                    <span className="bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">VIP</span>
                  </div>
                  <p className="text-[10px] text-navy-200/70 font-semibold">{state.activeDriver.phone}</p>
                </div>
              </div>

              {/* Logo + Logout */}
              <div className="flex items-center gap-2 relative z-10">
                <img src={logo} alt="Drive Safe" className="w-7 h-7 object-contain opacity-80" />
                <button
                  onClick={() => {
                    setIsRegisteredMode(false);
                    onNavigate('Home');
                  }}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10"
                  title="Log Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              
              {/* Vehicle info card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                  <span className="text-[10px] font-extrabold text-navy-900/60 uppercase tracking-wider flex items-center gap-1">
                    <Car size={13} className="text-orange-500" /> REGISTERED VEHICLE
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">Primary Car</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-navy-900">{state.activeDriver.vehicle.model}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">{state.activeDriver.vehicle.type} • {state.activeDriver.vehicle.year}</p>
                  </div>
                  <div className="bg-navy-50 border border-navy-100 px-3 py-1.5 rounded-xl">
                    <span className="text-xs font-mono font-black text-navy-800 tracking-wider">
                      {state.activeDriver.vehicle.plate}
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK SOS ASSISTANCE */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-4 text-white shadow-lg flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm mb-0.5">Need Emergency Help?</h4>
                  <p className="text-[9px] text-orange-100 font-medium">Bypass selection and trigger SOS locator.</p>
                </div>
                <button
                  onClick={() => onNavigate('Problems')}
                  className="bg-white text-orange-600 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-2xl shadow-md hover:bg-orange-50 active:scale-95 transition-all flex items-center gap-1"
                >
                  <AlertTriangle size={13} className="animate-pulse" /> REQUEST SOS
                </button>
              </div>

              {/* Saved favorite garages */}
              <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                <span className="text-[10px] font-extrabold text-navy-900/60 uppercase tracking-wider block mb-3">
                  FAVORITE GARAGES
                </span>
                <div className="space-y-3">
                  {state.garages.slice(0, 2).map((gar) => (
                    <div key={gar.id} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2.5">
                        <img src={gar.logo} alt={gar.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <h5 className="font-bold text-xs text-navy-900">{gar.name}</h5>
                          <span className="flex items-center gap-0.5 text-[9px] text-amber-500 font-bold">
                            <Star size={9} className="fill-amber-500" /> {gar.rating} • {gar.distance} km
                          </span>
                        </div>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600">
                        <Heart size={14} className="fill-orange-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous Service History */}
              <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                <span className="text-[10px] font-extrabold text-navy-900/60 uppercase tracking-wider block mb-3">
                  SERVICE HISTORY
                </span>
                <div className="space-y-3">
                  {state.registeredHistory.map((hist) => (
                    <div key={hist.id} className="border-b border-slate-50 pb-3 last:border-b-0 last:pb-0 last:border-none flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <Wrench size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-xs text-navy-900">{hist.problemType}</h5>
                          <span className="text-[8px] font-bold text-slate-400">{hist.timestamp}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-medium line-clamp-1 mb-1">{hist.garage?.name}</p>
                        {hist.rating && (
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                            <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                              <Star size={9} className="fill-amber-500" /> {hist.rating}
                            </span>
                            <span>•</span>
                            <span className="italic">"{hist.review}"</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings / Profile Section */}
              <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-slate-50 hover:bg-slate-100/50 rounded-2xl cursor-pointer transition-colors border border-slate-100">
                  <Bell size={16} className="text-navy-800 mx-auto mb-1.5" />
                  <span className="text-[10px] font-extrabold text-navy-900 block">Notifications</span>
                  <span className="text-[8px] bg-orange-500 text-white font-black px-1.5 rounded-full inline-block mt-0.5">2 New</span>
                </div>
                <div className="p-3 bg-slate-50 hover:bg-slate-100/50 rounded-2xl cursor-pointer transition-colors border border-slate-100">
                  <Settings size={16} className="text-navy-800 mx-auto mb-1.5" />
                  <span className="text-[10px] font-extrabold text-navy-900 block">App Settings</span>
                  <span className="text-[8px] text-slate-400 font-medium inline-block mt-0.5">v1.2.0</span>
                </div>
              </div>

            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col relative bg-slate-50">
      {/* Mobile Shell Status Bar Simulation */}
      <div className="absolute top-0 inset-x-0 h-8 bg-black/5 z-40 px-6 flex justify-between items-center text-[10px] font-bold text-navy-900/60">
        <span>12:30</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-navy-900/60"></span>
          <span className="w-2.5 h-1.5 bg-navy-900/60 rounded-xs"></span>
          <span>98%</span>
        </div>
      </div>

      {/* ── FLOATING NOTIFICATION TOAST ── */}
      <AnimatePresence>
        {visibleNotif && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute top-10 inset-x-3 z-50"
          >
            <div className="bg-navy-900 border border-white/10 rounded-2xl px-4 py-3 flex items-start gap-3 shadow-2xl">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bell size={14} className="text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-white leading-tight">{visibleNotif.title}</p>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-snug line-clamp-2">{visibleNotif.message}</p>
              </div>
              <button
                onClick={() => setVisibleNotif(null)}
                className="text-slate-500 hover:text-white shrink-0 mt-0.5"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Content Wrapper with Status Bar padding */}
      <div className="flex-1 pt-8 overflow-hidden relative">
        {renderDriverScreen()}
      </div>

      {/* -------------------- CALL MODAL -------------------- */}
      <AnimatePresence>
        {showCallModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-900/95 z-50 flex flex-col items-center justify-between p-12 text-white"
          >
            <div className="flex flex-col items-center mt-20">
              <div className="w-24 h-24 bg-white/10 rounded-full border border-white/20 p-2 animate-pulse mb-6">
                <img 
                  src={state.driverRequest?.mechanic?.avatar} 
                  alt="Mechanic" 
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-black">{state.driverRequest?.mechanic?.name}</h3>
              <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mt-1">Calling Mechanic...</p>
              <p className="text-slate-400 text-xs mt-3">{state.driverRequest?.mechanic?.phone}</p>
            </div>

            <button
              onClick={() => setShowCallModal(false)}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-red-600 transition-colors active:scale-90"
            >
              <Phone size={24} className="rotate-[135deg]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------- CHAT MODAL -------------------- */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-0 bg-white z-50 flex flex-col justify-between"
          >
            {/* Chat Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
              <button 
                onClick={() => setShowChatModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-navy-800"
              >
                <X size={18} />
              </button>
              <img 
                src={state.driverRequest?.mechanic?.avatar} 
                alt="Mechanic" 
                className="w-8 h-8 rounded-lg object-cover" 
              />
              <div>
                <h4 className="font-extrabold text-xs text-navy-900">{state.driverRequest?.mechanic?.name}</h4>
                <p className="text-[8px] text-emerald-500 font-black uppercase">Online</p>
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/50">
              <div className="text-center">
                <span className="bg-slate-200/50 text-slate-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Today</span>
              </div>
              
              {/* Default Welcome Message */}
              <div className="flex gap-2 max-w-[80%]">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-xs text-navy-900 leading-snug">
                    Hello! I am preparing my tools and heading to your location on KN 3 Rd. What's the specific tyre issue?
                  </p>
                  <span className="text-[8px] text-slate-400 block mt-1 text-right">12:31</span>
                </div>
              </div>

              {/* Chat history from state */}
              {state.chatHistory.map((msg) => {
                const isMe = msg.sender === 'driver';
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : ''} gap-2`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                      isMe 
                        ? 'bg-orange-500 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 text-navy-900 rounded-tl-none'
                    }`}>
                      <p className="text-xs leading-snug">{msg.text}</p>
                      <span className={`text-[8px] block mt-1 text-right ${isMe ? 'text-white/80' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!chatMessage.trim()) return;
                state.chatHistory.push({
                  id: String(Date.now()),
                  sender: 'driver',
                  text: chatMessage,
                  timestamp: '12:33'
                });
                setChatMessage('');
                // Auto reply from mechanic
                setTimeout(() => {
                  state.chatHistory.push({
                    id: String(Date.now() + 1),
                    sender: 'mechanic',
                    text: 'Received! I will be there in about 5 minutes. Keep safe.',
                    timestamp: '12:33'
                  });
                }, 2000);
              }}
              className="p-3 border-t border-slate-100 flex gap-2 bg-white"
            >
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type message to mechanic..."
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------- GUEST COMPLETION REGISTER POPUP -------------------- */}
      <AnimatePresence>
        {showRegisterPopup && (
          <div className="absolute inset-0 bg-navy-900/60 z-50 flex items-center justify-center p-5">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-5 w-full max-w-[340px] shadow-2xl flex flex-col border border-slate-100 text-navy-900"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-xl">
                  <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[9px] font-black uppercase tracking-wider">Save History</span>
                </div>
                <button 
                  onClick={() => {
                    setShowRegisterPopup(false);
                    onNavigate('Home');
                  }}
                  className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100"
                >
                  <X size={12} />
                </button>
              </div>

              <h3 className="font-black text-base text-navy-900 mb-1 leading-snug">Create Account</h3>
              <p className="text-[10px] text-slate-400 mb-4">
                Save vehicle diagnostics history, earn loyalty rewards, and request emergency help faster next time!
              </p>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-[8px] font-bold text-navy-900/50 block mb-1">FULL NAME</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-bold text-navy-900/50 block mb-1">PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+250 788..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[8px] font-bold text-navy-900/50 block mb-1">CAR MODEL</label>
                    <input
                      type="text"
                      value={regModel}
                      onChange={(e) => setRegModel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-bold text-navy-900/50 block mb-1">PLATE NUMBER</label>
                    <input
                      type="text"
                      value={regPlate}
                      onChange={(e) => setRegPlate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (regName && regPhone) {
                    onRegister(regName, regPhone, regModel, regPlate);
                    setShowRegisterPopup(false);
                  }
                }}
                disabled={!regName || !regPhone}
                className={`w-full py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow ${
                  regName && regPhone
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Register & Save History
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
