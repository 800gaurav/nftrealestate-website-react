import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useAxios from '../utils/useAxios';

function ActiveReport() {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const res = await fetchData({ url: `/api/v1/user/nft/purchase/get-user-nft/${userId}` });
        setData(res.data?.nfts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchNFTData();
  }, []);

  const totalInvested = data.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalProfit = data.reduce((acc, item) => acc + (item.profitEarned || 0), 0);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-6">
      <h2 className="text-center text-xl font-bold text-gray-100 mb-6">My NFT Portfolio</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-6 text-lg font-semibold text-center">
        <div className="text-green-400">Total Invested: ${totalInvested.toFixed(2)}</div>
        <div className="text-yellow-400">Total Profit: ${totalProfit.toFixed(2)}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-900 text-[#e4ff35] text-left">
            <tr>
              <th className="px-4 py-2">NFT</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Profit</th>
              <th className="px-4 py-2">% Change</th>
              <th className="px-4 py-2">Days</th>
              <th className="px-4 py-2">Buy Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item) => {
              const profitPercent = item.price > 0 ? ((item.profitEarned || 0) / item.price) * 100 : 0;
              return (
                <tr key={item._id} className="hover:bg-gray-800">
                  <td className="px-4 py-3">
                    <span className="text-white font-medium truncate max-w-[150px] block">{item.nft?.title || 'Untitled'}</span>
                  </td>
                  <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">${item.profitEarned?.toFixed(2) || '0.00'}</td>
                  <td className={`px-4 py-3 font-bold ${profitPercent >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                    {profitPercent.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3">{item.daysCount}</td>
                  <td className="px-4 py-3">{new Date(item.purchasedAt).toLocaleDateString()}</td>
                </tr>
              );
            }) : (
              <tr><td colSpan="6" className="text-center py-4 text-gray-400">No NFT data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveReport;
