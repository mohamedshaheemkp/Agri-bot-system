import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { Send, Loader2, Bot } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! I'm your Agri Bot assistant. How can I help you regarding your crops today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), content: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Assuming a backend endpoint exists, wait we need to use agri_ai.py later.
      // We will make a generic backend call wrapper here.
      // For now, simulate or make a request to /api/chat
      const response = await axios.post("http://localhost:8000/chat", { message: userMessage.content });
      setMessages(prev => [...prev, { id: Date.now(), content: response.data.reply, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now(), content: "Sorry, I'm having trouble connecting right now. Please try again later.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto glass-panel overflow-hidden border border-emerald-100 shadow-xl shadow-emerald-900/5">
      <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold">Agri Advisor</h2>
            <p className="text-emerald-100 text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block"></span> Online
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
        <div className="space-y-4 pt-4">
          {messages.map(msg => (
            <Message key={msg.id} content={msg.content} isBot={msg.isBot} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-emerald-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                <span className="text-sm text-slate-500 font-medium">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-emerald-100">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, diseases, or farming..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-shadow text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white rounded-xl px-4 py-2 transition-all active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
