import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Heart, Sparkles, MapPin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-700/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Campus<span className="text-brand-400">Pool</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier collegiate carpooling network. Connecting verified university students for affordable,
              safe, and eco-friendly rides between campuses, transit stations, and airports.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% University Verified Network
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/find-ride" className="hover:text-white transition-colors flex items-center gap-1 group">
                  Find a Ride
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/offer-ride" className="hover:text-white transition-colors flex items-center gap-1 group">
                  Offer a Ride
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How CampusPool Works
                </a>
              </li>
              <li>
                <a href="/#popular-routes" className="hover:text-white transition-colors">
                  Popular Campus Routes
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Trust */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-4">Trust & Safety</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  .edu Email Verification
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Student ID Card Match
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Women-Only Ride Option
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Community Standards
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Emergency Support (24/7)
                </span>
              </li>
            </ul>
          </div>

          {/* Supported Hubs */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-4">Transit Hubs</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                Stanford & Palo Alto
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                UC Berkeley & East Bay
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                San Jose State & Tech Park
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                SFO & Oakland Airport
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                Diridon & Caltrain Hubs
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} CampusPool Inc. Built exclusively for collegiate communities.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">University Partner Inquiries</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

