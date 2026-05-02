import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CryptoDistributionChart = ({ distributionData }) => {
  // Define a color palette for the different cryptocurrencies
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#48DBFB', '#FF9FF3'];
  
  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="label font-semibold">{`${data.name}`}</p>
          <p className="intro">{`Amount: $${data.amount.toFixed(2)}`}</p>
          <p className="desc">{`Percentage: ${data.percent}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend formatter
  const renderLegend = (value, entry) => {
    const { color } = entry;
    const data = distributionData.find(item => item.name === value);
    return (
      <span style={{ color }} className="text-sm">
        {value} ({data.percent}%)
      </span>
    );
  };

  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-center mb-4">Cryptocurrency Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="percent"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${percent}%`}
            labelLine={false}
          >
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            formatter={renderLegend}
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoDistributionChart