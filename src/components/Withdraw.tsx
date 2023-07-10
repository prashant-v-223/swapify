import { useUserInfo } from "@/store";
import axios from "axios";
import { Formik } from "formik";
import toast from "react-hot-toast";
import TransactionTable from "./TransactionTable";
import * as Yup from "yup";
import { useState } from "react";
import Loader from "./Loader";
const Withdraw = () => {
  const { user } = useUserInfo((state) => state.data);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const createTransactiom = async (
    amount: string,
    address: string,
    resetForm: () => void
  ) => {
    try {
      console.log(user.balance ,Number(amount));
      const { data } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=BTC&coinTo=USDT&networkTo=TRX&amount=${Number(amount)}&rateType=fixed`
      );
      if (user.balance > data.toAmount) {
        setShowLoading(true);
      let response = await axios.post(
        "https://exolix.com/api/v2/transactions",
        {
          amount: amount,
          coinFrom: "BTC",
          coinTo: "USDT",
          withdrawalAddress: address,
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
          transactionType: "withdraw",
        },
        userId: user._id,
      });
      toast.success("Withdrawal request sent successfully");
     }
     else{
      toast.error("Error while requesting withdrawal...");
     }
      }
      else{
        toast.error("Please make sure you have enough balance...");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please make sure you have enough balance...");
    } finally {
      resetForm();
      setShowLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="grid bg-[#1B1B1B] w-full p-4 md:w-11/12 rounded-xl md:grid-cols-2">
        <Formik
          initialValues={{
            amount: "",
            withdrawAddress: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .required("Required")
              .min(0.0035, "Amount must be greater than or equal to 0.0035"),
            withdrawAddress: Yup.string().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            createTransactiom(values.amount, values.withdrawAddress, resetForm);
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start gap-4 p-4">
                <div className="flex w-full rounded-lg border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    id="amount"
                    name="amount"
                    onChange={handleChange}
                    value={values.amount}
                    type="number"
                    inputMode="numeric"
                    placeholder="Select amount to withdraw"
                    autoComplete="off"
                    className="text-white appearance-none bg-[#242424] outline-none disabled:cursor-not-allowed w-full h-full p-4 "
                  />
                  <div className="w-fit pl-4 flex gap-4 justify-center items-center placeholder-white bg-[#090807]  h-full border-transparent bg-transparent text-white px-4 py-2 rounded-md appearance-none">
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
                <input
                  id="withdrawAddress"
                  onChange={handleChange}
                  value={values.withdrawAddress}
                  name="withdrawAddress"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your USDT TRC20 wallet address"
                  className="text-white bg-transparent bg-[#090807] w-full h-full p-4 border-2 rounded-lg border-[#454545]"
                />
                <p className="text-sm text-red-700">
                  {errors?.withdrawAddress}
                </p>

                <button
                  type="submit"
                  className={
                    "bg-[#242424] w-fit disabled:cursor-not-allowed group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
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
              You have enough deposited balance to withdraw the currency
            </p>
          </div>
        </div>
      </div>
      <TransactionTable /> 
      {showLoading && <Loader />}
    </div>
  );
};

export default Withdraw;
