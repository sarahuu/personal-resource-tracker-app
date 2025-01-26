import { motion } from "framer-motion";
const StatCard = ({name, icon:Icon, value, color}) => {
    const isComingSoon = value === "Coming Soon...";
    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700" whileHover={{ y:-5, boxShadow:"0 25px 50px -12px rgba(0,0,0,0.5)"}}>
            <div className="px-4 py-4 sm:p-4">
                <span className="flex items-center text-xs font-medium mb-2 text-gray-400">
                    <Icon size={20} className="mr-2" style={{color}}/>
                    {name}
                </span>
                <p className={`${isComingSoon ? "mt-4 text-xs font-semibold  text-gray-500" : "mt-1 text-2xl font-semibold  text-gray-100"}`}>
                    {value}
                </p>
            </div>
        </motion.div>
    )
};
export default StatCard;