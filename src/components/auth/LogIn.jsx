import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function LogIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

    const loginHandler = async (data)=>{
        console.log("logIn Click",data)
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader))
    }

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
        <form 
            onSubmit={handleSubmit(loginHandler)}
            className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded"
        >
            <div className="flex flex-col items-center justify-center">
                <IoMdLogIn size={50}/>
                <h1 className="text-slate-600 font-bold font-montserrat text-center sm:text-3xl text-xl">Login</h1>
            </div>
            <hr className="mt-4 h-2"/>
            <div className="flex flex-col gap-4">
                <InputField
                    id={"username"}
                    type={"text"}
                    label={"Username"}
                    required
                    placeholder={"Enter your username"}
                    register={register}
                    errors={errors}
                    message={"username is required"}
                />
                <InputField
                    id={"password"}
                    type={"password"}
                    label={"Password"}
                    required
                    placeholder={"Enter your password"}
                    register={register}
                    errors={errors}
                    message={"password is required"}
                />
            </div>
            <button
                disabled={loader}
                className="mt-10 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
            >
                {
                    loader ? <div className="flex flex-row items-center"><Spinner/> <span>Loading...</span></div> : <>Login</>
                }
            </button>
            <div className="flex items-center justify-start">
                <p>
                    <span className="block w-100%">Do not have an account, please register here.</span>
                    <Link
                        className="underline text-blue-600 hover:text-blue-400"
                        to={"/register"}
                    >
                        Register
                    </Link>
                </p>
            </div>
            <div className="login-with-Oauth2">
            <div className="flex items-center justify-between gap-1 py-5 ">
                <Link
                  to={`${apiUrl}/oauth2/authorization/google`}
                  className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
                >
                  <span>
                    <FcGoogle className="text-2xl" />
                  </span>
                  <span className="font-semibold sm:text-customText text-xs">
                    Login with Google
                  </span>
                </Link>
                <Link
                  to={`${apiUrl}/oauth2/authorization/github`}
                  className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
                >
                  <span>
                    <FaGithub className="text-2xl" />
                  </span>
                  <span className="font-semibold sm:text-customText text-xs">
                    Login with Github
                  </span>
                </Link>
              </div>
            </div>
        </form>
    </div>
  )
}

export default LogIn

