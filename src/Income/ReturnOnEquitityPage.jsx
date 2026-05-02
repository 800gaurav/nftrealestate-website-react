import Table from "../component/Table";

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import useAxios from '../utils/useAxios';
import { useAuth } from '../context/AuthContext';
import { colors } from "../variables/colors";
import { formatCurrency } from "../utils";
import IncomeNav from "./IncomeNav";





function ReturnOnEquitityPage() {
  const [data, setData] = useState([]);
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchRoiHistory = async () => {
      setloading(true)
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/roi-income-history`,
        });
        setData(res.data || []);
        setloading(false)
      } catch (error) {
        console.error('Error fetching Withdraw History:', error);
        setloading(false)
      }
    };

    if (userId) fetchRoiHistory();
  }, [userId]);


  const columns = [

    // {
    //   key: 'userId',
    //   title: 'Name',
    //   sortable: true,
    //   filterable: true,
    //   render: () => <>{userId}</>
    // },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      filterable: true,
      render: (amount) => <> {formatCurrency(amount)}</>
    },

    {
      key: 'date',
      title: 'Join Date',
      sortable: true,
      render: (value) =>  new Date(value).toLocaleString()
     
    }
  ];
  return (
    <div className=' mt-[80px] min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
<IncomeNav/>

      <div className=" min-h-screen ">

        <div className="p-4 md:p-6">
          <h2 className={`text-xl md:text-2xl font-bold text-center text-white mb-4 `}>
            ROI History
          </h2>

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
    </div>
  )
}

export default ReturnOnEquitityPage


