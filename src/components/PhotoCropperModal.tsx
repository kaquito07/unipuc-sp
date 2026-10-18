import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Upload, AlertCircle } from 'lucide-react';

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
  const [imageSrc, setImageSrc] = useState<string>(initialImage || '');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImageSrc(initialImage);
    } else {
      setImageSrc('');
    }
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setErrorMsg('');
  }, [initialImage, isOpen]);

  useEffect(() => {
    if (!imageSrc) {
      imageElementRef.current = null;
      return;
    }
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
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Por favor, selecione um arquivo de imagem válido (JPG, PNG).');
        return;
      }
      setErrorMsg('');
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
    if (!imageSrc) return;
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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imageSrc || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    });
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
    if (!img || !imageSrc) {
      setErrorMsg('Envie uma foto antes de confirmar.');
      return;
    }

    const targetWidth = 300;
    const targetHeight = 400;

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    const displayFrameWidth = 180;
    const displayFrameHeight = 240;
    const scaleFactor = targetWidth / displayFrameWidth;

    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Foto 3x4 da Carteirinha</h3>
            <p className="text-xs text-slate-500">Formato retrato oficial</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col items-center bg-slate-50">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {imageSrc ? (
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
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                <img
                  src={imageSrc}
                  alt="Prévia Foto 3x4"
                  className="max-w-none pointer-events-none select-none min-w-[180px] min-h-[240px] object-cover"
                  draggable={false}
                />
              </div>

              {/* Grid 3x4 */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/40">
                <div className="border-r border-b border-white/25"></div>
                <div className="border-r border-b border-white/25"></div>
                <div className="border-b border-white/25"></div>
                <div className="border-r border-b border-white/25"></div>
                <div className="border-r border-b border-white/25"></div>
                <div className="border-b border-white/25"></div>
                <div className="border-r border-b border-white/25"></div>
                <div className="border-r border-b border-white/25"></div>
                <div></div>
              </div>

              <div className="absolute bottom-2 left-2 pointer-events-none px-2 py-0.5 bg-black/60 rounded text-[10px] text-white font-medium">
                3x4 Retrato
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-[180px] h-[240px] bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors shadow-inner"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Upload size={22} />
              </div>
              <span className="text-xs font-bold text-slate-800">Clique para enviar</span>
              <span className="text-[11px] text-slate-500 mt-1">Selecione uma foto da sua galeria ou câmera</span>
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Controls if image exists */}
          {imageSrc && (
            <div className="w-full mt-4 px-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(0.6, prev - 0.1))}
                className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
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
                type="button"
                onClick={() => setZoom((prev) => Math.min(2.5, prev + 0.1))}
                className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Aumentar Zoom"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Centralizar"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Action to change file if already loaded */}
        {imageSrc && (
          <div className="px-5 py-2.5 bg-white border-t border-slate-100 flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Upload size={13} />
              Escolher outra foto
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl text-slate-700 font-medium text-xs border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmCrop}
            disabled={!imageSrc}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <Check size={14} />
            Aplicar Foto 3x4
          </button>
        </div>
      </div>
    </div>
  );
};
