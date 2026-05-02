import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usernav from '../pages/dashboard/users/Usernav';
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import IncomeNav from './IncomeNav';

function DomesticIncomePage() {
  const [levels, setLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const userId = JSON.parse(Cookies.get('USER') || '{}')?.userId;
  const { setloading } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      setloading(true);
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/get-domestic-income-history/${userId}`,
        });
        setLevels(res?.history || []);
      } catch (err) {
        console.error(err);
      } finally {
        setloading(false);
      }
    };

    if (userId) fetchHistory();
  }, [userId]);

  const filtered = levels.filter(l => l.level.toString().includes(searchTerm));
  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <IncomeNav /> 
      <div className="flex flex-col items-center px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          Level Income History
        </h2>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 w-full max-w-4xl">
          <div className="flex items-center gap-2">
            <label className="text-white font-medium">Show</label>
            <input
              type="number"
              value={entriesPerPage}
              onChange={e => { setEntriesPerPage(+e.target.value); setCurrentPage(1); }}
              className="w-20 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-white text-center"
            />
            <span className="text-white">entries</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-white font-medium">Search Level:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Enter level"
              className="flex-1 px-3 py-1 rounded border border-gray-600 bg-gray-800 text-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full max-w-4xl rounded-lg border border-gray-700 bg-gray-900">
          <table className="min-w-full text-center text-white text-sm">
            <thead className="bg-gray-800 text-[#e4ff35]">
              <tr>
                <th className="p-3">Level</th>
                <th className="p-3">Total Income ($)</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? paginated.map(row => (
                <tr key={row.level} className="hover:bg-gray-700 transition-colors">
                  <td className="p-3 font-medium">{row.level}</td>
                  <td className="p-3 font-semibold text-green-400">${row.totalIncome.toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/dashboard/domestic-level-view/${row.level}`)}
                      className="bg-lime-400 text-black font-bold px-5 py-1 rounded hover:bg-lime-300 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-400">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 text-white text-sm">
          <p>
            Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filtered.length)} of {filtered.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded border border-gray-600 hover:bg-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1 rounded border border-gray-600 hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DomesticIncomePage;
