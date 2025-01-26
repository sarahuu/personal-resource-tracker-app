import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Header from "../components/Header";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import { DollarSign, GlassWater, Power, PowerIcon, Zap } from "lucide-react";
import WaterLogChart from "../components/WaterLogChart";
import WaterCategoryChart from "../components/WaterCategoryChart";
import EnergyLogChart from "../components/EnergyLogChart";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DashboardPage = () => {
    const { username: urlUsername } = useParams();
    const [stats, setStats] = useState({
        total_water_used: 0,
        total_energy_used: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");  // Check for the token
      if (!token) {
        navigate("/login");  // If no token, redirect to login page
        return;
      }
  
      // Optionally, you can also verify the token with the backend here
      // Example: Check if the token is valid
      const verifyToken = async () => {
        try {
            const response = await axiosInstance.get("/auth/verify-token", {
                headers: {
                    Authorization: `Bearer ${token}`,  // Send token in Authorization header
                },
        });

          // Compare username from the URL with the username from the token
            if (urlUsername !== response.data.username) {
            console.log("Usernames do not match. Redirecting to login.");
            localStorage.removeItem("token");  // Remove invalid token
            navigate("/login");  // Redirect if the usernames don't match
            } else {
            console.log("Token is valid and usernames match.");
            }
        } 

        catch (err) {
          console.error("Invalid token:", err);
          localStorage.removeItem("token");  // Remove invalid token
          navigate("/login");  // Redirect to login page if token is invalid
        }
      };
  
    const fetchStats = async () => {
        try {
        const response = await axiosInstance.get("/general/summary", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
      });

      // Update state with API data
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
                    <StatCard name="Total Water Used (litres)" icon={GlassWater} value={stats.total_water_used} color='#3B82F6'/>
                    <StatCard name="Total Energy Used (kwh)" icon={Power} value={stats.total_energy_used} color='#6EE787'/>
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