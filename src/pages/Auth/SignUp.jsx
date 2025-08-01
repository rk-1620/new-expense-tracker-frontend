import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";


const SignUp =  ()=>{
    
    const [profilePic, setProfilePic] = useState(null);
    const [fullname, setFullName] = useState("");   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {updateUser} = useContext(UserContext);

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if(!fullname)
        {
            setError("Please enter Your name")
            return;
        }
        
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

            if(profilePic){
                const imgUploadsRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadsRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
                fullname,
                email,
                password,
                profileImageUrl
            });
            const {user, token} = response.data;
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
    };

    return(
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join Us today by signing up below
                </p>

                <form onSubmit={handleSignUp} >
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-l md:grid-cols-2 gap-4" >

                        <Input
                            value={fullname}
                            onChange={( {target} ) => setFullName(target.value)}
                            label = "Full Name"
                            placeholder = "John"
                            type="text"
                        />
                        
                        <Input
                            value={email}
                            onChange={( {target} ) => setEmail(target.value)}
                            label = "Email Address"
                            placeholder = "john@example.com"
                            type="text"
                        />
                        <div className="col-span-2"></div>
                        <Input
                            value={password}
                            onChange={( {target} ) => setPassword(target.value)}
                            label = "Password"
                            placeholder = "Min 8 characters"
                            type="password"
                        />

                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account ? {" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp;