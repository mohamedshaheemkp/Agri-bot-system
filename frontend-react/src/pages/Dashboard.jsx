import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, MessageSquare, Sprout } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <div className="glass-panel p-10 max-w-3xl w-full text-center space-y-8">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-full">
            <Sprout className="w-16 h-16 text-emerald-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Welcome to <span className="text-emerald-600">Agri Bot System</span>
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Empowering farmers with AI. Detect plant diseases instantly and get expert advice through our interactive chatbot.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          <Link 
            to="/detect" 
            className="group relative bg-white border border-emerald-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col items-center gap-4 hover:-translate-y-1"
          >
            <div className="bg-emerald-50 p-4 rounded-full group-hover:bg-emerald-100 transition-colors">
              <Scan className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Disease Detection</h2>
            <p className="text-sm text-slate-500 text-center">Upload a photo of your crop to instantly identify diseases and pests.</p>
          </Link>

          <Link 
            to="/chat" 
            className="group relative bg-white border border-emerald-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col items-center gap-4 hover:-translate-y-1"
          >
            <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Agri Chatbot</h2>
            <p className="text-sm text-slate-500 text-center">Ask our AI assistant about farming practices, treatments, and more.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
