import { LoginForm } from "@/types";
import axios, { AxiosResponse } from "axios";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Loader from "@/components/Loader";
import { useState } from "react";
const Login = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [otp, setotp] = useState(false);
  const login = async (
    data: LoginForm
  ): Promise<AxiosResponse<{ authToken: string }>> => {
    try {
      setShowLoader(true);
      const res = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/login`,
        data
      );
      return res;
    } catch (error) {
      throw error;
    } finally {
      setShowLoader(false);
    }
  };
  const login2 = async (
    data: LoginForm
  ): Promise<AxiosResponse<{ authToken: string }>> => {
    try {
      setShowLoader(true);
      const res = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/login-2`,
        data
      );
      return res;
    } catch (error) {
      throw error;
    } finally {
      setShowLoader(false);
    }
  };

  const loginMutation = useMutation((data: LoginForm) => login(data), {
    onSuccess: (response) => {
      console.log(response);
      try {
        setotp(true);
        toast.success("otp send in your mail plase check!");
      } catch (error) {
        toast.error("Invalid response");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        (error?.response.data as { message: string })?.message ||
        "Invalid credential";
      console.log(errorMessage);

      toast.error(errorMessage);
    },
  });
  const loginMutation2 = useMutation((data: LoginForm) => login2(data), {
    onSuccess: (response) => {
      try {
        const token = response.data.authToken;
        if (token) {
          localStorage.setItem("token", token);
          toast.success("Login success");
        }
      } catch (error) {
        toast.error("Invalid response");
      } finally {
        window.location.reload();
      }
    },
    onError: (error: any) => {
      const errorMessage =
        (error?.response.data as { message: string })?.message ||
        "Invalid credential";
      console.log(errorMessage);

      toast.error(errorMessage);
    },
  });
  return (
    <section className="main h-screen">
      <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto">
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
        <div className="w-full bg-[#303131] rounded-lg shadow text-white md:mt-0 sm:max-w-xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Sign in to your account
            </h1>
            {!otp ? (
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(
                  values: LoginForm,
                  actions: { setSubmitting: (arg0: boolean) => void }
                ) => {
                  actions.setSubmitting(false);
                  loginMutation.mutate({ ...values });
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
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
                        className="bg-transparent border-b border-gray-300 text-white sm:text-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="name@company.com"
                        required
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                        placeholder="••••••••"
                        className="bg-transparent border-b border-gray-300 text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-300">
                            Remember me
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
                    <button
                      type="submit"
                      className="w-full text-black bg-[#f4ba2f]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500">
                      Don’t have an account yet?{" "}
                      <Link
                        to="/signup"
                        className="font-medium text-[#f4ba2f] hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  otp: "",
                }}
                onSubmit={(
                  values: LoginForm,
                  actions: { setSubmitting: (arg0: boolean) => void }
                ) => {
                  actions.setSubmitting(false);
                  loginMutation2.mutate({ ...values });
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
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
                        className="bg-transparent border-b border-gray-300 text-white sm:text-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="name@company.com"
                        required
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                        placeholder="••••••••"
                        className="bg-transparent border-b border-gray-300 text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="otp"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Enter OTP
                      </label>
                      <input
                        type="number"
                        name="otp"
                        id="otp"
                        placeholder="otp"
                        className="bg-transparent border-b border-gray-300 text-white sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        required
                        value={values.otp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-black bg-[#f4ba2f]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Sign in
                    </button>
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
      {showLoader && <Loader />}
    </section>
  );
};

export default Login;
