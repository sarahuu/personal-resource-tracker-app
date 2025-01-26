import { useState, useEffect } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import EnergyLogTable from "../components/EnergyLogTable";
import { Power } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const EnergyLogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    qty: "",
    unit: "kwh",
    date: new Date().toISOString().split("T")[0],
  });
  const [stats, setStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });

  const [logs, setLogs] = useState([]); // State for energy logs
  const { username: urlUsername } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get("/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (urlUsername !== response.data.username) {
          console.log("Usernames do not match. Redirecting to login.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const fetchStats = async () => {
        try {
        const response = await axiosInstance.get("/energy-logs/summary", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
      });

      // Update state with API data
      setStats({
        daily: response.data.today,
        weekly: response.data.this_week,
        monthly: response.data.this_month,
      });
        } catch (error) {
        console.error("Error fetching stats:", error);
        alert("Failed to load stats.");
        }
    };

    fetchStats();


    verifyToken();
    fetchLogs(); // Fetch logs when component mounts
  }, [navigate]);

  const fetchLogs = async () => {
    try {
      const response = await axiosInstance.get("/energy-logs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLogs(response.data.result); // Update logs state with API response
    } catch (error) {
      console.error("Error fetching energy logs:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "/energy-logs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsModalOpen(false);
      fetchLogs(); // Refresh logs after adding
      fetchStats(); // Refresh stats after adding
    } catch (error) {
      console.error("Error submitting energy log:", error);
      alert("There was an error submitting the energy log. Please try again.");
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Energy Logs" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Quantity Used Today (kwh)" icon={Power} value={stats.daily} color="#3B82F6" />
          <StatCard name="Quantity Used This Week (kwh)" icon={Power} value={stats.weekly} color="#6EE787" />
          <StatCard name="Quantity Used This Month (kwh)" icon={Power} value={stats.monthly} color="#10B981" />
        </motion.div>
        <button
          className="px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-5"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Log
        </button>

        {/* Energy Log Table */}
        <EnergyLogTable logs={logs} setLogs={setLogs} />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Energy Log</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-md font-medium text-gray-700">Quantity of Energy</label>
                  <input
                    min="0"
                    max="1000"
                    step="0.01"
                    type="number"
                    name="qty"
                    value={formData.qty}
                    onChange={handleInputChange}
                    className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-md font-medium text-gray-700">Unit</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="kwh">kwh</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-md font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-4 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnergyLogPage;
