import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCheckCircle } from 'react-icons/fi';
import useAxios from '../../utils/useAxios';
import Usernav from '../dashboard/users/Usernav';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import AuthWrapper from '../../component/wrapper/AuthWrapper';
import Button from '../../component/wrapper/Button';
import { showErrorToast, showSuccessToast } from '../../component/toaster';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const [profile, setProfile] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    txnpass: "", 
    withdrawTRC_ADDRESS: "", 
    withdrawBEP_ADDRESS: "" 
  });
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetchData({ 
          url: '/api/v1/user/auth/get-profile', 
          method: "GET" 
        });
        setProfile({ 
          name: res.data.name || "", 
          email: res.data.email || "", 
          phone: res.data.phone || "", 
          txnpass: "", 
          withdrawTRC_ADDRESS: res.data.withdrawTRC_ADDRESS || "", 
          withdrawBEP_ADDRESS: res.data.withdrawBEP_ADDRESS || "" 
        });
        setLoading(false);
      } catch (err) {
        showErrorToast("Failed to load profile.");
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, txnpass, withdrawTRC_ADDRESS, withdrawBEP_ADDRESS } = profile;
    
    if (!name || !email || !phone) {
      showErrorToast("Please fill in all required fields!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetchData({ 
        url: '/api/v1/user/auth/update-profile', 
        method: "POST", 
        data: profile 
      });
      
      if (res) {
        showSuccessToast("✅ Profile updated successfully!");
        navigate('/')
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      showErrorToast(err?.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <>
      <AuthWrapper 
        showHeadicon={true}
        title={'Update Profile'} 
        subtitle={'Keep your account information up to date'}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
              placeholder="Full Name" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="email" 
              name="email" 
              value={profile.email} 
              onChange={handleChange} 
              placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              name="phone" 
              value={profile.phone} 
              onChange={handleChange} 
              placeholder="Mobile Number" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
            />
          </div>

          {/* TRC20 Address */}
          <div className="relative">
            <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              name="withdrawTRC_ADDRESS" 
              value={profile.withdrawTRC_ADDRESS === "0" ? "" : profile.withdrawTRC_ADDRESS} 
              onChange={handleChange} 
              placeholder="Enter USDT.TRC20 Address" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
            />
          </div>

          {/* BEP20 Address */}
          <div className="relative">
            <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              name="withdrawBEP_ADDRESS" 
              value={profile.withdrawBEP_ADDRESS === "0" ? "" : profile.withdrawBEP_ADDRESS} 
              onChange={handleChange} 
              placeholder="Withdrawal USDT.BEP20 Address" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
            />
          </div>

          {/* Transaction Password */}
          {/* <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="password" 
              name="txnpass" 
              value={profile.txnpass} 
              onChange={handleChange} 
              placeholder="Transaction Password (leave blank to keep current)" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
            />
          </div> */}

          {/* Required Fields Indicator */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiCheckCircle size={14} className="mr-1" />
            <span>Fields marked with * are required</span>
          </div>

          {/* Submit Button */}
          <Button 
            type='submit' 
            disabled={loading} 
            title={'Update Profile'} 
            loading={loading} 
          />
        </form>
      </AuthWrapper>
    </>
  );
};

export default UpdateProfile;