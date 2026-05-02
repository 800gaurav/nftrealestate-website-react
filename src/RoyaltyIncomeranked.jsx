import React, { useEffect, useState } from "react";
import useAxios from "./utils/useAxios";
import Cookies from "js-cookie";
import { FiAward, FiTrendingUp, FiCheckCircle, FiXCircle } from "react-icons/fi";

const RoyaltyIncomeranked = () => {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;

  const baseRanks = [
    { rank: "1ˢᵗ", business: "$ 5000", income: "$ 5", reward: 5 },
    { rank: "2ⁿᵈ", business: "$ 12000", income: "$ 10", reward: 10 },
    { rank: "3ʳᵈ", business: "$ 25000", income: "$ 20", reward: 20 },
    { rank: "4ᵗʰ", business: "$ 40000", income: "$ 40", reward: 40 },
    { rank: "5ᵗʰ", business: "$ 80000", income: "$ 100", reward: 100 },
    { rank: "6ᵗʰ", business: "$ 120000", income: "$ 150", reward: 150 },
    { rank: "7ᵗʰ", business: "$ 240000", income: "$ 350", reward: 350 },
    { rank: "8ᵗʰ", business: "$ 480000", income: "$ 800", reward: 800 },
    { rank: "9ᵗʰ", business: "$ 960000", income: "$ 1700", reward: 1700 },
    { rank: "10ᵗʰ", business: "$ 1500000", income: "$ 4000", reward: 4000 },
  ];

  const [ranks, setRanks] = useState(baseRanks);
  const [maxReward, setMaxReward] = useState(0);

  useEffect(() => {
    const fetchRoyaltyHistory = async () => {
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/royalty-income-history`,
        });

        const history = res?.data || [];
        setData(history);

        // Get max reward received
        const maxRewardValue = Math.max(...history.map((h) => h.reward), 0);
        setMaxReward(maxRewardValue);

        // Mark all ranks up to maxReward as Qualified
        const updatedRanks = baseRanks.map((item) => ({
          ...item,
          status: item.reward <= maxRewardValue ? "Qualified" : "Not Qualified",
          progress: Math.min((maxRewardValue / item.reward) * 100, 100)
        }));
        setRanks(updatedRanks);
      } catch (error) {
        console.error("Error fetching Royalty History:", error);
      }
    };

    fetchRoyaltyHistory();
  }, []);

  return (
    <div className=" px-5 pt-8 pb-8 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Royalty Income Ranks</h1>
        <p className="text-gray-600">Track your progress through royalty ranks and rewards</p>
        {maxReward > 0 && (
          <div className="mt-4 bg-gradient-to-r from-[#0671FF] to-[#02D396] text-white p-3 rounded-lg inline-block">
            <span className="font-semibold">Highest Reward Achieved: </span>
            <span>${maxReward}</span>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] bg-white rounded-xl shadow-lg border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-[#0671FF] to-[#02D396] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-sm uppercase">
                  <div className="flex items-center">
                    <FiAward className="mr-2" />
                    Rank
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold text-sm uppercase">
                  <div className="flex items-center">
                    <FiTrendingUp className="mr-2" />
                    Required Business
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold text-sm uppercase">Income</th>
                <th className="px-6 py-4 font-semibold text-sm uppercase">Status</th>
                <th className="px-6 py-4 font-semibold text-sm uppercase">Progress</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((item, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-gray-100 ${
                    item.status === "Qualified" ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === "Qualified" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {item.rank.split('')[0]}
                      </div>
                      <span className="ml-3 font-medium">{item.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.business}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#02D396]">{item.income}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === "Qualified" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {item.status === "Qualified" ? (
                        <FiCheckCircle className="mr-1" />
                      ) : (
                        <FiXCircle className="mr-1" />
                      )}
                      {item.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === "Qualified" 
                            ? "bg-gradient-to-r from-[#02D396] to-[#0671FF]" 
                            : "bg-blue-200"
                        }`}
                        style={{ width: `${item.progress || 0}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round(item.progress || 0)}% Complete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-[#02D396] to-[#0671FF] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Qualified Rank</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
      </div>
    </div>
  );
};

export default RoyaltyIncomeranked;

