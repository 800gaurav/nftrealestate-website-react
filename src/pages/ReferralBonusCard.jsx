import { FiArrowRight } from "react-icons/fi";

export const ReferralBonusCard = ({ directActive, remainingDirect, progress }) => {
  if (directActive >= 10) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 rounded-2xl p-6 shadow-xl border border-emerald-400">
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/10 blur-2xl"></div>



      <h3 className="text-2xl font-extrabold text-white mb-2">
        Earn <span className="text-yellow-300">1% Team Growth Business</span>
      </h3>

      <p className="text-white/90 mb-4">
        Complete <span className="font-bold">10 Active Direct Referrals</span> and
        unlock instant cash reward 💸
      </p>

      {/* Progress info */}
      <div className="flex justify-between text-sm text-white mb-2">
        <span>Your Progress</span>
        <span className="font-semibold">{directActive}/10</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-yellow-300 transition-all duration-700"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-white">
        🔥 Only <span className="font-bold text-yellow-300">{remainingDirect}</span>{" "}
        more referrals to unlock bonus
      </p>

    </div>
  );
};
