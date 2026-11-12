import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, ShieldCheck, Mail, Lock, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAsDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Missing Fields', 'Please enter your student email and password.', 'error');
      return;
    }

    loginAsDemo('driver');
    showToast('Signed In!', 'Welcome back to CampusPool.', 'success');
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = (role: 'driver' | 'passenger') => {
    loginAsDemo(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-brand-400" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-navy-800">
              Campus<span className="text-brand-500">Pool</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-navy-800 tracking-tight">Student Login</h2>
          <p className="text-xs text-slate-500">
            Sign in with your verified university credentials.
          </p>
        </div>

        {/* Demo Account Quick-Fill Card */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200/80 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-800">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Instant Demo Sign-In (1 Click)</span>
          </div>
          <p className="text-[11px] text-brand-700/80">
            Test the app instantly as either a student driver or a passenger:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('driver')}
              className="py-2 px-3 rounded-xl bg-white border border-brand-200 shadow-xs hover:border-brand-400 text-xs font-bold text-navy-800 text-center transition-all"
            >
              🚗 Driver (Ethan)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('passenger')}
              className="py-2 px-3 rounded-xl bg-white border border-brand-200 shadow-xs hover:border-brand-400 text-xs font-bold text-navy-800 text-center transition-all"
            >
              🎒 Passenger (Maya)
            </button>
          </div>
        </div>

        {/* Main form */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-premium">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                College Email (.edu)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@university.edu"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-800"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center justify-center gap-1.5"
            >
              Sign In to CampusPool
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              New student to CampusPool?{' '}
              <Link to="/register" className="font-bold text-brand-600 hover:text-brand-800">
                Create a student account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

