import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DollarSign, GlassWater, Power } from "lucide-react";
import axiosInstance from "../axiosInstance";
import Header from "../components/Header";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import WaterLogChart from "../components/WaterLogChart";
import WaterCategoryChart from "../components/WaterCategoryChart";
import EnergyLogChart from "../components/EnergyLogChart";

const DashboardPage = () => {
    const { username: urlUsername } = useParams();
    const [stats, setStats] = useState({
        total_water_used: 0,
        total_energy_used: 0,
    });
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
            } else {
            console.log("Token is valid and usernames match.");
            }
        } 

        catch (err) {
          console.error("Invalid token:", err);
          localStorage.removeItem("token");
          navigate("/login");
        }
      };
  
    const fetchStats = async () => {
        try {
        const response = await axiosInstance.get("/general/summary", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
      });

      setStats({
        total_water_used: response.data.total_water_used,
        total_energy_used: response.data.total_energy_used,
      });
        } catch (error) {
        console.error("Error fetching stats:", error);
        alert("Failed to load stats.");
        }
  };

    fetchStats();
    verifyToken();
    }, [navigate]);


    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Dashboard"/>
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
                {/* STATS */}
                <motion.div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1}}>
                    <StatCard name="Total Water Used (litres)" icon={GlassWater} value={stats.total_water_used.toFixed(2)} color='#3B82F6'/>
                    <StatCard name="Total Energy Used (kwh)" icon={Power} value={stats.total_energy_used.toFixed(2)} color='#6EE787'/>
                    <StatCard name="Total Water Cost" icon={DollarSign} value='Coming Soon...' color='#10B981'/>
                    <StatCard name="Total Energy Cost" icon={DollarSign} value='Coming Soon...' color='#10B981'/>
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