import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useAxios from '../utils/useAxios';
import { useAuth } from '../context/AuthContext';

function WithdrawHistoryPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchWithdrawHistory = async () => {
      setloading(true);
      try {
        const res = await fetchData({ url: `/api/v1/user/payment/withdraw-history?userId=${userId}` });
        setData(res.data || []);
        setloading(false);
      } catch (error) {
        console.error('Error fetching Withdraw History:', error);
        setloading(false);
      }
    };
    if (userId) fetchWithdrawHistory();
  }, [userId]);

  const filteredData = data.filter((item) =>
    `${item.amount}${item.coin}${item.toAddress}${item.status}${item.txnId}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-[#0671FF] mb-4">Withdraw History</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <label>Show</label>
            <input type="number" value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="w-16 px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white" />
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="whitespace-nowrap">Search:</label>
            <input type="text" placeholder="Search coin/status/txn" value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full sm:w-auto flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white" />
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-700 rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-900 text-[#0671FF] whitespace-nowrap">
              <tr>
                <th className="px-4 py-2 border-b border-gray-700 text-left">#</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">Amount</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">Address</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">Service Charge</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">Payable</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">Status</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? paginatedData.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-800 border-b border-gray-800">
                  <td className="px-4 py-2">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td className="px-4 py-2 text-yellow-300">${item.amount}</td>
                  <td className="px-4 py-2 break-all text-sm">{item.toAddress}</td>
                  <td className="px-4 py-2 text-red-400">${item.serviceCharge?.toFixed(2)}</td>
                  <td className="px-4 py-2 text-green-400">${item.payableAmount?.toFixed(2)}</td>
                  <td className="px-4 py-2 capitalize text-blue-400">{item.status}</td>
                  <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="text-center py-4 text-gray-400">No withdraw records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-sm">
          <p>Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700 disabled:opacity-50">Prev</button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawHistoryPage;
