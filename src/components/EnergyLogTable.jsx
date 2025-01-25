import { motion } from "framer-motion";
import { Edit,Search,Trash2 } from "lucide-react";
import { useState } from "react";

const ENERGYLOGTABLE = [
    {id:1, date:"2025-01-23", qty:7, unit:"kwh"},
    {id:2, date:"2025-01-23", qty:7, unit:"kwh"},
    {id:3, date:"2025-01-23", qty:7, unit:"kwh"},
    {id:4, date:"2025-01-23", qty:7, unit:"kwh"},
    {id:5, date:"2025-01-23", qty:7, unit:"kwh"},

]
const EnergyLogTable = () => {
    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Energy Logs</h2>
                {/* <div className="relative">
                    <input type="text" placeholder="Search Logs..." className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                </div> */}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Unit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {ENERGYLOGTABLE.map((log) => (
                            <motion.tr key={log.id} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                    {log.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {log.qty}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {log.unit}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {/* <button className="text-indigo-400 hover:text-indigo-300 mr-1">
                                        <Edit size={18}/>
                                    </button> */}
                                    <button className="text-red-400 hover:text-red-300">
                                        <Trash2 size={18}/>
                                    </button>
                                </td>

                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
};
export default EnergyLogTable;