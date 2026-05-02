import React, { useEffect, useState } from 'react';
import Usernav from '../pages/dashboard/users/Usernav';
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FundNav from './FundNav';
import { colors } from '../variables/colors';
import Swal from 'sweetalert2';

function FundToFundTransfer() {

  const [buyotp, setBuyOtp] = useState('');
  const [Data, setData] = useState({});
  // const [userdata, setuserData] = useState('')
  const [touser, settouser] = useState('')
  const [amount, setAmount] = useState('')



  const { fetchData } = useAxios();
 const { setloading} = useAuth();
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


// useEffect(()=>{
//    if (!touser.trim()) {
//       setData(null);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setuserData('')
//              const res = await fetchData({
//         url: `/api/v1/user/auth/get-user-profile/${touser}`,
//       });
//       if(res.success){
// setuserData(res?.user?.name)
//       }
//       } catch (error) {
//         console.log(error)
//       }
//     }, 500);
// return () => clearTimeout(timer)
// },[touser])


  const Fundtransfer = async (e) => {
    e.preventDefault();
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, transfer it!",
  });
    if (result.isConfirmed) {
    try {
   setloading(true)
      const res = await fetchData({
        url: `/api/v1/user/payment/fund-to-fund`,
        method: 'POST',
        data: {fromUserId: userId, toUserId:touser, amount:Number(amount) },
      });
      
     
    if(res.success){
       Swal.fire({
          title: "Transferred!",
          text: "Funds have been transferred successfully.",
          icon: "success",
        });
        setAmount('')
      settouser('')
      setloading(false)
    }
     
    } catch (error) {
      console.error(error);
      toast.error(error.message)
      setloading(false)
    }
    }

  };


  return (
          <div className='mt-[80px] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
    <FundNav />
   
  <div className="mt-15 flex items-center justify-center z-50 px-2">
    <div className=" bg-gray-900 text-white w-full max-w-2xl p-8 shadow-lg border border-gray-800 rounded-lg relative">
  
      <h2 className="text-center font-semibold text-lg"
      style={{ color: colors.theme1 }}
      >Fund To Fund</h2>
      <p className="text-center text-sm mt-1">
        <span className="text-white font-semibold">Main BALANCE : $ {Number(Data?.walletBalance).toFixed(2)}</span>
        
      </p>
      <p className="text-center text-sm mt-1">
        <span className="text-white font-semibold">Fund BALANCE : $ {Number(Data?.fundBalance).toFixed(2)}</span>
        
      </p>
    

      <form className="mt-6 space-y-4" onSubmit={Fundtransfer}>
         <input
          type="text"
          value={touser}
          onChange={(e) => settouser(e.target.value)}
          placeholder="userId"
          className="w-full bg-[#e8f0fe] text-black py-2 px-4 rounded outline-none"
        />
         {/* <input
          type="text"
          value={userdata}
          readOnly
          placeholder="username"
          className="w-full bg-[#e8f0fe] text-black py-2 px-4 rounded outline-none"
        /> */}
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full bg-[#e8f0fe] text-black py-2 px-4 rounded outline-none"
        />
     
        <button
          type="submit"
          className="w-full  text-black font-bold py-2 rounded hover:bg-lime-300 transition"
          style={{ background: colors.theme1 }}
        >
          Submit
        </button>
      </form>
    </div>
  </div>


   </div>
  )
}

export default FundToFundTransfer
