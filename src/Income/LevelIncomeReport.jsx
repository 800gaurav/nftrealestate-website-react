import React, { useState, useEffect } from 'react';
import { Award, Users, TrendingUp, DollarSign, Layers } from 'lucide-react';

const LevelIncomeReport = () => {
  const [levelData, setLevelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Mock data
      const mockData = [
        {
          id: 1,
          level: 1,
          fromUser: 'JUP001234',
          userName: 'Rahul Kumar',
          package: '$100',
          commission: '$5',
          percentage: '5%',
          date: '2024-01-15',
          status: 'Credited'
        },
        {
          id: 2,
          level: 2,
          fromUser: 'JUP001235',
          userName: 'Priya Singh',
          package: '$250',
          commission: '$7.5',
          percentage: '3%',
          date: '2024-01-14',
          status: 'Credited'
        },
        {
          id: 3,
          level: 3,
          fromUser: 'JUP001236',
          userName: 'Amit Sharma',
          package: '$500',
          commission: '$10',
          percentage: '2%',
          date: '2024-01-13',
          status: 'Credited'
        },
        {
          id: 4,
          level: 4,
          fromUser: 'JUP001237',
          userName: 'Neha Gupta',
          package: '$100',
          commission: '$1',
          percentage: '1%',
          date: '2024-01-12',
          status: 'Pending'
        }
      ];
      
      setTimeout(() => {
        setLevelData(mockData);
        setTotalIncome(mockData.reduce((sum, item) => sum + parseFloat(item.commission.replace('$', '')), 0));
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const getLevelColor = (level) => {
    const colors = {
      1: 'text-yellow-400 bg-yellow-400/20',
      2: 'text-orange-400 bg-orange-400/20',
      3: 'text-red-400 bg-red-400/20',
      4: 'text-purple-400 bg-purple-400/20',
      5: 'text-blue-400 bg-blue-400/20'
    };
    return colors[level] || 'text-gray-400 bg-gray-400/20';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="text-orange-400" size={24} />
            Level Income Report
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your multi-level earnings</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500/20 to-amber-600/20 border border-orange-500/30 rounded-xl p-4">
          <div className="text-xs text-orange-400 font-medium">Total Level Income</div>
          <div className="text-2xl font-bold text-white">${totalIncome.toFixed(2)}</div>
        </div>
      </div>

      {/* Level Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(level => {
          const levelIncome = levelData
            .filter(item => item.level === level)
            .reduce((sum, item) => sum + parseFloat(item.commission.replace('$', '')), 0);
          
          return (
            <div key={level} className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={16} className={`${getLevelColor(level).split(' ')[0]}`} />
                <span className="text-sm font-medium text-white">Level {level}</span>
              </div>
              <div className="text-lg font-bold text-white">${levelIncome.toFixed(2)}</div>
              <div className="text-xs text-gray-400">
                {levelData.filter(item => item.level === level).length} users
              </div>
            </div>
          );
        })}
      </div>

      {/* Income Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Recent Level Income</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Level</th>
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
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="p-4">
                        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : levelData.length > 0 ? (
                levelData.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                        L{item.level}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-white font-mono">{item.fromUser}</td>
                    <td className="p-4 text-sm text-white">{item.userName}</td>
                    <td className="p-4 text-sm text-blue-400 font-semibold">{item.package}</td>
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
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Award size={48} className="text-gray-600" />
                      <p>No level income records found</p>
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

export default LevelIncomeReport;