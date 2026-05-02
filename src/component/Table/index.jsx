import React, { useState, useEffect } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiSearch,
  FiFilter,
  FiX,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import { colors } from '../../variables/colors';

const Table = ({
  columns,
  data,
  pageSize: initialPageSize = 10,
  searchable = false,
  filterable = false,
  striped = true,
  hoverable = true,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  const totalPages = Math.ceil(data.length / pageSize);

  // Filter + Sort
  const processedData = data
    .filter(item => {
      if (searchTerm) {
        return columns.some(col => {
          const val = item[col.key];
          return val && val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      return true;
    })
    .filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key] && item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const currentData = processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = page => page >= 1 && page <= totalPages && setCurrentPage(page);
  const handleSort = key => setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
  }));

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  useEffect(() => setCurrentPage(1), [searchTerm, filters, pageSize]);

  return (
    <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden ${className}`}>
      {/* Search & Filter */}
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-gray-800">
          {searchable && (
            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {/* {filterable && (
            <button
              onClick={() => setShowFilterSidebar(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
            >
              <FiFilter /> Filters
            </button>
          )} */}
        </div>
      )}

      {/* Filter Sidebar */}
      {showFilterSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black bg-opacity-30" onClick={() => setShowFilterSidebar(false)}></div>
          <div className="w-80 bg-gray-100 p-4 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ color: colors.theme1 }}>Filters</h2>
              <button onClick={() => setShowFilterSidebar(false)}><FiX size={20} /></button>
            </div>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
              {columns.filter(c => c.filterable).map(col => (
                <div key={col.key} className="relative">
                  <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Filter ${col.title}...`}
                    value={filters[col.key] || ''}
                    onChange={e => handleFilterChange(col.key, e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={clearAllFilters} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Clear All</button>
              <button onClick={() => setShowFilterSidebar(false)} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: colors.theme1 }}>Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-6 py-3 text-left cursor-pointer ${col.sortable ? 'hover:text-blue-400' : ''}`}
                  style={{ color: colors.theme1 }}
                >
                  <div className="flex items-center gap-1">
                    {col.title}
                    {col.sortable && sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' ?
                        <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? currentData.map((row, idx) => (
              <tr
                key={idx}
                className={`${striped && idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} ${hoverable ? 'hover:bg-gray-700' : ''}`}
              >
                <td className="px-6 py-4 text-white font-medium">{(currentPage - 1) * pageSize + idx + 1}</td>
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 text-white">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-400">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-6 py-4 bg-gray-900 text-white mt-2 rounded-b-xl">
          <div>
            Showing <span className="font-bold" style={{ color: colors.theme1 }}>{(currentPage-1)*pageSize +1}</span> to <span className="font-bold" style={{ color: colors.theme1 }}>{Math.min(currentPage*pageSize, processedData.length)}</span> of <span className="font-bold" style={{ color: colors.theme1 }}>{processedData.length}</span> results
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => goToPage(1)} disabled={currentPage===1} className="p-2 rounded-md border" style={{ borderColor: colors.theme1 }}><FiChevronsLeft /></button>
            <button onClick={() => goToPage(currentPage-1)} disabled={currentPage===1} className="p-2 rounded-md border" style={{ borderColor: colors.theme1 }}><FiChevronLeft /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if(totalPages <= 5) pageNum = i+1;
              else if(currentPage <=3) pageNum = i+1;
              else if(currentPage >= totalPages-2) pageNum = totalPages-4+i;
              else pageNum = currentPage-2+i;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-10 h-10 rounded-md border font-bold ${currentPage===pageNum ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
                  style={{ borderColor: colors.theme1 }}
                >{pageNum}</button>
              )
            })}
            <button onClick={() => goToPage(currentPage+1)} disabled={currentPage===totalPages} className="p-2 rounded-md border" style={{ borderColor: colors.theme1 }}><FiChevronRight /></button>
            <button onClick={() => goToPage(totalPages)} disabled={currentPage===totalPages} className="p-2 rounded-md border" style={{ borderColor: colors.theme1 }}><FiChevronsRight /></button>
          </div>
          <div>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="p-2 rounded-md text-black font-medium">
              {[5,10,20,50,100].map(size => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
