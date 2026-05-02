import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils";
import { colors } from "../variables/colors";
import IncomeNav from "./IncomeNav"; // or Usernav if preferred
import Table from "../component/Table";

function RankRewadPage() {
  const [data, setData] = useState([]);
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchRoyaltyHistory = async () => {
      setloading(true);
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/rank-reward`,
        });
        setData(res.data?.rankRewardHistory || []);
      } catch (error) {
        console.error("Error fetching Royalty History:", error);
      } finally {
        setloading(false);
      }
    };

    if (userId) fetchRoyaltyHistory();
  }, [userId]);

  const columns = [
  
    {
      key: "business",
      title: "Business",
      sortable: true,
      filterable: true,
      render: (value) => <>${value}</>,
    },
  
    {
      key: "reward",
      title: "Reward",
      sortable: true,
      filterable: true,
      render: (value) => <span className="text-green-400 font-semibold">${value}</span>,
    },
    {
      key: "date",
      title: "Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <IncomeNav />

      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-4">
          Rank Reward History
        </h2>

        <Table
          columns={columns}
          data={data}
          pageSize={10}
          searchable={true}
          filterable={true}
          striped={true}
          hoverable={true}
          className="mt-6"
        />
      </div>
    </div>
  );
}

export default RankRewadPage;
