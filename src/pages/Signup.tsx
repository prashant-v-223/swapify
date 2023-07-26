import { RegisterForm } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
const Signup = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const login = async (
    data: RegisterForm
  ): Promise<AxiosResponse<{ result: string }>> => {
    try {
      setShowLoader(true);
      const res = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/`,
        data
      );
      return res;
    } catch (error) {
      throw error;
    }
    finally{
      setShowLoader(false);
    }
  };
  const verifyOtp = async (data: { otp: string; email: string }) => {
    try {
      const res = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/verify-otp`,
        data
      );
      console.log(res);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Invalid OTP");
      throw error;
    }
  };
  const signupMutation = useMutation((data: RegisterForm) => login(data), {
    onSuccess: (response) => {
      toast.success(response.data.result);
      setIsOtpSent(true);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "Account already exists";
        toast.error(errorMessage);
      } else {
        toast.error("Server error");
      }
    },
  });
  return (
    <section className="main h-screen">
      <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white "
        >
          <img width={200} height={200} src="/assets/logo_ver1.png" alt="logo" />
        </Link>
        <div className="w-full bg-[#303131] rounded-lg shadow text-white md:mt-0 sm:max-w-xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Create and account
            </h1>
            <Formik
              initialValues={{
                name: "",
                password: "",
                email: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required"),
              })}
              onSubmit={(
                values: RegisterForm,
                actions: { setSubmitting: (arg0: boolean) => void }
              ) => {
                actions.setSubmitting(false);
                signupMutation.mutate({ ...values });
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`bg-transparent appearance-none border-b text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-blue-200"
                      }`}
                      placeholder="Enter Your name here "
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isOtpSent}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Email
                    </label>
                    <input 
                      type="email"
                      name="email"
                      id="email"
                      inputMode="email"
                      placeholder="hello@swapfry.com"
                      className={`bg-transparent appearance-none border-b text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-blue-200"
                      }`}
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      disabled={isOtpSent}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      minLength={6}
                      disabled={isOtpSent}
                      placeholder="••••••••"
                      className={`bg-transparent appearance-none border-b text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-blue-200"
                      }`}
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                    />
                  </div>
                  {isOtpSent ? (
                    <div>
                      <label
                        htmlFor="otp"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Otp
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="otp"
                        id="otp" 
                        placeholder="Enter otp here"
                        className="bg-transparent appearance-none border-b  text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        required
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                        value={otp}
                        autoComplete="off"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 md:gap-0 md:flex-row flex-col">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-300">
                            I accept the Terms and Conditions
                          </label>
                        </div>
                      </div>
                      <Link
                        to="/forgot"
                        className="text-sm font-medium text-[#f4ba2f]  hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  {!isOtpSent ? (
                    <button
                      type="submit"
                      className="w-full text-black bg-[#f4ba2f]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Create Account
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        verifyOtp({ otp, email: values.email });
                      }}
                      className="w-full text-black bg-[#f4ba2f]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Verify Otp
                    </button>
                  )}
                  <p className="text-sm font-light text-white">
                    Already have an account yet?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-[#f4ba2f] hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {
        showLoader && <Loader />
      }
    </section>
  );
};

export default Signup;
