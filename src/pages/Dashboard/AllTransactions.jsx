import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Overview from "../../components/Recents/Overview";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosinstance";
import { useUserAuth } from "../../hooks/useUserAuth";
import OverviewList from "../../components/Recents/OverviewList";


const AllTransactions = () =>{
    useUserAuth();

    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [sortedTransactions, setSortedTransactions] = useState([]);

    const fetchTransDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
        const [iresponse, eresponse] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
        ]);

        const income = iresponse?.data || [];
        const expense = eresponse?.data || [];

        setIncomeData(income);
        setExpenseData(expense);

        // Merge and sort
        const allTransactions = [...income, ...expense];
        const sorted = allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSortedTransactions(sorted);

    } catch (err) {
        console.log("Something went wrong. Please try again", err);
    } finally {
        setLoading(false);
    }
    };

    useEffect(()=>{
        fetchTransDetails();
        
    }, []);

    return(
        <DashboardLayout activeMenu="Recents">
            <div className="my-5 max-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <Overview
                            income = {incomeData}
                            expense = {expenseData}
                        />
                    </div>

                    <OverviewList
                        transactions={sortedTransactions}
                    />
                    

                </div>
            </div>
        </DashboardLayout>
    )
}

export default AllTransactions;