import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { rideService } from '../services/rideService';
import { CAMPUS_LOCATIONS } from '../data/mockData';
import { Vehicle, UserPreferences, LocationPoint } from '../types';

export const OfferRidePage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [originName, setOriginName] = useState(
    user.college ? `${user.college} (Main Campus Quad)` : 'Stanford University'
  );
  const [originAddress, setOriginAddress] = useState('Campus Circle / Student Center');
  const [destName, setDestName] = useState('SFO International Airport (Terminals 1-3)');
  const [destAddress, setDestAddress] = useState('San Francisco, CA');
  const [waypoint, setWaypoint] = useState('');

  // Tomorrow as default date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [time, setTime] = useState('14:30');
  const [seats, setSeats] = useState(3);
  const [pricePerSeat, setPricePerSeat] = useState(8);

  // Vehicle info (pre-filled from user vehicle if available)
  const [vehicleMake, setVehicleMake] = useState(user.vehicle?.make || 'Honda');
  const [vehicleModel, setVehicleModel] = useState(user.vehicle?.model || 'Civic');
  const [licensePlate, setLicensePlate] = useState(user.vehicle?.licensePlate || '7ABC891');
  const [vehicleType, setVehicleType] = useState<Vehicle['type']>(user.vehicle?.type || 'sedan');

  // Preferences
  const [instantBooking, setInstantBooking] = useState(true);
  const [genderPreference, setGenderPreference] = useState<'all' | 'female_only'>('all');
  const [musicAllowed, setMusicAllowed] = useState(true);
  const [luggageSize, setLuggageSize] = useState<'backpack' | 'cabin' | 'large'>('cabin');
  const [notes, setNotes] = useState(
    'Meeting co-riders at Campus Union circle. Trunk has space for medium bags. Non-smoking!'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Suggested price based on mock distance
  const handlePriceSuggestion = (amount: number) => {
    setPricePerSeat(amount);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!originName.trim() || !destName.trim()) {
      showToast('Missing Locations', 'Please specify both starting and destination points.', 'error');
      return;
    }

    if (!date || !time) {
      showToast('Missing Schedule', 'Please provide a departure date and time.', 'error');
      return;
    }

    if (!vehicleMake.trim() || !licensePlate.trim()) {
      showToast('Vehicle Details Needed', 'Please provide vehicle make and registration details.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const originPoint: LocationPoint = {
        id: `loc_${Date.now()}_orig`,
        name: originName,
        address: originAddress,
        type: 'campus'
      };

      const destPoint: LocationPoint = {
        id: `loc_${Date.now()}_dest`,
        name: destName,
        address: destAddress,
        type: 'airport'
      };

      const waypointsList: LocationPoint[] = waypoint.trim()
        ? [
            {
              id: `loc_${Date.now()}_way`,
              name: waypoint,
              address: 'Intermediate Stop',
              type: 'transit_hub' as any
            }
          ]
        : [];

      const vehicleData: Vehicle = {
        make: vehicleMake,
        model: vehicleModel,
        year: 2023,
        color: 'Silver',
        licensePlate,
        type: vehicleType,
        seatsTotal: seats + 1
      };

      const preferencesData: UserPreferences = {
        music: musicAllowed,
        smoking: false,
        pets: false,
        chattiness: 'flexible',
        luggageCapacity: luggageSize,
        genderPreference
      };

      const newRide = rideService.createRide({
        driverId: user.id,
        driver: user,
        origin: originPoint,
        destination: destPoint,
        waypoints: waypointsList,
        departureDate: date,
        departureTime: time,
        estimatedDuration: '45 mins',
        distanceKm: 42,
        totalSeats: seats,
        availableSeats: seats,
        pricePerSeat,
        vehicle: vehicleData,
        notes,
        preferences: preferencesData,
        instantBooking
      });

      showToast('Ride Published!', 'Your ride is now visible to other campus students.', 'success');
      navigate(`/rides/${newRide.id}`);
    } catch (err: any) {
      showToast('Publication Failed', err.message || 'Error publishing ride', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Campus Driver Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800 mt-2 tracking-tight">
          Offer a Ride to Peers
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Offset your fuel costs, meet campus friends, and make collegiate transit affordable for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Multi-section Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePublish} className="space-y-6">
            {/* Section 1: Route Information */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-brand-500" />
                <h3 className="text-base font-bold text-navy-800">1. Route & Pickup Points</h3>
              </div>

              {/* Starting Point */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Starting Location (Campus / Quad / Dorm)
                </label>
                <input
                  type="text"
                  required
                  value={originName}
                  onChange={(e) => setOriginName(e.target.value)}
                  placeholder="e.g. Stanford University Main Quad or West Campus Dorms"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              {/* Specific Pickup Landmark */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Exact Pickup Spot / Gate
                </label>
                <input
                  type="text"
                  value={originAddress}
                  onChange={(e) => setOriginAddress(e.target.value)}
                  placeholder="e.g. In front of Tresidder Union circle, next to bike racks"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Destination (Airport, Station, City)
                </label>
                <input
                  type="text"
                  required
                  value={destName}
                  onChange={(e) => setDestName(e.target.value)}
                  placeholder="e.g. SFO Airport, Diridon Caltrain, or Downtown SF"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              {/* Mid-route Stop (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Intermediate Stops Along Route (Optional)
                </label>
                <input
                  type="text"
                  value={waypoint}
                  onChange={(e) => setWaypoint(e.target.value)}
                  placeholder="e.g. Palo Alto Caltrain Station or Highway 101 Park & Ride"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Section 2: Date, Time & Pricing */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Calendar className="w-5 h-5 text-brand-500" />
                <h3 className="text-base font-bold text-navy-800">2. Schedule, Seats & Price</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              {/* Available Seats */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Available Seats for Co-riders
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSeats(num)}
                      className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        seats === num
                          ? 'bg-brand-500 border-brand-500 text-white shadow-soft'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {num} {num === 1 ? 'Seat' : 'Seats'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price per seat with smart recommendation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Price per Passenger
                  </label>
                  <span className="text-xs text-brand-600 font-semibold">
                    Campus standard: $6 - $12
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min="2"
                    max="40"
                    value={pricePerSeat}
                    onChange={(e) => setPricePerSeat(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-extrabold text-navy-800 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                {/* Quick chip suggestions */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-slate-400">Quick set:</span>
                  {[5, 8, 10, 12].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePriceSuggestion(val)}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Vehicle & Rules */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Car className="w-5 h-5 text-brand-500" />
                <h3 className="text-base font-bold text-navy-800">3. Vehicle & Ride Preferences</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Vehicle Make
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    placeholder="e.g. Honda, Tesla, Toyota"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g. Civic, Model 3, RAV4"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    License Plate
                  </label>
                  <input
                    type="text"
                    required
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="e.g. 7ABC891"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 uppercase"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Instant Booking</span>
                      <span className="text-[10px] text-slate-500">Auto-confirm student requests</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={instantBooking}
                    onChange={(e) => setInstantBooking(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-fuchsia-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Women Only</span>
                      <span className="text-[10px] text-slate-500">Only female co-riders</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={genderPreference === 'female_only'}
                    onChange={(e) =>
                      setGenderPreference(e.target.checked ? 'female_only' : 'all')
                    }
                    className="w-4 h-4 accent-fuchsia-600 rounded"
                  />
                </label>
              </div>

              {/* Luggage Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Luggage Capacity Allowed
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'backpack', label: 'Backpack only' },
                    { id: 'cabin', label: 'Carry-on Bag' },
                    { id: 'large', label: 'Large Suitcase' }
                  ].map((lug) => (
                    <button
                      key={lug.id}
                      type="button"
                      onClick={() => setLuggageSize(lug.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                        luggageSize === lug.id
                          ? 'bg-brand-50 border-brand-500 text-brand-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {lug.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Notes for Co-riders
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Luggage restrictions, music vibe, waiting time limit..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-navy-800 hover:bg-navy-700 active:scale-98 text-white font-black text-base rounded-2xl shadow-premium transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-accent-400" />
              <span>Publish Ride on CampusPool</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Live Card Preview (Right side) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Ride Card Preview
            </span>
          </div>

          {/* Render real preview card */}
          <div className="bg-white rounded-2xl border-2 border-brand-200 shadow-premium p-5 space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500">{user.college}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-navy-800">${pricePerSeat}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">per seat</div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between text-xs text-slate-700">
              <span className="font-semibold">{date || 'Select date'}</span>
              <span className="font-bold text-brand-600">Departs: {time || 'Set time'}</span>
            </div>

            {/* Route */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0" />
                <span className="font-bold text-slate-800 truncate">{originName || 'Pickup Location'}</span>
              </div>
              {waypoint && (
                <div className="flex items-center gap-2 pl-4 text-amber-700 text-[11px]">
                  <span>via {waypoint}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-bold text-slate-800 truncate">{destName || 'Destination'}</span>
              </div>
            </div>

            {notes && (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                "{notes}"
              </p>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                {seats} {seats === 1 ? 'seat available' : 'seats available'}
              </span>
              <span className="text-slate-500">
                Vehicle: {vehicleMake} {vehicleModel}
              </span>
            </div>
          </div>

          {/* Safety advice note */}
          <div className="bg-brand-50/70 border border-brand-100 rounded-2xl p-4 text-xs text-brand-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-brand-800">
              <Info className="w-4 h-4 text-brand-600 shrink-0" />
              <span>CampusPool Driver Guidelines</span>
            </div>
            <p className="text-brand-700 text-[11px] leading-relaxed">
              Arrive at least 5 minutes prior to departure at the campus pickup point.
              Fares are settled automatically via the in-app student split ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

