import { LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const waterlogdata = [
    { name:"Jan", qty:30},
    { name:"Feb", qty:40},
    { name:"Mar", qty:50},
    { name:"Apr", qty:60},
    { name:"May", qty:70},
    { name:"Jun", qty:80},
    { name:"Jul", qty:30},
    { name:"Aug", qty:50},
    { name:"Sep", qty:80},
    { name:"Oct", qty:30},
    { name:"Nov", qty:70},
    { name:"Dec", qty:90},
];

const WaterLogChart = () => {
    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
            <h2 className="text-lg font-medium mb-4 text-gray-100"> Water Logs</h2>
            <div className="h-80">
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <LineChart data={waterlogdata}>
                        <CartesianGrid strokeDasharray={'3 3'} stroke='#485563'/>
                        <XAxis dataKey={"name"} stroke="#9ca3af"/>
                        <YAxis stroke="#9ca3af"/>
                        <Tooltip contentStyle={{
                            backgroundColor: "rgba(31, 41, 55, 0.8)",
                            borderColor: "#485563",
                        }}
                        itemStyle={{color:'#E5E7EB'}}/>
                            <Line type={'monotone'} dataKey={'qty'} stroke="#6366F1" strokeWidth={3} dot={{fill:"#6366F1", strokeWidth:2, r:6}} activeDot={{r:8, strokeWidth:2}}/>

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
};
export default WaterLogChart;