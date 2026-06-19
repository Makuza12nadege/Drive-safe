import React from 'react';
import { ChevronRight, Settings, Clock, Car, Bell, LogOut } from 'lucide-react';
import { Screen } from '../../types';
export function ProfileScreen({
  onNavigate


}: {onNavigate: (screen: Screen) => void;}) {
  const menuItems = [
  {
    icon: Clock,
    label: 'My Bookings',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    icon: Car,
    label: 'My Vehicles',
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    icon: Bell,
    label: 'Notifications',
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    icon: Settings,
    label: 'Settings',
    color: 'text-gray-500',
    bg: 'bg-gray-100'
  }];

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col pb-24">
      <div className="bg-white px-6 pt-14 pb-8 rounded-b-[2.5rem] shadow-sm flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src="/personal_p.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
          
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center text-white border-2 border-white">
            <Settings size={14} />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Makuza Nadege</h1>
        <p className="text-gray-500 text-sm">+250 788 123 456</p>
      </div>

      <div className="px-6 pt-8 space-y-3 flex-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
              
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}>
                  
                  <Icon className={item.color} size={20} />
                </div>
                <span className="font-semibold text-gray-900">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </button>);

        })}

        <button
          onClick={() => onNavigate('Auth')}
          className="w-full bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-between hover:bg-red-100 transition-colors mt-8">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white">
              <LogOut className="text-red-500" size={20} />
            </div>
            <span className="font-semibold text-red-600">Log Out</span>
          </div>
        </button>
      </div>
    </div>);

}