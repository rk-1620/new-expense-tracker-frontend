import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPath";
import ExpenseOverView from "../../components/Expense/ExpenseOverView";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosinstance";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";


const Expense =  ()=>{
    useUserAuth();

    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    
    const fetchExpenseDetails = async () =>{
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );

            if(response.data){
                console.log("IncomeOverview is rendering with data:", response.data);

                setExpenseData(response.data);
            }

        }catch(err){
            console.log("Something went wrong. Plese try again", err)
        }finally{
            setLoading(false);
        }
    }

    const handleAddExpense = async (expense)=>{
        const {category, amount, date, icon} = expense;

        if(!category.trim()){
            toast.error("Source is required.");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <=0){
            toast.error("Amount should be a valind number and greater than 0")
            return;
        }

        if(!date){
            toast.error("Date is Required");
            return;
        }

        try{
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category, amount, date, icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense aded succesfully");
            fetchExpenseDetails();
        }catch(err){
            console.error("Error adding expense", err.response?.data?.message || err.message);
        }

    };

    const deleteExpense = async (id)=>{
        try{
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

            setOpenDeleteAlert({show:false, data:null});
            toast.success("income delted succesfully");
            fetchExpenseDetails();
        }catch(err){
            console.error("Error in deleting expense", err.response?.message || err.message);
        }
    };
    const handleDownloadExpenseDetails = async()=>{

        try{
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType:"blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "expense_details.xlsx");
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            
        }catch(err){
            console.error("Error in downloading expense details: ", err);
            toast.error("fails to download");
        }

    };

    useEffect(()=>{
        fetchExpenseDetails();

        return ()=> {};
    }, []);

    return(
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 max-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverView
                            transactions={expenseData}
                            onExpenseIncome={()=>{setOpenAddExpenseModal(true)}}
                        />
                    </div>
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id)=>{
                            setOpenDeleteAlert({show:true, data:id})
                        }}
                        onDownload = {handleDownloadExpenseDetails}
                    />
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onclose={()=>setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm
                        onAddExpense={handleAddExpense}
                    >add income form</AddExpenseForm>
                    
                </Modal>

                <Modal 
                    isOpen={openDeleteAlert.show}
                    onclose={()=>setOpenDeleteAlert({show: false, data:null})}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content = "Are you sure to delete this expesne"
                        onDelete={()=>deleteExpense(openDeleteAlert.data)}
                    />
                    
                </Modal>

            </div>
        </DashboardLayout>
    )
}

export default Expense;