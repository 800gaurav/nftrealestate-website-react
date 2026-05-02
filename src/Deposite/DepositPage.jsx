import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useAuth } from '../context/AuthContext';

function DepositPage() {
  const { setloading } = useAuth();
  const [amount, setAmount] = useState('');
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  const depositAmount = async (e) => {
    e.preventDefault();
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setloading(true);
      const res = await fetchData({
        url: '/api/v1/user/oxapay/payment/initiate',
        method: 'POST',
        data: { amount: amount },
      });

      if (res.success) {
        window.open(res.data.data.payment_url, "_blank");
        setAmount('');
        toast.success('Payment initiated successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to initiate payment');
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='mt-[80px] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Deposit</h1>
          <Link 
            to="/dashboard/funds/deposit-report" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            View Deposit History
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deposit Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Deposit Funds</h2>
                <p className="text-gray-400">Add money to your wallet securely</p>
              </div>
            </div>

            <form onSubmit={depositAmount} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount to Deposit
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-700 text-white py-4 pl-8 pr-4 rounded-xl border border-gray-600 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-20 transition-all duration-300"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!amount || amount <= 0}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-green-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Proceed to Payment
              </button>
            </form>

            {/* Quick Amount Buttons */}
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-3">Quick Amounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 200, 500].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    ${quickAmount}
                  </button>
                ))}
              </div>
            </div>
          </div>

     
        </div>
      </div>
    </div>
  );
}

export default DepositPage;