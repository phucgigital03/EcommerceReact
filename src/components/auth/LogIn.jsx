import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { authenticateSignInUser, verify2FALogin } from "../../store/actions";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import api from "../../api/api";
import { Divider } from "@mui/material";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function LogIn() {
  // Step 1: Login method and Step 2: Verify 2FA
  const [step, setStep] = useState(1);
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);
  // Access the token(auth) and setAuth function using Redux
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    console.log("logIn Click", data);
    dispatch(
      authenticateSignInUser(
        data,
        toast,
        reset,
        navigate,
        setLoader,
        setStep,
        setJwtToken
      )
    );
  };

  //function for verify 2fa authentication
  const onVerify2FaHandler = async (data) => {
    console.log("Verify 2FA login");
    dispatch(
      verify2FALogin(toast, reset, navigate, setLoading, data, jwtToken)
    );
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
      {step === 1 ? (
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded"
        >
          <div className="flex flex-col items-center justify-center">
            <IoMdLogIn size={50} />
            <h1 className="text-slate-600 font-bold font-montserrat text-center sm:text-3xl text-xl">
              Login
            </h1>
          </div>
          <hr className="mt-4 h-2" />
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
            {loader ? (
              <div className="flex flex-row items-center">
                <Spinner /> <span>Loading...</span>
              </div>
            ) : (
              <>Login</>
            )}
          </button>
          <div className="flex flex-col items-start">
            <p>
              <span className="mr-2 w-100%">
                Do not have an account 
              </span>
              <Link
                className="underline text-blue-600 hover:text-blue-400"
                to={"/register"}
              >
                Register Here.
              </Link>
            </p>
            <p className="mt-2 text-sm text-blue-600 ">
              <Link
                className=" underline hover:text-blue-400"
                to="/forgot-password"
              >
                Forgot Password?
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
      ) : (
        <form
          onSubmit={handleSubmit(onVerify2FaHandler)}
          className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
        >
          <div>
            <h1 className="font-montserrat text-center font-bold text-2xl">
              Verify 2FA
            </h1>
            <p className="text-slate-600 text-center">
              Enter the correct code to complete 2FA Authentication
            </p>
            <Divider className="font-semibold pb-4"></Divider>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <InputField
              label="Enter Code"
              required
              id="code"
              type="text"
              message="*Code is required"
              placeholder="Enter your 2FA code"
              register={register}
              errors={errors}
            />
          </div>
          <button
            disabled={loading}
            onClick={() => {}}
            className="bg-blue-600 font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
            type="text"
          >
            {loading ? <span>Loading...</span> : "Verify 2FA"}
          </button>
        </form>
      )}
    </div>
  );
}

export default LogIn;
