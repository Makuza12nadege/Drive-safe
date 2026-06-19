import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Star, MapPin, Filter } from 'lucide-react';
import { Screen, Mechanic } from '../../types';
import { mockMechanics } from '../../data';
interface Props {
  onNavigate: (screen: Screen) => void;
  onSelectMechanic: (mechanic: Mechanic) => void;
}
export function MechanicListScreen({ onNavigate, onSelectMechanic }: Props) {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <div className="h-full w-full bg-slate-50 pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('Home')}
            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
            
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Nearby Mechanics</h1>
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
            <Filter size={20} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or service..."
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-800" />
          
        </div>
      </div>

      {/* List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 pt-6 space-y-4 overflow-y-auto">
        
        {mockMechanics.map((mechanic) =>
        <motion.div
          key={mechanic.id}
          variants={item}
          onClick={() => {
            onSelectMechanic(mechanic);
            onNavigate('MechanicProfile');
          }}
          className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow">
          
            <img
            src={mechanic.image}
            alt={mechanic.name}
            className="w-24 h-24 rounded-2xl object-cover" />
          
            <div className="flex-1 py-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{mechanic.name}</h3>
                <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-lg">
                  <Star className="text-orange-500 fill-orange-500" size={12} />
                  <span className="text-xs font-bold text-orange-700">
                    {mechanic.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                <MapPin size={12} />
                <span>{mechanic.distance} km away</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {mechanic.services.slice(0, 2).map((service, idx) =>
              <span
                key={idx}
                className="bg-gray-50 text-gray-600 text-[10px] font-medium px-2 py-1 rounded-md border border-gray-100">
                
                    {service}
                  </span>
              )}
                {mechanic.services.length > 2 &&
              <span className="bg-gray-50 text-gray-600 text-[10px] font-medium px-2 py-1 rounded-md border border-gray-100">
                    +{mechanic.services.length - 2}
                  </span>
              }
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>);

}