import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRightLeft } from 'lucide-react';
import { SearchFilters } from '../../types';
import { CAMPUS_LOCATIONS } from '../../data/mockData';

interface RideSearchFormProps {
  initialValues?: SearchFilters;
  onSearch: (filters: SearchFilters) => void;
  compact?: boolean;
}

export const RideSearchForm: React.FC<RideSearchFormProps> = ({
  initialValues,
  onSearch,
  compact = false
}) => {
  const [origin, setOrigin] = useState(initialValues?.origin || '');
  const [destination, setDestination] = useState(initialValues?.destination || '');
  const [date, setDate] = useState(initialValues?.date || '');
  const [seats, setSeats] = useState<number>(initialValues?.seats || 1);

  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      origin,
      destination,
      date,
      seats
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-premium border border-slate-200/80 p-3 sm:p-4 ${
        compact ? 'max-w-4xl mx-auto' : 'w-full'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* From Location */}
        <div className="relative md:col-span-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
            Leaving From
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <MapPin className="w-5 h-5 text-brand-500" />
            </div>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              onFocus={() => setShowOriginSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
              placeholder="Campus, dorm, or city..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>

          {/* Autocomplete suggestions */}
          {showOriginSuggestions && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 max-h-56 overflow-y-auto py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Popular Student Hubs
              </div>
              {CAMPUS_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onMouseDown={() => {
                    setOrigin(loc.name);
                    setShowOriginSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  <span className="truncate">{loc.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap button on desktop */}
        <div className="hidden md:flex md:col-span-1 justify-center pt-5">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-all"
            title="Swap Origin and Destination"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To Destination */}
        <div className="relative md:col-span-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
            Going To
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <MapPin className="w-5 h-5 text-emerald-500" />
            </div>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setShowDestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              placeholder="Airport, station, campus..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>

          {/* Autocomplete suggestions */}
          {showDestSuggestions && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 max-h-56 overflow-y-auto py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Popular Student Destinations
              </div>
              {CAMPUS_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onMouseDown={() => {
                    setDestination(loc.name);
                    setShowDestSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{loc.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date & Seats & Submit Button */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:col-span-3 gap-2 pt-2 md:pt-5">
          {/* Date */}
          <div className="relative col-span-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* Seats */}
          <div className="relative col-span-1">
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              aria-label="Number of passengers"
              className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value={1}>1 Seat</option>
              <option value={2}>2 Seats</option>
              <option value={3}>3 Seats</option>
              <option value={4}>4+ Seats</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="col-span-2 sm:col-span-1">
            <button
              type="submit"
              className="w-full h-full py-3 px-4 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold rounded-xl shadow-soft hover:shadow-card-hover transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

