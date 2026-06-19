import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, RotateCcw, Play, Sparkles, Wrench, Users, Phone,
  CheckCircle2, MapPin, Eye, Info, ChevronRight, HelpCircle, Layers, ArrowRight, Star, User
} from 'lucide-react';
import { DriverApp } from './components/driver/DriverApp';
import { GarageDashboard } from './components/garage/GarageDashboard';
import { MechanicDashboard } from './components/mechanic/MechanicDashboard';
import { 
  defaultDriver, initialGarages, initialMechanics, initialHistory, initialNotifications 
} from './data';
import { AppState, Garage, Mechanic, EmergencyRequest, AppNotification, ChatMessage } from './types';
import logo from './Logo.png';

export function App() {
  // Global Shared State
  const [activeDriver, setActiveDriver] = useState(defaultDriver);
  const [garages, setGarages] = useState<Garage[]>(initialGarages);
  const [mechanics, setMechanics] = useState<Mechanic[]>(initialMechanics);
  const [driverRequest, setDriverRequest] = useState<EmergencyRequest | null>(null);
  const [registeredHistory, setRegisteredHistory] = useState<EmergencyRequest[]>(initialHistory);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  
  // Navigation & Viewport State
  const [currentScreen, setCurrentScreen] = useState<AppState['currentScreen']>('Splash');
  const [isRegisteredMode, setIsRegisteredMode] = useState(false);
  
  // Tab view for smaller screens: 'driver' | 'garage' | 'mechanic'
  const [activeTabViewport, setActiveTabViewport] = useState<'driver' | 'garage' | 'mechanic'>('driver');

  // Last completed request reference for rating
  const [lastCompletedRequest, setLastCompletedRequest] = useState<EmergencyRequest | null>(null);

  // Auto-Demo State
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoMessage, setDemoMessage] = useState<string>('');

  // Reset all states
  const handleResetSimulation = () => {
    setActiveDriver(defaultDriver);
    setGarages(initialGarages);
    setMechanics(initialMechanics.map(m => ({ ...m, status: 'available' })));
    setDriverRequest(null);
    setRegisteredHistory(initialHistory);
    setChatHistory([]);
    setNotifications(initialNotifications);
    setCurrentScreen('Home');
    setIsRegisteredMode(false);
    setLastCompletedRequest(null);
    setIsDemoMode(false);
    setDemoStep(0);
    setDemoMessage('');
  };

  // 1. Driver Requests Assistance
  const handleRequestAssistance = (problem: string, details: string, photo: string | null) => {
    const newRequest: EmergencyRequest = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      problemType: problem,
      details: details,
      photo: photo,
      status: 'searching',
      driver: activeDriver,
      garage: null,
      mechanic: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDriverRequest(newRequest);
    setCurrentScreen('Searching');

    // Automatically transition to garage selection after 2.5s scan
    if (!isDemoMode) {
      setTimeout(() => {
        setDriverRequest(prev => prev ? { ...prev, status: 'idle' } : null);
        setCurrentScreen('Garages');
      }, 2500);
    }
  };

  // 2. Driver Selects Garage
  const handleSelectGarage = (garage: Garage) => {
    setDriverRequest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        garage: garage,
        status: 'requested'
      };
    });
    setCurrentScreen('Tracking');
    
    // Alert Notification
    addNotification(
      'SOS Dispatch Sent',
      `Your emergency call has been sent to ${garage.name}. Waiting for response...`
    );
  };

  // 3. Garage Accepts Request
  const handleAcceptRequest = () => {
    if (!driverRequest) return;
    setDriverRequest(prev => prev ? { ...prev, status: 'accepted' } : null);
    addNotification('SOS Request Accepted', `${driverRequest.garage?.name} accepted your request. Assigning mechanic.`);
  };

  // 4. Garage Declines Request
  const handleDeclineRequest = () => {
    if (!driverRequest) return;
    // Mark request as declined so driver sees the feedback screen
    setDriverRequest(prev => prev ? { ...prev, status: 'declined' } : null);
    addNotification('SOS Request Declined', `${driverRequest.garage?.name} was unable to take your call. Please select another garage.`);
  };

  // 4b. Driver dismisses declined screen → clear and go home
  const handleClearDeclined = () => {
    setDriverRequest(null);
    setCurrentScreen('Home');
  };

  // 5. Garage Assigns Mechanic
  const handleAssignMechanic = (mechanic: Mechanic) => {
    if (!driverRequest) return;
    
    // Mark mechanic as on duty
    setMechanics(prev => prev.map(m => m.id === mechanic.id ? { ...m, status: 'on_duty' } : m));

    setDriverRequest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        mechanic: mechanic,
        status: 'mechanic_assigned'
      };
    });

    addNotification('Mechanic Assigned', `${mechanic.name} is assigned and reviewing vehicle notes.`);
  };

  // 6. Update Status (Mechanic Journey Progress)
  const handleUpdateStatus = (status: EmergencyRequest['status'], notes?: string, repairPhoto?: string) => {
    if (!driverRequest) return;

    if (status === 'completed') {
      // Create completed log entry
      const completedJob: EmergencyRequest = {
        ...driverRequest,
        status: 'completed',
        notes: notes || 'Repaired on site.',
        repairPhoto: repairPhoto || null,
        timestamp: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Reset mechanic to available
      if (driverRequest.mechanic) {
        const mechId = driverRequest.mechanic.id;
        setMechanics(prev => prev.map(m => m.id === mechId ? { ...m, status: 'available' } : m));
      }

      setRegisteredHistory(prev => [completedJob, ...prev]);
      setLastCompletedRequest(completedJob);
      setDriverRequest(null);
      setCurrentScreen('Completion');
      
      addNotification('SOS Resolved', 'Emergency assistance has been completed successfully.');
    } else {
      setDriverRequest(prev => prev ? { ...prev, status } : null);
      if (status === 'en_route') {
        addNotification('Mechanic Dispatched', `${driverRequest.mechanic?.name} is on the way to Kiyovu KN 3 Rd.`);
      } else if (status === 'arrived') {
        addNotification('Mechanic Arrived', 'Olivier Ndizeye has arrived at your exact location.');
      } else if (status === 'diagnosing') {
        addNotification('Diagnostics Started', 'Technician is checking engine codes and diagnostic system.');
      }
    }
  };

  // 7. Driver Submits Review
  const handleSubmitReview = (rating: number, review: string) => {
    if (!lastCompletedRequest) {
      setCurrentScreen(isRegisteredMode ? 'RegisteredDashboard' : 'Home');
      return;
    }

    setRegisteredHistory(prev => prev.map(item => {
      if (item.id === lastCompletedRequest.id) {
        return { ...item, rating, review };
      }
      return item;
    }));

    // Update garage rating average
    if (lastCompletedRequest.garage) {
      const gId = lastCompletedRequest.garage.id;
      setGarages(prev => prev.map(g => {
        if (g.id === gId) {
          const totalRev = g.reviews + 1;
          const newRating = parseFloat(((g.rating * g.reviews + rating) / totalRev).toFixed(1));
          return { ...g, rating: newRating, reviews: totalRev };
        }
        return g;
      }));
    }

    // Update mechanic rating average
    if (lastCompletedRequest.mechanic) {
      const mId = lastCompletedRequest.mechanic.id;
      setMechanics(prev => prev.map(m => {
        if (m.id === mId) {
          const totalJobs = m.reviews + 1;
          const newRating = parseFloat(((m.rating * m.reviews + rating) / totalJobs).toFixed(1));
          return { ...m, rating: newRating, reviews: totalJobs };
        }
        return m;
      }));
    }

    setLastCompletedRequest(null);
    setCurrentScreen(isRegisteredMode ? 'RegisteredDashboard' : 'Home');
  };

  // 8. Driver Registers Account (Save History)
  const handleRegister = (name: string, phone: string, model: string, plate: string) => {
    const updatedDriver = {
      name,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      vehicle: {
        model,
        plate,
        type: 'Sedan (Black)',
        year: '2020'
      }
    };
    setActiveDriver(updatedDriver);
    setIsRegisteredMode(true);

    // Map existing history logs to new user
    setRegisteredHistory(prev => prev.map(h => ({ ...h, driver: updatedDriver })));

    addNotification('Account Created', 'Registration successful! Premium roadside assistance benefits unlocked.');
    setCurrentScreen('RegisteredDashboard');
  };

  // Helper notification adder
  const addNotification = (title: string, message: string) => {
    const newNotif: AppNotification = {
      id: String(Date.now()),
      title,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleToggleSOS = (active: boolean) => {
    addNotification('Availability Status', `SOS incoming emergency desk toggled ${active ? 'ON' : 'OFF'}.`);
  };

  const handleAddMechanic = (name: string, phone: string, services: string[]) => {
    const newMech: Mechanic = {
      id: `m-${Date.now()}`,
      name,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      phone,
      rating: 5.0,
      reviews: 0,
      distance: 1.0,
      services,
      about: 'Roadside rescue mechanical technician.',
      garageId: 'g1', // Kigali Auto Care default
      status: 'available',
      lat: -1.9441,
      lng: 30.0619
    };
    setMechanics(prev => [...prev, newMech]);
    addNotification('Mechanic Roster', `${name} registered under Kigali Auto Care roster.`);
  };

  // -------------------- AUTO-DEMO ENGINE --------------------
  const handleTriggerAutoDemo = () => {
    handleResetSimulation();
    setIsDemoMode(true);
    setDemoStep(1);
  };

  // Run the demo steps sequentially
  useEffect(() => {
    if (!isDemoMode || demoStep === 0) return;

    let timer: NodeJS.Timeout;

    switch (demoStep) {
      case 1:
        setDemoMessage('Driver opens Drive Safe and requests road assistance...');
        timer = setTimeout(() => {
          setCurrentScreen('Problems');
          setSelectedProblemAndDetails('Flat tire', 'Punctured rear tire on KN 3 Rd. Need urgent spare fitting.');
          setDemoStep(2);
        }, 2500);
        break;

      case 2:
        setDemoMessage('Driver clicks "Find Garages" to scan Kigali for nearby partners...');
        timer = setTimeout(() => {
          // Manually run search
          const newRequest: EmergencyRequest = {
            id: `SOS-DEMO`,
            problemType: 'Flat tire',
            details: 'Punctured rear tire on KN 3 Rd. Need urgent spare fitting.',
            photo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            status: 'searching',
            driver: activeDriver,
            garage: null,
            mechanic: null,
            timestamp: '12:30'
          };
          setDriverRequest(newRequest);
          setCurrentScreen('Searching');
          setDemoStep(3);
        }, 2500);
        break;

      case 3:
        setDemoMessage('Driver views nearby verified garages and requests Kigali Auto Care...');
        timer = setTimeout(() => {
          setDriverRequest(prev => prev ? { ...prev, status: 'idle' } : null);
          setCurrentScreen('Garages');
          
          // Select garage
          setTimeout(() => {
            const gar = garages[0]; // Kigali Auto Care
            setDriverRequest(prev => prev ? { ...prev, garage: gar, status: 'requested' } : null);
            setCurrentScreen('Tracking');
            setActiveTabViewport('garage'); // switch preview focus to garage portal!
            setDemoStep(4);
          }, 1500);
        }, 2000);
        break;

      case 4:
        setDemoMessage('Garage Dispatch Desk accepts driver SOS call...');
        timer = setTimeout(() => {
          setDriverRequest(prev => prev ? { ...prev, status: 'accepted' } : null);
          setDemoStep(5);
        }, 2500);
        break;

      case 5:
        setDemoMessage('Garage assigns Master Mechanic Olivier Ndizeye...');
        timer = setTimeout(() => {
          const mech = mechanics[0]; // Olivier
          setMechanics(prev => prev.map(m => m.id === mech.id ? { ...m, status: 'on_duty' } : m));
          setDriverRequest(prev => prev ? { ...prev, mechanic: mech, status: 'mechanic_assigned' } : null);
          setActiveTabViewport('mechanic'); // switch focus to mechanic mobile app!
          setDemoStep(6);
        }, 2500);
        break;

      case 6:
        setDemoMessage('Mechanic reviews driver details and starts journey (On the Way)...');
        timer = setTimeout(() => {
          setDriverRequest(prev => prev ? { ...prev, status: 'en_route' } : null);
          setActiveTabViewport('driver'); // Focus driver to watch map pin move!
          setDemoStep(7);
        }, 3000);
        break;

      case 7:
        setDemoMessage('Mechanic Olivier arrives at the driver location on KN 3 Rd...');
        timer = setTimeout(() => {
          setDriverRequest(prev => prev ? { ...prev, status: 'arrived' } : null);
          setActiveTabViewport('mechanic');
          setDemoStep(8);
        }, 8000); // give 8s for map pin movement animation!
        break;

      case 8:
        setDemoMessage('Mechanic begins vehicle diagnostics...');
        timer = setTimeout(() => {
          setDriverRequest(prev => prev ? { ...prev, status: 'diagnosing' } : null);
          setDemoStep(9);
        }, 2500);
        break;

      case 9:
        setDemoMessage('Mechanic completes tyre fitting, uploads report, and closes SOS ticket...');
        timer = setTimeout(() => {
          // Build logs
          const completedJob: EmergencyRequest = {
            id: 'SOS-DEMO',
            problemType: 'Flat tire',
            details: 'Punctured rear tire on KN 3 Rd. Need urgent spare fitting.',
            photo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            status: 'completed',
            driver: activeDriver,
            garage: garages[0],
            mechanic: mechanics[0],
            timestamp: '12:35',
            notes: 'Tyre replaced with spare wheel. Checked air pressure and tightened lugs.',
            repairPhoto: 'https://images.unsplash.com/photo-1517524006039-e8b44957122e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          };
          
          setMechanics(prev => prev.map(m => m.id === 'm1' ? { ...m, status: 'available' } : m));
          setRegisteredHistory(prev => [completedJob, ...prev]);
          setLastCompletedRequest(completedJob);
          setDriverRequest(null);
          setCurrentScreen('Completion');
          setActiveTabViewport('driver'); // Focus driver to submit review!
          setDemoStep(10);
        }, 3000);
        break;

      case 10:
        setDemoMessage('Driver rates experience 5-stars and writes a glowing review...');
        timer = setTimeout(() => {
          // Submit rating
          setRegisteredHistory(prev => prev.map(item => {
            if (item.id === 'SOS-DEMO') {
              return { ...item, rating: 5, review: 'Incredible speed! Olivier was so friendly and efficient.' };
            }
            return item;
          }));
          
          // Update garage rating
          setGarages(prev => prev.map(g => {
            if (g.id === 'g1') {
              const totalRev = g.reviews + 1;
              const newRating = parseFloat(((g.rating * g.reviews + 5) / totalRev).toFixed(1));
              return { ...g, rating: newRating, reviews: totalRev };
            }
            return g;
          }));

          setLastCompletedRequest(null);
          
          // Trigger account creation popup
          setDemoStep(11);
        }, 3000);
        break;

      case 11:
        setDemoMessage('Driver registers account to unlock Premium Dashboard...');
        timer = setTimeout(() => {
          // Register
          const updatedDriver = {
            name: 'Eric Keza',
            phone: '+250 788 123 456',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            vehicle: {
              model: 'Toyota RAV4',
              plate: 'RAD 123 A',
              type: 'SUV (White)',
              year: '2018'
            }
          };
          setActiveDriver(updatedDriver);
          setIsRegisteredMode(true);
          setRegisteredHistory(prev => prev.map(h => ({ ...h, driver: updatedDriver })));
          setCurrentScreen('RegisteredDashboard');
          setDemoStep(12);
        }, 3000);
        break;

      case 12:
        setDemoMessage('Demo walk-through complete! You can now explore the dashboards manually.');
        timer = setTimeout(() => {
          setIsDemoMode(false);
          setDemoStep(0);
          setDemoMessage('');
        }, 4000);
        break;

      default:
        break;
    }

    return () => clearTimeout(timer);
  }, [demoStep, isDemoMode]);

  // Helper to force problem setting for demo
  const setSelectedProblemAndDetails = (prob: string, details: string) => {
    // We can simulate driver entries by updating state values,
    // which are captured in the components
  };

  // Shared state container for sub-components
  const stateContainer: AppState = {
    currentScreen,
    driverRequest,
    activeDriver,
    registeredHistory,
    garages,
    mechanics,
    chatHistory,
    notifications
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans flex flex-col justify-between overflow-x-hidden antialiased selection:bg-orange-500 selection:text-white">
      {/* Top Professional Control bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 z-30 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-500 flex items-center justify-center text-white shadow-lg overflow-hidden">
              <img src={logo} alt="Drive Safe Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-tight leading-none">
                DRIVE<span className="text-orange-500 font-medium">SAFE</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                GPS Roadside Assistance Simulator • Kigali, Rwanda
              </p>
            </div>
          </div>
        </div>

        {/* Demo Controller Widget */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 border border-slate-800/80 px-4 py-2.5 rounded-2xl">
          {isDemoMode ? (
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
              <div className="text-left max-w-[280px]">
                <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest">AUTO-DEMO SEQUENCE RUNNING (Step {demoStep}/12)</p>
                <p className="text-[11px] text-white font-bold truncate">{demoMessage}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400">Explore Journeys:</span>
              <button
                onClick={handleTriggerAutoDemo}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/10 active:scale-95"
              >
                <Play size={12} fill="white" /> Start Auto-Demo
              </button>
            </div>
          )}

          <div className="h-5 w-[1px] bg-slate-800 mx-1"></div>

          <button
            onClick={handleResetSimulation}
            className="text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5"
            title="Reset Simulator State"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Simulator Workspace Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start justify-center">
        
        {/* RESPONSIVE PORT VIEW NAVIGATION (Only visible on screens that stack panels) */}
        <div className="xl:hidden col-span-1 bg-slate-900 border border-slate-800 p-2 rounded-2xl flex justify-between gap-1 shadow-md">
          <button
            onClick={() => setActiveTabViewport('driver')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all ${
              activeTabViewport === 'driver' 
                ? 'bg-orange-500 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User size={14} /> Driver App
          </button>
          
          <button
            onClick={() => setActiveTabViewport('garage')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all relative ${
              activeTabViewport === 'garage' 
                ? 'bg-orange-500 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users size={14} /> Garage Portal
            {driverRequest && driverRequest.status === 'requested' && (
              <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-red-500 animate-pulse border border-slate-900"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTabViewport('mechanic')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all relative ${
              activeTabViewport === 'mechanic' 
                ? 'bg-orange-500 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wrench size={14} /> Mechanic App
            {driverRequest && ['mechanic_assigned', 'en_route', 'arrived', 'diagnosing'].includes(driverRequest.status) && (
              <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-orange-500 animate-pulse border border-slate-900"></span>
            )}
          </button>
        </div>

        {/* 1. Driver Mobile Frame (Prompts 1 & 2) */}
        <div className={`col-span-1 xl:col-span-4 flex justify-center ${activeTabViewport === 'driver' ? 'block' : 'hidden xl:block'}`}>
          <div className="w-full max-w-[375px] aspect-[9/19] h-[780px] bg-slate-950 rounded-[3rem] shadow-2xl border-[8px] border-slate-800 relative overflow-hidden flex flex-col">
            {/* Camera / Speaker Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
              <div className="w-28 h-5 bg-slate-800 rounded-b-2xl flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="w-8 h-1 bg-black/60 rounded-full"></span>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden relative">
              <DriverApp
                state={stateContainer}
                onNavigate={setCurrentScreen}
                onRequestAssistance={handleRequestAssistance}
                onSelectGarage={handleSelectGarage}
                onCancelRequest={() => handleUpdateStatus('completed', 'SOS Cancelled by Driver.')}
                onClearDeclined={handleClearDeclined}
                onSubmitReview={handleSubmitReview}
                onRegister={handleRegister}
                isRegisteredMode={isRegisteredMode}
                setIsRegisteredMode={setIsRegisteredMode}
              />
            </div>

            {/* Home indicator bar */}
            <div className="absolute bottom-1 inset-x-0 h-4 flex justify-center items-center z-45 pointer-events-none">
              <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 2. Garage Dashboard Viewport (Prompt 3) */}
        <div className={`col-span-1 xl:col-span-4 flex justify-center ${activeTabViewport === 'garage' ? 'block' : 'hidden xl:block'}`}>
          <div className="w-full max-w-[375px] xl:max-w-[420px] aspect-[9/19] h-[780px] bg-slate-950 rounded-[3rem] shadow-2xl border-[8px] border-slate-800 relative overflow-hidden flex flex-col">
            {/* Camera / Speaker Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
              <div className="w-28 h-5 bg-slate-800 rounded-b-2xl flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="w-8 h-1 bg-black/60 rounded-full"></span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <GarageDashboard
                state={stateContainer}
                activeGarage={
                  // Show whichever garage received the active request; fall back to first garage
                  driverRequest?.garage
                    ? (garages.find(g => g.id === driverRequest.garage!.id) ?? garages[0])
                    : garages[0]
                }
                onAcceptRequest={handleAcceptRequest}
                onDeclineRequest={handleDeclineRequest}
                onAssignMechanic={handleAssignMechanic}
                onAddMechanic={handleAddMechanic}
                onToggleSOS={handleToggleSOS}
              />
            </div>

            {/* Home indicator bar */}
            <div className="absolute bottom-1 inset-x-0 h-4 flex justify-center items-center z-45 pointer-events-none">
              <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 3. Mechanic Mobile Frame (Prompt 4) */}
        <div className={`col-span-1 xl:col-span-4 flex justify-center ${activeTabViewport === 'mechanic' ? 'block' : 'hidden xl:block'}`}>
          <div className="w-full max-w-[375px] aspect-[9/19] h-[780px] bg-slate-950 rounded-[3rem] shadow-2xl border-[8px] border-slate-800 relative overflow-hidden flex flex-col">
            {/* Camera / Speaker Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
              <div className="w-28 h-5 bg-slate-800 rounded-b-2xl flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="w-8 h-1 bg-black/60 rounded-full"></span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <MechanicDashboard
                state={stateContainer}
                activeMechanic={mechanics[0]} // Olivier Ndizeye mobile view on duty
                onUpdateStatus={handleUpdateStatus}
                onCallDriver={() => alert('Dialing driver Eric Keza...')}
                onMessageDriver={() => alert('Opening driver message chat...')}
              />
            </div>

            {/* Home indicator bar */}
            <div className="absolute bottom-1 inset-x-0 h-4 flex justify-center items-center z-45 pointer-events-none">
              <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Simulator Workspace Footer explanation */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 mt-6 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-orange-500" />
            <p className="font-semibold">
              The views are connected via shared state. Triggering an action on one device updates the other devices instantly.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-navy-800 border border-white"></span> Driver App</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-950 border border-slate-800"></span> Garage Desktop</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Mechanic Mobile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;