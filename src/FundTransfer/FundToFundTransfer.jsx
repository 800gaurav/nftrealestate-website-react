import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { colors } from '../variables/colors';
import Swal from 'sweetalert2';

function FundToFundTransfer() {
  const [touser, setTouser] = useState('');
  const [amount, setAmount] = useState('');
  const [Data, setData] = useState({});
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchbalancData = async () => {
      try {
        setloading(true);
        const res = await fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` });
        setData(res.data || {});
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    };
    fetchbalancData();
  }, []);

  const Fundtransfer = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
      confirmButtonText: "Yes, transfer it!",
    });
    if (result.isConfirmed) {
      try {
        setloading(true);
        const res = await fetchData({
          url: `/api/v1/user/payment/fund-to-fund`, method: 'POST',
          data: { fromUserId: userId, toUserId: touser, amount: Number(amount) },
        });
        if (res.success) {
          Swal.fire({ title: "Transferred!", text: "Funds have been transferred successfully.", icon: "success" });
          setAmount(''); setTouser('');
        }
        setloading(false);
      } catch (error) {
        toast.error(error.message);
        setloading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="bg-gray-900 text-white w-full max-w-lg p-8 shadow-lg border border-gray-800 rounded-2xl">
          <h2 className="text-center font-semibold text-lg" style={{ color: colors.theme1 }}>Fund To Fund</h2>
          <p className="text-center text-sm mt-1 text-white font-semibold">Main Balance: ${Number(Data?.walletBalance || 0).toFixed(2)}</p>
          <p className="text-center text-sm mt-1 text-white font-semibold">Fund Balance: ${Number(Data?.fundBalance || 0).toFixed(2)}</p>
          <form className="mt-6 space-y-4" onSubmit={Fundtransfer}>
            <input type="text" value={touser} onChange={(e) => setTouser(e.target.value)}
              placeholder="Recipient User ID"
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
              style={{ background: colors.theme1 }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FundToFundTransfer;
