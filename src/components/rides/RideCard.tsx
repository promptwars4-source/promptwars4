import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Star,
  Users,
  Car,
  ShieldCheck,
  Zap,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Ride } from '../../types';
import { Badge } from '../common/Badge';
import { RidePreferencesBadges } from './RidePreferencesBadges';

interface RideCardProps {
  ride: Ride;
  onRequestSeat?: (ride: Ride) => void;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, onRequestSeat }) => {
  const isSeatsLow = ride.availableSeats === 1;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Header: Driver Info & Price */}
      <div className="p-5 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="flex items-start justify-between gap-3">
          {/* Driver details */}
          <div className="flex items-center gap-3">
            <Link to={`/rides/${ride.id}`} className="relative shrink-0">
              <img
                src={ride.driver.avatar}
                alt={ride.driver.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-brand-400 transition-all"
              />
              {ride.driver.isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs"
                  title="Verified Student ID & .edu Email"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              )}
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/rides/${ride.id}`}
                  className="font-bold text-slate-900 hover:text-brand-600 transition-colors text-base"
                >
                  {ride.driver.name}
                </Link>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{ride.driver.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[10px]">({ride.driver.reviewCount})</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-[260px]">
                {ride.driver.college}
              </p>
            </div>
          </div>

          {/* Price per seat */}
          <div className="text-right shrink-0">
            <div className="text-2xl font-black text-navy-800 tracking-tight">
              ${ride.pricePerSeat}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              per student
            </div>
          </div>
        </div>

        {/* Badges bar */}
        <div className="flex flex-wrap items-center gap-2 mt-3.5">
          {ride.instantBooking && <Badge variant="instant">Instant Book</Badge>}
          {ride.preferences.genderPreference === 'female_only' && (
            <Badge variant="female_only">Women Only</Badge>
          )}
          <Badge variant="vehicle">
            {ride.vehicle.make} {ride.vehicle.model}
          </Badge>
        </div>
      </div>

      {/* Ride Route & Time Details */}
      <div className="p-5 space-y-4 flex-1">
        {/* Date & Departure Time */}
        <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
          <div className="flex items-center gap-1.5 font-semibold text-navy-800">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span>{ride.departureDate}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-brand-600">
            <Clock className="w-4 h-4" />
            <span>Departs at {ride.departureTime}</span>
          </div>
        </div>

        {/* Visual Route Timeline */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:to-emerald-500">
          {/* Pickup point */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-brand-100" />
            <div>
              <p className="text-xs font-semibold text-slate-400">PICKUP</p>
              <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{ride.origin.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-1">{ride.origin.landmark || ride.origin.address}</p>
            </div>
          </div>

          {/* Mid stop waypoint if present */}
          {ride.waypoints && ride.waypoints.length > 0 && (
            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
              <p className="text-[11px] text-amber-700 font-medium">
                Via {ride.waypoints[0].name}
              </p>
            </div>
          )}

          {/* Drop-off point */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <div>
              <p className="text-xs font-semibold text-slate-400">DESTINATION</p>
              <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{ride.destination.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-1">{ride.destination.landmark || ride.destination.address}</p>
            </div>
          </div>
        </div>

        {/* Notes preview if any */}
        {ride.notes && (
          <p className="text-xs text-slate-500 italic bg-slate-50/80 p-2.5 rounded-lg line-clamp-2">
            "{ride.notes}"
          </p>
        )}

        {/* Preferences icons */}
        <RidePreferencesBadges preferences={ride.preferences} />
      </div>

      {/* Footer: Available Seats & Action Buttons */}
      <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-slate-400" />
          <span className={`text-xs font-bold ${isSeatsLow ? 'text-amber-600' : 'text-slate-700'}`}>
            {ride.availableSeats} {ride.availableSeats === 1 ? 'seat left' : 'seats left'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/rides/${ride.id}`}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-navy-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-all shadow-xs"
          >
            Details
          </Link>

          {onRequestSeat ? (
            <button
              onClick={() => onRequestSeat(ride)}
              disabled={ride.availableSeats === 0}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-soft flex items-center gap-1.5 ${
                ride.availableSeats === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
              }`}
            >
              {ride.instantBooking ? (
                <>
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Instant Book
                </>
              ) : (
                <>
                  Request Seat
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          ) : (
            <Link
              to={`/rides/${ride.id}`}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-all shadow-soft flex items-center gap-1"
            >
              Book Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

