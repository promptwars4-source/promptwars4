import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { showToast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSent(true);
    showToast('Reset Link Sent', `Password reset instructions sent to ${email}`, 'success');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-brand-400" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-navy-800">
              Campus<span className="text-brand-500">Pool</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-navy-800 tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-500">
            Enter your college email address to receive password recovery instructions.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-premium">
          {isSent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-800">Check Your Student Inbox</h3>
                <p className="text-xs text-slate-600 mt-1">
                  We've sent password reset instructions to <strong>{email}</strong>.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 pt-2"
              >
                <ChevronLeft className="w-4 h-4" /> Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  University Email (.edu)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center justify-center gap-1.5"
              >
                Send Password Reset Email
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

