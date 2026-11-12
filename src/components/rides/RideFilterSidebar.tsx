import React from 'react';
import { Filter, RotateCcw, Clock, DollarSign, Users, Car, ShieldCheck, Zap } from 'lucide-react';
import { SearchFilters, GenderPreference } from '../../types';

interface RideFilterSidebarProps {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
  onReset: () => void;
  className?: string;
}

export const RideFilterSidebar: React.FC<RideFilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-navy-800 text-base">
          <Filter className="w-4 h-4 text-brand-500" />
          Filter Rides
        </div>
        <button
          onClick={onReset}
          className="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort Results By
        </label>
        <select
          value={filters.sortBy || 'time_asc'}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
          aria-label="Sort Results By"
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="time_asc">Earliest Departure</option>
          <option value="price_asc">Lowest Price ($)</option>
          <option value="rating_desc">Highest Driver Rating (★)</option>
          <option value="seats_desc">Most Available Seats</option>
        </select>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-brand-500" />
            Max Price Per Seat
          </label>
          <span className="text-sm font-extrabold text-navy-800">
            {filters.maxPrice ? `$${filters.maxPrice}` : 'Any Price'}
          </span>
        </div>
        <input
          type="range"
          min="3"
          max="30"
          step="1"
          value={filters.maxPrice || 30}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          aria-label="Max Price Per Seat"
          className="w-full accent-brand-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>$3</span>
          <span>$15</span>
          <span>$30+</span>
        </div>
      </div>

      {/* Departure Time Slots */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-brand-500" />
          Departure Time
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'all', label: 'Any Time' },
            { id: 'morning', label: 'Morning (6-12)' },
            { id: 'afternoon', label: 'Afternoon (12-17)' },
            { id: 'evening', label: 'Evening (17-21)' },
            { id: 'night', label: 'Night (21+)' }
          ].map((slot) => {
            const isSelected = (filters.departureTimeRange || 'all') === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => onChange({ ...filters, departureTimeRange: slot.id as any })}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all border ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender / Community Preference */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-brand-500" />
          Student Preference
        </label>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Students (Co-ed)' },
            { id: 'female_only', label: 'Women-Only Rides' }
          ].map((g) => (
            <label
              key={g.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                (filters.genderPreference || 'all') === g.id
                  ? 'bg-fuchsia-50/70 border-fuchsia-300 text-fuchsia-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <input
                type="radio"
                name="genderPref"
                checked={(filters.genderPreference || 'all') === g.id}
                onChange={() => onChange({ ...filters, genderPreference: g.id as GenderPreference })}
                className="accent-fuchsia-600 w-4 h-4"
              />
              <span className="text-xs font-semibold">{g.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1">
          <Car className="w-3.5 h-3.5 text-brand-500" />
          Vehicle Type
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: 'all', label: 'Any Vehicle' },
            { id: 'sedan', label: 'Sedan' },
            { id: 'suv', label: 'SUV' },
            { id: 'ev', label: 'Electric (EV)' },
            { id: 'hatchback', label: 'Hatchback' }
          ].map((vt) => (
            <button
              key={vt.id}
              type="button"
              onClick={() => onChange({ ...filters, vehicleType: vt.id as any })}
              className={`py-2 px-2.5 rounded-xl font-semibold text-center transition-all border ${
                (filters.vehicleType || 'all') === vt.id
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {vt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Safety & Booking Toggles */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        {/* Instant booking toggle */}
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span className="text-xs font-bold text-slate-800">Instant Booking</span>
          </div>
          <input
            type="checkbox"
            checked={!!filters.instantBookingOnly}
            onChange={(e) => onChange({ ...filters, instantBookingOnly: e.target.checked })}
            className="w-4 h-4 accent-amber-500 rounded"
          />
        </label>

        {/* Verified driver toggle */}
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-800">Verified ID Only</span>
          </div>
          <input
            type="checkbox"
            checked={!!filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="w-4 h-4 accent-emerald-500 rounded"
          />
        </label>
      </div>
    </div>
  );
};

