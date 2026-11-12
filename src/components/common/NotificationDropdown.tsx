import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, ExternalLink, Calendar, Car, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadNotifsCount, markNotificationAsRead } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'booking_accepted':
      case 'ride_reminder':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'booking_request':
        return <Car className="w-4 h-4 text-brand-600" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-navy-800 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center justify-center"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" />
        {unreadNotifsCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadNotifsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy-800">Campus Notifications</span>
              {unreadNotifsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-50 text-brand-700 rounded-full border border-brand-200/60">
                  {unreadNotifsCount} new
                </span>
              )}
            </div>
            {unreadNotifsCount > 0 && (
              <button
                onClick={() => {
                  notifications.forEach((n) => markNotificationAsRead(n.id));
                }}
                className="text-[11px] text-brand-600 hover:text-brand-800 flex items-center gap-1 font-semibold"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No new notifications
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 items-start ${
                    !notif.read ? 'bg-brand-50/30' : ''
                  }`}
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs shrink-0">
                    {getNotifIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h5>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                    {notif.linkTo && (
                      <Link
                        to={notif.linkTo}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700 mt-1.5"
                      >
                        View details <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 text-center">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              Open Student Dashboard →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
