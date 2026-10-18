import React, { useState } from 'react';
import {
  Gift,
  Printer,
  Utensils,
  Coffee,
  Award,
  Clock,
  Beer,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  Tag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OfferItem } from '../types/student';
import { getStoredOffers, saveStoredOffers } from '../utils/storage';

export const OffersView: React.FC = () => {
  const [offers, setOffers] = useState<OfferItem[]>(getStoredOffers());
  const [selectedOffer, setSelectedOffer] = useState<OfferItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'printer':
        return <Printer size={20} className="text-blue-600" />;
      case 'utensils':
        return <Utensils size={20} className="text-amber-600" />;
      case 'coffee':
        return <Coffee size={20} className="text-amber-700" />;
      case 'award':
        return <Award size={20} className="text-purple-600" />;
      case 'clock':
        return <Clock size={20} className="text-emerald-600" />;
      case 'beer':
        return <Beer size={20} className="text-yellow-600" />;
      default:
        return <Gift size={20} className="text-blue-600" />;
    }
  };

  const handleRedeem = (offer: OfferItem) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#3B82F6', '#F2B705', '#10B981', '#EC0000'],
    });

    const updated = offers.map((item) =>
      item.id === offer.id ? { ...item, resgatado: true } : item
    );
    setOffers(updated);
    saveStoredOffers(updated);
    setSelectedOffer({ ...offer, resgatado: true });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-5 space-y-4 pb-24 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <Gift size={14} />
            <span>Benefícios da Turma</span>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight">
            Clube de Vantagens da Nostalgia
          </h2>
          <p className="text-blue-100 text-xs mt-1 leading-relaxed">
            Apresente sua carteirinha na cantina, no xerox ou no bar da esquina e garanta seu cupom!
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 opacity-20 pointer-events-none">
          <Gift size={120} />
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 transition-all hover:shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {getIcon(offer.icone)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {offer.categoria}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                    {offer.desconto}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{offer.titulo}</h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{offer.subtitulo}</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Cód: {offer.codigo}
              </span>

              {offer.resgatado ? (
                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 cursor-pointer"
                >
                  <CheckCircle size={13} />
                  Resgatado
                </button>
              ) : (
                <button
                  onClick={() => handleRedeem(offer)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Tag size={13} />
                  Resgatar Cupom
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Offer Detail Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-600 shadow-inner">
              <Sparkles size={28} />
            </div>

            <div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Cupom Ativado com Sucesso!
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                {selectedOffer.titulo}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedOffer.descricao}
              </p>
            </div>

            {/* Voucher code box */}
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-3 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Código do Voucher
                </span>
                <span className="text-sm font-black text-slate-900 font-mono tracking-wider">
                  {selectedOffer.codigo}
                </span>
              </div>
              <button
                onClick={() => handleCopyCode(selectedOffer.codigo)}
                className="py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                {copiedCode ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Válido para consumo presencial na companhia de ao menos 1 amigo da faculdade!
            </p>

            <button
              onClick={() => setSelectedOffer(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
