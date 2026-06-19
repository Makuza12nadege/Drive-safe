import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, User } from 'lucide-react';
import { Screen } from '../../types';
import logo from '../../Logo.png';

export function AuthScreen({
  onNavigate
}: {onNavigate: (screen: Screen) => void;}) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="h-full w-full bg-white flex flex-col px-6 pt-20 pb-8">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="Drive Safe Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl font-bold text-navy-800">Drive Safe</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-gray-500 mb-8">
          {isLogin ?
          'Log in to access your trusted mechanics.' :
          'Sign up to get started with Drive Safe.'}
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onNavigate('Home');
          }}>
          
          {!isLogin &&
          <div className="relative">
              <User
              className="absolute left-4 top-3.5 text-gray-400"
              size={20} />
            
              <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent transition-all"
              required />
            
            </div>
          }

          <div className="relative">
            <Phone
              className="absolute left-4 top-3.5 text-gray-400"
              size={20} />
            
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent transition-all"
              required />
            
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent transition-all"
              required />
            
          </div>

          {isLogin &&
          <div className="flex justify-end">
              <button
              type="button"
              className="text-sm font-medium text-navy-800">
              
                Forgot password?
              </button>
            </div>
          }

          <button
            type="submit"
            className="w-full bg-navy-800 text-white rounded-2xl py-4 font-semibold text-lg shadow-lg shadow-navy-800/20 hover:bg-navy-900 transition-colors mt-6">
            
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button className="mt-6 w-full bg-white border border-gray-200 text-gray-700 rounded-2xl py-3.5 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4" />
              
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853" />
              
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05" />
              
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335" />
              
            </svg>
            Google
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-navy-800">
            
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>);

}