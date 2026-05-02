import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import Table from "../component/Table";
import { formatCurrency } from "../utils";
import IncomeNav from "./IncomeNav";
import { colors } from "../variables/colors";
import Usernav from "../pages/dashboard/users/Usernav";

function DomesticIncomeusers() {
  const { level } = useParams();
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchUsers = async () => {
      setloading(true);
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/get-domestic-income-history/${userId}?level=${level}`,
        });
        const history = res?.history || [];
        const sel = history.find(h => h.level.toString() === level);
        setData(sel?.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setloading(false);
      }
    };

    if (userId) fetchUsers();
  }, [userId, level]);

  const columns = [

    {
      key: "fromUser",
      title: "User ID",
      sortable: true,
      filterable: true,
      render: (user) => <>{user.fromUser} ({user.username})</>,
    },
    {
      key: "income",
      title: "Bonus ($)",
      sortable: true,
      filterable: true,
      render: (amount) => <span className="text-green-400 font-semibold">{formatCurrency(amount)}</span>,
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
      <Usernav/>
      <IncomeNav />
      <div className="py-6">
        <h2 className="text-2xl text-center font-bold mb-6 text-white" style={{ color: colors.theme1 }}>
          Level {level} Users
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

export default DomesticIncomeusers;
