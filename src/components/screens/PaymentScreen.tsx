import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { Screen } from '../../types';
export function PaymentScreen({
  onNavigate


}: {onNavigate: (screen: Screen) => void;}) {
  const [method, setMethod] = useState<'momo' | 'card'>('momo');
  const [isSuccess, setIsSuccess] = useState(false);
  if (isSuccess) {
    return (
      <div className="h-full w-full bg-navy-800 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            bounce: 0.5
          }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
          
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>
        <motion.h2
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.2
          }}
          className="text-3xl font-bold text-white mb-2">
          
          Booking Confirmed!
        </motion.h2>
        <motion.p
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.3
          }}
          className="text-navy-100 mb-10">
          
          The mechanic has received your request.
        </motion.p>
        <motion.button
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.4
          }}
          onClick={() => onNavigate('Home')}
          className="w-full bg-white text-navy-800 py-4 rounded-2xl font-bold text-lg">
          
          Back to Home
        </motion.button>
      </div>);

  }
  return (
    <div className="h-full w-full bg-slate-50 flex flex-col">
      <div className="bg-white px-6 pt-14 pb-4 sticky top-0 z-10 shadow-sm flex items-center gap-4">
        <button
          onClick={() => onNavigate('Booking')}
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
          
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Payment</h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 text-center">
          <p className="text-gray-500 text-sm mb-1">Total Amount</p>
          <h2 className="text-4xl font-bold text-gray-900">$45.00</h2>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-4">
          Select Payment Method
        </h3>

        <div className="space-y-4">
          <label
            className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-colors ${method === 'momo' ? 'border-navy-800 bg-navy-50/50' : 'border-gray-100 bg-white'}`}
            onClick={() => setMethod('momo')}>
            
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${method === 'momo' ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
              
              <Smartphone size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Mobile Money</h4>
              <p className="text-xs text-gray-500">MTN, Airtel</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'momo' ? 'border-navy-800 bg-navy-800' : 'border-gray-300'}`}>
              
              {method === 'momo' &&
              <CheckCircle2 size={16} className="text-white" />
              }
            </div>
          </label>

          <label
            className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-colors ${method === 'card' ? 'border-navy-800 bg-navy-50/50' : 'border-gray-100 bg-white'}`}
            onClick={() => setMethod('card')}>
            
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${method === 'card' ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
              
              <CreditCard size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Credit/Debit Card</h4>
              <p className="text-xs text-gray-500">Visa, Mastercard</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-navy-800 bg-navy-800' : 'border-gray-300'}`}>
              
              {method === 'card' &&
              <CheckCircle2 size={16} className="text-white" />
              }
            </div>
          </label>
        </div>

        {method === 'momo' &&
        <div className="mt-6">
            <input
            type="tel"
            placeholder="Enter Mobile Number"
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-800" />
          
          </div>
        }
      </div>

      <div className="bg-white border-t border-gray-100 p-6 pb-8">
        <button
          onClick={() => setIsSuccess(true)}
          className="w-full bg-navy-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-navy-800/20">
          
          Pay $45.00
        </button>
      </div>
    </div>);

}