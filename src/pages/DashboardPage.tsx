import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Car,
  Clock,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MapPin,
  TrendingUp,
  Leaf,
  Users,
  AlertCircle,
  Award,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { rideService } from '../services/rideService';
import { Ride, BookingRequest } from '../types';
import { StatCard } from '../components/dashboard/StatCard';
import { RideRequestItem } from '../components/dashboard/RideRequestItem';
import { CarbonSavedWidget } from '../components/dashboard/CarbonSavedWidget';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') || 'upcoming';
  const [activeTab, setActiveTab] = useState<'upcoming' | 'offered' | 'requests' | 'history'>(
    tabParam as any
  );

  const [userBookings, setUserBookings] = useState<BookingRequest[]>([]);
  const [offeredRides, setOfferedRides] = useState<Ride[]>([]);

  const loadDashboardData = () => {
    const bookings = rideService.getUserBookings(user.id);
    const rides = rideService.getRidesByDriver(user.id);
    setUserBookings(bookings);
    setOfferedRides(rides);
  };

  useEffect(() => {
    loadDashboardData();
  }, [user.id]);

  useEffect(() => {
    if (tabParam && ['upcoming', 'offered', 'requests', 'history'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  const handleTabSwitch = (tab: 'upcoming' | 'offered' | 'requests' | 'history') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleRespondToRequest = (bookingId: string, action: 'accept' | 'decline') => {
    const success = rideService.respondToBookingRequest(bookingId, action);
    if (success) {
      showToast(
        action === 'accept' ? 'Booking Accepted!' : 'Booking Declined',
        action === 'accept'
          ? 'Passenger has been confirmed and seats reserved.'
          : 'Request was declined.',
        action === 'accept' ? 'success' : 'info'
      );
      loadDashboardData();
    }
  };

  const handleCancelOfferedRide = (rideId: string) => {
    if (window.confirm('Are you sure you want to cancel this offered ride?')) {
      rideService.cancelRide(rideId);
      showToast('Ride Cancelled', 'Your offered ride was cancelled.', 'info');
      loadDashboardData();
    }
  };

  // Derive pending requests for rides offered by this user
  // (In mock storage, any booking for one of this user's rides)
  const pendingRequests = userBookings.filter((b) => b.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-500/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-navy-800">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              {user.isVerified && (
                <div
                  className="p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200"
                  title="Official University Verified"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {user.college} • {user.degree || 'Student Member'}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/find-ride"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center"
          >
            Find a Ride
          </Link>
          <Link
            to="/offer-ride"
            className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-soft text-center flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Offer a Ride
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Money Saved"
          value={`$${user.totalSavingsEst}`}
          subtitle="Estimated vs taxi fares"
          icon={DollarSign}
          color="green"
          trend="+18%"
          trendPositive={true}
        />
        <StatCard
          title="Rides Shared"
          value={user.ridesGivenCount + user.ridesTakenCount}
          subtitle={`${user.ridesGivenCount} driven • ${user.ridesTakenCount} joined`}
          icon={Car}
          color="blue"
        />
        <StatCard
          title="Student Trust Rating"
          value={`${user.rating.toFixed(2)} ★`}
          subtitle={`Based on ${user.reviewCount} student ratings`}
          icon={Award}
          color="amber"
        />
        <StatCard
          title="Campus CO2 Prevented"
          value={`${user.co2SavedKg} kg`}
          subtitle="Tailpipe emissions reduced"
          icon={Leaf}
          color="navy"
        />
      </div>

      {/* Environmental impact banner */}
      <CarbonSavedWidget
        co2Kg={user.co2SavedKg}
        savingsDollars={user.totalSavingsEst}
      />

      {/* Main Tabs Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-none bg-slate-50/50 p-2 gap-1.5">
          {[
            { id: 'upcoming', label: 'Upcoming Rides', count: userBookings.length },
            { id: 'offered', label: 'Rides Offered by Me', count: offeredRides.length },
            { id: 'requests', label: 'Passenger Requests', count: pendingRequests.length },
            { id: 'history', label: 'Past Trip History', count: 0 }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id as any)}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-navy-800 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-brand-50 text-brand-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* TAB 1: Upcoming Bookings */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-base font-bold text-navy-800">Your Upcoming Travel</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {userBookings.length} confirmed bookings
                </span>
              </div>

              {userBookings.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">No upcoming rides booked</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Search rides heading from your campus to airports, rail stations, or downtown.
                  </p>
                  <Link
                    to="/find-ride"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold shadow-soft"
                  >
                    Find a Ride Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-5 hover:border-brand-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <img
                          src={bk.ride.driver.avatar}
                          alt={bk.ride.driver.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-navy-800">
                              {bk.ride.origin.name} → {bk.ride.destination.name}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                bk.status === 'accepted'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {bk.status === 'accepted' ? 'Confirmed' : 'Pending Driver Approval'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                              <Calendar className="w-3.5 h-3.5 text-brand-500" />
                              {bk.ride.departureDate} at {bk.ride.departureTime}
                            </span>
                            <span>•</span>
                            <span>
                              Driver: <strong>{bk.ride.driver.name}</strong> ({bk.ride.driver.phone})
                            </span>
                            <span>•</span>
                            <span className="font-bold text-navy-800">${bk.totalAmount} total</span>
                          </div>

                          <div className="text-xs text-slate-600 mt-2">
                            Pickup Point: <strong>{bk.pickupLocation}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 w-full md:w-auto justify-end">
                        <Link
                          to={`/rides/${bk.ride.id}`}
                          className="px-4 py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Rides Offered by Me */}
          {activeTab === 'offered' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-base font-bold text-navy-800">Your Vehicle Carpools</h3>
                <Link
                  to="/offer-ride"
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Publish Another Ride
                </Link>
              </div>

              {offeredRides.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Car className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">You haven't offered any rides yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Driving somewhere? Post your empty seats to split gas expenses with classmates.
                  </p>
                  <Link
                    to="/offer-ride"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold shadow-soft"
                  >
                    Offer a Ride
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {offeredRides.map((ride) => (
                    <div
                      key={ride.id}
                      className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-5 hover:border-brand-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-navy-800">
                            {ride.origin.name} → {ride.destination.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ride.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ride.status === 'active' ? 'Active Ride' : 'Cancelled'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">
                            {ride.departureDate} at {ride.departureTime}
                          </span>
                          <span>•</span>
                          <span>{ride.availableSeats} of {ride.totalSeats} seats open</span>
                          <span>•</span>
                          <span className="font-bold text-navy-800">${ride.pricePerSeat} / seat</span>
                          <span>•</span>
                          <span>{ride.passengers.length} co-passengers</span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 w-full md:w-auto justify-end">
                        <Link
                          to={`/rides/${ride.id}`}
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                        >
                          View Ride
                        </Link>
                        {ride.status === 'active' && (
                          <button
                            onClick={() => handleCancelOfferedRide(ride.id)}
                            className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          >
                            Cancel Ride
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Passenger Requests */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-base font-bold text-navy-800">
                  Student Ride Requests ({pendingRequests.length})
                </h3>
                <span className="text-xs text-slate-500">
                  Accept or decline requests from co-riders
                </span>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">All caught up!</h4>
                  <p className="text-xs text-slate-500">
                    You have no pending student booking requests to review right now.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((req) => (
                    <RideRequestItem
                      key={req.id}
                      request={req}
                      onRespond={handleRespondToRequest}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Trip History */}
          {activeTab === 'history' && (
            <div className="text-center py-12 space-y-3">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No past trips this semester yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Completed carpools with full receipt splits and feedback ratings will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

