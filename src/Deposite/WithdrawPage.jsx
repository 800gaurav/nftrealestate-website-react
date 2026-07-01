import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useAuth } from '../context/AuthContext';
import { Wallet, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

function WithdrawPage() {
  const [Data, setData] = useState({});
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [hasPending, setHasPending] = useState(false);
  const [addressMissing, setAddressMissing] = useState(false);
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const navigate = useNavigate();

  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  const adminCharge = amount ? (Number(amount) * 0.10).toFixed(2) : '0.00';
  const payableAmount = amount ? (Number(amount) - Number(adminCharge)).toFixed(2) : '0.00';

  const fetchDashboard = async () => {
    try {
      setloading(true);
      const res = await fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` });
      const data = res.data || {};
      setData(data);
      // Check if withdraw address is set for selected method or both missing
      const trc = data.withdrawTRC_ADDRESS;
      const bep = data.withdrawBEP_ADDRESS;
      if ((!trc || trc === '0') && (!bep || bep === '0')) {
        setAddressMissing(true);
      }
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  const fetchPendingStatus = async () => {
    try {
      const res = await fetchData({ url: `/api/v1/user/payment/withdraw-history?type=pending&userId=${userId}` });
      const records = res.data?.records || res.data || [];
      setHasPending(Array.isArray(records) && records.length > 0);
    } catch (_) {}
  };

  useEffect(() => {
    fetchDashboard();
    fetchPendingStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressMissing) return toast.error('Please set your withdrawal address in profile settings first');
    if (!withdrawMethod) return toast.error('Please select withdrawal method');
    if (!amount || Number(amount) < 5) return toast.error('Minimum withdrawal amount is $5');
    if (hasPending) return toast.error('You already have a pending withdrawal request. Wait for it to be processed.');

    // Check if selected method address is set
    if (withdrawMethod === 'USDT.TRC20' && (!Data.withdrawTRC_ADDRESS || Data.withdrawTRC_ADDRESS === '0')) {
      toast.error('TRC20 address not set. Please update your profile.');
      return navigate('/update-profile');
    }
    if (withdrawMethod === 'USDT.BEP20' && (!Data.withdrawBEP_ADDRESS || Data.withdrawBEP_ADDRESS === '0')) {
      toast.error('BEP20 address not set. Please update your profile.');
      return navigate('/update-profile');
    }

    try {
      setloading(true);
      const res = await fetchData({
        url: `/api/v1/user/payment/withdraw-request`,
        method: 'POST',
        data: { userId, coin: withdrawMethod, amount: Number(amount) },
      });
      if (res.success) {
        toast.success('Withdrawal request created successfully!');
        setAmount('');
        setWithdrawMethod('');
        setHasPending(true);
        fetchDashboard();
      } else {
        toast.error(res.message || 'Something went wrong');
      }
      setloading(false);
    } catch (error) {
      toast.error(error.message || 'Failed to submit withdrawal');
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-xl space-y-6">

          {/* Balance Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-xs mb-1">Wallet Balance</p>
              <p className="text-2xl font-bold text-emerald-400">${Number(Data?.walletBalance || 0).toFixed(2)}</p>
            </div>
     
          </div>

          {/* Address Missing Warning */}
          {addressMissing && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 font-semibold text-sm">Withdrawal Address Not Set</p>
                <p className="text-red-300/70 text-xs mt-1">Please set your TRC20 or BEP20 wallet address before making a withdrawal.</p>
              </div>
              <button
                onClick={() => navigate('/update-profile')}
                className="text-xs bg-red-500 hover:bg-red-400 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
              >
                Set Address
              </button>
            </div>
          )}

          {/* Pending Warning */}
          {hasPending && (
            <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-semibold text-sm">Pending Request Active</p>
                <p className="text-yellow-300/70 text-xs mt-1">You already have a pending withdrawal request. New requests can only be submitted after the current one is processed.</p>
              </div>
            </div>
          )}

          {/* Withdrawal Form */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5 text-cyan-400" />
              <h2 className="text-white font-bold text-lg">Withdraw Balance</h2>
            </div>

            {/* Rules */}
            <div className="bg-slate-800/60 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                Minimum withdrawal: <span className="text-white font-semibold ml-1">$5</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Info className="h-4 w-4 text-red-400 shrink-0" />
                Admin charge: <span className="text-red-400 font-semibold ml-1">10%</span> deducted from amount
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <AlertCircle className="h-4 w-4 text-yellow-400 shrink-0" />
                Only <span className="text-white font-semibold mx-1">1 pending request</span> allowed at a time
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-slate-400 text-sm mb-1.5 block">Withdrawal Method</label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 text-white py-3 px-4 rounded-xl outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">Select Method</option>
                  <option value="USDT.TRC20">USDT (TRC20)</option>
                  <option value="USDT.BEP20">USDT (BEP20)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-1.5 block">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Min $5"
                  min="5"
                  step="0.01"
                  className="w-full bg-slate-800 border border-slate-600 text-white py-3 px-4 rounded-xl outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                />
              </div>

              {/* Breakdown */}
              {amount && Number(amount) >= 5 && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Requested Amount</span>
                    <span className="text-white font-semibold">${Number(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Admin Charge (10%)</span>
                    <span className="text-red-400 font-semibold">-${adminCharge}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 flex justify-between">
                    <span className="text-slate-300 font-semibold">You Will Receive</span>
                    <span className="text-emerald-400 font-bold text-base">${payableAmount}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={hasPending}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {hasPending ? 'Pending Request Active' : 'Submit Withdrawal Request'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WithdrawPage;
