
import {
    BarChart,
    Bar,
    XAxis,YAxis,CartesianGrid, Tooltip, Legend,ResponsiveContainer,Cell
} from "recharts";
// import CustomTooltip from "./CustomTooltip";

const CustomBarchart = ({data})=>{

    // console.log("custom barchart data =>" , data);

    // const xaxis = Object.keys(data[0]).length == 2 ? "category" : "month";
    // const xaxis = data[0].month ? "month" : "category";
    const xaxis = data && data.length > 0 && data[0].month ? "month" : "category";


    const getBarColor = (index) =>{
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
        
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            const label = dataPoint.category || dataPoint.month || "—";

            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{label}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900"> ${dataPoint.amount} </span>
                    </p>
                </div>
            );
        }
        return null;
    };


    return(
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none"/>

                    <XAxis dataKey={xaxis} tick={{fontSize:12, fill: "#555"}}/> 
                    <YAxis tick={{fontSize:12, fill: "#555"}} stroke="none"/>

                    <Tooltip content={CustomTooltip}/>

                    <Bar 
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10,10,0,0]}
                        activeDot={{r:8, fill: "yellow"}}
                        activeStyle = {{fill: "green"}}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)}/>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarchart;

