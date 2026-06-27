import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  Coins, 
  PieChart, 
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  Copy
} from 'lucide-react';
import useAxios from '../../utils/useAxios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import apiRoutes from '../../variables/apiRoutes';


const SingleInvestment = () => {
  const { fetchData, data, loading, error } = useAxios();
  const { planId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const planid = queryParams.get('planid');
  
  const [copiedField, setCopiedField] = useState(null);
  const [investedData, setInvestedData] = useState(null);

  // Early return if no planId
  if (!planId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Plan ID</h2>
          <p className="text-gray-600 mb-4">The investment plan you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/dashboard/investment')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Investments
          </button>
        </div>
      </div>
    );
  }

  const getPlanData = async () => {
    try {
      const res = await fetchData({ url: apiRoutes.singlePlan(planId) });
      if(res.success){
        setInvestedData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPlanData();
  }, [planId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'PENDING': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'REJECTED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-green-500 border-b-blue-500 border-l-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Plan</h2>
          <p className="text-gray-600 mb-4">There was a problem loading the investment details.</p>
          <button 
            onClick={getPlanData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
          >
            Try Again
          </button>
          <button 
            onClick={() => navigate('/dashboard/investment')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Investments
          </button>
        </div>
      </div>
    );
  }

  if (!investedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Plan Not Found</h2>
          <p className="text-gray-600 mb-4">The investment plan you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/dashboard/investment')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Investments
          </button>
        </div>
      </div>
    );
  }

  const { id, status, transactionId, plan, coins, todayIncome, roiIncome, createdAt } = investedData;
  const gain = plan ? plan.netAmount - plan.baseAmount : 0;
  const gainPercentage = plan ? (gain / plan.baseAmount) * 100 : 0;
console.log(coins)
  // Extract distribution data from coins 
  console.log(coins)
  const distribution = coins && coins.length > 0 ? coins.find((x)=>x.planId==planid).distribution : [];
  console.log(distribution)
  
 


  return (
    <div className="mt-[100px] min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with back button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-6"
        >
          <button 
            onClick={() => navigate('/dashboard/investment')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </button>
          <div className="h-6 w-px bg-gray-300 mr-4"></div>
          <h1 className="text-2xl font-bold text-gray-900">Investment Details</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* Status card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Investment Status</h2>
                <div className={`flex items-center px-3 py-1 rounded-full ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                  <span className="ml-2 font-medium">{status}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Investment ID</p>
                  <div className="flex items-center">
                    <p className="font-mono text-gray-800 truncate">{id}</p>
                    <button 
                      onClick={() => copyToClipboard(id, 'investmentId')}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copiedField === 'investmentId' && (
                    <p className="text-green-500 text-xs mt-1">Copied to clipboard!</p>
                  )}
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm mb-1">Transaction ID</p>
                  <div className="flex items-center">
                    <p className="font-mono text-gray-800 truncate">{transactionId}</p>
                    <button 
                      onClick={() => copyToClipboard(transactionId, 'transactionId')}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copiedField === 'transactionId' && (
                    <p className="text-green-500 text-xs mt-1">Copied to clipboard!</p>
                  )}
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm mb-1">Investment Date</p>
                  <p className="text-gray-800 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(createdAt)}
                  </p>
                </div>
                
                {/* Display the planid from query params if available */}
                {planid && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Plan ID (from URL)</p>
                    <div className="flex items-center">
                      <p className="font-mono text-gray-800 truncate">{planid}</p>
                      <button 
                        onClick={() => copyToClipboard(planid, 'planid')}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    {copiedField === 'planid' && (
                      <p className="text-green-500 text-xs mt-1">Copied to clipboard!</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Financial summary card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Financial Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Plan Amount</h3>
                    <DollarSign className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(plan.baseAmount)}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Amount With GST</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(plan.netAmount)}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Daily Income</h3>
                    <Coins className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(todayIncome || plan.dailyIncome)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Estimated daily earnings</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Staking Income</h3>
                    <BarChart3 className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(roiIncome || plan.dailyIncome)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Service package staking income</p>
                </div>
              </div>
            </motion.div>

            {/* Coin allocation chart */}
            {distribution?.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
             
              </motion.div>
            )}
          </div>

          {/* Right column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Projected Earnings</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Monthly Income</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(plan.monthlyIncome)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Annual Income</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(plan.annualIncome)}</p>
                </div>
                {/* <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Total Gain</p>
                    <p className="font-semibold text-green-600">{formatCurrency(gain)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Gain Percentage</p>
                    <p className="font-semibold text-green-600">{gainPercentage.toFixed(2)}%</p>
                  </div>
                </div> */}
              </div>
            </motion.div>

            {/* Coin distribution summary */}
            {distribution.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Coin Distribution</h2>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {distribution.map((coin, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-800">{coin.name}</p>
                        <p className="text-sm text-gray-500">{coin.percent}% allocation</p>
                      </div>
                      <p className="font-semibold text-gray-800">{formatCurrency(coin.amount)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleInvestment;
