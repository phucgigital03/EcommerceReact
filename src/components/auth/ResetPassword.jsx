import { Divider } from "@mui/material";
import InputField from "../shared/InputField";
import Spinner from "../shared/Spinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleResetPassword = async (data) => {
    const { password } = data;

    const token = searchParams.get("token");

    setLoading(true);
    try {
      const formData = new URLSearchParams();

      formData.append("token", token);
      formData.append("newPassword", password);

      await api.post("/auth/reset-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Password reset successful! You can now log in.");
      reset();
    } catch (error) {
      console.log("Error resetting password.", error);
      toast.error(error?.response?.data?.message ||  "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Update Your Password
          </h1>
          <p className="text-slate-600 text-center">
            Enter your new Password to Update it
          </p>
        </div>
        <Divider className="font-semibold pb-4"></Divider>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="enter your Password"
            register={register}
            errors={errors}
            min={6}
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
            <>Submit</>
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

export default ResetPassword;
