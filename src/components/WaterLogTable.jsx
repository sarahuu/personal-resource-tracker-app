import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import axiosInstance from "../axiosInstance";
import { saveAs } from "file-saver";

const WaterLogTable = ({ refresh }) => {
    const [waterLogs, setWaterLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWaterLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/water-logs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWaterLogs(response.data.result);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch water logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchWaterLogs();
  }, [refresh]); // Refetch whenever 'refresh' changes

    const handleDeleteLog = async (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      try {
        // Call the delete API
        await axiosInstance.delete(`/water-logs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        // Update the UI after successful deletion
        setWaterLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
        alert("Log deleted successfully!");
      } catch (error) {
        console.error("Error deleting log:", error);
        alert("Failed to delete the log. Please try again.");
      }
    }


    
  };
  const handleExport = async () => {
    try {
      const response = await axiosInstance.get("water-logs/export-water-logs-excel", { responseType: "blob",headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});

      // Determine file name and type
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const fileName = "water-logs.xlsx";

      // Save the file using file-saver
      const blob = new Blob([response.data], { type: fileType });
      saveAs(blob, fileName);
    } catch (err) {
      console.error("Failed to export logs:", err);
      alert("An error occurred while exporting logs.");
    }  
}
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Water Logs</h2>
        <button
        className="bg-blue-800 text-white  text-sm px-2 py-1 rounded-md hover:bg-blue-600"
        onClick={() => handleExport()}>
            Download Excel Report
        </button>
        </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : waterLogs.length === 0 ? (
          <p className="text-center text-gray-400">No water logs found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {waterLogs.map((log) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {log.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteLog(log.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>  );
};

export default WaterLogTable;
