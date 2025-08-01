import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";


const OverviewList = ({transactions}) => {
    console.log("OverviewList",transactions)
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg"> All Transactions </h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    transactions?.map((txn)=>(
                        <TransactionInfoCard
                        key={txn._id}
                        title={txn.source ? txn.source : txn.category}
                        icon={txn.icon}
                        date={moment(txn.date).format("Do MMM YYYY")}
                        amount={txn.amount}
                        type={txn.source ? "income" : "expense"}
                        // onDelete={()=> onDelete(expense._id)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default OverviewList;