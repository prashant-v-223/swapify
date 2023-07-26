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
  let { user } = useUserInfo((state) => state.data);
  let [data1, setdata1] = useState<any>(user);
  const [youget, setyouget] = useState<any>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState(data?.[0]);
  const [error1, setError1] = useState("");
  // @ts-ignore
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState({
    name: "Tron",
    network: "TRX",
    shortName: "BTT",
  });
  console.log(selected.name, "----", selectedNetwork.network);
  const handleSelect = (value: any) => {
    setSelected(value); // Set the selected value in the parent component
    setyouget("");
  };
  const createTransactiom = async (
    amount: string,
    address: string,
    resetForm: () => void
  ) => {
    try {
      setError1("");
      setShowLoading(true);
      const { data } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=${
          selected.code
        }&coinTo=USDT&networkTo=${selectedNetwork.network}&amount=${Number(
          amount
        )}&rateType=fixed`
      );
      // if (user.balance > data.toAmount) {
      await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
        transaction: {
          time: new Date(),
          amount: data.toAmount,
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

      const response = await axios(
        `${process.env.VITE_SERVER_URL}/users/fetch-user`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setdata1(response.data.user);
      // } else {
      //   toast.error("Please make sure you have enough balance...");
      // }
    } catch (error) {
      console.log(error);
      // @ts-ignore
      if (error?.response.status === 422 && error?.response.data?.minAmount) {
        // @ts-ignore
        setError1(`Minimum withdraw amount ${error?.response.data?.minAmount}`);
      } else {
        // @ts-ignore
        setError1(error?.response?.data?.error);
      }
    } finally {
      resetForm();
      setShowLoading(false);
    }
  };

  const handleKeyDown = async (amount: number) => {
    try {
      setError1("");
      setyouget(amount);
      // @ts-ignore
      const { data } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=${
          selected.code
        }&coinTo=${"USDT"}&networkTo=${"TRX"}&amount=${Number(
          amount
        )}&rateType=fixed`
      );
    } catch (error) {
      // @ts-ignore
      if (error?.response.status === 422 && error?.response.data?.minAmount) {
        // @ts-ignore
        setError1(`Minimum withdraw amount ${error?.response.data?.minAmount}`);
      } else {
        // @ts-ignore
        setError1(error?.response?.data?.error);
      }
    }
  };

  return (
    <div className="p-2 md:p-4" data-aos="fade-up">
      <div className="grid  bg-[#1B1B1B]  w-full p-4 rounded-xl md:grid-cols-2">
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
              <div className="flex flex-col justify-center items-start gap-4 md:p-4">
                <div className="flex relative w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    onChange={(e: any) => {
                      const regex: any = /^[0-9]*\.?[0-9]*$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        handleChange(e);
                        handleKeyDown(e.target.value);
                      }
                    }}
                    id="amount"
                    name="amount"
                    value={youget}
                    type="tel"
                    autoComplete="off"
                    inputMode="numeric"
                    placeholder="Enter amount"
                    className="text-white  appearance-none bg-[#242424] outline-none  rounded-lg disabled:cursor-not-allowed w-full h-full p-4 "
                  />
                  <div
                    className="w-fit dropdown pl-4 flex gap-4 justify-center items-center placeholder-white  h-full border-transparent bg-transparent text-white px-4 py-2 rounded-md appearance-none"
                    style={{
                      backgroundColor: "#111010",
                    }}
                  >
                    <DropDown
                      selectedValues={selectedValues}
                      items={data}
                      selected={selected}
                      selected1={undefined}
                      handleSelect={handleSelect}
                      setSelectedNetwork={setSelectedNetwork}
                    />
                  </div>
                </div>
                {error1 === "" && (
                  <p className="text-gray-400 pt-2">{errors?.amount}</p>
                )}
                <p className="text-gray-400 pt-2">{error1}</p>
                <input
                  id="withdrawAddress"
                  onChange={handleChange}
                  value={values.withdrawAddress}
                  name="withdrawAddress"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your wallet address"
                  className="text-white  h-[60px] md:h-[79px]  bg-transparent bg-[#090807] w-full h-full p-4 border-2 rounded-lg border-[#454545]"
                />
                <p className="text-gray-400 pt-2">
                  {errors?.withdrawAddress}
                </p>
                <button
                  type="submit"
                  className={
                    "bg-[#242424] w-fit disabled:cursor-not-allowed group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
                  }
                >
                  <img src="/assets/greentick.svg" alt="user" />
                  withdraw now
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex items-start text-left flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl text-[#facc15] font-medium">
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
      <TransactionTable data="withdraw" user={data1} />
      {showLoading && <Loader />}
    </div>
  );
};

export default Withdraw;
