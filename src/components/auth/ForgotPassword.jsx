import { Divider } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "../shared/InputField";
import toast from "react-hot-toast";
import api from "../../api/api";
import Spinner from "../shared/Spinner";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  //react hook form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const onPasswordForgotHandler = async (data) => {
    //destructuring email from the data object
    const { email } = data;
    console.log(email)
    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("email", email);
      await api.post("/auth/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //reset the field by using reset() function provided by react hook form after submit
      reset();

      //showing success message
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.log("Error sending password reset email.", error);
      toast.error("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onPasswordForgotHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Forgot Password?
          </h1>
          <p className="text-slate-600 text-center">
            Enter your email a Password reset email will sent
          </p>
        </div>
        <Divider className="font-semibold pb-4"></Divider>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="enter your email"
            register={register}
            errors={errors}
          />{" "}
        </div>
        <button
          disabled={loading}
          className="mt-4 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
        >
          {loading ? (
            <div className="flex flex-row items-center">
              <Spinner /> <span>Loading...</span>
            </div>
          ) : (
            <>Send</>
          )}
        </button>
        <p className="text-center text-sm text-blue-600 ">
          <Link className=" underline hover:text-blue-400" to="/login">
            Back To Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
