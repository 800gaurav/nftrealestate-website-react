import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAxios from '../utils/useAxios';
import { useAuth } from '../context/AuthContext';
import { Sparkles, CheckCircle, ArrowRight, Wallet, AlertTriangle } from 'lucide-react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const PACKAGES = [
  {
    code: 'S1', rank: 'Starter', price: 12,
    color: 'from-slate-700 to-slate-800', border: 'border-slate-600', accent: 'text-slate-300',
    features: ['40% staking amount withdrawable', 'Daily ROI on 40% staking amount', 'Binary pair matching', 'Basic dashboard access'],
  },
  {
    code: 'S2', rank: 'Silver', price: 25,
    color: 'from-gray-600 to-gray-700', border: 'border-gray-500', accent: 'text-gray-200',
    features: ['40% staking amount withdrawable', 'Daily ROI on 40% staking amount', 'Binary pair matching', 'Priority support'],
  },
  {
    code: 'S3', rank: 'Gold', price: 50,
    badge: 'MOST POPULAR', badgeCls: 'bg-yellow-500 text-black',
    color: 'from-yellow-700 to-yellow-800', border: 'border-yellow-500', accent: 'text-yellow-300',
    features: ['40% staking amount withdrawable', '10% binary matching', 'Rank reward eligibility', 'No signup bonus'],
  },
  {
    code: 'S4', rank: 'Platinum', price: 100,
    badge: 'BEST VALUE', badgeCls: 'bg-cyan-500 text-black',
    color: 'from-cyan-800 to-cyan-900', border: 'border-cyan-400', accent: 'text-cyan-300',
    features: ['40% staking amount withdrawable', 'Higher binary pair cap', 'All rank rewards eligibility', 'No working/non-working cap'],
  },
];

const getPaymentUrl = (payload) => (
  payload?.data?.payment_url ||
  payload?.data?.invoice_url ||
  payload?.data?.url ||
  payload?.payment_url ||
  payload?.invoice_url ||
  payload?.url ||
  payload?.data?.data?.payment_url ||
  payload?.data?.data?.invoice_url ||
  payload?.data?.data?.url
);

export default function DepositPage() {
  const [processingCode, setProcessingCode] = useState('');
  const [fundBalance, setFundBalance] = useState(0);
  const [confirmModal, setConfirmModal] = useState(null); // { pkg }
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) return;
    fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` })
      .then((res) => setFundBalance(res?.data?.fundBalance || 0))
      .catch(() => {});
  }, [userId]);

  // Fund wallet se purchase
  const handleFundWalletBuy = async () => {
    const pkg = confirmModal;
    setConfirmModal(null);
    try {
      setProcessingCode(pkg.code);
      setloading(true);

      const result = await Swal.fire({
        title: 'Confirm Purchase',
        html: `
          <div style="text-align:left;font-size:14px;">
            <p><b>Package:</b> ${pkg.rank} ($${pkg.price})</p>
            <p><b>Your Fund Wallet:</b> $${fundBalance.toFixed(2)}</p>
            <p><b>Amount to Deduct:</b> $${pkg.price}</p>
            <p><b>Balance After:</b> $${(fundBalance - pkg.price).toFixed(2)}</p>
            <p style="margin-top:10px;color:#f59e0b;">Amount will be deducted from your Fund Wallet.</p>
          </div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Buy Now',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#10b981',
      });

      if (!result.isConfirmed) return;

      const res = await fetchData({
        url: '/api/v1/user/oxapay/payment/initiate',
        method: 'POST',
        data: { amount: pkg.price, packageCode: pkg.code, payFromFundWallet: true },
      });

      if (res?.success) {
        toast.success(res.message || 'Package purchased successfully from Fund Wallet!');
        // Refresh fund balance
        fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` })
          .then((r) => setFundBalance(r?.data?.fundBalance || 0));
      } else {
        toast.error(res?.message || 'Purchase failed');
      }
    } catch (err) {
      toast.error(err?.message || 'Purchase failed');
    } finally {
      setProcessingCode('');
      setloading(false);
    }
  };

  // OxaPay se purchase
  const handleOxaPayBuy = async (pkg) => {
    try {
      setProcessingCode(pkg.code);
      setloading(true);
      const res = await fetchData({
        url: '/api/v1/user/oxapay/payment/initiate',
        method: 'POST',
        data: { amount: pkg.price, packageCode: pkg.code },
      });

      const paymentUrl = getPaymentUrl(res);
      if (!paymentUrl) {
        toast.error('Payment link not received. Please contact support.');
        return;
      }
      window.location.href = paymentUrl;
    } catch (err) {
      toast.error(err?.message || 'Failed to initiate payment');
    } finally {
      setProcessingCode('');
      setloading(false);
    }
  };

  // Main handler - fund wallet check
  const handleBuyPackage = (pkg) => {
    if (fundBalance >= pkg.price) {
      setConfirmModal(pkg);
    } else {
      handleOxaPayBuy(pkg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-cyan-400 h-6 w-6" /> Buy Package
            </h1>
            <p className="text-slate-400 text-sm mt-1">Select a package to activate your account</p>
          </div>
          {/* Fund Wallet Balance */}
          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/40 rounded-xl px-4 py-2">
            <Wallet className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-xs text-emerald-300">Fund Wallet</p>
              <p className="text-base font-bold text-white">${fundBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Fund wallet notice */}
        {fundBalance > 0 && (
          <div className="flex items-start gap-3 bg-emerald-900/20 border border-emerald-500/30 rounded-xl px-4 py-3">
            <Wallet className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300">
              You have <b className="text-white">${fundBalance.toFixed(2)}</b> in your Fund Wallet.
              If your Fund Wallet balance covers the package price, it will be used automatically — no OxaPay needed.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((pkg) => {
            const isProcessing = processingCode === pkg.code;
            const canUseFund = fundBalance >= pkg.price;
            return (
              <div
                key={pkg.code}
                className={`relative rounded-2xl border ${pkg.border} bg-gradient-to-b ${pkg.color} p-6 flex flex-col gap-4`}
              >
                {pkg.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${pkg.badgeCls} text-xs font-bold px-3 py-1 rounded-full`}>
                    {pkg.badge}
                  </span>
                )}
                <div>
                  <p className="text-slate-400 text-sm font-medium">{pkg.rank}</p>
                  <p className={`text-4xl font-extrabold ${pkg.accent} mt-1`}>${pkg.price}</p>
                  <p className="text-xs text-slate-400 mt-2">Staking allocation: ${(pkg.price * 0.4).toFixed(2)}</p>
                  {canUseFund && (
                    <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                      <Wallet className="h-3 w-3" /> Payable via Fund Wallet
                    </p>
                  )}
                </div>
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleBuyPackage(pkg)}
                  disabled={Boolean(processingCode)}
                  className={`mt-2 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    canUseFund
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {isProcessing
                    ? 'Processing...'
                    : canUseFund
                    ? (<><Wallet className="h-4 w-4" /> Pay from Fund Wallet</>)
                    : (<>Buy via OxaPay <ArrowRight className="h-4 w-4" /></>)
                  }
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fund Wallet Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">💰</div>
              <h2 className="text-white font-bold text-xl">Confirm Purchase</h2>
              <p className="text-slate-400 text-sm mt-1">Amount will be deducted from your Fund Wallet</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 space-y-2 mb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Package</span>
                <span className="text-white font-semibold">{confirmModal.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Package Price</span>
                <span className="text-white font-semibold">${confirmModal.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fund Wallet Balance</span>
                <span className="text-emerald-400 font-semibold">${fundBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2">
                <span className="text-slate-400">Balance After Purchase</span>
                <span className="text-white font-bold">${(fundBalance - confirmModal.price).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-amber-900/30 border border-amber-500/30 rounded-lg px-3 py-2 mb-5">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-300 text-xs">This action cannot be undone. ${confirmModal.price} will be permanently deducted from your Fund Wallet.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFundWalletBuy}
                className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-sm font-bold text-white transition-colors"
              >
                Confirm & Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
