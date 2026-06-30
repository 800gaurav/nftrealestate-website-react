import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { Award, RefreshCw } from "lucide-react";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";

const fmt = (n) => `$${Number(n || 0).toLocaleString("en-US")}`;

export default function RankRewardPage() {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;
  const [rankData, setRankData] = useState(null);

  const fetchRank = async () => {
    if (!userId) return;
    try {
      setloading(true);
      const res = await fetchData({ url: `/api/v1/user/profile/user-rank/${userId}` });
      setRankData(res?.data || null);
    } catch (_) {
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchRank();
  }, [userId]);

  const rows = useMemo(() => rankData?.allRanks || [], [rankData]);
  const currentBusiness = Number(rankData?.teamBusiness || 0);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award size={22} className="text-amber-400" /> Rank Reward
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Team business: <span className="text-white font-semibold">{fmt(currentBusiness)}</span>
            </p>
          </div>
          <button
            onClick={fetchRank}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs">
                  <th className="text-left px-4 py-3 font-medium">Rank</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-right px-4 py-3 font-medium">Business</th>
                  <th className="text-left px-4 py-3 font-medium">Reward</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const achieved = currentBusiness >= Number(row.business || 0);
                  return (
                    <tr key={row.rank} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-4 py-3 text-slate-300 font-semibold">{row.level}</td>
                      <td className="px-4 py-3 text-white font-semibold">{row.rank}</td>
                      <td className="px-4 py-3 text-right text-slate-300">{fmt(row.business)}</td>
                      <td className="px-4 py-3 text-slate-300">{row.reward}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${achieved ? "bg-emerald-400/15 text-emerald-300" : "bg-slate-700 text-slate-300"}`}>
                          {achieved ? "Achieved" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
