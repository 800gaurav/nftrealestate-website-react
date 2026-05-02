import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxios from '../../utils/useAxios';
import Usernav from '../dashboard/users/Usernav';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiShield } from 'react-icons/fi';

const ChangeTNXpassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { fetchData } = useAxios();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      toast.error('All fields are required!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetchData({
        url: `/api/v1/user/auth/change-txn-password`,
        method: 'POST',
        data: {
          newTxnPassword: newPassword,
          confirmNewTxnPassword: confirmNewPassword,
        },
      });

      if (res.success) {
        toast.success('✅ Transaction password changed successfully!');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <Usernav />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl flex items-center justify-center min-h-screen">
        <motion.div 
          className="w-full max-w-md border border-gray-200/50 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl bg-gray-700 dark:bg-gray-800/95 backdrop-blur-sm transition-colors duration-300 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              Change Transaction Password
            </h2>
            <p className="text-center text-gray-200 dark:text-gray-400 text-sm">
              Secure your transactions with a new password
            </p>
          </div>

          {/* Form Content */}
          <form className="space-y-5" onSubmit={handleChangePassword}>
            {/* New Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Transaction Password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {confirmNewPassword && (
              <div className="flex items-center text-sm">
                {newPassword === confirmNewPassword ? (
                  <>
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-500">Passwords match</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-red-500">Passwords don't match</span>
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FiShield size={20} className="mr-2" />
                  Update Transaction Password
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangeTNXpassword;