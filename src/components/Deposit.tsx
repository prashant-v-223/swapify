import { useState } from "react";
import TransactionTable from "./TransactionTable";
import axios from "axios";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import DialogBox from "./DialogBox";
import { Transaction } from "@/types";
import { useUserInfo } from "@/store";
import * as Yup from "yup";
import Loader from "./Loader";
const Deposit = () => {
  const { user } = useUserInfo((state) => state.data);
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [transaction, setTransaction] = useState<Transaction>({
    id: "",
    amount: 0,
    amountTo: 0,
    coinFrom: {
      coinCode: "BTC",
      coinName: "Bitcoin",
      network: "BTC",
      networkName: "Bitcoin",
      networkShortName: "",
      icon: "BTC.png",
      memoName: "",
    },
    coinTo: {
      coinCode: "",
      coinName: "",
      network: "",
      networkName: "",
      networkShortName: "",
      icon: "",
      memoName: "",
    },
    comment: null,
    createdAt: new Date(),
    depositAddress: "",
    depositExtraId: null,
    withdrawalAddress: "",
    withdrawalExtraId: null,
    refundAddress: null,
    refundExtraId: null,
    hashIn: { hash: null, link: null },
    hashOut: { hash: null, link: null },
    rate: 0,
    rateType: "",
    affiliateToken: null,
    status: "",
    email: null,
  });
  const [showLoading, setShowLoading] = useState<boolean>(false);
  function closeModal(): void {
    setIsOpen(false);
  }
  const createTransactiom = async (amount: string, resetForm: () => void) => {
    setShowLoading(true);
    try {
      let response = await axios.post(
        " https://exolix.com/api/v2/transactions",
        {
          amount: amount,
          coinFrom: "BTC",
          coinTo: "USDT",
          withdrawalAddress: "TB7WuKuS9dqPxUMSUvtQvfymA9pRpXQaCb",
          withdrawalExtraId: user._id,
        }
      );
      if (response.status === 201) {
        await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
          transaction: {
            id: response.data.id,
            amount: response.data.amountTo,
            coin: "BTC",
            status: "pending",
            time: response.data.createdAt,
            user_id: user._id,
            transactionType: "deposit",
          },
          userId: user._id,
        });
        setTransaction(response.data);
        setIsOpen(true);
      }
    } catch (error) {
      toast.error("Error while requesting deposit...");
    } finally {
      setShowLoading(false);
      resetForm();
    }
  };

  return (
    <div className="p-4">
      <div className="grid bg-[#1B1B1B] w-full p-4 md:w-11/12 rounded-xl md:grid-cols-2">
        <Formik
          initialValues={{
            amount: "",
            currencyToDeposit: "null",
          }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .required("Required")
              .min(0.0035, "Amount must be greater than or equal to 0.0035"),
            currencyToDeposit: Yup.string().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            createTransactiom(values.amount, resetForm);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start gap-4 p-4">
                <div className="flex w-full rounded-lg border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="amount"
                    name="amount"
                    value={values.amount}
                    type="number"
                    autoComplete="off"
                    inputMode="numeric"
                    placeholder="Enter amount to deposit"
                    className="text-white appearance-none bg-[#242424] outline-none disabled:cursor-not-allowed w-full h-full p-4 "
                  />
                  <div className="w-fit pl-4 flex gap-4 justify-center items-center placeholder-white  h-full border-transparent bg-transparent text-white px-4 py-2 rounded-md appearance-none">
                    <img
                      src="/assets/btc.svg"
                      width={20}
                      height={20}
                      alt="bitcoin"
                    />
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-semibold">BTC</p>
                      <p className="text-[#7E6044] text-sm font-semibold">
                        Bitcoin
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-red-700">{errors?.amount}</p>
                <select
                  id="currencyToDeposit"
                  name="currencyToDeposit"
                  value={values.currencyToDeposit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-white bg-[#242424] w-full h-full p-3.5 appearance-none rounded-lg border-2 border-[#454545]"
                >
                  <option value="" disabled>
                    Select currency to withdraw
                  </option>
                  <option value="BTC">Bitcoin</option>
                </select>
                <p className="text-sm text-red-700">
                  {errors?.currencyToDeposit}
                </p>
                <button
                  type="submit"
                  className={
                    "bg-[#242424] w-fit group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
                  }
                >
                  <img src="/assets/greentick.svg" alt="user" /> Submit request
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex items-start text-left flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl text-[#F3DE1B] font-medium">
            Please make sure
          </h1>
          <div className="flex gap-4">
            <img src="/assets/greentick.svg" alt="user" />{" "}
            <p className="text-white text-base md:text-xl">
              You have entered valid wallet address
            </p>
          </div>
          <div className="flex gap-4">
            <img src="/assets/greentick.svg" alt="user" />{" "}
            <p className="text-white text-base md:text-xl">
              The Minimum Deposit Amount is 0.0035 BTC
            </p>
          </div>
          <div className="flex gap-4">
            <img src="/assets/greentick.svg" alt="user" />{" "}
            <p className="text-white text-base md:text-xl">
              Please Cross Check all the Details
            </p>
          </div>
        </div>
      </div>
      <TransactionTable />
      <DialogBox
        isOpen={isOpen}
        closeModal={closeModal}
        transaction={transaction}
      />
      {showLoading && <Loader />}
    </div>
  );
};

export default Deposit;
