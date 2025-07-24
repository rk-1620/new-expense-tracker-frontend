import { useContext } from "react"
import {UserContext} from '../../context/UserContext';
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu })=>{
    const {user} = useContext(UserContext);

     // If user is undefined, show loading (app is still determining auth)
//   if (user === null) {
//     return <div className="p-5 text-gray-500">Loading user...</div>;
//   }
    console.log("dashboardlauoyt", user);
    return(
        <div>
            <Navbar activeMenu={activeMenu} />
            
            {
                user && (
                    <div className="flex" > 


                        <div className="grow mx-5" >
                            {children}
                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default DashboardLayout;