import React from 'react';
import Chatbot from '../components/Chatbot';

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Expert Agri Advisor</h1>
        <p className="text-slate-500 mt-2">Get instant answers about crop health, treatments, and best practices.</p>
      </div>
      
      <Chatbot />
    </div>
  );
}
