import React from 'react';
import {
  Search,
  MapPin,
  Wrench,
  AlertTriangle,
  Bell,
  ChevronRight } from
'lucide-react';
import { Screen } from '../../types';
export function HomeScreen({
  onNavigate


}: {onNavigate: (screen: Screen) => void;}) {
  return (
    <div className="h-full w-full bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-navy-800 px-6 pt-14 pb-6 rounded-b-[2.5rem] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-navy-100 text-sm font-medium mb-1">
              Good morning,
            </p>
            <h1 className="text-white text-2xl font-bold">Makuza Nadege</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <img
              src="/personal_p.jpg"
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover" />
            
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Find a mechanic near you..."
            className="w-full bg-white rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none shadow-sm"
            onClick={() => onNavigate('MechanicList')} />
          
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Map Placeholder */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
          <div className="relative h-40 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
            {/* Mock Map Grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 to-transparent"></div>

            {/* Map Pins */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center shadow-lg shadow-navy-800/30 mb-1 animate-bounce">
                <MapPin className="text-white" size={24} />
              </div>
              <div className="w-4 h-1.5 bg-black/20 rounded-full blur-[2px]"></div>
            </div>

            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <Wrench className="text-orange-500" size={14} />
            </div>
            <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <Wrench className="text-orange-500" size={14} />
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Your Location
              </p>
              <p className="text-xs text-gray-500">Kigali City Center</p>
            </div>
            <button className="text-navy-800 text-sm font-medium">
              Change
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('MechanicList')}
            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start text-left hover:shadow-md transition-shadow">
            
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <Wrench className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Find Mechanic</h3>
            <p className="text-xs text-gray-500">Browse nearby shops</p>
          </button>

          <button
            onClick={() => onNavigate('Maintenance')}
            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start text-left hover:shadow-md transition-shadow">
            
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <Bell className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Maintenance</h3>
            <p className="text-xs text-gray-500">Service reminders</p>
          </button>
        </div>

        {/* Emergency Action */}
        <button
          onClick={() => onNavigate('Emergency')}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-3xl shadow-lg shadow-orange-500/20 flex items-center justify-between text-left">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-0.5">
                Emergency Help
              </h3>
              <p className="text-orange-100 text-sm">
                Get roadside assistance now
              </p>
            </div>
          </div>
          <ChevronRight className="text-white/80" size={24} />
        </button>
      </div>
    </div>);

}