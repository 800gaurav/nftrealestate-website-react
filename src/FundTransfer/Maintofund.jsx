import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { colors } from '../variables/colors';

function Maintofund() {
  const [amount, setAmount] = useState('');
  const [Data, setData] = useState({});
  const [responseMsg, setResponseMsg] = useState('');
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;
  const { loading, setloading } = useAuth();

  const fetchBalanceData = async () => {
    try {
      setloading(true);
      const res = await fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` });
      setData(res.data || {});
      setloading(false);
    } catch (error) {
      console.error("Error fetching balances:", error);
      setloading(false);
    }
  };

  useEffect(() => { fetchBalanceData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetchData({
        url: '/api/v1/user/payment/wallet-to-fund',
        method: 'POST',
        data: { userId, amount: parseFloat(amount) },
      });
      if (res.success) { setAmount(''); setResponseMsg('✅ Successfully transferred!'); }
      else setResponseMsg('❌ Failed to transfer!');
      setloading(false);
    } catch (error) {
      setResponseMsg(error.message);
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex mt-10 justify-center px-4">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-800">
          <h2 className="text-center text-2xl font-extrabold mb-4" style={{ color: colors.theme1 }}>
            Main ➝ Fund Transfer
          </h2>
          <div className="flex justify-between bg-gray-800 rounded-lg p-4 mb-4 text-sm">
            <div>
              <p className="text-gray-400">Main Balance</p>
              <p className="text-white font-bold text-lg">${Number(Data?.walletBalance || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400">Fund Balance</p>
              <p className="text-white font-bold text-lg">${Number(Data?.fundBalance || 0).toFixed(2)}</p>
            </div>
          </div>
          <p className="text-red-400 text-center text-sm mb-6">⚠️ Transaction charge: <span className="font-semibold">5%</span></p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number" placeholder="Enter Amount ($)" value={amount}
              onChange={(e) => setAmount(e.target.value)} required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-lime-400 outline-none transition"
            />
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition disabled:opacity-50"
              style={{ background: colors.theme1 }}>
              {loading ? 'Processing...' : 'Transfer Now'}
            </button>
          </form>
          {responseMsg && (
            <p className={`text-center mt-4 font-medium ${responseMsg.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {responseMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Maintofund;
