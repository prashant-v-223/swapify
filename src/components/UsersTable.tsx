import { convertDate } from "@/utils";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Loader from "./Loader";

const UsersTable = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const fetchUsers = async () => {
    const { data } = await axios.get(`${process.env.VITE_SERVER_URL}/users/get-all-users`);
    return data;
  }
  const { data ,refetch } = useQuery("users", fetchUsers);
  
  const BlockUser = async (id: string) => {
    try {
      setShowLoader(true);
      const { status } = axios.put(`${process.env.VITE_SERVER_URL}/users/block/${id}`) as any;
      if (status === 200) {
        toast.success("User Blocked");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally{
      setShowLoader(false);
    }
  }
  if (data?.users.length !== 0) {
    return (
      <div className="relative overflow-x-auto mt-4 ">
        <table className="w-full text-sm text-left text-gray-500 md:border border-[#606060]">
          <thead className="text-sm sm:text-base bg-[#303131] rounded-lg text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No.
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
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user: { _id: string; name: string; status: string; email: string; balance: number; createdAt: Date; isBlocked: Boolean }, index: number) => {
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
                  <td className="px-6 py-4">{user?.name}</td>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">{convertDate(user?.createdAt)}</td>
                  <td className="px-6 py-4">{user?.balance}</td>
                  {
                    user.isBlocked ? <td className="text-red-600">Already Blocked</td> :

                      <button className="px-6 py-4 text-red-500 cursor-pointer" onClick={() => BlockUser(user._id)} >Block User</button>
                  }
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          showLoader && <Loader />
        }
      </div>
    );
  }
};

export default UsersTable;
