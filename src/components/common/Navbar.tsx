import React, { useState } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  PlusCircle,
  Plus,
  LayoutDashboard,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Sparkles,
  HelpCircle,
  Repeat
  MapPin,
  Settings,
  History,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const { user, loginAsDemo, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/70 transition-all shadow-[0_1px_2px_0_rgba(15,23,42,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
                <Car className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <div className="flex items-center justify-between h-16">
                  {/* Brand Logo */}
                  <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2.5 group">
                      {/* Bespoke Geometric Brand Emblem */}
                      <div className="w-8 h-8 rounded-lg bg-navy-800 border border-slate-700/50 flex items-center justify-center text-white shadow-xs group-hover:bg-navy-900 group-hover:border-slate-600 transition-all duration-200">
                        <Car className="w-4 h-4 text-brand-400 group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xl tracking-tight text-navy-800">
                          Campus<span className="text-brand-500">Pool</span>
                          <span className="font-extrabold text-[17px] tracking-tight text-slate-900 leading-none">
                            Campus<span className="text-brand-600">Pool</span>
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                            <ShieldCheck className="w-3 h-3 text-accent-600" />
                            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              .edu Verified
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 tracking-wide font-medium hidden sm:block">
                            Collegiate Transit Network
                          </p>
                      </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                      <Link
                        to="/"
                        className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive('/')
                            ? 'text-brand-600 bg-brand-50/70'
                            : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                          }`}
                      >
                        Home
                      </Link>
                      <Link
                        to="/find-ride"
                        className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${isActive('/find-ride')
                            ? 'text-brand-600 bg-brand-50/70'
                            : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                          }`}
                      >
                        <Search className="w-4 h-4" />
                        Find a Ride
                      </Link>
                      <Link
                        to="/offer-ride"
                        className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${isActive('/offer-ride')
                            ? 'text-brand-600 bg-brand-50/70'
                            : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                          }`}
                      >
                        <PlusCircle className="w-4 h-4 text-brand-500" />
                        Offer a Ride
                      </Link>
                      <a
                        href="/#how-it-works"
                        className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-navy-800 hover:bg-slate-50 transition-colors"
                      >
                        How It Works
                      </a>
                      <Link
                        to="/dashboard"
                        className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${isActive('/dashboard')
                            ? 'text-brand-600 bg-brand-50/70'
                            : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                          }`}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                    </nav>

                    {/* Subtle Divider */}
                    <div className="hidden lg:block h-4 w-px bg-slate-200" />

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1">
                      <Link
                        to="/"
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all ${isActive('/')
                            ? 'text-brand-600 bg-brand-50/80 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                      >
                        Home
                      </Link>
                      <Link
                        to="/find-ride"
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight flex items-center gap-1.5 transition-all ${isActive('/find-ride')
                            ? 'text-brand-600 bg-brand-50/80 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                      >
                        <Search className="w-3.5 h-3.5 text-slate-400" />
                        Find Rides
                      </Link>
                      <Link
                        to="/offer-ride"
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight flex items-center gap-1.5 transition-all ${isActive('/offer-ride')
                            ? 'text-brand-600 bg-brand-50/80 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                      >
                        <Plus className="w-3.5 h-3.5 text-brand-500" />
                        Offer Ride
                      </Link>
                      <a
                        href="/#how-it-works"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
                      >
                        How It Works
                      </a>
                      <Link
                        to="/dashboard"
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight flex items-center gap-1.5 transition-all ${isActive('/dashboard')
                            ? 'text-brand-600 bg-brand-50/80 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                        Dashboard
                      </Link>
                    </nav>
                  </div>

                  {/* Right Action Bar */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Quick Demo Persona Switcher */}
                    <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold">
                      <span className="text-[11px] text-slate-400 px-1.5 flex items-center gap-1">
                        <Repeat className="w-3 h-3" /> Demo:
                      </span>
                      <div className="flex items-center gap-2.5">
                        {/* Sleek Segmented Role Selector */}
                        <div
                          className="hidden lg:flex items-center bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/80 text-[11px]"
                          title="Switch demo persona for testing"
                        >
                          <button
                            type="button"
                            onClick={() => loginAsDemo('driver')}
                            className={`px-2 py-1 rounded-lg transition-all ${className = {`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-semibold ${user.vehicle
                                  ? 'bg-white shadow-xs text-brand-600 font-bold'
                                  : 'text-slate-600 hover:text-navy-800'
                                    ? 'bg-white text-navy-800 shadow-xs font-bold border border-slate-200/60'
                                    : 'text-slate-500 hover:text-slate-800'
                                }`}
                title="Switch to Student Driver Persona"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                Driver
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('passenger')}
                className={`px-2 py-1 rounded-lg transition-all ${
                className = {`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-semibold ${!user.vehicle
                                ? 'bg-white shadow-xs text-brand-600 font-bold'
                                : 'text-slate-600 hover:text-navy-800'
                                  ? 'bg-white text-navy-800 shadow-xs font-bold border border-slate-200/60'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            title="Switch to Passenger Student Persona"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Passenger
                          </button>
                        </div>

                        {/* Notifications */}
                        {/* Notification Bell */}
                        <NotificationDropdown />

                        {/* Offer Ride CTA Button */}
                        {/* Quick Action Button: "Offer Ride" */}
                        <Link
                          to="/offer-ride"
                          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-navy-800 text-white hover:bg-navy-700 active:scale-95 transition-all shadow-soft"
                          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-navy-800 text-white hover:bg-navy-900 active:scale-[0.98] transition-all shadow-xs border border-navy-700/50"
                        >
                          <PlusCircle className="w-4 h-4 text-accent-500" />
                          Offer Ride
                          <Plus className="w-3.5 h-3.5 text-accent-500" />
                          <span>Offer Ride</span>
                        </Link>

                        {/* Profile Dropdown */}
                        <div className="relative">
                          {/* User Profile Pill & Dropdown */}
                          <div className="relative" ref={profileMenuRef}>
                            <button
                              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-100/80 transition-colors border border-transparent hover:border-slate-200"
                              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80 transition-all bg-white"
                              aria-expanded={profileDropdownOpen}
                            >
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
                <div className="relative">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                                />
                                {user.isVerified && (
                                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                                )}
                              </div>
                              <span className="text-xs font-bold text-slate-800 max-w-[90px] truncate hidden sm:inline-block">
                                {user.name.split(' ')[0]}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-slate-700' : ''
                                  }`}
                              />
                              <div className="hidden xl:block text-left">
                                <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                                <div className="text-[10px] text-slate-500 truncate max-w-[110px]">
                                  {user.college.split(' ')[0]}
                                </div>
                              </div>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                            </button>

                            {/* Profile Menu Dropdown */}
                            {profileDropdownOpen && (
                              <div
                                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-150"
                                onMouseLeave={() => setProfileDropdownOpen(false)}
                              >
                                <div className="px-4 py-3 border-b border-slate-100">
                                  <p className="text-xs text-slate-400">Signed in as</p>
                                  <p className="text-sm font-bold text-navy-800 truncate">{user.name}</p>
                                  <p className="text-xs text-brand-600 truncate font-medium">{user.email}</p>
                                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-premium border border-slate-200/80 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                                    {/* Account overview header */}
                                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={user.avatar}
                                          alt={user.name}
                                          className="w-9 h-9 rounded-full object-cover ring-1 ring-brand-500/30 shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1">
                                            <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                                            {user.isVerified && (
                                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                            )}
                                          </div>
                                          <p className="text-[11px] text-slate-500 truncate">{user.college}</p>
                                          <p className="text-[10px] text-brand-600 font-medium truncate font-mono mt-0.5">
                                            {user.email}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Stats miniature badge */}
                                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                                        <span className="flex items-center gap-1 font-semibold">
                                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                          {user.rating.toFixed(2)} Rating
                                        </span>
                                        <span className="font-semibold text-emerald-600">
                                          ${user.totalSavingsEst} Saved
                                        </span>
                                      </div>
                                    </div>

                                    {/* Navigation Links */}
                                    <div className="py-1">
                                      <Link
                                        to="/profile"
                                        onClick={() => setProfileDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-800"
                                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-800 transition-colors"
                                      >
                                        <UserIcon className="w-4 h-4 text-slate-400" />
                                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                                        Student Profile
                                      </Link>
                                      <Link
                                        to="/dashboard"
                                        onClick={() => setProfileDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-800"
                                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-800 transition-colors"
                                      >
                                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                                        Dashboard & Rides
                                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                                        Dashboard & Bookings
                                      </Link>
                                      <Link
                                        to="/offer-ride"
                                        onClick={() => setProfileDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-800"
                                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-800 transition-colors"
                                      >
                                        <PlusCircle className="w-4 h-4 text-slate-400" />
                                        Publish a Ride
                                        <Car className="w-3.5 h-3.5 text-slate-400" />
                                        Publish a New Ride
                                      </Link>
                                    </div>

                                    {/* Quick Persona Switcher in dropdown */}
                                    <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50">
                                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                        Switch Role View
                                      </p>
                                      <div className="grid grid-cols-2 gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            loginAsDemo('driver');
                                            setProfileDropdownOpen(false);
                                          }}
                                          className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold text-center border transition-all ${user.vehicle
                                              ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold'
                                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                            }`}
                                        >
                                          🚗 Driver
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            loginAsDemo('passenger');
                                            setProfileDropdownOpen(false);
                                          }}
                                          className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold text-center border transition-all ${!user.vehicle
                                              ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold'
                                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                            }`}
                                        >
                                          🎒 Passenger
                                        </button>
                                      </div>
                                    </div>

                                    {/* Sign Out */}
                                    <div className="border-t border-slate-100 pt-1">
                                      <button
                                        onClick={() => {
                                          setProfileDropdownOpen(false);
                                          logout();
                                          navigate('/login');
                                        }}
                                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                                        className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                                      >
                                        <LogOut className="w-4 h-4 text-rose-500" />
                                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                                        Sign Out
                                      </button>
                                    </div>
                                  </div>
              )}
                                </div>

                                {/* Mobile menu toggle */}
                                {/* Mobile menu toggle button */}
                                <button
                                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                  className="md:hidden p-2 text-slate-600 hover:text-navy-800 hover:bg-slate-100 rounded-xl"
                                  className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                  aria-label="Toggle navigation menu"
                                >
                                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                              </div>
        </div>
                        </div>

                        {/* Mobile Drawer Menu */}
                        {mobileMenuOpen && (
                          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4">
                            <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
                              {/* Active User Card on mobile */}
                              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 mb-3">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-slate-900">{user.name}</span>
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  </div>
                                  <p className="text-[11px] text-slate-500 truncate">{user.college}</p>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <Link
                                  to="/"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${isActive('/')
                                      ? 'bg-brand-50 text-brand-700'
                                      : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                  Home
                                </Link>
                                <Link
                                  to="/find-ride"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${isActive('/find-ride')
                                      ? 'bg-brand-50 text-brand-700'
                                      : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                  <Search className="w-5 h-5 text-brand-500" />
                                  Find a Ride
                                  <Search className="w-4 h-4 text-brand-500" />
                                  Find Rides
                                </Link>
                                <Link
                                  to="/offer-ride"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${isActive('/offer-ride')
                                      ? 'bg-brand-50 text-brand-700'
                                      : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                  <PlusCircle className="w-5 h-5 text-brand-500" />
                                  <Plus className="w-4 h-4 text-brand-500" />
                                  Offer a Ride
                                </Link>
                                <Link
                                  to="/dashboard"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${isActive('/dashboard')
                                      ? 'bg-brand-50 text-brand-700'
                                      : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                  <LayoutDashboard className="w-5 h-5 text-brand-500" />
                                  <LayoutDashboard className="w-4 h-4 text-brand-500" />
                                  Student Dashboard
                                </Link>
                                <Link
                                  to="/profile"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${isActive('/profile')
                                      ? 'bg-brand-50 text-brand-700'
                                      : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                  <UserIcon className="w-5 h-5 text-brand-500" />
                                  <UserIcon className="w-4 h-4 text-brand-500" />
                                  My Profile
                                </Link>
                              </div>

                              {/* Mobile Persona Switcher */}
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-xs font-semibold text-slate-400 mb-2">Switch Demo Persona</p>
                                <div className="mt-4 pt-4 border-t border-slate-200/70">
                                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    Switch Demo Persona
                                  </p>
                                  <div className="grid grid-cols-2 gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        loginAsDemo('driver');
                                        setMobileMenuOpen(false);
                                      }}
                                      className={`py-2 px-3 text-xs font-bold rounded-xl border text-center ${className = {`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${user.vehicle
                                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                                            : 'border-slate-200 bg-slate-50 text-slate-700'
                                          }`}
              >
                Driver (Ethan)
                🚗 Driver (Ethan)
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('passenger');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center ${
                className = {`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${!user.vehicle
                                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                                          : 'border-slate-200 bg-slate-50 text-slate-700'
                                        }`}
                                    >
                                      Passenger (Maya)
                                      🎒 Passenger (Maya)
                                    </button>
                                  </div>
                                </div>
                              </div>
      )}
                            </header>
                            );
};

