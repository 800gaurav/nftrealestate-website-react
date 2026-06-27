import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import useAxios from '../utils/useAxios';
import { useAuth } from '../context/AuthContext';
import { Sparkles, CheckCircle, ArrowRight, Wallet, X, Eye, EyeOff } from 'lucide-react';

const PACKAGES = [
  {
    code: 'S1', rank: 'Starter', price: 12,
    color: 'from-slate-700 to-slate-800', border: 'border-slate-600', accent: 'text-slate-300',
    features: ['Staking Income 0.5%–1% daily', '10% Referral Income', 'Team Growth Bonus 1%', 'Basic Dashboard Access'],
  },
  {
    code: 'S2', rank: 'Silver', price: 25,
    badge: null,
    color: 'from-gray-600 to-gray-700', border: 'border-gray-500', accent: 'text-gray-200',
    features: ['All Starter Benefits', 'Higher Staking Rate', 'Team Growth Bonus 2%', 'Priority Support 24/7'],
  },
  {
    code: 'S3', rank: 'Gold', price: 50,
    badge: 'MOST POPULAR', badgeCls: 'bg-yellow-500 text-black',
    color: 'from-yellow-700 to-yellow-800', border: 'border-yellow-500', accent: 'text-yellow-300',
    features: ['All Silver Benefits', '10% Matching Income', 'Full Rank Eligibility', 'Dedicated Account Manager'],
  },
  {
    code: 'S4', rank: 'Platinum', price: 100,
    badge: 'BEST VALUE', badgeCls: 'bg-cyan-500 text-black',
    color: 'from-cyan-800 to-cyan-900', border: 'border-cyan-400', accent: 'text-cyan-300',
    features: ['All Benefits Unlocked', '3% Max Team Bonus', 'All 4 Income Streams', 'VIP Investor Benefits'],
  },
];

export default function DepositPage() {
  const [selected, setSelected] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loadingNfts, setLoadingNfts] = useState(false);
  const [step, setStep] = useState('packages'); // 'packages' | 'nfts' | 'confirm'
  const [selectedNft, setSelectedNft] = useState(null);
  const [otp, setOtp] = useState('');
  const [txnPass, setTxnPass] = useState('');
  const [showTxn, setShowTxn] = useState(false);
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState({ walletBalance: 0, fundBalance: 0 });

  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const uid = user?.userId;

  useEffect(() => {
    fetchData({ url: `/api/v1/user/profile/user-dashboard/${uid}` })
      .then(res => setBalance(res.data || {}))
      .catch(() => {});
  }, []);

  const handleSelectPackage = async (pkg) => {
    setSelected(pkg);
    setLoadingNfts(true);
    setStep('nfts');
    try {
      const res = await fetchData({ url: `/api/v1/admin/nft/show-nft-price-wise?price=${pkg.price}` });
      setNfts(res.data || []);
    } catch {
      toast.error('Failed to load NFTs for this package');
      setStep('packages');
    } finally {
      setLoadingNfts(false);
    }
  };

  const handleSelectNft = async (nft) => {
    setSelectedNft(nft);
    try {
      setloading(true);
      await fetchData({ url: `/api/v1/user/nft/purchase/send-otp-buy-nft/${uid}`, method: 'POST', data: { nftId: nft._id } });
      toast.success('OTP sent to your email');
      setStep('confirm');
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setloading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetchData({
        url: '/api/v1/user/nft/purchase/buy-nft',
        method: 'POST',
        data: { nftId: selectedNft._id, otp, txnpass: txnPass, userId },
      });
      if (res.success) {
        toast.success('Package purchased successfully!');
        navigate('/dashboard');
      } else {
        toast.error(res.message || 'Purchase failed');
      }
    } catch (err) {
      toast.error(err.message || 'Purchase failed');
    } finally {
      setloading(false);
    }
  };

  const reset = () => { setStep('packages'); setSelected(null); setNfts([]); setSelectedNft(null); setOtp(''); setTxnPass(''); setUserId(''); };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-cyan-400 h-6 w-6" /> Buy Package
            </h1>
            <p className="text-slate-400 text-sm mt-1">Select a package to start earning</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-center">
              <p className="text-slate-400 text-xs">Main Wallet</p>
              <p className="text-emerald-400 font-bold">${Number(balance.walletBalance || 0).toFixed(2)}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-center">
              <p className="text-slate-400 text-xs">Fund Wallet</p>
              <p className="text-blue-400 font-bold">${Number(balance.fundBalance || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={reset} className={`hover:text-white transition-colors ${step === 'packages' ? 'text-white font-semibold' : ''}`}>Packages</button>
          <span>/</span>
          <span className={step === 'nfts' || step === 'confirm' ? 'text-white font-semibold' : ''}>
            {selected ? `${selected.rank} ($${selected.price})` : 'NFTs'}
          </span>
          {step === 'confirm' && <><span>/</span><span className="text-white font-semibold">Confirm</span></>}
        </div>

        {/* Step 1 — Packages */}
        {step === 'packages' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.code}
                className={`relative rounded-2xl border ${pkg.border} bg-gradient-to-b ${pkg.color} p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-200 cursor-pointer`}
                onClick={() => handleSelectPackage(pkg)}
              >
                {pkg.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${pkg.badgeCls} text-xs font-bold px-3 py-1 rounded-full`}>
                    {pkg.badge}
                  </span>
                )}
                <div>
                  <p className="text-slate-400 text-sm font-medium">{pkg.rank}</p>
                  <p className={`text-4xl font-extrabold ${pkg.accent} mt-1`}>${pkg.price}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-2 w-full rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  Select <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 2 — NFTs */}
        {step === 'nfts' && (
          <div>
            {loadingNfts ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : nfts.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p>No NFTs available for this package.</p>
                <button onClick={reset} className="mt-4 text-cyan-400 hover:underline text-sm">← Back to Packages</button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {nfts.map((nft) => (
                  <div key={nft._id} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors">
                    <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover" />
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-white">{nft.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2">{nft.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400 font-bold text-lg">${nft.price}</span>
                        <button
                          onClick={() => handleSelectNft(nft)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:from-cyan-400 hover:to-blue-500 transition-all"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Confirm */}
        {step === 'confirm' && selectedNft && (
          <div className="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-white">Confirm Purchase</h2>
              <button onClick={reset} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <img src={selectedNft.image} alt={selectedNft.title} className="w-full h-40 object-cover rounded-xl" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{selectedNft.title}</span>
              <span className="text-cyan-400 font-bold">${selectedNft.price}</span>
            </div>
            <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-xs text-blue-300">
              <Wallet size={14} className="shrink-0" /> OTP sent to your registered email
            </div>
            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Your User ID</label>
                <input
                  type="text" value={userId} onChange={e => setUserId(e.target.value)} required
                  placeholder="Enter your User ID"
                  className="w-full bg-slate-800 border border-slate-600 text-white py-2.5 px-4 rounded-xl outline-none focus:border-cyan-500 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">OTP</label>
                <input
                  type="text" value={otp} onChange={e => setOtp(e.target.value)} required
                  placeholder="Enter OTP from email"
                  className="w-full bg-slate-800 border border-slate-600 text-white py-2.5 px-4 rounded-xl outline-none focus:border-cyan-500 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Transaction Password</label>
                <div className="relative">
                  <input
                    type={showTxn ? 'text' : 'password'} value={txnPass} onChange={e => setTxnPass(e.target.value)} required
                    placeholder="Transaction password"
                    className="w-full bg-slate-800 border border-slate-600 text-white py-2.5 px-4 pr-10 rounded-xl outline-none focus:border-cyan-500 text-sm"
                  />
                  <button type="button" onClick={() => setShowTxn(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    {showTxn ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all">
                Confirm Purchase
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
