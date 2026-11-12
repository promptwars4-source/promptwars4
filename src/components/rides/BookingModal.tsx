import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, MapPin, Zap, User as UserIcon, Check } from 'lucide-react';
import { Ride } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { rideService } from '../../services/rideService';
import { Modal } from '../common/Modal';

interface BookingModalProps {
  ride: Ride | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  ride,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [seats, setSeats] = useState(1);
  const [pickupNote, setPickupNote] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ride) return null;

  const totalPrice = ride.pricePerSeat * seats;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = rideService.bookRide(
        ride.id,
        seats,
        user,
        pickupNote || ride.origin.name,
        ride.destination.name,
        personalMessage
      );

      if (result.success) {
        showToast(
          ride.instantBooking ? 'Ride Confirmed!' : 'Booking Request Sent!',
          result.message,
          'success'
        );
        onSuccess();
        onClose();
      } else {
        showToast('Booking Failed', result.message, 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Something went wrong', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ride.instantBooking ? 'Instant Seat Confirmation' : 'Request Seat on Ride'}
      subtitle={`${ride.origin.name} → ${ride.destination.name}`}
      maxWidth="lg"
    >
      <form onSubmit={handleBooking} className="space-y-5">
        {/* Driver Summary Banner */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <img
            src={ride.driver.avatar}
            alt={ride.driver.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-sm">{ride.driver.name}</span>
              {ride.driver.isVerified && (
                <span title="Verified Student">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate">{ride.driver.college}</p>
            <p className="text-[11px] text-slate-400">
              Vehicle: {ride.vehicle.make} {ride.vehicle.model} ({ride.vehicle.licensePlate})
            </p>
          </div>

          <div className="text-right">
            <span className="text-xl font-extrabold text-navy-800">${ride.pricePerSeat}</span>
            <span className="block text-[10px] text-slate-400 font-medium">/ seat</span>
          </div>
        </div>

        {/* Departure Time & Date Card */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-50/50 border border-brand-100">
            <Calendar className="w-4 h-4 text-brand-600" />
            <div>
              <p className="text-[10px] font-bold text-brand-600 uppercase">Travel Date</p>
              <p className="font-bold text-slate-900">{ride.departureDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-50/50 border border-brand-100">
            <Clock className="w-4 h-4 text-brand-600" />
            <div>
              <p className="text-[10px] font-bold text-brand-600 uppercase">Departure Time</p>
              <p className="font-bold text-slate-900">{ride.departureTime}</p>
            </div>
          </div>
        </div>

        {/* Seats Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Select Number of Seats
          </label>
          <div className="flex items-center gap-3">
            {[...Array(Math.min(ride.availableSeats, 4))].map((_, i) => {
              const count = i + 1;
              const isSelected = seats === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setSeats(count)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-all border ${
                    isSelected
                      ? 'bg-brand-500 border-brand-500 text-white shadow-soft'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {count} {count === 1 ? 'Seat' : 'Seats'}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {ride.availableSeats} seats remaining in this vehicle.
          </p>
        </div>

        {/* Pickup spot preference */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Pickup Spot or Landmark Note
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={pickupNote}
              onChange={(e) => setPickupNote(e.target.value)}
              placeholder={`e.g. Near ${ride.origin.landmark || ride.origin.name} or Dorm Entrance`}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Note to Driver */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Message for Driver (Optional)
          </label>
          <textarea
            rows={2}
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            placeholder="Let them know if you have carry-on luggage or special requests..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
          />
        </div>

        {/* Price Breakdown */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Seat Contribution (${ride.pricePerSeat} × {seats})</span>
            <span className="font-semibold text-slate-900">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Student Platform Fee</span>
            <span className="uppercase text-[11px] font-bold">Free ($0.00)</span>
          </div>
          <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
            <span className="font-bold text-navy-800 text-sm">Total to Split</span>
            <span className="font-extrabold text-navy-800 text-lg">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 active:scale-95 text-white transition-all shadow-soft flex items-center justify-center gap-2"
          >
            {ride.instantBooking ? (
              <>
                <Zap className="w-4 h-4 fill-white" />
                Confirm Seat (${totalPrice})
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Send Request (${totalPrice})
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
