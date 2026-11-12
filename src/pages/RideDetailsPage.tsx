import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  Car,
  Users,
  MapPin,
  DollarSign,
  ChevronLeft,
  ArrowRight,
  Zap,
  CheckCircle2,
  Share2,
  AlertTriangle
} from 'lucide-react';
import { Ride } from '../types';
import { rideService } from '../services/rideService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { RouteMapVisualizer } from '../components/rides/RouteMapVisualizer';
import { RidePreferencesBadges } from '../components/rides/RidePreferencesBadges';
import { BookingModal } from '../components/rides/BookingModal';
import { Badge } from '../components/common/Badge';

export const RideDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [ride, setRide] = useState<Ride | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const loadRide = () => {
    if (!id) return;
    const found = rideService.getRideById(id);
    if (found) {
      setRide(found);
    } else {
      setRide(null);
    }
  };

  useEffect(() => {
    loadRide();
  }, [id]);

  if (!ride) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-800">Ride Not Found</h2>
        <p className="text-sm text-slate-500">
          This ride might have been completed, cancelled, or the link is invalid.
        </p>
        <Link
          to="/find-ride"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-sm shadow-soft"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Rides
        </Link>
      </div>
    );
  }

  const isDriver = user.id === ride.driverId;
  const isFullyBooked = ride.availableSeats === 0;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied!', 'Ride details URL copied to your clipboard.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/find-ride"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Search Results
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share with Classmates
        </button>
      </div>

      {/* Interactive Map Visualizer */}
      <RouteMapVisualizer
        origin={ride.origin}
        destination={ride.destination}
        waypoints={ride.waypoints}
        distanceKm={ride.distanceKm}
        duration={ride.estimatedDuration}
        vehicleMakeModel={`${ride.vehicle.make} ${ride.vehicle.model}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ride Info & Reviews (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Ride Card Details */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md">
                    Departure Details
                  </span>
                  {ride.instantBooking && <Badge variant="instant">Instant Booking</Badge>}
                  {ride.preferences.genderPreference === 'female_only' && (
                    <Badge variant="female_only">Women Only</Badge>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-navy-800">
                  {ride.origin.name.split('(')[0]} → {ride.destination.name.split('(')[0]}
                </h1>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black text-navy-800">${ride.pricePerSeat}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase">per passenger</div>
              </div>
            </div>

            {/* Departure Date & Time Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-500" /> Date
                </div>
                <div className="text-sm font-bold text-slate-900">{ride.departureDate}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-brand-500" /> Departure Time
                </div>
                <div className="text-sm font-bold text-slate-900">{ride.departureTime}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Users className="w-3.5 h-3.5 text-brand-500" /> Remaining Seats
                </div>
                <div className="text-sm font-bold text-emerald-600">
                  {ride.availableSeats} of {ride.totalSeats} seats open
                </div>
              </div>
            </div>

            {/* Route Stops */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Route Stops & Landmarks
              </h3>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-500">
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-brand-100" />
                  <p className="text-xs font-bold text-slate-400">ORIGIN / PICKUP</p>
                  <h4 className="text-sm font-bold text-slate-900">{ride.origin.name}</h4>
                  <p className="text-xs text-slate-500">{ride.origin.landmark || ride.origin.address}</p>
                </div>

                {ride.waypoints && ride.waypoints.length > 0 && (
                  <div className="relative">
                    <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-amber-400" />
                    <p className="text-[11px] font-bold text-amber-600">WAYPOINT / MID-STOP</p>
                    <h4 className="text-xs font-semibold text-slate-800">{ride.waypoints[0].name}</h4>
                    <p className="text-[11px] text-slate-500">{ride.waypoints[0].address}</p>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <p className="text-xs font-bold text-slate-400">FINAL DESTINATION</p>
                  <h4 className="text-sm font-bold text-slate-900">{ride.destination.name}</h4>
                  <p className="text-xs text-slate-500">{ride.destination.landmark || ride.destination.address}</p>
                </div>
              </div>
            </div>

            {/* Driver Notes */}
            {ride.notes && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Driver's Message to Co-riders
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">"{ride.notes}"</p>
              </div>
            )}

            {/* Ride Preferences */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Ride Preferences & Rules
              </h4>
              <RidePreferencesBadges preferences={ride.preferences} showLabels={true} />
            </div>
          </div>

          {/* Co-passengers list */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-500" />
                Booked Co-Passengers ({ride.passengers.length})
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {ride.availableSeats} open seats remaining
              </span>
            </div>

            {ride.passengers.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No students have booked yet. Be the first to join this ride!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ride.passengers.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">{p.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{p.college}</p>
                      <span className="text-[10px] text-brand-600 font-semibold">
                        {p.seatsBooked} {p.seatsBooked === 1 ? 'seat' : 'seats'} confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Driver Reviews */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <h3 className="text-base font-bold text-navy-800">
                  Driver Ratings & Peer Reviews ({ride.driver.reviewCount})
                </h3>
              </div>
              <span className="text-sm font-extrabold text-navy-800">
                {ride.driver.rating.toFixed(2)} ★ Average
              </span>
            </div>

            <div className="space-y-3">
              {ride.reviews && ride.reviews.length > 0 ? (
                ride.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.reviewerAvatar}
                          alt={rev.reviewerName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900">{rev.reviewerName}</span>
                          <span className="text-[10px] text-slate-400 ml-1.5">({rev.reviewerCollege})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                    {rev.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {rev.tags.map((t, ti) => (
                          <span
                            key={ti}
                            className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600"
                          >
                            ✓ {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic py-2">
                  Top verified student driver with consistent 5-star trip history.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Driver Profile Card & Sticky Booking Action (4 cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Driver Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Driver Profile
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={ride.driver.avatar}
                alt={ride.driver.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-brand-500/20"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-navy-800">{ride.driver.name}</h4>
                  {ride.driver.isVerified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs font-semibold text-brand-600 truncate">{ride.driver.college}</p>
                <p className="text-[11px] text-slate-500">{ride.driver.degree}</p>
              </div>
            </div>

            {ride.driver.bio && (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed">
                "{ride.driver.bio}"
              </p>
            )}

            {/* Trust credentials */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Official .edu email
                </span>
                <span className="font-semibold text-slate-800">Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Student ID Card
                </span>
                <span className="font-semibold text-slate-800">Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-brand-500" />
                  Campus Rides Completed
                </span>
                <span className="font-bold text-navy-800">{ride.driver.ridesGivenCount} rides</span>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Vehicle Details
              </span>
              <p className="font-bold text-slate-900">
                {ride.vehicle.make} {ride.vehicle.model} ({ride.vehicle.year})
              </p>
              <p className="text-slate-500">
                Color: {ride.vehicle.color} • Plate: {ride.vehicle.licensePlate}
              </p>
            </div>
          </div>

          {/* Pricing & Booking Card */}
          <div className="bg-navy-900 text-white rounded-2xl p-6 shadow-premium space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 font-medium">Split Contribution</span>
                <div className="text-3xl font-black text-white">${ride.pricePerSeat}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {ride.availableSeats} {ride.availableSeats === 1 ? 'seat left' : 'seats left'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 py-2 border-y border-white/10">
              <div className="flex justify-between">
                <span>Distance</span>
                <span className="font-semibold text-white">{ride.distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span>Campus service fee</span>
                <span className="text-emerald-400 font-bold">$0.00 (Free)</span>
              </div>
            </div>

            {/* Action button */}
            {isDriver ? (
              <div className="p-3 bg-white/10 rounded-xl text-center text-xs font-bold text-slate-300">
                You are offering this ride.
              </div>
            ) : isFullyBooked ? (
              <button
                disabled
                className="w-full py-3.5 bg-slate-700 text-slate-400 rounded-xl font-bold text-sm cursor-not-allowed text-center"
              >
                Ride Fully Booked
              </button>
            ) : (
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-xl font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2"
              >
                {ride.instantBooking ? (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    Instant Book Seat
                  </>
                ) : (
                  <>
                    Request Seat on Ride
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        ride={ride}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={() => {
          loadRide();
        }}
      />
    </div>
  );
};

