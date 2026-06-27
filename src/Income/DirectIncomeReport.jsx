import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Eye } from 'lucide-react';

const DirectIncomeReport = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData = [
        {
          id: 1,
          referredUser: 'JUP001234',
          userName: 'Rahul Kumar',
          package: '$100',
          commission: '$10',
          percentage: '10%',
          date: '2024-01-15',
          status: 'Credited'
        },
        {
          id: 2,
          referredUser: 'JUP001235',
          userName: 'Priya Singh',
          package: '$250',
          commission: '$25',
          percentage: '10%',
          date: '2024-01-14',
          status: 'Credited'
        },
        {
          id: 3,
          referredUser: 'JUP001236',
          userName: 'Amit Sharma',
          package: '$500',
          commission: '$50',
          percentage: '10%',
          date: '2024-01-13',
          status: 'Pending'
        }
      ];
      
      setTimeout(() => {
        setIncomeData(mockData);
        setTotalIncome(mockData.reduce((sum, item) => sum + parseFloat(item.commission.replace('$', '')), 0));
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
            <TrendingUp className="text-green-400" size={24} />
            Direct Income Report
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your direct referral earnings</p>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4">
          <div className="text-xs text-green-400 font-medium">Total Direct Income</div>
          <div className="text-2xl font-bold text-white">${totalIncome.toFixed(2)}</div>
        </div>
      </div>

      {/* Income Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">User ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Package</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Commission</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="p-4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : incomeData.length > 0 ? (
                incomeData.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-white font-mono">{item.referredUser}</td>
                    <td className="p-4 text-sm text-white">{item.userName}</td>
                    <td className="p-4 text-sm text-green-400 font-semibold">{item.package}</td>
                    <td className="p-4 text-sm text-green-400 font-bold">{item.commission}</td>
                    <td className="p-4 text-sm text-gray-300">{item.date}</td>
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
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <DollarSign size={48} className="text-gray-600" />
                      <p>No direct income records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DirectIncomeReport;