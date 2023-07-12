import { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import axios from "axios";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import DialogBox from "./DialogBox";
import { Transaction } from "@/types";
import { useUserInfo } from "@/store";
import * as Yup from "yup";
import Loader from "./Loader";
import DropDown from "./Dropdown";
import data from "./data.json";
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
  const [selected, setSelected] = useState(data?.[0]);
  const [selected2, setSelected2] = useState(data?.[2]);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValues2, setSelectedValues2] = useState({});
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(false);
  const [minAmount, setMinAmount] = useState(0);
  const [TradingPairError, setSetTradingPairError] = useState(false);
  const [address, setAddress] = useState("");
  const [transactionCoin, setTransactionCoin] = useState({
    coinFrom: "BTC",
    coinTo: "USDT",
    networkFrom: "TRX",
    networkTo: "BTT",
  });

  const [selectedNetwork, setSelectedNetwork] = useState({
    name: "",
    network: "",
    shortName: "",
  });
  const [selectedNetwork2, setSelectedNetwork2] = useState({
    name: "",
    network: "",
    shortName: "",
  });

  const handleSelect = (value: any) => {
    setSelected(value); // Set the selected value in the parent component
    const selectedObject = data.find((item) => item.name === value) || {};
    setSelectedValues(selectedObject);
    setTransactionCoin({
      coinFrom: selected.code,
      coinTo: selected2.code,
      networkFrom: selectedNetwork.network,
      networkTo: selectedNetwork2.network,
    });
    setError(false);
    setRate(0);
    setMinAmount(0);
  };

  const handleSelect2 = (value: any) => {
    setSelected2(value); // Set the selected value in the parent component
    const selectedObject = data.find((item) => item.name === value) || {};
    setSelectedValues2(selectedObject);
    setError(false);
    setRate(0);
    setMinAmount(0);
  };
  useEffect(() => {
    setTransactionCoin({
      coinFrom: selected.code,
      coinTo: selected2.code,
      networkFrom:
        selectedNetwork.network !== "" || selectedNetwork.network !== undefined
          ? selectedNetwork.network
          : "TRX",
      networkTo:
        selectedNetwork2.network !== "" ||
        selectedNetwork2.network !== undefined
          ? selectedNetwork2.network
          : "BTT",
    });
  }, [selected, selected2, selectedNetwork, selectedNetwork2]);

  const handleKeyDown = async (amount: string) => {
    try {
      setSetTradingPairError(false);
      setMinAmount(0);
      const { data, status } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=${
          transactionCoin.coinFrom
        }&coinTo=${transactionCoin.coinTo}&networkTo=${
          transactionCoin.networkTo
        }&amount=${Number(amount)}&rateType=fixed`
      );
      setRate(data?.toAmount);
      if (status === 422) {
        setError(true);
      }
      setError(false);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      setMinAmount(error?.response?.data?.minAmount);
      setError(true);
      // @ts-ignore
      if (error?.response?.data.error) {
        setSetTradingPairError(true);
      }
      setRate(0);
    }
  };
  const createTransactiom = async (amount: string, resetForm: () => void) => {
    setShowLoading(true);
    try {
      let response = await axios.post(
        "https://exolix.com/api/v2/transactions",
        {
          amount: amount,
          coinFrom: transactionCoin.coinFrom,
          coinTo: transactionCoin.coinTo,
          withdrawalAddress: address,
          withdrawalExtraId: user._id,
          networkFrom: transactionCoin.networkFrom ? transactionCoin.networkFrom : "TRX",
          networkTO: transactionCoin.networkTo ? transactionCoin.networkTo : "BTT",
        }
      );
      if (response.status === 201) {
        console.log(selectedNetwork2.network);
        const { data } = await axios.get(
          `https://exolix.com/api/v2/rate?coinFrom=${
            transactionCoin.coinFrom
          }&coinTo=USDT&networkTo=${selectedNetwork2.network}&amount=${Number(
            amount
          )}&rateType=fixed`
        );
        console.log(data, "data ::::::::");

        await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
          transaction: {
            id: response.data.id,
            amount: data.toAmount,
            coinFrom: transactionCoin.coinFrom,
            coinTo: transactionCoin.coinTo,
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
  useEffect(() => {
    switch (transactionCoin.networkTo) {
      case "USDT":
        setAddress("TQr7CQvFk3RhLXZHiNoEy6sx4ZGJSFokCz");
        break;
      case "BTC":
        setAddress("1MmYaftVEfW8o67sDRUnNhgHRuyiV9RJYd");
        break;
      case "ETH":
        setAddress("0x8244adac2673177898fb4eca394c8eb655db255a");
        break;
      case "BTT":
        setAddress("TQr7CQvFk3RhLXZHiNoEy6sx4ZGJSFokCz");
        break;
      case "TRX":
        setAddress("TQr7CQvFk3RhLXZHiNoEy6sx4ZGJSFokCz");
        break;
      case "XRP":
        setAddress("rNxp4h8apvRis6mJf9Sh8C6iRxfrDWN7AV");
        break;
      case "XTZ":
        setAddress("tz2WGj1Ua26FaqnEiCing6q2wsg38ZtexhwM");
        break;
      case "BNB":
        setAddress("0x8244adac2673177898fb4eca394c8eb655db255a");
        break;
      case "AVAXC":
        setAddress("X-avax1yypqyh0vw90ffd8a79dmuwmz9jyq4sfkldakfn");
        break;
      case "AVAX":
        setAddress("0x8244adac2673177898fb4eca394c8eb655db255a");
        break;
      case "HECO":
        setAddress("0x8244adac2673177898fb4eca394c8eb655db255a");
        break;
      case "SOL":
        setAddress("ToxDYZw8LaaWnDrAfMm8TM88UdFzxC71V4ZMJo4rsex");
        break;
      default:
        setAddress("TQr7CQvFk3RhLXZHiNoEy6sx4ZGJSFokCz");
        break;
    }
  }, [transactionCoin.networkTo]);

  function closeModal(): void {
    setIsOpen(false);
  }

  return (
    <div className="p-4">
      <div className="grid bg-[#1B1B1B] w-full p-4 md:w-11/12 rounded-xl md:grid-cols-2">
        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.number().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            createTransactiom(values.amount, resetForm);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start gap-2 p-4">
                <label htmlFor="currencyToSend" className="text-white">
                  You Send
                </label>
                <div className="flex w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="amount"
                    name="amount"
                    value={values.amount}
                    type="tel"
                    autoComplete="off"
                    inputMode="numeric"
                    onKeyUp={() => handleKeyDown(values.amount)}
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
                <label htmlFor="currencyToSend" className="text-white">
                  You Get
                </label>
                <div className="flex w-full flex-col md:flex-row rounded-lg border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    id="amount"
                    name="amount"
                    value={rate}
                    type="tel"
                    disabled
                    autoComplete="off"
                    inputMode="numeric"
                    placeholder="Enter amount"
                    className="text-white appearance-none bg-[#242424] rounded-lg outline-none disabled:cursor-not-allowed w-full h-full p-4 "
                  />
                  <div className="w-fit pl-4  flex gap-4 justify-center items-center placeholder-white  h-full border-transparent bg-transparent text-white px-4 py-2 rounded-md appearance-none">
                    <DropDown
                      selectedValues={selectedValues2}
                      items={data}
                      selected={selected2}
                      handleSelect={handleSelect2}
                      setSelectedNetwork={setSelectedNetwork2}
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-700">
                    Amount to exchange is below the possible min amount to
                    exchange
                  </p>
                )}
                {!!minAmount && (
                  <p className="text-sm text-red-700">
                    The min amount to exchange is {minAmount}
                  </p>
                )}
                {TradingPairError && (
                  <p className="text-red-700">
                    Such exchange pair is not available
                  </p>
                )}
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
          <h1 className="text-2xl cursor-pointer text-[#F3DE1B] font-medium">
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
