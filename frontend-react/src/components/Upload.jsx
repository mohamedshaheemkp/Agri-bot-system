import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

export default function Upload({ onUpload, isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    onUpload(file);
  };

  const clearPreview = () => {
    setPreview(null);
    onUpload(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-100 group">
          <img src={preview} alt="Upload preview" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={clearPreview}
              className="bg-white/20 hover:bg-white flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:text-red-500 backdrop-blur-md transition text-sm font-medium"
              disabled={isLoading}
            >
              <X className="w-4 h-4" /> Remove Image
            </button>
          </div>
        </div>
      ) : (
        <label 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
            dragActive 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'border-emerald-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-400'
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${dragActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="mb-2 text-sm text-slate-500">
              <span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> PNG, JPG or WEBP
            </p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleChange}
            disabled={isLoading}
          />
        </label>
      )}
    </div>
  );
}
