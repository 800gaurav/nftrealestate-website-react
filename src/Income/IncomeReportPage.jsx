import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import { RefreshCw } from "lucide-react";

const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export default function IncomeReportPage() {
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  const [summary, setSummary] = useState({});

  const fetchAll = async () => {
    try {
      setloading(true);
      const dashRes = await fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` });
      setSummary(dashRes?.data || {});
    } catch (_) {}
    finally { setloading(false); }
  };

  useEffect(() => { if (userId) fetchAll(); }, []);

  // Build unified rows from both history arrays
  const rows = [];

  (summary.roiIncomeHistory || []).forEach((h) => {
    rows.push({
      date: h.date,
      type: "Staking Income",
      description: "Daily Income",
      from: "—",
      amount: h.amount,
    });
  });

  (summary.proBonusHistory || []).forEach((h) => {
    rows.push({
      date: h.date,
      type: "Sponsor Income",
      description: "Sponsor",
      from: h.fromUser || "—",
      amount: h.amount,
    });
  });

  // Sort newest first
  rows.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Income History</h1>
            <p className="text-slate-500 text-sm mt-0.5">Complete income transaction history</p>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* Unified Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs">
                  <th className="text-left px-4 py-3 font-medium">#</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">From (Sponsor)</th>
                  <th className="text-right px-4 py-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-500 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{fmtDate(row.date)}</td>
                      <td className="px-4 py-3 text-white text-xs font-medium">{row.description}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.type === "Staking Income"
                            ? "bg-emerald-400/15 text-emerald-400"
                            : "bg-blue-400/15 text-blue-400"
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs font-mono">{row.from}</td>
                      <td className="px-4 py-3 text-right text-white font-bold text-xs">{fmt(row.amount)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-slate-500 py-12 text-sm">
                      No income history found yet.
                    </td>
                  </tr>
                )}
              </tbody>
              {rows.length > 0 && (
                <tfoot>
                  <tr className="border-t border-slate-700 bg-slate-800/40">
                    <td colSpan={5} className="px-4 py-3 text-slate-400 text-xs font-semibold">Total</td>
                    <td className="px-4 py-3 text-right text-emerald-400 font-bold text-sm">
                      {fmt(rows.reduce((s, r) => s + Number(r.amount || 0), 0))}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
