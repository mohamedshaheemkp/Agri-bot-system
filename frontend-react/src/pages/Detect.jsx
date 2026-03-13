import React, { useState } from 'react';
import Upload from '../components/Upload';
import { Scan, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function Detect() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleDetect = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post("http://localhost:8000/detect", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data.detections);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Scan className="text-emerald-600" />
          Disease Detection
        </h1>
        <p className="text-slate-500 mt-2">Upload a clear photo of your plant leaf for instant AI analysis.</p>
      </div>

      <div className="glass-panel p-8 md:p-12 mb-8">
        <Upload onUpload={setFile} isLoading={loading} />
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleDetect}
            disabled={!file || loading}
            className={`btn-primary px-8 py-3 text-lg ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5" /> Analyze Image
              </span>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 mb-8">
          <AlertCircle className="shrink-0 w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {results !== null && (
        <div className="glass-panel p-8 animate-in slide-in-from-bottom-8 duration-500">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" />
            Analysis Results
          </h2>
          
          {results.length === 0 ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl text-center">
              <p className="font-medium text-lg">Healthy Crop!</p>
              <p className="text-emerald-600/80 mt-1 text-sm">No diseases or pests detected in this image.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((item, idx) => (
                <div key={idx} className="bg-white border text-left border-red-100 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-red-700 capitalize text-lg">{item.disease}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      {(item.confidence * 100).toFixed(1)}% Match
                    </span>
                  </div>
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium underline mt-2 block w-full text-left">
                    Ask Advisor about this {'>'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
