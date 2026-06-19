import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2 } from
'lucide-react';
import { Screen, Mechanic } from '../../types';
interface Props {
  mechanic: Mechanic | null;
  onNavigate: (screen: Screen) => void;
}
export function BookingScreen({ mechanic, onNavigate }: Props) {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  if (!mechanic) return null;
  const dates = ['Today', 'Tomorrow', 'Wed, 24', 'Thu, 25'];
  const times = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'];
  return (
    <div className="h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 sticky top-0 z-10 shadow-sm flex items-center gap-4">
        <button
          onClick={() => onNavigate('MechanicProfile')}
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
          
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Book Service</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* Mechanic Info */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <img
            src={mechanic.image}
            alt={mechanic.name}
            className="w-16 h-16 rounded-2xl object-cover" />
          
          <div>
            <h3 className="font-bold text-gray-900">{mechanic.name}</h3>
            <p className="text-sm text-gray-500">Kigali City</p>
          </div>
        </div>

        {/* Select Service */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Select Service
          </h3>
          <div className="space-y-3">
            {mechanic.services.map((service) =>
            <label
              key={service}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-colors ${selectedService === service ? 'border-navy-800 bg-navy-50/50' : 'border-gray-100 bg-white'}`}
              onClick={() => setSelectedService(service)}>
              
                <span
                className={`font-medium ${selectedService === service ? 'text-navy-800' : 'text-gray-700'}`}>
                
                  {service}
                </span>
                <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedService === service ? 'border-navy-800 bg-navy-800' : 'border-gray-300'}`}>
                
                  {selectedService === service &&
                <CheckCircle2 size={16} className="text-white" />
                }
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Select Date */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon size={18} className="text-navy-800" />
            <h3 className="text-base font-bold text-gray-900">Choose Date</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
            {dates.map((date) =>
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-medium text-sm transition-colors ${selectedDate === date ? 'bg-navy-800 text-white shadow-md shadow-navy-800/20' : 'bg-white text-gray-600 border border-gray-200'}`}>
              
                {date}
              </button>
            )}
          </div>
        </div>

        {/* Select Time */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-navy-800" />
            <h3 className="text-base font-bold text-gray-900">Choose Time</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {times.map((time) =>
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${selectedTime === time ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-white text-gray-600 border border-gray-200'}`}>
              
                {time}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-6 pb-8">
        <button
          disabled={!selectedService}
          onClick={() => onNavigate('Payment')}
          className="w-full bg-navy-800 disabled:bg-gray-300 disabled:shadow-none text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-navy-800/20 transition-all flex items-center justify-center gap-2">
          
          Confirm Booking
        </button>
      </div>
    </div>);

}