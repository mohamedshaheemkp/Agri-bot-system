import React from 'react';

export default function Message({ content, isBot }) {
  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`max-w-[80%] rounded-2xl px-5 py-3 ${
          isBot 
            ? 'bg-white border border-emerald-100 text-slate-700 shadow-sm rounded-tl-none' 
            : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 rounded-tr-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
