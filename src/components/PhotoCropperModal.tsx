import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Upload, Sparkles } from 'lucide-react';
import { SAMPLE_PORTRAITS } from '../utils/storage';

interface PhotoCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedBase64: string) => void;
  initialImage?: string;
}

export const PhotoCropperModal: React.FC<PhotoCropperModalProps> = ({
  isOpen,
  onClose,
  onCropComplete,
  initialImage,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(initialImage || SAMPLE_PORTRAITS[0].url);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImageSrc(initialImage);
    }
  }, [initialImage]);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      imageElementRef.current = img;
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
  }, [imageSrc]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleConfirmCrop = () => {
    const img = imageElementRef.current;
    if (!img) return;

    // Standard 3x4 portrait export resolution: 300x400 px
    const targetWidth = 300;
    const targetHeight = 400;

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // Compute bounding geometry
    const displayFrameWidth = 180;
    const displayFrameHeight = 240;
    const scaleFactor = targetWidth / displayFrameWidth;

    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;

    // Draw image centered with user pan & zoom
    const aspect = naturalWidth / naturalHeight;
    let baseRenderW = displayFrameWidth;
    let baseRenderH = displayFrameWidth / aspect;

    if (baseRenderH < displayFrameHeight) {
      baseRenderH = displayFrameHeight;
      baseRenderW = displayFrameHeight * aspect;
    }

    const finalW = baseRenderW * zoom * scaleFactor;
    const finalH = baseRenderH * zoom * scaleFactor;

    const offsetX = targetWidth / 2 - finalW / 2 + pan.x * scaleFactor;
    const offsetY = targetHeight / 2 - finalH / 2 + pan.y * scaleFactor;

    ctx.drawImage(img, offsetX, offsetY, finalW, finalH);

    const croppedBase64 = canvas.toDataURL('image/jpeg', 0.9);
    onCropComplete(croppedBase64);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Foto 3x4 da Carteirinha</h3>
            <p className="text-xs text-slate-500">Ajuste e recorte em formato retrato</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Crop Area Container */}
        <div className="p-4 flex flex-col items-center bg-slate-50">
          <div
            className="relative w-[180px] h-[240px] bg-slate-200 rounded-lg overflow-hidden border-2 border-blue-500 shadow-inner cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* The Image inside */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <img
                src={imageSrc}
                alt="Preview 3x4"
                className="max-w-none pointer-events-none select-none min-w-[180px] min-h-[240px] object-cover"
                draggable={false}
              />
            </div>

            {/* Grid overlay for 3x4 alignment */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/40">
              <div className="border-r border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-b border-white/25"></div>
              <div className="border-r border-white/25"></div>
              <div className="border-r border-white/25"></div>
              <div></div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-2 left-2 pointer-events-none px-2 py-0.5 bg-black/60 rounded text-[10px] text-white font-medium">
              3x4 Retrato
            </div>
          </div>

          {/* Controls: Zoom slider */}
          <div className="w-full mt-4 px-3 flex items-center gap-3">
            <button
              onClick={() => setZoom((prev) => Math.max(0.6, prev - 0.1))}
              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut size={16} />
            </button>
            <input
              type="range"
              min="0.6"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-blue-600 h-1.5 bg-slate-300 rounded-lg cursor-pointer"
            />
            <button
              onClick={() => setZoom((prev) => Math.min(2.5, prev + 0.1))}
              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              title="Centralizar"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Arraste a foto para centralizar o rosto</p>
        </div>

        {/* Preset sample or file upload */}
        <div className="p-4 space-y-3 overflow-y-auto">
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-1.5">
              Escolha uma foto do dispositivo ou use um modelo:
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-xs rounded-xl transition-colors cursor-pointer"
            >
              <Upload size={14} />
              Enviar foto da galeria ou câmera
            </button>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mb-1.5">
              <Sparkles size={12} className="text-amber-500" /> Modelos rápidos prontos:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_PORTRAITS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setImageSrc(sample.url);
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                    imageSrc === sample.url
                      ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.label}
                    className="w-8 h-10 object-cover rounded bg-slate-200 shrink-0"
                  />
                  <span className="text-[11px] font-medium text-slate-700 leading-tight">
                    {sample.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl text-slate-700 font-medium text-xs border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmCrop}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-98 transition-all"
          >
            <Check size={14} />
            Aplicar Foto 3x4
          </button>
        </div>
      </div>
    </div>
  );
};
