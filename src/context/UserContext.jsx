import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"

export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);

    const updateUser = (userData)=>{
        setUser(userData);
    };

    const clearUser = ()=>{
        setUser(null);
    }

//       // 🔁 Fetch user on app load
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
//         setUser(response.data.user); // or response.data depending on your backend
//       } catch (err) {
//         setUser(null); // not logged in or token invalid
//       }
//     };

//     fetchUser();
//   }, []);

    return(
        <UserContext.Provider
            value={{user, updateUser, clearUser}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;