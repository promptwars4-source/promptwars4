import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car,
  ShieldCheck,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('Stanford University');
  const [phone, setPhone] = useState('+1 (650) 555-0199');
  const [degree, setDegree] = useState('B.S. Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('Junior (Class of 2026)');
  const [password, setPassword] = useState('');

  const { showToast } = useToast();
  const navigate = useNavigate();

  // Validate university domain
  const isCollegeDomain =
    email.endsWith('.edu') ||
    email.endsWith('.ac.in') ||
    email.includes('university') ||
    email.includes('college');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast('Incomplete Form', 'Please fill out all required fields.', 'error');
      return;
    }

    const res = authService.register({
      name,
      email,
      college,
      phone,
      degree,
      yearOfStudy
    });

    if (res.success) {
      showToast(
        'Account Registered!',
        isCollegeDomain
          ? 'University email authenticated! Welcome to CampusPool.'
          : 'Welcome! Your student ID verification is pending.',
        'success'
      );
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-brand-400" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-navy-800">
              Campus<span className="text-brand-500">Pool</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-navy-800 tracking-tight">Create Student Account</h2>
          <p className="text-xs text-slate-500">
            Join the verified carpool network for your university.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-premium">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* College Email */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  University Email (.edu)
                </label>
                {email && (
                  <span
                    className={`text-[10px] font-bold flex items-center gap-1 ${
                      isCollegeDomain ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {isCollegeDomain ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Valid Student Domain
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" /> Standard Email (.edu preferred)
                      </>
                    )}
                  </span>
                )}
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan.miller@stanford.edu"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* University Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                University / Campus
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="Stanford University">Stanford University</option>
                  <option value="UC Berkeley">UC Berkeley</option>
                  <option value="San Jose State University (SJSU)">San Jose State University (SJSU)</option>
                  <option value="Santa Clara University">Santa Clara University</option>
                  <option value="San Francisco State University">San Francisco State University</option>
                  <option value="Other University">Other Accredited College</option>
                </select>
              </div>
            </div>

            {/* Degree & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Major / Degree
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. B.S. Economics"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Class Year
                </label>
                <input
                  type="text"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  placeholder="e.g. Class of 2026"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Phone & Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center justify-center gap-1.5 mt-2"
            >
              Verify & Complete Registration
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-600 hover:text-brand-800">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

