import { useEffect, useState } from "react";
import { prepareExpenseLineChartData, prepareSAllLineChartData } from "../../utils/helper";
import CustomLineChartAll from "../Charts/CustomLineChartAll";


const Overview = ({income, expense})=>{

    const [chartData, setChartData] = useState([]);
    // 1. Merge the arrays
    const dataa = [...income, ...expense];

    // 2. Sort based on date (latest first)
    const transactions = dataa.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(transactions);
    // console.log("overview - ", income, expense);
    useEffect(()=>{
        const result = prepareSAllLineChartData(income, expense);
        setChartData(result);
    },[income,expense])

    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg"> Transactions Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Track Your All Transactions over Time</p>
                </div>
            </div>
            <div className="mt-10">
                <CustomLineChartAll data = {chartData}/>
            </div>
        </div>
        
    )
}

export default Overview;