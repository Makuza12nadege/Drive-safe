import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Car,
  Bell,
  Settings,
  Wrench,
  History,
  AlertCircle,
  CheckCircle2,
  Edit2 } from
'lucide-react';
import { Screen } from '../../types';
export function MaintenanceScreen({
  onNavigate


}: {onNavigate: (screen: Screen) => void;}) {
  const [activeTab, setActiveTab] = useState<
    'vehicle' | 'reminders' | 'history'>(
    'reminders');
  const [mileage, setMileage] = useState(123000);
  const [isEditingMileage, setIsEditingMileage] = useState(false);
  const [tempMileage, setTempMileage] = useState(mileage.toString());
  // Mock vehicle data
  const vehicle = {
    brand: 'Toyota',
    model: 'Corolla',
    year: '2015',
    fuelType: 'Petrol'
  };
  // Predefined maintenance rules
  const maintenanceRules = [
  {
    service: 'Engine Oil Change',
    interval: 5000,
    lastDone: 120000
  },
  {
    service: 'Brake Inspection',
    interval: 10000,
    lastDone: 115000
  },
  {
    service: 'Tire Rotation',
    interval: 10000,
    lastDone: 118000
  },
  {
    service: 'Air Filter Change',
    interval: 15000,
    lastDone: 110000
  }];

  // Calculate reminders based on current mileage
  const reminders = maintenanceRules.
  map((rule) => {
    const nextDue = rule.lastDone + rule.interval;
    const remaining = nextDue - mileage;
    let status: 'due' | 'upcoming' | 'good' = 'good';
    if (remaining <= 0) status = 'due';else
    if (remaining <= 2000) status = 'upcoming';
    return {
      ...rule,
      nextDue,
      remaining,
      status
    };
  }).
  sort((a, b) => a.remaining - b.remaining);
  const handleUpdateMileage = (e: React.FormEvent) => {
    e.preventDefault();
    setMileage(parseInt(tempMileage));
    setIsEditingMileage(false);
  };
  return (
    <div className="h-full w-full bg-slate-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-navy-800 px-6 pt-14 pb-6 rounded-b-[2.5rem] shadow-md z-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('Home')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">Vehicle Center</h1>
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            <Settings size={20} />
          </button>
        </div>

        {/* Vehicle Summary Card */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center">
                <Car className="text-navy-800" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  {vehicle.brand} {vehicle.model}
                </h2>
                <p className="text-sm text-gray-500">
                  {vehicle.year} • {vehicle.fuelType}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Current Mileage</p>
              {isEditingMileage ?
              <form
                onSubmit={handleUpdateMileage}
                className="flex items-center gap-2">
                
                  <input
                  type="number"
                  value={tempMileage}
                  onChange={(e) => setTempMileage(e.target.value)}
                  className="w-24 bg-white border border-gray-300 rounded px-2 py-1 text-sm font-bold text-gray-900"
                  autoFocus />
                
                  <button
                  type="submit"
                  className="text-xs bg-navy-800 text-white px-2 py-1 rounded">
                  
                    Save
                  </button>
                </form> :

              <p className="font-bold text-gray-900 text-lg">
                  {mileage.toLocaleString()} km
                </p>
              }
            </div>
            {!isEditingMileage &&
            <button
              onClick={() => setIsEditingMileage(true)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-navy-800">
              
                <Edit2 size={14} />
              </button>
            }
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 pt-6 gap-2">
        <button
          onClick={() => setActiveTab('reminders')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'reminders' ? 'bg-navy-800 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}>
          
          Reminders
        </button>
        <button
          onClick={() => setActiveTab('vehicle')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'vehicle' ? 'bg-navy-800 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}>
          
          Vehicle Info
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'history' ? 'bg-navy-800 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}>
          
          History
        </button>
      </div>

      {/* Content Area */}
      <div className="px-6 pt-6 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'reminders' &&
          <motion.div
            key="reminders"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            className="space-y-4">
            
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">
                  Maintenance Schedule
                </h3>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  Auto-calculated
                </span>
              </div>

              {reminders.map((reminder, idx) =>
            <div
              key={idx}
              className={`bg-white rounded-3xl p-4 shadow-sm border flex gap-4 items-center relative overflow-hidden ${reminder.status === 'due' ? 'border-red-200' : reminder.status === 'upcoming' ? 'border-orange-200' : 'border-gray-100'}`}>
              
                  <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${reminder.status === 'due' ? 'bg-red-500' : reminder.status === 'upcoming' ? 'bg-orange-500' : 'bg-green-500'}`}>
              </div>

                  <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${reminder.status === 'due' ? 'bg-red-50' : reminder.status === 'upcoming' ? 'bg-orange-50' : 'bg-green-50'}`}>
                
                    {reminder.status === 'due' ?
                <AlertCircle className="text-red-500" size={24} /> :
                reminder.status === 'upcoming' ?
                <Bell className="text-orange-500" size={24} /> :

                <CheckCircle2 className="text-green-500" size={24} />
                }
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {reminder.service}
                    </h4>
                    {reminder.status === 'due' ?
                <p className="text-xs font-semibold text-red-600 mt-0.5">
                        Overdue by{' '}
                        {Math.abs(reminder.remaining).toLocaleString()} km
                      </p> :
                reminder.status === 'upcoming' ?
                <p className="text-xs font-semibold text-orange-600 mt-0.5">
                        Due in {reminder.remaining.toLocaleString()} km
                      </p> :

                <p className="text-xs text-gray-500 mt-0.5">
                        Due at {reminder.nextDue.toLocaleString()} km
                      </p>
                }
                  </div>

                  {(reminder.status === 'due' ||
              reminder.status === 'upcoming') &&
              <button
                onClick={() => onNavigate('MechanicList')}
                className={`text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm ${reminder.status === 'due' ? 'bg-red-500' : 'bg-orange-500'}`}>
                
                      Fix Now
                    </button>
              }
                </div>
            )}
            </motion.div>
          }

          {activeTab === 'vehicle' &&
          <motion.div
            key="vehicle"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}>
            
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">
                  Vehicle Information
                </h3>
                <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}>
                
                  <div>
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block">
                      Car Brand
                    </label>
                    <input
                    type="text"
                    defaultValue={vehicle.brand}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800" />
                  
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block">
                      Model
                    </label>
                    <input
                    type="text"
                    defaultValue={vehicle.model}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800" />
                  
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block">
                        Year
                      </label>
                      <input
                      type="number"
                      defaultValue={vehicle.year}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800" />
                    
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block">
                        Fuel Type
                      </label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800">
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>Electric</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                  </div>
                  <button
                  type="submit"
                  className="w-full bg-navy-800 text-white py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-navy-800/20">
                  
                    Save Changes
                  </button>
                </form>
              </div>
            </motion.div>
          }

          {activeTab === 'history' &&
          <motion.div
            key="history"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}>
            
              <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-8">
                {[
              {
                date: 'March 5, 2024',
                service: 'Tire Rotation',
                mechanic: 'Kigali Auto Fix',
                mileage: '118,000 km'
              },
              {
                date: 'Feb 20, 2024',
                service: 'Brake Check',
                mechanic: 'Speedy Motors',
                mileage: '115,000 km'
              },
              {
                date: 'Jan 10, 2024',
                service: 'Full Engine Service',
                mechanic: 'John Garage',
                mileage: '110,000 km'
              }].
              map((item, idx) =>
              <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-navy-800 rounded-full border-4 border-slate-50"></div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">
                          {item.service}
                        </h4>
                        <span className="text-xs font-medium text-gray-500">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Wrench size={14} className="text-gray-400" />
                        <span>{item.mechanic}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <History size={14} className="text-gray-400" />
                        <span>{item.mileage}</span>
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}