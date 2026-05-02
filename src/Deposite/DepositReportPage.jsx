import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import Table from "../component/Table";
import Usernav from "../pages/dashboard/users/Usernav";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils";

function DepositReportPage() {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  // Fetch deposit history
  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const res = await fetchData({
          url: `/api/v1/user/payment/deposit-history/${userId}`,
        });
        setData(res.data || []);
      } catch (error) {
        console.error("Error fetching Deposit History:", error);
      }
    };

    if (userId) fetchDepositHistory();
  }, [userId]);

  const columns = [
 
    { key: "amount", title: "Amount" },
    { key: "currency", title: "Currency" },
    { key: "orderId", title: "Order ID" },
    {
      key: "status",
      title: "Status",
     
      
    },
    // { key: "txHash", title: "Transaction Hash", render: (item) => item.txHash || "N/A" },
    { key: "date", title: "Date", sortable: true },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen mt-[80px]">
      <Usernav />
      <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-6 text-[#ddf247]">Deposit History</h2>

        <Table
          columns={columns}
          data={data}
          pageSize={10}
          searchable={true}
          filterable={true}
          striped={true}
          hoverable={true}
        />

        {/* Link back to Deposit Page */}
        <Link
          to="/dashboard/funds/deposit"
          className="text-[#ddf247] hover:underline"
        >
          Go to Deposit Page
        </Link>
      </div>
    </div>
  );
}

export default DepositReportPage;
