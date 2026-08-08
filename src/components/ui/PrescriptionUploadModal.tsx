'use client';
import React, { useState, useRef } from 'react';
import { X, UploadCloud, File, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Validate file type (image or pdf)
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Please upload an image (JPG, PNG) or PDF document.');
      return;
    }
    // Validate size (e.g., max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File is too large. Please upload a file smaller than 5MB.');
      return;
    }
    setFile(selectedFile);
    setUploadState('idle');
    setUploadProgress(0);
  };

  const simulateUpload = () => {
    if (!file) return;
    setUploadState('uploading');
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5; // Random progress jump
      });
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setUploadState('idle');
    setUploadProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleClose = () => {
    // Reset state on close
    setTimeout(() => {
      setFile(null);
      setUploadState('idle');
      setUploadProgress(0);
    }, 300);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-near-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      <div className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] w-full max-w-[520px] relative z-10 overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="px-6 py-5 border-b border-light-gray flex items-center justify-between bg-off-white/50">
          <h3 className="font-plus-jakarta font-bold text-[20px] text-near-black m-0">Upload Prescription</h3>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white border border-light-gray flex items-center justify-center text-mid-gray hover:text-near-black hover:bg-off-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {uploadState === 'success' ? (
            <div className="py-8 flex flex-col items-center justify-center text-center animate-fade-up">
              <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mb-5">
                <CheckCircle size={40} className="text-teal" />
              </div>
              <h4 className="font-plus-jakarta font-bold text-[22px] text-near-black mb-2">Upload Successful!</h4>
              <p className="text-[15px] text-dark-gray mb-8 max-w-[300px]">
                Your prescription has been securely uploaded. Our AI will now analyze it.
              </p>
              <Button variant="primary" className="w-full justify-center" onClick={handleClose}>
                Done
              </Button>
            </div>
          ) : (
            <>
              {!file ? (
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                    dragActive 
                      ? 'border-blue bg-blue/5 scale-[1.02]' 
                      : 'border-light-gray bg-off-white/50 hover:bg-off-white hover:border-blue/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <input 
                    ref={inputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg,image/png,image/jpg,application/pdf"
                    onChange={handleChange}
                  />
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-blue">
                    <UploadCloud size={32} />
                  </div>
                  <h4 className="font-plus-jakarta font-bold text-[17px] text-near-black mb-1">
                    Drag & Drop your file here
                  </h4>
                  <p className="text-[14px] text-mid-gray mb-4">
                    or click to browse from your computer
                  </p>
                  <div className="flex gap-2 justify-center">
                    <span className="text-[11px] font-bold text-dark-gray bg-white px-2 py-1 rounded border border-light-gray shadow-sm">JPG</span>
                    <span className="text-[11px] font-bold text-dark-gray bg-white px-2 py-1 rounded border border-light-gray shadow-sm">PNG</span>
                    <span className="text-[11px] font-bold text-dark-gray bg-white px-2 py-1 rounded border border-light-gray shadow-sm">PDF</span>
                  </div>
                  <p className="text-[12px] text-mid-gray mt-4">Max file size: 5MB</p>
                </div>
              ) : (
                <div className="bg-off-white rounded-2xl p-4 border border-light-gray">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-light-gray/50 flex items-center justify-center shrink-0">
                      {file.type.includes('image') ? (
                        <div className="w-full h-full relative rounded-xl overflow-hidden">
                           <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <File size={24} className="text-blue" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-[15px] text-near-black truncate mb-0.5">{file.name}</p>
                          <p className="text-[13px] text-mid-gray">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                        {uploadState === 'idle' && (
                          <button onClick={removeFile} className="text-mid-gray hover:text-red transition-colors p-1 cursor-pointer bg-transparent border-none">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      {uploadState === 'uploading' && (
                        <div className="mt-4">
                          <div className="flex justify-between text-[12px] font-bold mb-1.5">
                            <span className="text-blue">Uploading...</span>
                            <span className="text-near-black">{uploadProgress}%</span>
                          </div>
                          <div className="h-2 bg-light-gray rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="text" onClick={handleClose} disabled={uploadState === 'uploading'}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  disabled={!file || uploadState === 'uploading'}
                  onClick={simulateUpload}
                  className="min-w-[120px] justify-center"
                >
                  {uploadState === 'uploading' ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
