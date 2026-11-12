import React from 'react';
import { Leaf, Award, Trees, Fuel } from 'lucide-react';

interface CarbonSavedWidgetProps {
  co2Kg: number;
  savingsDollars: number;
}

export const CarbonSavedWidget: React.FC<CarbonSavedWidgetProps> = ({ co2Kg, savingsDollars }) => {
  const treesEquivalent = (co2Kg / 21).toFixed(1); // avg tree absorbs ~21kg CO2/year

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-navy-900 text-white p-6 shadow-premium relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-6 translate-y-6">
        <Leaf className="w-52 h-52 text-white" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </span>
          <div>
            <h4 className="text-base font-bold text-white">Your Campus Impact</h4>
            <p className="text-xs text-emerald-200">Collective student sustainability</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
            <div className="flex items-center gap-2 text-emerald-200 text-xs mb-1">
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span>CO2 Reduced</span>
            </div>
            <div className="text-2xl font-black text-white">{co2Kg} kg</div>
            <p className="text-[10px] text-emerald-100/80 mt-0.5">Fewer tailpipe emissions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
            <div className="flex items-center gap-2 text-emerald-200 text-xs mb-1">
              <Trees className="w-4 h-4 text-emerald-300" />
              <span>Trees Equivalent</span>
            </div>
            <div className="text-2xl font-black text-white">~{treesEquivalent}</div>
            <p className="text-[10px] text-emerald-100/80 mt-0.5">Annual tree absorption</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
            <div className="flex items-center gap-2 text-emerald-200 text-xs mb-1">
              <Fuel className="w-4 h-4 text-emerald-300" />
              <span>Gas Money Saved</span>
            </div>
            <div className="text-2xl font-black text-white">${savingsDollars}</div>
            <p className="text-[10px] text-emerald-100/80 mt-0.5">Split with campus peers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

