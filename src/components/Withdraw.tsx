import { useUserInfo } from "@/store";
import axios from "axios";
import { Formik } from "formik";
import toast from "react-hot-toast";
import TransactionTable from "./TransactionTable";
import * as Yup from "yup";
import { useState } from "react";
import Loader from "./Loader";
import data from "./data.json";
import DropDown from "./Dropdown";
const Withdraw = () => {
  const { user } = useUserInfo((state) => state.data);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState(data?.[0]);
  // @ts-ignore
  const [selectedValues, setSelectedValues] = useState({});
  const [minimumNetworkAmount, setminimumNetworkAmount] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState({
    name: "Tron",
    network: "TRX",
    shortName: "BTT",
  });
  console.log(selected.name, "----", selectedNetwork.network);
  const handleSelect = (value: any) => {
    setSelected(value); // Set the selected value in the parent component
  };
  const createTransactiom = async (
    amount: string,
    address: string,
    resetForm: () => void
  ) => {
    try {
      setShowLoading(true);
      setminimumNetworkAmount(0);
      const { data } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=${selected.code}&coinTo=USDT&networkTo=${selectedNetwork.network
        }&amount=${Number(amount)}&rateType=fixed`
      );

      if (user.balance > data.toAmount) {
        await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
          transaction: {
            time: new Date(),
            amount:  data.toAmount,
          coin: selected.name,
            status: "pending",
            user_id: user._id,
            transactionType: "withdraw",
            address: address,
            network: selectedNetwork.network,
          },
          userId: user._id,
        });
        toast.success("Withdrawal request sent successfully");
      }
      else {
        toast.error("Please make sure you have enough balance...");
      }
    } catch (error) {
      console.log(error);
      // @ts-ignore
      if (error?.response.status === 422 && error?.response.data?.minAmount) {
        // @ts-ignore
        setminimumNetworkAmount(error?.response.data?.minAmount);
        return toast.error("Amount to exchange is below the possible min amount to exchange");
      }
      toast.error("Such exchange pair is not available ");
    } finally {
      resetForm();
      setShowLoading(false);
    }
  };
  // console.log(selectedNetwork,"selectedNetwork");

  return (
    <div className="p-4">
      <div className="grid bg-[#1B1B1B] w-full p-4 md:w-11/12 rounded-xl md:grid-cols-2">
        <Formik
          initialValues={{
            amount: "",
            withdrawAddress: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.number().required("Required"),
            withdrawAddress: Yup.string().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            createTransactiom(values.amount, values.withdrawAddress, resetForm);
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start gap-4 p-4">
                <div className="flex w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    onChange={handleChange}
                    id="amount"
                    name="amount"
                    value={values.amount}
                    type="tel"
                    autoComplete="off"
                    inputMode="numeric"
                    placeholder="Enter amount"
                    className="text-white  appearance-none bg-[#242424] outline-none  rounded-lg disabled:cursor-not-allowed w-full h-full p-4 "
                  />
                  <div className="w-fit pl-4 flex gap-4 justify-center items-center placeholder-white  h-full border-transparent bg-transparent text-white px-4 py-2 rounded-md appearance-none">
                    <DropDown
                      selectedValues={selectedValues}
                      items={data}
                      selected={selected}
                      handleSelect={handleSelect}
                      setSelectedNetwork={setSelectedNetwork}
                    />
                  </div>
                </div>
                <p className="text-sm text-red-700">{errors?.amount}</p>
                {
                  minimumNetworkAmount > 0 && (
                    <p className="text-sm text-red-700">Minimum amount to exchange is {minimumNetworkAmount}</p>
                  )
                }
                <input
                  id="withdrawAddress"
                  onChange={handleChange}
                  value={values.withdrawAddress}
                  name="withdrawAddress"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your wallet address"
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
