import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import {Link, useNavigate} from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


const Login =  ()=>{

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError ] = useState("");

const navigate = useNavigate();
const {updateUser} = useContext(UserContext);

const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email))
    {
        setError("Please enter valid email address.")
        return;
    }

    if(!password)
    {
        setError("Please enter the password");
        return;
    }

    setError("");

    try{
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
            email, password
        });

        const {token, user} = response.data;

        if(token){
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard");
        }
    }catch(err){
        if(err.response && err.response.data.message){
            setError(err.response.data.message)
        }
        else{
            setError("Something Went wrong")
        }
    }
}

return(
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-black">Welcome back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">please enter your details</p>
            <form onSubmit={handleLogin} >
                <Input
                    value={email}
                    onChange={( {target} ) => setEmail(target.value)}
                    label = "Email Address"
                    placeholder = "john@example.com"
                    type="text"
                />
                <Input
                    value={password}
                    onChange={( {target} ) => setPassword(target.value)}
                    label = "Password"
                    placeholder = "Min 8 characters"
                    type="password"
                />

                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                <button type="submit" className="btn-primary">
                    Login
                </button>

                <p className="text-[13px] text-slate-800 mt-3">
                    Don't have an account ? {" "}
                    <Link className="font-medium text-primary underline" to="/signup">
                        Signup
                    </Link>
                </p>

            </form>
        </div>
    </AuthLayout>
)
}

export default Login;