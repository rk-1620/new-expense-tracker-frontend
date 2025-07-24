import { useState, useEffect } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarchart from "../Charts/CustomBarchart";


const Last30DaysExpenses = ({data})=>{

    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        // console.log("result chart data", result);
        setChartData(result);

        return () =>{}; 
    }, [data]);

    return(
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarchart data = {chartData}/>
        </div>
    )
}

export default Last30DaysExpenses;