import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Car } from 'lucide-react';
import { LocationPoint } from '../../types';

interface RouteMapVisualizerProps {
  origin: LocationPoint;
  destination: LocationPoint;
  waypoints?: LocationPoint[];
  distanceKm: number;
  duration: string;
  vehicleMakeModel?: string;
  className?: string;
}

export const RouteMapVisualizer: React.FC<RouteMapVisualizerProps> = ({
  origin,
  destination,
  waypoints = [],
  distanceKm,
  duration,
  vehicleMakeModel,
  className = ''
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900 text-white p-6 shadow-premium ${className}`}>
      {/* Background road grid effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            <Navigation className="w-3.5 h-3.5 text-brand-400" />
            Live Route Preview
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Student Corridor
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {duration}
          </span>
          <span>•</span>
          <span className="font-semibold text-white">{distanceKm} km</span>
        </div>
      </div>

      {/* Interactive visual route schematic */}
      <div className="relative z-10 my-4 py-4 px-2">
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-brand-500 via-emerald-400 to-brand-500 rounded-full opacity-60">
            {/* Animated dot moving along route */}
            <div className="absolute -top-1.5 h-4 w-4 rounded-full bg-brand-400 border-2 border-white shadow-lg animate-pulse" style={{ left: '45%' }} />
          </div>

          {/* Origin Card */}
          <div className="relative flex items-center gap-3.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 max-w-xs w-full shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-brand-500/30 border border-brand-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-brand-300" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">Pickup Point</p>
              <h5 className="text-sm font-bold text-white truncate">{origin.name}</h5>
              <p className="text-xs text-slate-400 truncate">{origin.address}</p>
            </div>
          </div>

          {/* Waypoint (if any) */}
          {waypoints.length > 0 ? (
            <div className="relative flex items-center gap-3.5 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 max-w-xs w-full">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Mid-Stop</p>
                <h5 className="text-xs font-semibold text-white truncate">{waypoints[0].name}</h5>
                <p className="text-[11px] text-slate-400 truncate">{waypoints[0].address}</p>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <Car className="w-4 h-4 text-brand-400 mr-2" />
              Direct Highway Route
            </div>
          )}

          {/* Destination Card */}
          <div className="relative flex items-center gap-3.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 max-w-xs w-full shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Drop-off Point</p>
              <h5 className="text-sm font-bold text-white truncate">{destination.name}</h5>
              <p className="text-xs text-slate-400 truncate">{destination.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer details */}
      <div className="relative z-10 pt-4 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-slate-400" />
          <span>Vehicle: <strong className="text-white font-medium">{vehicleMakeModel || 'Verified Student Vehicle'}</strong></span>
        </div>
        <div className="text-emerald-400 font-medium">
          Estimated campus fuel split: $0.15/km
        </div>
      </div>
    </div>
  );
};

