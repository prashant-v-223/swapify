import axios from "axios";
import { useQuery } from "react-query";
import Loader from "./Loader";
import React from "react";
const AdminTable = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const { data, isLoading, refetch } = useQuery("transactionlist", async () => {
    const { data } = await axios.get<{
      transactionIds: [
        {
          id: string;
          amount: number;
          coin: string;
          status: string;
          time: string;
          user_id: string;
          transactionType: string;
        }
      ];
    }>(`${process.env.VITE_SERVER_URL}/users/transactionIds`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    return data;
  });
  const updateTransaction = async (
    id: string,
    status: string,
    transactionId: string,
    transactionType: string
  ) => {
    try {
      setShowLoader(true);
      let response = await axios.put(
        `${process.env.VITE_SERVER_URL}/users/update-transaction`,
        {
          status: status,
          userId: id,
          transactionId: transactionId,
          transactionType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      {showLoader && <Loader />}
      {data?.transactionIds.length ? (
        <table className="w-full text-sm text-left text-gray-500 md:border border-[#606060]">
          <thead className="text-sm sm:text-base bg-[#303131] rounded-lg text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Id
              </th>
              <th scope="col" className="px-6 py-3">
                Coin
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.transactionIds.map((data) => (
              <tr
                key={data.id}
                className="bg-[#1b1b1b] border-b border-[#444242] text-white"
              >
                <td className="px-6 py-4">{data.id}</td>
                <td className="px-6 py-4">{data.coin}</td>
                <td className="px-6 py-4">{data.transactionType}</td>
                <td className="px-6 py-4">{data.time}</td>
                <td className="px-6 py-4">{data.status}</td>
                <td className="px-6 py-4">{data.amount} $</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <button
                    disabled={data.status === "approved"}
                    onClick={() => {
                      updateTransaction(
                        data.user_id,
                        "approved",
                        data.id,
                        data.transactionType
                      );
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Approve
                  </button>
                  <button
                    disabled={data.status === "rejected"}
                    onClick={() => {
                      updateTransaction(
                        data.user_id,
                        "rejected",
                        data.id,
                        data.transactionType
                      );
                    }}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <h1 className="text-2xl font-semibold text-gray-500">
            No Transactions
          </h1>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
