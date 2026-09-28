import React from 'react';
import { CheckCircle2, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex items-center gap-3 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md text-slate-100 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 max-w-md">
      {icons[toastMessage.type] || icons.info}
      <p className="text-sm font-medium leading-snug">{toastMessage.message}</p>
    </div>
  );
};
