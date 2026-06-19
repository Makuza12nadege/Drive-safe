import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Star,
  MapPin,
  Phone,
  Calendar,
  Navigation,
  MessageSquare } from
'lucide-react';
import { Screen, Mechanic } from '../../types';
interface Props {
  mechanic: Mechanic | null;
  onNavigate: (screen: Screen) => void;
}
export function MechanicProfileScreen({ mechanic, onNavigate }: Props) {
  if (!mechanic) return null;
  return (
    <div className="h-full w-full bg-white pb-24 overflow-y-auto">
      {/* Header Image */}
      <div className="relative h-72">
        <img
          src={mechanic.image}
          alt={mechanic.name}
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

        <button
          onClick={() => onNavigate('MechanicList')}
          className="absolute top-14 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
          
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="relative -mt-8 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{mechanic.name}</h1>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Star className="text-orange-500 fill-orange-500" size={18} />
              <span className="font-bold text-gray-900 text-lg">
                {mechanic.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {mechanic.reviews} reviews
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <MapPin size={16} className="text-navy-800" />
          <span>{mechanic.distance} km away • Kigali City</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 bg-navy-50 text-navy-800 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
            <Phone size={18} /> Call
          </button>
          <button
            onClick={() => onNavigate('Booking')}
            className="flex-1 bg-navy-800 text-white py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-navy-800/20">
            
            <Calendar size={18} /> Book
          </button>
          <button className="w-12 bg-gray-50 text-gray-700 py-3 rounded-2xl flex items-center justify-center border border-gray-100">
            <Navigation size={18} />
          </button>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Services Offered
          </h3>
          <div className="flex flex-wrap gap-2">
            {mechanic.services.map((service, idx) =>
            <span
              key={idx}
              className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-100">
              
                {service}
              </span>
            )}
          </div>
        </div>

        {/* About */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {mechanic.about}
          </p>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Reviews</h3>
            <button className="text-navy-800 text-sm font-medium">
              See all
            </button>
          </div>

          <div className="space-y-4">
            {[
            {
              name: 'Sarah M.',
              text: 'Great service! Fixed my brakes in under an hour.',
              rating: 5
            },
            {
              name: 'David K.',
              text: 'Very professional mechanic. Highly recommended.',
              rating: 4
            }].
            map((review, idx) =>
            <div key={idx} className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) =>
                  <Star
                    key={i}
                    className="text-orange-500 fill-orange-500"
                    size={12} />

                  )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}