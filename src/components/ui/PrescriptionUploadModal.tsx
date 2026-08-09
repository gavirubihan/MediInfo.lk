'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle,
  Trash2,
  Pill,
  Camera,
  ScanSearch,
  Eye,
  RefreshCw,
  Check,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Button } from './Button';
import { getStoredMedicines, MedicineRecord } from '@/data/medicinesData';
import { useRouter } from '@/i18n/routing';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Scan step labels — plain language, no jargon
const SCAN_STEPS = [
  'Reading your image…',
  'Finding medicines…',
  'Checking our database…',
];

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [identifiedMedicines, setIdentifiedMedicines] = useState<MedicineRecord[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [uploadMode, setUploadMode] = useState<'file' | 'camera'>('file');
  const [showImagePreview, setShowImagePreview] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL when file changes
  useEffect(() => {
    if (!file) { setFilePreviewUrl(null); return; }
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFilePreviewUrl(null);
    }
  }, [file]);

  if (!isOpen) return null;

  // ── Drag & drop ────────────────────────────────────────────────────────────
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Please choose a photo (JPG, PNG) or PDF of your prescription.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('The file is too large. Please use a file smaller than 10 MB.');
      return;
    }
    setFile(selectedFile);
    setUploadState('idle');
    setScanProgress(0);
  };

  // ── Camera (simulated) ─────────────────────────────────────────────────────
  const handleCameraCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 600, 800);
      ctx.fillStyle = '#1A6FBF'; ctx.fillRect(0, 0, 600, 90);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 24px sans-serif'; ctx.fillText('Medical Clinic', 40, 55);
      ctx.fillStyle = '#1A6FBF'; ctx.font = 'bold 48px serif'; ctx.fillText('Rx', 40, 160);
      ctx.fillStyle = '#334155'; ctx.font = '20px sans-serif';
      ctx.fillText('1. Paracetamol 500mg - 1 tab tid po', 40, 240);
      ctx.fillText('2. Amoxicillin 250mg - 1 cap tid x 7d', 40, 300);
      ctx.fillText('3. Cetirizine 10mg - 1 tab hs', 40, 360);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(350, 650); ctx.lineTo(550, 650); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.font = 'italic 16px sans-serif';
      ctx.fillText('Dr. S. Perera (SLMC-45291)', 350, 680);
    }
    canvas.toBlob((blob) => {
      if (blob) {
        const f = new File([blob], `prescription_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setFile(f);
        setUploadMode('file');
      }
    }, 'image/jpeg');
  };

  // ── Scan simulation ────────────────────────────────────────────────────────
  const startScan = () => {
    if (!file) return;
    setUploadState('scanning');
    setScanProgress(0);
    setScanStepIndex(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setScanStepIndex(1), 700);
          setTimeout(() => setScanStepIndex(2), 1800);
          setTimeout(() => {
            const medicines = getStoredMedicines();
            const med1 = medicines.find(m => m.id === 'med-01') || medicines[0];
            const med2 = medicines.find(m => m.id === 'med-02') || medicines[1];
            const results = med2 && med2.id !== med1.id ? [med1, med2] : [med1];
            setIdentifiedMedicines(results);
            setUploadState('results');
          }, 2800);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 20) + 10);
      });
    }, 160);
  };

  const removeFile = () => {
    setFile(null); setFilePreviewUrl(null);
    setUploadState('idle'); setScanProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFile(null); setFilePreviewUrl(null);
      setUploadState('idle'); setScanProgress(0);
      setIdentifiedMedicines([]); setShowImagePreview(false);
    }, 300);
  };

  const resetScan = () => {
    setFile(null); setFilePreviewUrl(null);
    setUploadState('idle'); setScanProgress(0);
    setIdentifiedMedicines([]); setScanStepIndex(0);
  };

  // ── Step indicator ─────────────────────────────────────────────────────────
  const step = uploadState === 'results' ? 3 : uploadState === 'scanning' ? 2 : 1;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-near-black/55 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="
        bg-white rounded-3xl w-full max-w-[560px] relative z-10
        shadow-[0_28px_80px_rgba(0,0,0,0.20)] border border-light-gray/40
        animate-fade-up my-auto overflow-hidden
      ">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue to-blue-dark text-white flex items-center justify-center shadow-[0_4px_12px_rgba(26,111,191,0.3)]">
              <Camera size={20} />
            </div>
            <div>
              <h3 className="font-plus-jakarta font-extrabold text-[18px] text-near-black leading-tight">
                Scan Your Prescription
              </h3>
              <p className="text-[12px] text-mid-gray mt-0.5">
                Upload or take a photo — we&apos;ll find your medicines
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-off-white border border-light-gray flex items-center justify-center text-mid-gray hover:text-near-black hover:bg-light-gray transition-all cursor-pointer shrink-0 mt-0.5"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Step indicator ─────────────────────────────────────────────── */}
        <div className="mx-6 mb-5">
          <div className="flex items-center gap-1">
            {/* Step 1 */}
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue' : 'text-mid-gray'}`}>
              <div className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                step > 1 ? 'bg-teal text-white' : step === 1 ? 'bg-blue text-white' : 'bg-light-gray text-mid-gray'
              }`}>
                {step > 1 ? <Check size={12} /> : '1'}
              </div>
              <span className="text-[12px] font-semibold hidden sm:inline">Upload</span>
            </div>
            <div className={`flex-1 h-px mx-1 rounded-full ${step > 1 ? 'bg-teal' : 'bg-light-gray'}`} />
            {/* Step 2 */}
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue' : 'text-mid-gray'}`}>
              <div className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                step > 2 ? 'bg-teal text-white' : step === 2 ? 'bg-blue text-white' : 'bg-light-gray text-mid-gray'
              }`}>
                {step > 2 ? <Check size={12} /> : '2'}
              </div>
              <span className="text-[12px] font-semibold hidden sm:inline">Scanning</span>
            </div>
            <div className={`flex-1 h-px mx-1 rounded-full ${step > 2 ? 'bg-teal' : 'bg-light-gray'}`} />
            {/* Step 3 */}
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-teal' : 'text-mid-gray'}`}>
              <div className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                step === 3 ? 'bg-teal text-white' : 'bg-light-gray text-mid-gray'
              }`}>
                {step === 3 ? <Check size={12} /> : '3'}
              </div>
              <span className="text-[12px] font-semibold hidden sm:inline">Results</span>
            </div>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="px-6 pb-6 space-y-5">

          {/* ====== STEP 1: UPLOAD ====== */}
          {uploadState === 'idle' && (
            <div className="space-y-4 animate-fade-up">

              {/* Mode toggle */}
              <div className="flex p-1 bg-off-white rounded-xl border border-light-gray/70 w-full">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 py-2 px-3 text-[13px] font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-none ${
                    uploadMode === 'file'
                      ? 'bg-white text-blue shadow-sm border border-light-gray/60'
                      : 'text-mid-gray hover:text-dark-gray bg-transparent'
                  }`}
                >
                  <UploadCloud size={15} /> Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('camera')}
                  className={`flex-1 py-2 px-3 text-[13px] font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-none ${
                    uploadMode === 'camera'
                      ? 'bg-white text-blue shadow-sm border border-light-gray/60'
                      : 'text-mid-gray hover:text-dark-gray bg-transparent'
                  }`}
                >
                  <Camera size={15} /> Take Photo
                </button>
              </div>

              {/* ── File upload zone ── */}
              {uploadMode === 'file' && (
                <>
                  {!file ? (
                    <div
                      className={`
                        border-2 border-dashed rounded-2xl p-8 flex flex-col items-center
                        justify-center text-center cursor-pointer transition-all duration-200
                        ${dragActive
                          ? 'border-blue bg-blue-light/40 scale-[1.01]'
                          : 'border-light-gray hover:border-blue/60 bg-gradient-to-b from-off-white/60 to-white hover:bg-blue-light/10'
                        }
                      `}
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
                        accept="image/jpeg,image/png,image/jpg,image/webp,application/pdf"
                        onChange={handleChange}
                      />

                      <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all
                        ${dragActive ? 'bg-blue text-white scale-110' : 'bg-blue-light text-blue border border-blue/20'}
                      `}>
                        <UploadCloud size={28} />
                      </div>

                      <h4 className="font-plus-jakarta font-bold text-[16px] text-near-black mb-1">
                        {dragActive ? 'Drop it here!' : 'Drop your photo here'}
                      </h4>
                      <p className="text-[13px] text-mid-gray mb-4">
                        or <span className="text-blue font-bold">tap to choose a photo</span>
                      </p>

                      <div className="flex gap-1.5 justify-center flex-wrap">
                        {['JPG', 'PNG', 'PDF'].map((fmt) => (
                          <span key={fmt} className="text-[10px] font-bold text-mid-gray bg-white px-2 py-0.5 rounded border border-light-gray">
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Selected file card */
                    <div className="bg-blue-light/20 rounded-2xl p-4 border border-blue/15 flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="w-14 h-14 bg-white rounded-xl border border-light-gray overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                        {filePreviewUrl
                          ? <img src={filePreviewUrl} alt="Selected" className="w-full h-full object-cover" />
                          : <FileText size={26} className="text-blue" />
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[14px] text-near-black truncate">{file.name}</p>
                        <p className="text-[12px] text-mid-gray mt-0.5">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB
                          <span className="ml-2 text-teal font-semibold">✓ Ready to scan</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {filePreviewUrl && (
                          <button
                            onClick={() => setShowImagePreview(true)}
                            className="p-2 text-mid-gray hover:text-blue rounded-lg bg-white border border-light-gray hover:border-blue/30 transition-all cursor-pointer"
                            title="Preview"
                          >
                            <Eye size={15} />
                          </button>
                        )}
                        <button
                          onClick={removeFile}
                          className="p-2 text-mid-gray hover:text-red rounded-lg bg-white border border-light-gray hover:border-red/30 transition-all cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ── Camera mode ── */}
              {uploadMode === 'camera' && (
                <div className="bg-gradient-to-br from-[#0A1628] to-[#0D3B6E] rounded-2xl p-7 text-center text-white space-y-4 border border-blue/20">
                  <div className="w-14 h-14 bg-white/10 text-teal rounded-2xl flex items-center justify-center mx-auto border border-teal/30">
                    <Camera size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] text-white mb-1">Take a Photo</h4>
                    <p className="text-[13px] text-white/65 max-w-[300px] mx-auto">
                      Hold your prescription steady in good light and tap the button below.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCameraCapture}
                    className="
                      px-6 py-2.5 bg-gradient-to-r from-teal to-[#14927a]
                      text-white font-bold rounded-xl text-[13px]
                      shadow-[0_4px_14px_rgba(23,169,142,0.35)]
                      inline-flex items-center gap-2 cursor-pointer border-none
                      hover:shadow-[0_6px_20px_rgba(23,169,142,0.45)] transition-all active:scale-95
                    "
                  >
                    <Camera size={16} /> Take Photo
                  </button>
                </div>
              )}

              {/* Footer actions */}
              <div className="flex items-center justify-between pt-1 border-t border-light-gray/50">
                <Button variant="text" onClick={handleClose}>Cancel</Button>
                <Button
                  variant="primary"
                  disabled={!file}
                  onClick={startScan}
                  className={`min-w-[140px] justify-center gap-2 ${!file ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ScanSearch size={16} /> Scan Now
                </Button>
              </div>
            </div>
          )}

          {/* ====== STEP 2: SCANNING ====== */}
          {uploadState === 'scanning' && (
            <div className="py-2 animate-fade-up">
              {/* Preview + laser */}
              <div className="relative w-full h-[200px] bg-near-black/90 rounded-2xl overflow-hidden border border-blue/30 mb-5">
                {filePreviewUrl
                  ? <img src={filePreviewUrl} alt="Scanning" className="w-full h-full object-cover opacity-50 brightness-90" />
                  : (
                    <div className="flex items-center justify-center h-full text-white/30">
                      <FileText size={48} />
                    </div>
                  )
                }
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A6FBF18_1px,transparent_1px),linear-gradient(to_bottom,#1A6FBF18_1px,transparent_1px)] bg-[size:22px_22px]" />
                {/* Laser */}
                <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-teal to-blue shadow-[0_0_16px_#17A98E] animate-scan-laser z-20" />
                {/* Badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-near-black/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 text-[11px] text-white flex items-center gap-2 z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping shrink-0" />
                  Scanning… {scanProgress}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="h-2 bg-light-gray rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {SCAN_STEPS.map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                      scanStepIndex > i
                        ? 'bg-teal text-white'
                        : scanStepIndex === i
                          ? 'bg-blue text-white animate-pulse'
                          : 'bg-light-gray text-mid-gray'
                    }`}>
                      {scanStepIndex > i ? <Check size={11} /> : i + 1}
                    </div>
                    <span className={`text-[13px] font-medium ${scanStepIndex >= i ? 'text-near-black' : 'text-mid-gray'}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====== STEP 3: RESULTS ====== */}
          {uploadState === 'results' && (
            <div className="animate-fade-up space-y-4">
              {/* Success banner */}
              <div className="bg-gradient-to-r from-teal/10 to-blue-light/40 rounded-2xl p-4 border border-teal/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal text-white rounded-xl flex items-center justify-center shadow shrink-0">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <p className="font-plus-jakarta font-bold text-[16px] text-near-black">
                    {identifiedMedicines.length} medicine{identifiedMedicines.length !== 1 ? 's' : ''} found
                  </p>
                  <p className="text-[12px] text-mid-gray mt-0.5">
                    Tap any medicine to learn more about it.
                  </p>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-amber/[0.08] border border-amber/25 rounded-xl p-3 flex items-start gap-2 text-[12px] text-dark-gray">
                <AlertCircle size={15} className="text-amber shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Always check with your doctor or pharmacist before taking any medicine.
                </p>
              </div>

              {/* Medicine list */}
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-0.5">
                {identifiedMedicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className="
                      p-4 bg-white border border-light-gray hover:border-blue/30
                      rounded-2xl transition-all duration-200 group
                      hover:shadow-[0_4px_16px_rgba(26,111,191,0.1)] cursor-pointer
                    "
                    onClick={() => { handleClose(); router.push(`/medicine/${medicine.slug}`); }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="w-14 h-14 bg-off-white rounded-xl border border-light-gray overflow-hidden shrink-0 flex items-center justify-center">
                        {medicine.coverImage
                          ? <img src={medicine.coverImage} alt={medicine.genericName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          : <Pill size={24} className="text-blue" />
                        }
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[15px] text-near-black group-hover:text-blue transition-colors truncate">
                          {medicine.genericName}
                        </p>
                        {medicine.brandNames.length > 0 && (
                          <p className="text-[12px] text-mid-gray mt-0.5 truncate">
                            {medicine.brandNames.slice(0, 2).join(', ')}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] font-bold text-blue bg-blue-light px-2 py-0.5 rounded-full">
                            {medicine.category.split(' ')[0]}
                          </span>
                          {medicine.prescriptionRequired && (
                            <span className="text-[10px] font-bold text-[#B87A00] bg-amber/10 px-2 py-0.5 rounded-full">
                              Needs Prescription
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight
                        size={18}
                        className="text-mid-gray group-hover:text-blue group-hover:translate-x-1 transition-all shrink-0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-light-gray/50">
                <button
                  onClick={resetScan}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mid-gray hover:text-near-black cursor-pointer bg-transparent border-none transition-colors"
                >
                  <RefreshCw size={14} /> Scan another
                </button>
                <Button variant="primary" onClick={handleClose} className="px-6">Done</Button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {showImagePreview && filePreviewUrl && (
        <div className="fixed inset-0 z-[120] bg-near-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setShowImagePreview(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border-none cursor-pointer"
          >
            <X size={20} />
          </button>
          <img
            src={filePreviewUrl}
            alt="Preview"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
