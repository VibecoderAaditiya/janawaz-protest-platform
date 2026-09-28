import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    live: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
    scheduled: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    verified: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    anonymous: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    safe: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    danger: 'bg-red-500/20 text-red-400 border-red-500/40',
    saffron: 'bg-orange-500/20 text-orange-400 border-orange-500/40'
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
