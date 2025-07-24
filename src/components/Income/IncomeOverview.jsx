import { useEffect } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import moment from "moment";
import CustomBarchart from "../Charts/CustomBarchart";


// const IncomeOverview = ()=>{
//      console.log("✅ IncomeOverview component mounted");
//     return(
        
//         <>
//         Incomeoverview
//         </>
//     )
// }

const IncomeOverview = ({transactions,onAddIncome}) =>{

    const [chartData, setCharData] = useState([]);

    useEffect(()=>{
        const result = prepareIncomeBarChartData(transactions);
        setCharData(result);

        return ()=>{}
    },[transactions]);

    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track Your earnings over time and analyze your income
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome} >
                    <LuPlus className="text-lg"/>
                    Add Income
                </button>
                
                
            </div>
            <div className="mt-10">
                    <CustomBarchart data = {chartData}/>
            </div>
        </div>
    )
}

export default IncomeOverview;