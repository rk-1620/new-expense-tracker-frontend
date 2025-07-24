import CustomPieChart from "../Charts/CustomPieChart";


const COLORS = ["#7c5cf1ff", "#d61923ff", "#2fb34cff"]

const FinanceOverview = ({totalBalance, totalIncome, totalExpenses}) =>{
        
    const balanceData = [
        {name: "Total Balance" , amount: totalBalance},
        {name: "Total Expenses" , amount: totalExpenses},
        {name: "Total Income" , amount: totalIncome},
    ]
    
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label = "Total Balance"
                totalAmount = {`₹ ${totalBalance}`}
                colors = {COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;