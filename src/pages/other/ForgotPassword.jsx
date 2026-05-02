import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxios from '../../utils/useAxios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiKey, FiUser, FiArrowLeft, FiLock, FiCheckCircle } from 'react-icons/fi';
import AuthWrapper from '../../component/wrapper/AuthWrapper';
import Button from '../../component/wrapper/Button';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email/userId, 2: OTP, 3: new password, 4: success

  const { fetchData } = useAxios();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email || !userId) {
      toast.error('All fields are required!');
      return;
    }
    try {
      setLoading(true);
      const res = await fetchData({
        url: '/api/v1/user/auth/forgot-password/send-otp',
        method: 'POST',
        data: { email, userId },
      });
      if (res.success) {
        toast.success('OTP sent successfully! Check your email.');
        setOtpSent(true);
        setStep(2);
        setLoading(false);
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error(error?.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    try {
      setLoading(true);
      // In a real app, you might verify the OTP first before proceeding
      // For this example, we'll just move to the next step
      setStep(3);
      setLoading(false);
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error(error?.message || 'Invalid OTP!');
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmNewPassword) {
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
        url: '/api/v1/user/auth/forgot-password/reset',
        method: 'POST',
        data: {
          email,
          otp,
          newPassword,
          confirmNewPassword,
        },
      });
      if (res.success) {
        toast.success('✅ Password reset successfully!');
        setStep(4);
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error?.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const getSubtitle = () => {
    switch (step) {
      case 1: return 'Enter your details to receive a verification code';
      case 2: return 'Check your email for the verification code';
      case 3: return 'Create your new password';
      case 4: return 'Password successfully reset!';
      default: return '';
    }
  };

  return (
    <>
      <AuthWrapper
        title="Password Recovery"
        subtitle={getSubtitle()}
        showBackButton={true}
        onBackClick={handleBackToLogin}
      >
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300 z-0"></div>
          <div
            className={`absolute top-3 left-0 h-1 z-10 transition-all duration-500 ${step === 1 ? 'w-1/4' : step === 2 ? 'w-2/4' : step >= 3 ? 'w-full' : 'w-0'
              }`}
            style={{ backgroundColor: '#0671FF' }}
          ></div>
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="relative z-20">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? 'text-white' : 'bg-gray-300 text-gray-400'
                }`}
                style={step >= stepNumber ? { backgroundColor: '#0671FF' } : {}}
              >
                {step > stepNumber ? <FiCheckCircle size={16} /> : stepNumber}
              </div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
                style={{ focusRingColor: '#0671FF' }}
                required
                disabled={loading}
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your User ID"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
                style={{ focusRingColor: '#0671FF' }}
                required
                disabled={loading}
              />
            </div>

            <Button
              disabled={loading}
              title={loading ? "Sending Verification Code" : "Send Verification Code"}
              type="submit"
            />
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div className="text-center mb-4">
              <p className="text-gray-500">We've sent a 6-digit code to your email</p>
              <p className="font-medium" style={{ color: '#0671FF' }}>{email}</p>
            </div>

            <div className="relative">
              <FiKey className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter verification code"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all text-center tracking-widest"
                style={{ focusRingColor: '#0671FF' }}
                required
                maxLength={6}
                disabled={loading}
              />
            </div>

            <Button
              disabled={loading}
              title={"Verify Code"}
              type="submit"
            />


            <div className="text-center">
              <button
                type="button"
                className="text-sm transition-colors"
                style={{ color: '#0671FF' }}
                onClick={handleSendOTP}
                disabled={loading}
              >
                Resend Code
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="relative">
              <FiKey className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Verification code"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
                style={{ focusRingColor: '#0671FF' }}
                required
                disabled={loading}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
                style={{ focusRingColor: '#0671FF' }}
                required
                disabled={loading}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
                style={{ focusRingColor: '#0671FF' }}
                required
                disabled={loading}
              />
            </div>
            <Button
              disabled={loading}
              title={"Reset Password"}
              type="submit"
            />
        
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#0671FF15' }}>
              <FiCheckCircle size={32} style={{ color: '#0671FF' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Password Reset Successful!</h3>
            <p className="text-gray-500 mb-6">Your password has been updated successfully.</p>

            <Button
              disabled={loading}
              title={" Back to Login"}
              type="button"
              onClick={handleBackToLogin}
            />
          </div>
        )}
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;