import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RefreshCw, Car, AlertCircle, X } from 'lucide-react';
import { Ride, SearchFilters } from '../types';
import { rideService } from '../services/rideService';
import { RideCard } from '../components/rides/RideCard';
import { RideFilterSidebar } from '../components/rides/RideFilterSidebar';
import { BookingModal } from '../components/rides/BookingModal';

export const FindRidePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<SearchFilters>(() => ({
    origin: searchParams.get('from') || '',
    destination: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    seats: searchParams.get('seats') ? Number(searchParams.get('seats')) : undefined,
    maxPrice: 30,
    departureTimeRange: 'all',
    genderPreference: 'all',
    vehicleType: 'all',
    verifiedOnly: false,
    instantBookingOnly: false,
    sortBy: 'time_asc'
  }));

  const [rides, setRides] = useState<Ride[]>([]);
  const [selectedRideForBooking, setSelectedRideForBooking] = useState<Ride | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Load and filter rides
  const loadRides = () => {
    const results = rideService.searchRides(filters);
    setRides(results);
  };

  useEffect(() => {
    loadRides();
  }, [filters]);

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      origin: '',
      destination: '',
      date: '',
      seats: undefined,
      maxPrice: 30,
      departureTimeRange: 'all',
      genderPreference: 'all',
      vehicleType: 'all',
      verifiedOnly: false,
      instantBookingOnly: false,
      sortBy: 'time_asc'
    });
    setSearchParams({});
  };

  const handleRequestSeat = (ride: Ride) => {
    setSelectedRideForBooking(ride);
    setIsBookingModalOpen(true);
  };

  // Active filters badges
  const activeFiltersCount = [
    filters.origin,
    filters.destination,
    filters.date,
    filters.departureTimeRange !== 'all',
    filters.genderPreference !== 'all',
    filters.vehicleType !== 'all',
    filters.verifiedOnly,
    filters.instantBookingOnly,
    filters.maxPrice && filters.maxPrice < 30
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Search bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">Find a Campus Ride</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse carpools offered by verified students travelling your route.
            </p>
          </div>

          {/* Quick inline search inputs */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 sm:w-48">
              <input
                type="text"
                placeholder="From campus/station..."
                value={filters.origin || ''}
                onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
                className="w-full pl-3 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div className="relative flex-1 sm:w-48">
              <input
                type="text"
                placeholder="To destination..."
                value={filters.destination || ''}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                className="w-full pl-3 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div className="relative w-36">
              <input
                type="date"
                value={filters.date || ''}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 text-xs font-bold text-navy-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Active Filters:
            </span>
            {filters.origin && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-medium">
                From: {filters.origin}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, origin: '' })}
                />
              </span>
            )}
            {filters.destination && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-medium">
                To: {filters.destination}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, destination: '' })}
                />
              </span>
            )}
            {filters.date && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-medium">
                Date: {filters.date}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, date: '' })}
                />
              </span>
            )}
            {filters.genderPreference === 'female_only' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 font-medium">
                Women Only
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, genderPreference: 'all' })}
                />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar + Rides List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <RideFilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Rides List Area */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header with counter */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing <strong className="text-navy-800 font-extrabold">{rides.length}</strong> available student rides
            </span>
          </div>

          {/* List or Empty State */}
          {rides.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-bold text-navy-800">No rides match your current filters</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try widening your price range, removing date constraints, or exploring popular routes.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => {
                    setFilters({
                      ...filters,
                      origin: 'Stanford University',
                      destination: 'SFO International Airport',
                      date: ''
                    });
                  }}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                >
                  View Stanford ➔ SFO Rides
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {rides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onRequestSeat={handleRequestSeat}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-lg font-bold text-navy-800">Filter Rides</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <RideFilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                className="border-0 shadow-none p-0"
              />

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-sm"
                >
                  Apply Filters ({rides.length} rides)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        ride={selectedRideForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRideForBooking(null);
        }}
        onSuccess={() => {
          loadRides();
        }}
      />
    </div>
  );
};

