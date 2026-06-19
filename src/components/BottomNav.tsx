import React from 'react';
import { Home, Wrench, AlertTriangle, User, Car } from 'lucide-react';
import { Screen } from '../types';
interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}
export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
  {
    id: 'Home',
    icon: Home,
    label: 'Home'
  },
  {
    id: 'MechanicList',
    icon: Wrench,
    label: 'Mechanics'
  },
  {
    id: 'Emergency',
    icon: AlertTriangle,
    label: 'Emergency'
  },
  {
    id: 'Maintenance',
    icon: Car,
    label: 'Vehicle'
  },
  {
    id: 'Profile',
    icon: User,
    label: 'Profile'
  }];

  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 shadow-up px-4 py-4 pb-8 z-40">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
          currentScreen === item.id ||
          item.id === 'MechanicList' && currentScreen === 'MechanicProfile';
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-navy-800' : 'text-gray-400 hover:text-gray-600'}`}>
              
              <div
                className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-navy-50' : 'bg-transparent'}`}>
                
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={
                  item.id === 'Emergency' && isActive ? 'text-orange-500' : ''
                  } />
                
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? 'text-navy-800' : 'text-gray-400'}`}>
                
                {item.label}
              </span>
            </button>);

        })}
      </div>
    </div>);

}