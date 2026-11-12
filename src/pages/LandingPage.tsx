import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  DollarSign,
  Users,
  Car,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  TrendingUp,
  Leaf,
  ChevronRight,
  Star
} from 'lucide-react';
import { RideSearchForm } from '../components/rides/RideSearchForm';
import { POPULAR_ROUTES, STUDENT_TESTIMONIALS } from '../data/mockData';
import { SearchFilters } from '../types';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleHeroSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.origin) params.set('from', filters.origin);
    if (filters.destination) params.set('to', filters.destination);
    if (filters.date) params.set('date', filters.date);
    if (filters.seats) params.set('seats', filters.seats.toString());
    navigate(`/find-ride?${params.toString()}`);
  };

  const handlePopularRouteClick = (from: string, to: string) => {
    navigate(`/find-ride?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-16 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-brand-200/40 via-blue-100/20 to-emerald-100/30 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Student verified pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              Exclusively for Verified College Students
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-800 tracking-tight leading-[1.12]">
              Your Campus.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-emerald-600">
                Your Route.
              </span>{' '}
              Your Ride.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Affordable, reliable, and verified carpooling between campus dorms, transit stations,
              airports, and nearby cities. Travel safely with peers who attend your university.
            </p>
          </div>

          {/* Prominent Search Form Box */}
          <div className="mt-10 max-w-4xl mx-auto">
            <RideSearchForm onSearch={handleHeroSearch} compact={true} />

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500 font-medium">
              <span className="text-slate-400">Quick Searches:</span>
              <button
                onClick={() => handlePopularRouteClick('Stanford University', 'SFO International Airport')}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-colors shadow-xs"
              >
                Campus ➔ SFO Airport
              </button>
              <button
                onClick={() => handlePopularRouteClick('UC Berkeley', 'San Jose Diridon')}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-colors shadow-xs"
              >
                Berkeley ➔ Diridon Train Station
              </button>
              <button
                onClick={() => handlePopularRouteClick('San Jose State University', 'Silicon Valley Tech Park')}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-colors shadow-xs"
              >
                SJSU ➔ Tech Park
              </button>
            </div>
          </div>

          {/* Trust stats counter */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-200/60">
            <div className="text-center p-3 bg-white/60 rounded-xl border border-slate-100 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-navy-800">100%</div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">.edu Email Verified</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl border border-slate-100 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-brand-600">75% OFF</div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">vs Uber & Lyft Rates</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl border border-slate-100 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">18,500+</div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Campus Rides Shared</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl border border-slate-100 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-navy-800">4.9 ★</div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Average Driver Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Find -> Connect -> Share -> Travel) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 mt-3 tracking-tight">
            How CampusPool Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            No expensive ride-hailing markups. Just students helping students get to where they need to go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Find Your Route',
              description: 'Search rides leaving from your campus quad, dorms, or transit hubs on your travel date.',
              icon: Compass,
              color: 'text-brand-600 bg-brand-50 border-brand-100'
            },
            {
              step: '02',
              title: 'Connect & Verify',
              description: 'Inspect verified student IDs, college department badges, driver ratings, and vehicle models.',
              icon: ShieldCheck,
              color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
            },
            {
              step: '03',
              title: 'Book & Split Fare',
              description: 'Reserve a seat instantly or request to join. Gas money is split fairly with zero surge pricing.',
              icon: DollarSign,
              color: 'text-amber-600 bg-amber-50 border-amber-100'
            },
            {
              step: '04',
              title: 'Travel Safely',
              description: 'Hop in at your campus pickup spot, listen to music, meet campus peers, and arrive on time.',
              icon: Car,
              color: 'text-blue-600 bg-blue-50 border-blue-100'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-xl border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR CAMPUS ROUTES */}
      <section id="popular-routes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Frequent Departures
            </span>
            <h2 className="text-3xl font-extrabold text-navy-800 mt-2 tracking-tight">
              Popular Student Routes
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top commuter and weekend corridors with multiple daily rides.
            </p>
          </div>
          <Link
            to="/find-ride"
            className="text-sm font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 shrink-0"
          >
            Explore all routes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_ROUTES.map((route, i) => (
            <div
              key={i}
              onClick={() => handlePopularRouteClick(route.from, route.to)}
              className="group cursor-pointer bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200/60 mb-3">
                  {route.badge}
                </span>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                    <span className="text-xs font-bold text-slate-800 truncate">{route.from}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-800 truncate">{route.to}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 py-2 border-y border-slate-100">
                  <span>{route.distance}</span>
                  <span>~{route.avgDuration}</span>
                </div>
              </div>

              <div className="pt-3 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">From</span>{' '}
                  <span className="font-extrabold text-navy-800">{route.avgPrice}</span>
                </div>
                <span className="text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Book <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BENEFITS: Save Money, Meet Students, Reduce Traffic, Travel Safely */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-white px-3 py-1 rounded-full border border-slate-200">
              Why CampusPool?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 mt-3 tracking-tight">
              Built for Students, by Students
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Say goodbye to expensive solo ride-hailing and stressful transit schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Save Serious Money</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Split fuel and parking expenses. Drivers offset 100% of commute costs, and passengers pay up to 75% less than commercial taxis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Travel Safely</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every member is authenticated with their official university email and student ID. Choose ladies-only rides whenever desired.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Meet Campus Peers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Network with fellow engineers, designers, pre-meds, and graduate students heading on your same daily route.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Cut Carbon & Traffic</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fewer single-occupancy vehicles on university ring roads means cleaner campus air and less parking crunch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Real Student Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 mt-3 tracking-tight">
            Loved by Campus Commuters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(test.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                  <p className="text-xs text-slate-500">{test.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DRIVER CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-brand-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-500/20 text-accent-400 border border-accent-500/30">
              Own a vehicle on campus?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Turn Empty Car Seats into Saved Cash.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Publish your daily commute or holiday airport drive in 60 seconds. Choose who rides with you and split fuel expenses automatically.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/offer-ride"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-accent-500 hover:bg-accent-600 text-navy-900 transition-all shadow-soft active:scale-95 flex items-center gap-2"
              >
                Publish a Ride Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/find-ride"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                Find Available Rides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

