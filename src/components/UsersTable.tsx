import { convertDate } from "@/utils";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Loader from "./Loader";

const UsersTable = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const fetchUsers = async () => {
    const { data } = await axios.get(
      `${process.env.VITE_SERVER_URL}/users/get-all-users`
    );
    return data;
  };

  const { data, refetch } = useQuery("users", fetchUsers);
  console.log(data);
  const [Fillter, setFillter] = React.useState(data?.users || []);
  useEffect(() => {
    setFillter(data?.users || []);
  }, [data]);

  const BlockUser = async (id: string) => {
    try {
      setShowLoader(true);
      const { status } = axios.put(
        `${process.env.VITE_SERVER_URL}/users/block/${id}`
      ) as any;
      if (status === 200) {
        toast.success("User Blocked");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setShowLoader(false);
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  };
  const KycUsers = async (id: string) => {
    try {
      setShowLoader(true);
      const { status } = axios.put(
        `${process.env.VITE_SERVER_URL}/users/kyc/${id}`
      ) as any;
      if (status === 200) {
        toast.success("User Blocked");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setShowLoader(false);
      fetchUsers();
    }
  };
  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value !== null) {
      let data1 = data.users.filter((truck: any) => {
        return (
          truck._id.toString().toLowerCase().match(value) ||
          truck.name.toString().toLowerCase().match(value) ||
          truck.email.toString().toLowerCase().match(value) ||
          truck.balance.toString().toLowerCase().match(value)
        );
      });
      setFillter(data1);
    } else {
      fetchUsers();
    }
  };
  if (data?.users.length !== 0) {
    return (
      <div className="relative overflow-x-auto m-4 "  data-aos="fade-up">
        <div className="mx-3 mb-6">
          <label htmlFor="exampleFormControlInput1" className=" text-gray-100">
            <b> Serch :</b>
          </label>
          <input
            type="text"
            className="bg-transparent border-2 border-gray-300 outline-none px-2 py-2 mx-4 text-gray-100 rounded-lg"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 md:border border-[#606060]">
          <thead className="text-sm sm:text-base bg-[#303131] rounded-lg text-white ">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Sr No.
              </th>
              <th scope="col" className="px-6 py-3">
                User Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Joined Date
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                IsBLocked
              </th>
              <th scope="col" className="px-6 py-3">
                KYC
              </th>
            </tr>
          </thead>
          <tbody>
            {Fillter.map(
              (
                user: {
                  _id: string;
                  name: string;
                  status: string;
                  email: string;
                  balance: number;
                  createdAt: Date;
                  isBlocked: Boolean;
                  isKYC: any;
                },
                index: number
              ) => {
                return (
                  <tr
                    key={user._id}
                    className="bg-[#1b1b1b] border-b border-[#444242] text-white"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap "
                    >
                      {Number(index) + 1}
                    </th>
                    <td className="px-6 py-4">{user?._id}</td>
                    <td className="px-6 py-4">{user?.name}</td>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">
                      {convertDate(user?.createdAt)}
                    </td>
                    <td className="px-6 py-4">{user?.balance}</td>
                    {user.isBlocked ? (
                      <td className="text-red-600">
                        <button
                          className="font-medium text-light-600 dark:text-light-500 hover:underline disabled:opacity-25 disabled:cursor-not-allowed p-2  bg-red-900 w-full  rounded-lg"
                          style={{ color: "#fff", width: "100%" }}
                          onClick={() => BlockUser(user._id)}
                        >
                          Already Blocked
                        </button>
                      </td>
                    ) : (
                      <td className="text-red-600">
                        <button
                          onClick={() => BlockUser(user._id)}
                          className="font-medium text-light-600 dark:text-light-500 hover:underline disabled:opacity-25 disabled:cursor-not-allowed p-2  bg-blue-900  w-100 rounded-lg"
                          style={{ color: "#fff", width: "100%" }}
                        >
                          Block User
                        </button>
                      </td>
                    )}{" "}
                    <td className="px-6 py-4">
                      {user.isKYC ? (
                        <button
                          className="font-medium text-light-600 dark:text-light-500 hover:underline disabled:opacity-25 disabled:cursor-not-allowed p-2  bg-blue-900 w-full  rounded-lg"
                          style={{ color: "#fff", width: "100%" }}
                        >
                          Already Approved
                        </button>
                      ) : (
                        <button
                          onClick={() => KycUsers(user._id)}
                          className="font-medium text-light-600 dark:text-light-500 hover:underline disabled:opacity-25 disabled:cursor-not-allowed p-2  bg-red-900  w-100 rounded-lg"
                          style={{ color: "#fff", width: "100%" }}
                        >
                          KYC Approved
                        </button>
                      )}{" "}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        {showLoader && <Loader />}
      </div>
    );
  }
};

export default UsersTable;
