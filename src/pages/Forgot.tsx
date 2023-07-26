import { ForgotPasswordForm } from "@/types";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
const Forgot = ({ mode }: any) => {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const login = async (
    data: string
  ): Promise<AxiosResponse<{ message: string }>> => {
    try {
      const res = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/reset-password`,
        {
          email: data,
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  };
  const verifyOtp = async (data: {
    otp: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.put(
        `${process.env.VITE_SERVER_URL}/users/verify-reset-otp`,
        data
      );
      console.log(res);
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Invalid OTP");
      throw error;
    }
  };
  const signupMutation = useMutation((data: string) => login(data), {
    onSuccess: (response) => {
      toast.success(response.data.message);
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
    <section className={`${!mode ? "main h-screen" : ""} `}  data-aos="fade-up">
      <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto">
        {!mode && (
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-white "
          >
            <img
              width={200}
              height={200}
              src="/assets/logo_ver1.png"
              alt="logo"
            />
          </Link>
        )}
        <div className="w-full bg-[#303131] rounded-lg shadow text-white md:mt-0 sm:max-w-xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Change Password
            </h1>
            <Formik
              initialValues={{
                password: "",
                confirm_password: "",
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
                confirm_password: Yup.string()
                  .oneOf(
                    [Yup.ref("password"), null as any],
                    "Passwords must match"
                  )
                  .required("Confirm password is required"),
              })}
              onSubmit={(
                values: ForgotPasswordForm,
                actions: { setSubmitting: (arg0: boolean) => void }
              ) => {
                actions.setSubmitting(false);
                signupMutation.mutate(values.email);
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
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@swapfry.com"
                      className={`bg-transparent border-b text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-blue-200"
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={`bg-transparent border-b text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-blue-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="••••••••"
                      className={`bg-transparent border-b text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                        errors.confirm_password && touched.confirm_password
                          ? "border-red-500"
                          : "border-blue-200"
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirm_password}
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
                        className="bg-transparent border-b  text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        required
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                        value={otp}
                      />
                    </div>
                  ) : null}
                  {errors.password && touched.password && (
                    <div className="text-red-500 my-2">{errors?.password}</div>
                  )}
                  {errors.confirm_password && touched.confirm_password && (
                    <div className="text-red-500 my-2">
                      {errors?.confirm_password}
                    </div>
                  )}
                  {!isOtpSent ? (
                    <button
                      type="submit"
                      onClick={() => {
                        signupMutation.mutate(values.email);
                      }}
                      className="w-full text-white bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Reset Password
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        verifyOtp({
                          otp,
                          email: values.email,
                          password: values.password,
                        });
                      }}
                      className="w-full text-white bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Verify Otp
                    </button>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
