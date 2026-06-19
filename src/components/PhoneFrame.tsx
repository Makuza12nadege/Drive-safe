import React from 'react';
export function PhoneFrame({ children }: {children: React.ReactNode;}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 p-4 sm:p-8">
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-gray-900 flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-slate-50">
          {children}
        </div>
      </div>
    </div>);

}