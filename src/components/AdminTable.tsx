import axios from "axios";
import { useQuery } from "react-query";
import Loader from "./Loader";
import React from "react";
import { Dialog } from "@headlessui/react";
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { convertDate } from "@/utils";

function TransactionDialog({ isOpen, setIsOpen, data, updateTransaction }: {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  data: any,
  updateTransaction: (userId: string, status: string, transactionId: string, transactionType: string) => void
}) {
  function closeModal() {
    setIsOpen(false)
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Withdrawal Address
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {data?.address}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        updateTransaction(
                          data.user_id,
                          "approved",
                          data.id,
                          data.transactionType
                        );
                      }}
                    >
                      Approve Withdrawal
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const AdminTable = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const approveWithdrawal = () => {
    setIsOpen(true);
  };
  const { data, isLoading, refetch } = useQuery("transactionlist", async () => {
    const { data } = await axios.get<{
      transactionIds: [
        {
          id: string;
          amount: number;
          coin: string;
          status: string;
          time: Date;
          user_id: string;
          transactionType: string;
          coinFrom: string;
          coinTo: string;
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
    <div className="relative overflow-x-auto sm:rounded-lg mt-10">
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
                {data.transactionType == "deposit" ? <td className="px-6 py-4"> {data?.coinFrom} </td> : data.coin}
                <td className="px-6 py-4">{data.transactionType}</td>
                <td className="px-6 py-4">{convertDate(data?.time)}</td>
                <td className="px-6 py-4">{data.status}</td>
                <td className="px-6 py-4">{data.amount.toFixed(3)} $</td>

                {
                  data.transactionType == "deposit" ?
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <button
                        disabled={data.status === "rejected" || data.status === "approved"}
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
                        disabled={data.status === "rejected" || data.status === "approved"}
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
                    </td> : <td className="flex items-center px-6 py-4 space-x-3">
                      <button
                        disabled={data.status === "rejected" || data.status === "approved"}
                        onClick={() => approveWithdrawal()}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>
                      <button
                        disabled={data.status === "rejected" || data.status === "approved"}
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
                }
                <TransactionDialog updateTransaction={updateTransaction} data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
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
