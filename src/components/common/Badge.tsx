import React from 'react';
import { ShieldCheck, Zap, Users, Car, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'verified' | 'instant' | 'female_only' | 'vehicle' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';
  size?: 'sm' | 'md';
  className?: string;
  icon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon = true
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const variantStyles = {
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    instant: 'bg-amber-50 text-amber-700 border-amber-200/80',
    female_only: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80',
    vehicle: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${variantStyles[variant]} ${className}`}
    >
      {icon && variant === 'verified' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
      {icon && variant === 'instant' && <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 fill-amber-500/20" />}
      {icon && variant === 'female_only' && <Users className="w-3.5 h-3.5 text-fuchsia-600 shrink-0" />}
      {icon && variant === 'vehicle' && <Car className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
      {icon && variant === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />}
      {icon && variant === 'warning' && <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
      {icon && variant === 'danger' && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

