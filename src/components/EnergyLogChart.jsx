import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const EnergyLogChart = () => {
  const [filter, setFilter] = useState("week"); 
  const [energyLogData, setEnergyLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const response = await axiosInstance.get(
        `/energy-logs/logs-by-${filter}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setEnergyLogData(response.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load energy logs. Please try again.");
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
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-100">
          Energy Logs {filter === "week" ? "for Current Week" : "for Current Year"}
        </h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="bg-gray-700 text-sm text-gray-100 border border-gray-600 p-1 rounded-md"
        >
          <option value="week">Current Week</option>
          <option value="month">Monthly</option>
        </select>
      </div>
      <div className="h-80">
        {loading ? (
          <p className="text-center text-gray-100">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={energyLogData}>
              <CartesianGrid strokeDasharray={"3 3"} stroke="#485563" />
              <XAxis dataKey={"name"} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#485563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Line
                type={"monotone"}
                dataKey={"qty"}
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default EnergyLogChart;
