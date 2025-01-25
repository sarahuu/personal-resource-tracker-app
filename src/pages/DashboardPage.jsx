import Header from "../components/Header";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import { DollarSign, GlassWater, Power, PowerIcon, Zap } from "lucide-react";
import WaterLogChart from "../components/WaterLogChart";
import WaterCategoryChart from "../components/WaterCategoryChart";
import EnergyLogChart from "../components/EnergyLogChart";

const DashboardPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Dashboard"/>
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
                {/* STATS */}
                <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1}}>
                    <StatCard name="Total Water Used" icon={GlassWater} value='124' color='#3B82F6'/>
                    <StatCard name="Total Energy Consumed" icon={Power} value='997' color='#6EE787'/>
                    <StatCard name="Total Money Spent" icon={DollarSign} value='$1239' color='#10B981'/>

                </motion.div>
                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WaterLogChart/>
                    <WaterCategoryChart/>
                </div>
                <div className="grid grid-cols-1 mt-6">
                    <EnergyLogChart/>
                </div>

            </main>
        </div>
    )
};
export default DashboardPage;