import React, { useState, useEffect } from 'react';
import { Gift, Target, BarChart3, DollarSign, Zap } from 'lucide-react';

const MatchingIncomeReport = () => {
  const [matchingData, setMatchingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [stats, setStats] = useState({
    leftBusiness: 0,
    rightBusiness: 0,
    matchedBusiness: 0,
    carryForward: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Mock data
      const mockData = [
        {
          id: 1,
          date: '2024-01-15',
          leftBusiness: 500,
          rightBusiness: 400,
          matched: 400,
          commission: 40,
          percentage: '10%',
          carryForward: 100,
          status: 'Credited'
        },
        {
          id: 2,
          date: '2024-01-14',
          leftBusiness: 800,
          rightBusiness: 600,
          matched: 600,
          commission: 60,
          percentage: '10%',
          carryForward: 200,
          status: 'Credited'
        },
        {
          id: 3,
          date: '2024-01-13',
          leftBusiness: 300,
          rightBusiness: 500,
          matched: 300,
          commission: 30,
          percentage: '10%',
          carryForward: 200,
          status: 'Pending'
        }
      ];
      
      setTimeout(() => {
        setMatchingData(mockData);
        setTotalIncome(mockData.reduce((sum, item) => sum + item.commission, 0));
        setStats({
          leftBusiness: mockData.reduce((sum, item) => sum + item.leftBusiness, 0),
          rightBusiness: mockData.reduce((sum, item) => sum + item.rightBusiness, 0),
          matchedBusiness: mockData.reduce((sum, item) => sum + item.matched, 0),
          carryForward: mockData[mockData.length - 1]?.carryForward || 0
        });
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Gift className="text-purple-400" size={24} />
            Matching Income Report
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your binary matching bonus</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
          <div className="text-xs text-purple-400 font-medium">Total Matching Income</div>
          <div className="text-2xl font-bold text-white">${totalIncome.toFixed(2)}</div>
        </div>
      </div>

      {/* Business Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-green-400" />
            <span className="text-xs font-medium text-green-400">Left Business</span>
          </div>
          <div className="text-xl font-bold text-white">${stats.leftBusiness}</div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Right Business</span>
          </div>
          <div className="text-xl font-bold text-white">${stats.rightBusiness}</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-purple-400" />
            <span className="text-xs font-medium text-purple-400">Matched Business</span>
          </div>
          <div className="text-xl font-bold text-white">${stats.matchedBusiness}</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-amber-600/20 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-orange-400" />
            <span className="text-xs font-medium text-orange-400">Carry Forward</span>
          </div>
          <div className="text-xl font-bold text-white">${stats.carryForward}</div>
        </div>
      </div>

      {/* Matching Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Matching History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Left Business</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Right Business</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Matched</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Commission</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Carry Forward</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b border-white/5">
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="p-4">
                        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : matchingData.length > 0 ? (
                matchingData.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-white">{item.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-green-400 font-semibold">${item.leftBusiness}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-blue-400 font-semibold">${item.rightBusiness}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-purple-400 font-bold">${item.matched}</td>
                    <td className="p-4 text-sm text-green-400 font-bold">${item.commission}</td>
                    <td className="p-4 text-sm text-orange-400 font-semibold">${item.carryForward}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Credited' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Gift size={48} className="text-gray-600" />
                      <p>No matching income records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <Target size={16} className="text-blue-400" />
          How Matching Income Works
        </h4>
        <p className="text-xs text-gray-300 leading-relaxed">
          Matching income is calculated based on the weaker leg between your left and right binary teams. 
          You earn 10% commission on the matched business volume. Any unmatched business carries forward to the next calculation period.
        </p>
      </div>
    </div>
  );
};

export default MatchingIncomeReport;