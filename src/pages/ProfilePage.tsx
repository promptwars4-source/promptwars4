import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  Car,
  Mail,
  Phone,
  Calendar,
  Award,
  Edit3,
  CheckCircle2,
  Leaf,
  DollarSign,
  Users,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { RidePreferencesBadges } from '../components/rides/RidePreferencesBadges';
import { Modal } from '../components/common/Modal';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [bio, setBio] = useState(user.bio || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [vehicleMake, setVehicleMake] = useState(user.vehicle?.make || '');
  const [vehicleModel, setVehicleModel] = useState(user.vehicle?.model || '');
  const [licensePlate, setLicensePlate] = useState(user.vehicle?.licensePlate || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedVehicle = user.vehicle
      ? {
          ...user.vehicle,
          make: vehicleMake,
          model: vehicleModel,
          licensePlate
        }
      : vehicleMake
      ? {
          make: vehicleMake,
          model: vehicleModel,
          year: 2023,
          color: 'Silver',
          licensePlate,
          type: 'sedan' as const,
          seatsTotal: 4
        }
      : undefined;

    updateUser({
      bio,
      phone,
      vehicle: updatedVehicle
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft relative overflow-hidden">
        {/* Banner pattern background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-navy-900 via-brand-700 to-navy-800 -z-0" />

        <div className="relative z-10 pt-10 sm:pt-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              {user.isVerified && (
                <div
                  className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-xl p-1.5 shadow-md"
                  title="Official University Verified Student"
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-navy-800">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-50 text-accent-700 border border-accent-200">
                  Verified Student
                </span>
              </div>
              <p className="text-sm font-semibold text-brand-600">{user.college}</p>
              <p className="text-xs text-slate-500 font-medium">
                {user.degree} • {user.yearOfStudy}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-6 pt-6 border-t border-slate-100 max-w-3xl">
            "{user.bio}"
          </p>
        )}

        {/* Contact details */}
        <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-brand-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-brand-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span>Member since {user.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Grid: Trust badges + Vehicle + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Verification & Vehicle (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Trust & Safety Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Campus Trust & Verification
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">University Email</h5>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Student ID Card</h5>
                    <p className="text-[10px] text-slate-500">Enrollment verified</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Phone Verification</h5>
                    <p className="text-[10px] text-slate-500">{user.phone}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Verified</span>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-brand-500" />
                Registered Vehicle
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {user.vehicle ? 'Approved' : 'No Vehicle'}
              </span>
            </div>

            {user.vehicle ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-navy-800">
                      {user.vehicle.make} {user.vehicle.model}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {user.vehicle.year} • {user.vehicle.color}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-xs font-bold text-slate-800">
                    {user.vehicle.licensePlate}
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>Type: <strong className="text-slate-800 uppercase">{user.vehicle.type}</strong></span>
                  <span>Passenger Capacity: <strong className="text-slate-800">{user.vehicle.seatsTotal}</strong></span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                You haven't registered a vehicle yet. You can still book seats as a student passenger!
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Preferences, Reviews & Stats (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          {/* Default Travel Preferences */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ride Preferences & Habits
            </h3>
            <RidePreferencesBadges preferences={user.preferences} showLabels={true} />
          </div>

          {/* Student Ratings and Reviews */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-800">Student Reviews</h3>
                <p className="text-xs text-slate-500">From peer carpoolers</p>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400" />
                <span className="text-lg font-black text-navy-800">{user.rating.toFixed(2)}</span>
                <span className="text-xs text-slate-400">({user.reviewCount})</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Priya Sharma (Stanford AI)</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Awesome ride! Left precisely on time, car was super clean and we had great conversations about engineering research."
                </p>
                <span className="text-[10px] text-slate-400 block">3 days ago</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Alex Rivera (UC Berkeley)</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Split fuel costs smoothly via the app. Very respectful driver!"
                </p>
                <span className="text-[10px] text-slate-400 block">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile"
        subtitle="Update your student contact & vehicle information"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              About You / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell fellow students about your daily commute, department, and vibe..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
            />
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Vehicle Information
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Make</label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="e.g. Tesla"
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Model</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Model 3"
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">License Plate</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="e.g. 8XYZ492"
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-soft flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

