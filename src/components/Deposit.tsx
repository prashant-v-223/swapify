import { useEffect, useLayoutEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import axios from "axios";
import { Formik } from "formik";
import DialogBox from "./DialogBox";
import { Transaction } from "@/types";
import { useUserInfo } from "@/store";
import * as Yup from "yup";
import Loader from "./Loader";
import DropDown from "./Dropdown";
import data from "./data.json";
import data123 from "./data.json";

const fetchRate = async (
  coinFrom: string,
  coinTo: string,
  network: string = "ETH"
) => {
  const { data } = await axios.get(
    `https://exolix.com/api/v2/rate?coinFrom=${coinFrom}&coinTo=${coinTo}&networkTo=${network}&amount=11111&rateType=fixed`
  );
  return data;
};
const Deposit = ({ selected1 }: any) => {
  console.log("selected1selected1selected1", selected1);

  let { user } = useUserInfo((state) => state.data);
  let [data1, setdata1] = useState<any>(user);
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
  const [selected2, setSelected2] = useState(data?.[2]);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValues2, setSelectedValues2] = useState({});
  const [youget, setyouget] = useState("");
  const [rate, setRate] = useState<any>(null);
  const [error1, setError1] = useState("");
  const [address, setAddress] = useState("");
  const [min, setmin] = useState("");
  const [cointo, setcointo] = useState("");
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
  useEffect(() => {
    let data1: any = data.filter((truck: any) => {
      return truck.name.toString().match("Bitcoin");
    });
    setTransactionCoin({
      coinFrom: data1[0].code,
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
  }, []);

  useEffect(() => {
    switch (transactionCoin.networkTo) {
      case "USDT":
        setAddress("TQr7CQvFk3RhLXZHiNoEy6sx4ZGJSFokCz");
        break;
      case "BTC":
        setAddress("bc1qf6c24nv96068hjt3krzn8eaz5eajt3f4j8lkp4");
        break;
      case "ETH":
        setAddress("0xac5eb20148038Ba2989A4C0b07eCf6E87D7cEca3");
        break;
      case "BTT":
        setAddress("TQr7CQvFk3RhLXZHiNoEy6sx4ZGJSFokCz");
        break;
      case "TRX":
        setAddress("TJXxDh6T1pQ4ksBbqRuAUzBHfdBS2H51Yd");
        break;
      case "XRP":
        setAddress("rNxp4h8apvRis6mJf9Sh8C6iRxfrDWN7AV");
        break;
      case "XTZ":
        setAddress("tz2WGj1Ua26FaqnEiCing6q2wsg38ZtexhwM");
        break;
      case "BSC":
        setAddress("0xac5eb20148038Ba2989A4C0b07eCf6E87D7cEca3");
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
  const handleSelect = (value: any) => {
    const selectedObject: any =
      data.find((item) => item.name === value.name) || {};
    console.log(selectedObject);
    setcointo(selectedObject["code"]);
    setTransactionCoin({
      ...transactionCoin,
      coinFrom: selected1.code,
      networkFrom: selectedNetwork.network,
    });
    setyouget("");
    setSelectedValues(selectedObject);
    setError1("");
    setRate("");
    setyouget("");
  };

  const handleSelect2 = (value: any) => {
    setSelected2(value); // Set the selected value in the parent component
    const selectedObject = data.find((item) => item.name === value) || {};
    setSelectedValues2(selectedObject);
    setTransactionCoin({
      ...transactionCoin,
      coinFrom: selected2.code,
      networkFrom: selectedNetwork2.network,
    });
    setError1("");
    setRate("");
    setyouget("");
  };
  useLayoutEffect(() => {
    if (selected1.length < 0) {
      let data1: any = data.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });
      console.log(selected2);
      setTransactionCoin({
        coinFrom: data1[0].code,
        coinTo: selected2.code,
        networkFrom:
          selectedNetwork.network !== "" ||
          selectedNetwork.network !== undefined
            ? selectedNetwork.network
            : "TRX",
        networkTo:
          selectedNetwork2.network !== "" ||
          selectedNetwork2.network !== undefined
            ? selectedNetwork2.network
            : "BTT",
      });
    } else {
      setTransactionCoin({
        coinFrom: selected1.code,
        coinTo: selected2.code,
        networkFrom:
          selectedNetwork.network !== "" ||
          selectedNetwork.network !== undefined
            ? selectedNetwork.network
            : "TRX",
        networkTo:
          selectedNetwork2.network !== "" ||
          selectedNetwork2.network !== undefined
            ? selectedNetwork2.network
            : "BTT",
      });
    }
  }, [selected1, selected2, selectedNetwork, selectedNetwork2]);
  const handleKeyDown = async (amount: string) => {
    try {
      setError1("");
      setyouget(amount);
      console.log(transactionCoin);

      const data123xx = await fetchRate("USDT", transactionCoin.coinTo);
      setmin(data123xx.minAmount);
      let data1: any = data123.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });
      console.log(!cointo ? data1[0].code : cointo);

      const { data } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=${
          transactionCoin.coinTo
        }&coinTo=${!cointo ? data1[0].code : cointo}&coinFromNetwork=${
          transactionCoin.networkTo
        }&coinToNetwork=${transactionCoin.networkFrom}&amount=${Number(
          amount
        )}&rateType=fixed`
      );
      setRate(data?.toAmount);
      setError1("");
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.minAmount === undefined) {
        setError1(error?.response?.data.error);
      } else {
        setError1(`
        The min amount to exchange is ${error?.response?.data?.minAmount}
        `);
      }
      setRate("");
    }
  };
  const createTransactiom = async (amount: string, resetForm: () => void) => {
    try {
      setError1("");
      let data1: any = data123.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });
      const data123xx = await fetchRate("USDT", transactionCoin.coinTo);
      setmin(data123xx.minAmount);
      const { data } = await axios.get(
        `https://exolix.com/api/v2/rate?coinFrom=${
          transactionCoin.coinTo
        }&coinTo=${!cointo ? data1[0].code : cointo}&coinFromNetwork=${
          transactionCoin.networkTo
        }&coinToNetwork=${transactionCoin.networkFrom}&amount=${Number(
          amount
        )}&rateType=fixed`
      );
      if (data) {
        setShowLoading(true);
        let response = await axios.post(
          "https://exolix.com/api/v2/transactions",
          {
            amount: Number(amount),
            coinFrom: transactionCoin.coinFrom,
            coinTo: transactionCoin.coinTo,
            withdrawalAddress:
              transactionCoin.coinTo === "BTC"
                ? "bc1qf6c24nv96068hjt3krzn8eaz5eajt3f4j8lkp4"
                : address,
            withdrawalExtraId: user._id,
            networkFrom: transactionCoin.networkFrom
              ? transactionCoin.networkFrom
              : "TRX",
            networkTO: transactionCoin.networkTo
              ? transactionCoin.networkTo
              : "BTT",
          }
        );
        if (response.status === 201) {
          console.log(selectedNetwork2.network);

          console.log(data, "data ::::::::");

          await axios.post(
            `${process.env.VITE_SERVER_URL}/users/transactions`,
            {
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
            }
          );
          setTransaction(response.data);
          setIsOpen(true);
          setRate(0);
        }
        setError1("");
      }
    } catch (error: any) {
      if (error?.response?.data?.minAmount === undefined) {
        setError1(error?.response?.data.error);
      } else {
        setError1(`
        The min amount to exchange is ${error?.response?.data?.minAmount}
        `);
      }
      setRate("");
    } finally {
      setShowLoading(false);
      resetForm();
    }
  };

  async function closeModal() {
    setIsOpen(false);
    const response = await axios(
      `${process.env.VITE_SERVER_URL}/users/fetch-user`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    setdata1(response.data.user);
  }

  return (
    <div className="p-2 md:p-4" data-aos="fade-up">
      <div
        className="grid bg-[#1B1B1B] w-full md:
       p-4 rounded-xl md:grid-cols-2"
      >
        <Formik
          initialValues={{
            amount: "",
          }}
          validateOnChange={true}
          validationSchema={Yup.object({
            amount: Yup.number().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            createTransactiom(values.amount, resetForm);
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start gap-2 md:p-4">
                <label htmlFor="currencyToSend" className="text-white">
                  You Send
                </label>
                <div className="flex relative w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    id="amount"
                    name="amount"
                    value={youget}
                    onChange={(e) => {
                      const regex: any = /^[0-9]*\.?[0-9]*$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        handleChange(e);
                        handleKeyDown(e.target.value);
                      }
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="Enter amount"
                    className="text-white appearance-none bg-[#242424] rounded-lg outline-none disabled:cursor-not-allowed w-full h-full p-4 "
                  />
                  <div
                    className="w-fit dropdown pl-4 flex gap-4 justify-center items-center placeholder-white  h-full border-transparent bg-transparent text-white px-4 py-2 rounded-md appearance-none"
                    style={{
                      backgroundColor: "#111010",
                    }}
                  >
                    <DropDown
                      selectedValues={selectedValues2}
                      items={data}
                      selected1={undefined}
                      selected={selected2}
                      handleSelect={handleSelect2}
                      setSelectedNetwork={setSelectedNetwork2}
                    />
                  </div>
                </div>
                <label htmlFor="currencyToSend" className="text-white">
                  You Get
                </label>
                <div className="flex relative w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                  <input
                    id="amount"
                    name="amount"
                    value={rate}
                    type="tel"
                    autoComplete="off"
                    disabled
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
                      selected={selected1}
                      selected1={selected1}
                      handleSelect={handleSelect}
                      setSelectedNetwork={setSelectedNetwork}
                    />
                  </div>
                </div>
                {
                  <p className="text-gray-400 pt-2">
                    {error1 === ""
                      ? ""
                      : error1 !== "Such exchange pair is not available"
                      ? `The min amount to exchange is ${min}`
                      : error1}
                  </p>
                }
                <button
                  type="submit"
                  className={
                    "bg-[#242424] mt-4 w-fit group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
                  }
                >
                  <img src="/assets/greentick.svg" alt="user" /> Deposit now
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex items-start text-left flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl cursor-pointer text-[#facc15] font-medium">
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
      <TransactionTable data="deposit" user={data1} />
      <DialogBox
        isOpen={isOpen}
        closeModal={closeModal}
        address={address}
        transaction={transaction}
      />
      {showLoading && <Loader />}
    </div>
  );
};

export default Deposit;
