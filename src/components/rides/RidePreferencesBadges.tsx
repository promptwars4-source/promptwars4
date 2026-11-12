import React from 'react';
import { Music, VolumeX, Briefcase, Dog, Cigarette, Users, MessageSquare } from 'lucide-react';
import { UserPreferences } from '../../types';

interface RidePreferencesBadgesProps {
  preferences: UserPreferences;
  showLabels?: boolean;
}

export const RidePreferencesBadges: React.FC<RidePreferencesBadgesProps> = ({
  preferences,
  showLabels = false
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
      {/* Gender preference */}
      {preferences.genderPreference === 'female_only' && (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-fuchsia-50 text-fuchsia-700 font-semibold border border-fuchsia-200"
          title="Female students only ride"
        >
          <Users className="w-3.5 h-3.5" />
          {showLabels && 'Women Only'}
        </span>
      )}

      {/* Music */}
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
          preferences.music
            ? 'bg-slate-50 text-slate-700 border-slate-200'
            : 'bg-slate-50 text-slate-400 border-slate-100 line-through'
        }`}
        title={preferences.music ? 'Music allowed' : 'No music'}
      >
        <Music className="w-3.5 h-3.5" />
        {showLabels && (preferences.music ? 'Music On' : 'Silent')}
      </span>

      {/* Luggage */}
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
        title={`Luggage: ${preferences.luggageCapacity}`}
      >
        <Briefcase className="w-3.5 h-3.5" />
        {showLabels && `Luggage: ${preferences.luggageCapacity}`}
      </span>

      {/* Chattiness */}
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
        title={`Vibe: ${preferences.chattiness}`}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        {showLabels && `Vibe: ${preferences.chattiness}`}
      </span>

      {/* Non-smoking */}
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200"
        title="Non-smoking vehicle"
      >
        <Cigarette className="w-3.5 h-3.5" />
        {showLabels && 'No Smoking'}
      </span>

      {/* Pets */}
      {preferences.pets && (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200"
          title="Pet-friendly"
        >
          <Dog className="w-3.5 h-3.5" />
          {showLabels && 'Pet Friendly'}
        </span>
      )}
    </div>
  );
};

