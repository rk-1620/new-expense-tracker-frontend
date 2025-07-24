import { useState } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { useEffect } from "react";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";


const Income =  ()=>{

    useUserAuth();

    const [incomeData, setIncomeData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    const fetchIncomeDetails = async () =>{
        if(loading) return;

        setLoading(true);

        try{
            console.log("Full request URL:", axiosInstance.defaults.baseURL + API_PATHS.INCOME.GET_ALL_INCOME);
            const response = await axiosInstance.get(
                `${API_PATHS.INCOME.GET_ALL_INCOME}`
            );

            if(response.data){
                console.log("IncomeOverview is rendering with data:", response.data);

                setIncomeData(response.data);
            }

        }catch(err){
            console.log("Something went wrong. Plese try again", err)
        }finally{
            setLoading(false);
        }
    }

    const handleIncome = async (income)=>{
        const {source, amount, date, icon} = income;

        if(!source.trim()){
            toast.error("Source is required.");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <=0){
            toast.error("Amount should be a valind number and greater than 0")
            return;
        }

        try{
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source, amount, date, icon,
            });

            setOpenAddIncomeModal(false);
            toast.success("Income aded succesfully");
            fetchIncomeDetails();
        }catch(err){
            console.error("Error adding income", err.response?.data?.message || err.message);
        }

    };
    const deleteIncome = async (id)=>{
        try{
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

            setOpenDeleteAlert({show:false, data:null});
            toast.success("income delted succesfully");
            fetchIncomeDetails();
        }catch(err){
            console.error("Error in deleting income", err.response?.message || err.message);
        }
    };
    const handleDownloadIncomeDetails = async()=>{
        try{
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType:"blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Income_details.xlsx");
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            
        }catch(err){
            console.error("Error in downloading Income details: ", err);
            toast.error("fails to download");
        }
    };

    useEffect(()=>{
        fetchIncomeDetails();

        return ()=> {};
    }, []);

    return(
        // <DashboardLayout activeMenu="Income">
        //     <IncomeOverview
        //         transactions = {incomeData}
        //         onAddIncome = {()=> setOpenAddIncomeModal(true)}
        //    />
        // </DashboardLayout>
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions = {incomeData}
                            onAddIncome = {()=> setOpenAddIncomeModal(true)}
                        />
                    </div>
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id)=>{
                            setOpenDeleteAlert({show:true, data:id})
                        }}
                        onDownload = {handleDownloadIncomeDetails}
                    />

                </div>

                <Modal 
                    isOpen={openAddIncomeModal}
                    onclose={()=>setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm
                        onAddIncome={handleIncome}
                    >add income form</AddIncomeForm>
                    
                </Modal>

                <Modal 
                    isOpen={openDeleteAlert.show}
                    onclose={()=>setOpenDeleteAlert({show: false, data:null})}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content = "Are you sure to delte this income"
                        onDelete={()=>deleteIncome(openDeleteAlert.data)}
                    />
                    
                </Modal>

                

            </div>
        </DashboardLayout>
    )
}

export default Income;