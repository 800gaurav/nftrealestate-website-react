import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import useAxios from '../utils/useAxios';
import Usernav from '../pages/dashboard/users/Usernav';
import { useAuth } from '../context/AuthContext';
import WithdrawNav from './WithdrawNav';

function WithdrawPage() {
  
  const [buyotp, setBuyOtp] = useState('');
  const [Data, setData] = useState({});
const [withdrawMethod, setWithdrawMethod] = useState('');
  const [amount, setAmount] = useState('')
 const { setloading} = useAuth();
  const { fetchData } = useAxios();

  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;
const [loadingNftId, setLoadingNftId] = useState(null);
  const fetchbalancData = async () => {
    try {
      setloading(true)
      const res = await fetchData({
        url: `/api/v1/user/profile/user-dashboard/${userId}`,
      });
      setData(res.data || {});
      setloading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setloading(false)
    }
  };
  useEffect(()=>{
    fetchbalancData()
  },[])
  const confirmBuyNft = async (e) => {
    e.preventDefault();
    try {
   setloading(true)
      const res = await fetchData({
        url: `/api/v1/user/payment/withdraw-request`,
        method: 'POST',
        data: {userId: userId, coin:withdrawMethod, amount:amount },
      });
      toast.success('Created withdraw request');
      setloading(false)
    if(res.success){
        setAmount('')
      setWithdrawMethod('')
      setloading(false)
    }
     
    } catch (error) {
      console.error(error);
      toast.error(error.message)
       setloading(false)
    }
  };
  return (
        <div className='mt-[80px] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
<WithdrawNav/>
  <div className=" mt-15 flex items-center justify-center z-50 px-2">
    <div className="bg-gray-900 text-white w-full max-w-2xl p-8 shadow-lg border border-gray-800 rounded-lg relative">

    

      <h2 className="text-center text-[#d7fc36] font-semibold text-lg">Withdraw Balance</h2>
      <p className="text-center text-sm mt-1">
        <span className="text-white font-semibold">Fund BALANCE : $ {Number(Data?.fundBalance).toFixed(2)}</span> <br/>
        <span className="text-white font-semibold">Main BALANCE : $ {Number(Data?.walletBalance).toFixed(2)}</span>
        
      </p>
     <p className="text-red-500 text-center text-sm mb-4">Minimum withdraw amount : 10$</p>
    

      <form className="mt-6 space-y-4" onSubmit={confirmBuyNft}>
   
        <select
  value={withdrawMethod}
  onChange={(e) => setWithdrawMethod(e.target.value)}
  className="w-full bg-[#e8f0fe] text-black py-2 px-4 rounded outline-none"
>
 <option value="">Select Method</option>
  <option value="USDT.TRC20">USDT.TRC20</option>
  <option value="USDT.BEP20">USDT.BEP20</option>
</select>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full bg-[#e8f0fe] text-black py-2 px-4 rounded outline-none"
        />
       
      
        <button
          type="submit"
          className="w-full bg-[#e4ff35] text-black font-bold py-2 rounded hover:bg-lime-300 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>


   </div>
  )
}

export default WithdrawPage
