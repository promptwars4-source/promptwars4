import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  color?: 'blue' | 'green' | 'amber' | 'navy';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  color = 'blue'
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-brand-50',
      text: 'text-brand-600',
      border: 'border-brand-100'
    },
    green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100'
    },
    navy: {
      bg: 'bg-slate-100',
      text: 'text-navy-800',
      border: 'border-slate-200'
    }
  };

  const scheme = colorMap[color];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-premium transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-navy-800 mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${scheme.bg} ${scheme.text} ${scheme.border} border`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs">
          <span
            className={`font-semibold ${
              trendPositive ? 'text-emerald-600' : 'text-slate-500'
            }`}
          >
            {trend}
          </span>
          <span className="text-slate-400">vs last semester</span>
        </div>
      )}
    </div>
  );
};

