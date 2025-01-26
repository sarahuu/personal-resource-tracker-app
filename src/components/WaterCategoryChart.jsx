import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const COLORS = ["#6366F1", "#885CF6", "#EC4899", "#108981", "#F59E00"];

const WaterCategoryChart = () => {
  const [filter, setFilter] = useState("week");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/water-logs/logs-by-${filter}?pie=True`
        , {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,}}
      );
      setCategoryData(response.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load water usage data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-100">Water Usage Based on Current {filter === "week" ? "Week" : "Month"}</h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="bg-gray-700 text-gray-100 border border-gray-600 p-1 text-sm rounded-md"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div className="h-80">
        {loading ? (
          <p className="text-center text-gray-100">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
              <Pie
                fontSize={14}
                data={categoryData}
                dataKey="total_qty"
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4b5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default WaterCategoryChart;
