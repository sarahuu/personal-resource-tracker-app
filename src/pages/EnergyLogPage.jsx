import { useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import EnergyLogTable from "../components/EnergyLogTable";
import { Power } from "lucide-react";
import { motion } from "framer-motion";

const EnergyLogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    quantity: "",
    unit: "kwh",
    date: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Energy Logs" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        {/* STATS */}
        <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1}}>
            <StatCard name="Quantity Used Today" icon={Power} value='124' color='#3B82F6'/>
            <StatCard name="Quantity Used This Week" icon={Power} value='997' color='#6EE787'/>
            <StatCard name="Quantity Used This Month" icon={Power} value='$1239' color='#10B981'/>

        </motion.div>
        <button
          className="px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-5"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Log
        </button>

        {/* Water Log Table*/}
        <EnergyLogTable/>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Energy Log</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity of Energy
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
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
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600"
                  >
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
