import React from 'react';
import { Check, X, ShieldCheck, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import { BookingRequest } from '../../types';

interface RideRequestItemProps {
  request: BookingRequest;
  onRespond: (bookingId: string, action: 'accept' | 'decline') => void;
}

export const RideRequestItem: React.FC<RideRequestItemProps> = ({ request, onRespond }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:border-brand-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Passenger Info & Route */}
      <div className="flex items-start gap-3.5 min-w-0">
        <img
          src={request.passenger.avatar}
          alt={request.passenger.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20 shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 text-sm truncate">{request.passenger.name}</span>
            {request.passenger.isVerified && (
              <span title="Verified Student">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </span>
            )}
            <span className="text-xs text-slate-500">({request.passenger.college.split(' ')[0]})</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span className="font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
              {request.seats} {request.seats === 1 ? 'Seat' : 'Seats'} Requested
            </span>
            <span>•</span>
            <span className="font-bold text-navy-800">${request.totalAmount} split</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              Pickup: <strong>{request.pickupLocation}</strong>
            </span>
          </div>

          {request.note && (
            <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded-lg">
              "{request.note}"
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons or Status Badge */}
      <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end">
        {request.status === 'pending' ? (
          <>
            <button
              onClick={() => onRespond(request.id, 'decline')}
              className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={() => onRespond(request.id, 'accept')}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-soft transition-all flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
              Accept Student
            </button>
          </>
        ) : request.status === 'accepted' ? (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Confirmed Passenger
          </span>
        ) : (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
            Declined
          </span>
        )}
      </div>
    </div>
  );
};
