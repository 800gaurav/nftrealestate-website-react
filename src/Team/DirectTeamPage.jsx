import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import Table from "../component/Table";
import { colors } from "../variables/colors";

function DirectTeamPage() {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;
  const { setloading } = useAuth();

  useEffect(() => {
    const fetchDirectReferrals = async () => {
      try {
        setloading(true);
        const res = await fetchData({ url: `/api/v1/user/profile/user-direct-refrals/${userId}` });
        setData(res.data || []);
        setloading(false);
      } catch (error) {
        console.error("Error fetching direct referrals:", error);
        setloading(false);
      }
    };
    fetchDirectReferrals();
  }, []);

  const columns = [
    { key: 'userId', title: 'User ID', sortable: true, filterable: true },
    { key: 'name', title: 'Name', sortable: true, filterable: true },
    { key: 'phone', title: 'Phone', sortable: true, filterable: true },
    {
      key: 'isActivated', title: 'Status', sortable: true,
      render: (isActivated) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActivated ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isActivated ? 'Activated' : 'Not Activated'}
        </span>
      ),
    },
    { key: 'createdAt', title: 'Join Date', sortable: true, render: (value) => new Date(value).toLocaleString() },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="p-6 min-h-screen">
        <h2 className="text-center text-2xl font-bold mb-6 uppercase" style={{ color: colors.theme1 }}>
          My Direct Referrals
        </h2>
        <Table columns={columns} data={data} pageSize={5} searchable filterable striped hoverable className="mt-6" />
      </div>
    </div>
  );
}

export default DirectTeamPage;
