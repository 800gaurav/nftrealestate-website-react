import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import Table from "../component/Table";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils";

function DepositReportPage() {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const res = await fetchData({ url: `/api/v1/user/payment/deposit-history/${userId}` });
        setData(res.data || []);
      } catch (error) {
        console.error("Error fetching Deposit History:", error);
      }
    };
    if (userId) fetchDepositHistory();
  }, [userId]);

  const columns = [
    { key: "amount", title: "Amount" },
    { key: "packageTitle", title: "Package" },
    { key: "stakingAmount", title: "Staking 40%" },
    { key: "currency", title: "Currency" },
    { key: "orderId", title: "Order ID" },
    { key: "status", title: "Status" },
    { key: "date", title: "Date", sortable: true },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-6 text-[#ddf247]">Deposit History</h2>
        <Table columns={columns} data={data} pageSize={10} searchable filterable striped hoverable />
        <Link to="/dashboard/funds/deposit" className="text-[#ddf247] hover:underline">
          Go to Deposit Page
        </Link>
      </div>
    </div>
  );
}

export default DepositReportPage;
