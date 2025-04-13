import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdArrowDropDown } from "react-icons/md";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
} from "@mui/material";
import Loader from "../shared/Loader";
import api from "../../api/api";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector(state => state.auth)
  const [pageError, setPageError] = useState(false);

  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enable, Step 2: Verify

  //loading state
  const [pageLoader, setPageLoader] = useState(false);
  const [disabledLoader, setDisbledLoader] = useState(false);
  const [twofaCodeLoader, settwofaCodeLoader] = useState(false);

  //fetching the 2fa sttaus
  useEffect(() => {
    setPageLoader(true);

    const fetch2FAStatus = async () => {
      try {
        const response = await api.post(`/auth/user/2fa-status`);
        console.log(response)
        setIs2faEnabled(response.data.is2faEnabled);
      } catch (error) {
        setPageError(error?.response?.data?.message);
        toast.error("Error fetching 2FA status");
      } finally {
        setPageLoader(false);
      }
    };
    fetch2FAStatus();
  }, []);

  //enable the 2fa
  const enable2FA = async () => {
    setDisbledLoader(true);
    try {
        const response = await api.post(`/auth/enable-2fa`);
        setQrCodeUrl(response.data);
      setStep(2);
    } catch (error) {
      toast.error("Error enabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  //diable the 2fa
  const disable2FA = async () => {
    setDisbledLoader(true);
    try {
      await api.post(`/auth/disable-2fa`);
      setIs2faEnabled(false);
      setQrCodeUrl("");
    } catch (error) {
      toast.error("Error disabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  //verify the 2fa
  const verify2FA = async () => {
    if (!code || code.trim().length === 0)
      return toast.error("Please Enter The Code To Verify");

    settwofaCodeLoader(true);

    try {
      const formData = new URLSearchParams();
      formData.append("code", code);

      await api.post(`/auth/verify-2fa`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("2FA verified successful");

      setIs2faEnabled(true);
      setStep(1);
    } catch (error) {
      console.error("Error verifying 2FA", error);
      toast.error("Invalid 2FA Code");
    } finally {
      settwofaCodeLoader(false);
      setCode("");
    }
  };

  if (pageError) {
    // return <Errors message={pageError} />;
    console.log("Error Page at Profile.jsx");
  }

  return (
    <div className="min-h-[calc(100vh-74px)] py-10">
      {pageLoader ? (
        <>
          {" "}
          <div className="flex flex-col justify-center items-center  h-72 mt-10">
            <Loader />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="xl:w-[70%] lg:w-[80%] sm:w-[90%] w-full sm:mx-auto sm:px-0 px-4   min-h-[500px] flex lg:flex-row flex-col gap-4 ">
            <div className="flex-1  flex flex-col shadow-lg shadow-gray-300 gap-2 px-4 py-6">
              <div className="flex flex-col items-center gap-2   ">
                <Avatar
                  alt={currentUser?.username}
                  src="/static/images/avatar/1.jpg"
                />
                <h3 className="font-semibold text-2xl">
                  {currentUser?.username}
                </h3>
              </div>
              <div className="my-4 ">
                <div className="space-y-2 px-4 mb-1">
                  <h1 className="font-semibold text-md text-slate-800">
                    UserName :{" "}
                    <span className=" text-slate-700  font-normal">
                      {currentUser?.username}
                    </span>
                  </h1>
                  <h1 className="font-semibold text-md text-slate-800">
                    Role :{" "}
                    <span className=" text-slate-700  font-normal">
                      {currentUser && currentUser["roles"][0]}
                    </span>
                  </h1>
                  <h1 className="font-semibold text-md text-slate-800">
                    2FA Authentication :{" "}
                    <span
                      className={` ${
                        is2faEnabled ? "bg-green-800" : "bg-red-600"
                      } px-2 text-center py-1 text-xs mt-2 ml-1 rounded-sm text-white`}
                    >
                      {is2faEnabled ? "Activated" : "Deactivated"}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col shadow-lg shadow-gray-300 gap-2 px-4 py-6">
              <div>
                <button
                  disabled={disabledLoader}
                  onClick={is2faEnabled ? disable2FA : enable2FA}
                  className={` ${
                    is2faEnabled ? "bg-red-600" : "bg-blue-600"
                  } px-5 py-1 hover:text-slate-300 rounded-sm text-white mt-2`}
                >
                  {disabledLoader ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {is2faEnabled
                        ? "Disabled Two Factor Authentication"
                        : "Enable Two Factor Authentication"}
                    </>
                  )}
                </button>
              </div>
              {step === 2 && (
                <div className="py-3">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<MdArrowDropDown />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <h3 className="font-bold text-lg  text-slate-700 uppercase">
                        QR Code To Scan
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="">
                        <img src={qrCodeUrl ? qrCodeUrl : "/qr"} alt="QR Code" />
                        <div className="flex items-center  gap-2  mt-4">
                          <input
                            type="text"
                            placeholder="Enter 2FA code"
                            value={code}
                            required
                            className="mt-4 border px-2 py-1 border-slate-800 rounded-md"
                            onChange={(e) => setCode(e.target.value)}
                          />
                          <button
                            className="bg-blue-600 text-white  px-3 h-10 rounded-md mt-4"
                            onClick={verify2FA}
                          >
                            {twofaCodeLoader ? "Loading..." : "Verify 2FA"}
                          </button>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
