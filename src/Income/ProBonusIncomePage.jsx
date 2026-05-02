import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import Table from "../component/Table";
import { formatCurrency } from "../utils";
import { colors } from "../variables/colors";
import Tabs from "../component/Tab";
import IncomeNav from "./IncomeNav";

function ProBonusIncomePage() {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;
  const { setloading } = useAuth();

  useEffect(() => {
    const fetchProBonus = async () => {
      setloading(true);
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/pro-bonus-history/${userId}`,
        });
        setData(res.data || []);
      } catch (error) {
        console.error("Error fetching Pro Bonus History:", error);
      } finally {
        setloading(false);
      }
    };

    fetchProBonus();
  }, [userId]);

  const columns = [
    {
      key: "fromUser",
      title: "UserId",
      sortable: true,
      filterable: true,
      render: () => <>{userId}</>,
    },
    {
      key: "baseAmount",
      title: "Base Amount",
      sortable: true,
      filterable: true,
      render: (amount) => <> {formatCurrency(amount)}</>,
    },
    {
      key: "amount",
      title: "Referral Income",
      sortable: true,
      filterable: true,
      render: (amount) => <> {formatCurrency(amount)}</>,
    },
    {
      key: "date",
      title: "Join Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

 

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <IncomeNav/>
      <div className="p-6">
        <h2
          className="text-2xl text-center font-bold mb-6 text-white"
          style={{ color: colors.theme1 }}
        >
        Referral History 
        </h2>

        {/* 🔹 Data Table */}
        <Table
          columns={columns}
          data={data}
          pageSize={5}
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

export default ProBonusIncomePage;
