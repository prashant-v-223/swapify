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
import data1234 from "./data1.json";
import data123 from "./data.json";
import { toast } from "react-hot-toast";

const fetchRate = async (url: string) => {
  const { data } = await axios.get(
    `${url}`
    // `https://exolix.com/api/v2/rate?coinFrom=${coinFrom}&coinTo=${coinTo}&networkTo=${network}&amount=${network}&rateType=fixed`
  );
  return data;
};
const Deposit = ({ selected1 }: any) => {
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
  const [selected3, setSelected3] = useState(data?.[2]);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValues2, setSelectedValues2] = useState({});
  const [selectedValues3, setSelectedValues3] = useState({});
  const [youget, setyouget] = useState<any>(undefined);
  const [youget1, setyouget1] = useState<any>(null);
  const [rate, setRate] = useState<any>(null);
  const [rate1, setRate1] = useState<any>(null);
  const [error1, setError1] = useState("");
  const [type, settype] = useState<any>("Exchange Crypto");
  const [address, setAddress] = useState("");
  const [min, setmin] = useState<any>(1);
  const [min1, setmin1] = useState<any>(1);
  const [cointo, setcointo] = useState("");
  const [flip, setflip] = useState(true);
  const [brn, setbrn] = useState("");
  const [transactionCoin, setTransactionCoin] = useState({
    coinFrom: "BTC",
    coinTo: "USDT",
    networkFrom: "BTC",
    networkTo: "BTC",
  });
  const [BuyCoin, setBuyCoin] = useState({
    coinFrom: "BTC",
    networkFrom: "BTC",
  });
  const [selectedNetwork, setSelectedNetwork] = useState({
    name: "",
    network: "",
    shortName: "",
    code: "",
  });
  const [selectedNetwork2, setSelectedNetwork2] = useState({
    name: "",
    network: "",
    shortName: "",
    code: "",
  });
  const [selectedNetwork3, setSelectedNetwork3] = useState({
    name: "",
    network: "",
    shortName: "",
    code: "",
  });
  const [selectedNetwork4, setSelectedNetwork4] = useState({
    name: "",
    network: "",
    shortName: "",
    code: "",
  });
  console.log(selectedNetwork4);

  useEffect(() => {
    let data1: any = data.filter((truck: any) => {
      return truck.name.toString().match("Bitcoin");
    });
    setTransactionCoin({
      coinFrom: data1[0].code,
      coinTo: selected2.code,
      networkFrom:
        selectedNetwork.network === "" ? "BTC" : selectedNetwork.network,
      networkTo:
        selectedNetwork2.network === "" ? "TRX" : selectedNetwork2.network,
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
    setcointo(selectedObject["code"]);
    setTransactionCoin({
      ...transactionCoin,
      coinFrom: selected1.code,
      networkFrom: selectedNetwork.network,
    });
    setyouget("");
    setSelectedValues(selectedObject);
    setError1("");
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
    setyouget("");
  };
  const handleSelect4 = (value: any) => {
    setSelectedNetwork4(value);
  };
  const handleSelect3 = (value: any) => {
    setSelected3(value);
    const selectedObject = data.find((item) => item.name === value) || {};
    console.log("selectedObject", selectedValues3);
    setSelectedValues3(selectedObject);
    setBuyCoin({
      coinFrom: value.code,
      networkFrom: selectedNetwork.network,
    });
    setError1("");
    setyouget("");
  };
  useLayoutEffect(() => {
    if (selected1.length < 0) {
      let data1: any = data.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });
      console.log(selectedNetwork);
      console.log(selectedNetwork);

      setTransactionCoin({
        coinFrom: data1[0].code,
        coinTo: selected2.code,
        networkFrom:
          selectedNetwork.network === "" ? "BTC" : selectedNetwork.network,
        networkTo:
          selectedNetwork2.network === "" ? "TRX" : selectedNetwork2.network,
      });
    } else {
      setTransactionCoin({
        coinFrom: selected1.code,
        coinTo: selected2.code,
        networkFrom:
          selectedNetwork.network === "" ? "BTC" : selectedNetwork.network,
        networkTo:
          selectedNetwork2.network === "" ? "TRX" : selectedNetwork2.network,
      });
    }
  }, [selected1, selected2, selectedNetwork, selectedNetwork2]);
  const handleKeyDown = async (amount: string) => {
    setRate(0);
    setError1("");
    setyouget(amount);
    console.log(transactionCoin);
    setTimeout(async () => {
      try {
        let data1: any = data123.filter((truck: any) => {
          return truck.name.toString().match(selected1.name);
        });
        setcointo(data1[0].code);

        const { data } = await axios.get(
          `https://vip-api.changenow.io/v1.3/exchange/estimate?fromCurrency=${
            flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
          }&fromNetwork=${
            flip ? transactionCoin.networkTo : transactionCoin.networkFrom
          }&fromAmount=${Number(amount)}&toCurrency=${
            !flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
          }&toNetwork=${
            !flip ? transactionCoin.networkTo : transactionCoin.networkFrom
          }&type=direct&promoCode=&withoutFee=false`
        );
        const { data: data133 } = await axios.get(
          `https://exolix.com/api/v2/rate?coinFrom=${
            flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
          }&coinTo=${
            !flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
          }&coinFromNetwork=${
            flip ? transactionCoin.networkTo : transactionCoin.networkFrom
          }&coinToNetwork=${
            !flip ? transactionCoin.networkTo : transactionCoin.networkFrom
          }&amount=${Number(100)}&rateType=fixed`
        );
        setRate(
          data?.providers[0]?.estimatedAmount === null
            ? 0
            : data?.providers[0]?.estimatedAmount
        );
        console.log(data133.minAmount);
        setmin(data133.minAmount);
        setbrn((data?.providers[0]?.estimatedAmount > 0).toString());
        setError1("");
      } catch (error: any) {
        if (error?.response?.data?.minAmount === undefined) {
          setError1(error?.response?.data.error);
        } else {
          setError1(`
        The min amount to exchange is ${error?.response?.data?.minAmount}
        `);
          setRate(0);
          setbrn("true");
        }
      }
    }, 100); // 1000 milliseconds (1 second)
  };

  const createTransactiom = async (amount: string, resetForm: () => void) => {
    try {
      setError1("");
      let data1: any = data123.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });

      const { data } = await axios.get(
        `https://vip-api.changenow.io/v1.3/exchange/estimate?fromCurrency=${
          flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
        }&fromNetwork=${
          flip ? transactionCoin.networkTo : transactionCoin.networkFrom
        }&fromAmount=${Number(amount)}&toCurrency=${
          !flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
        }&toNetwork=${
          !flip ? transactionCoin.networkTo : transactionCoin.networkFrom
        }&type=direct&promoCode=&withoutFee=false`
      );
      const data12456 = await axios.get(
        `https://vip-api.changenow.io/v1.3/exchange/estimate?fromCurrency=${
          !flip ? transactionCoin.coinTo : !cointo ? data1[0].code : cointo
        }&fromNetwork=${
          !flip ? transactionCoin.networkTo : transactionCoin.networkFrom
        }&fromAmount=${Number(
          data?.providers[0]?.estimatedAmount
        )}&toCurrency=${"USDT"}&toNetwork=${"TRX"}&type=direct&promoCode=&withoutFee=false`
      );
      console.log(data12456);
      if (data) {
        setShowLoading(true);
        let response = await axios.post(
          "https://exolix.com/api/v2/transactions",
          {
            amount:
              data?.providers[0]?.estimatedAmount -
              (data?.providers[0]?.estimatedAmount * 5) / 100,
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
        await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
          transaction: {
            id: response.data.id,
            amount: response?.data?.amountTo,
            coinFrom: flip
              ? transactionCoin.coinTo
              : !cointo
              ? data1[0].code
              : cointo,
            coinTo: !flip
              ? transactionCoin.coinTo
              : !cointo
              ? data1[0].code
              : cointo,
            status: "pending",
            time: response.data.createdAt,
            user_id: user._id,
            transactionType: "deposit",
          },
          userId: user._id,
        });
        setTransaction(response.data);
        setIsOpen(true);
        setyouget("");
        setRate(0);
        setError1("");
      }
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(
        error?.response?.data.message +
          "  " +
          error?.response?.data.minAmount +
          "  "
      );
    } finally {
      setShowLoading(false);
      resetForm();
    }
  };
  const handleKeyDown1 = async (amount: string) => {
    try {
      setRate1(0);
      setError1("");
      console.log(BuyCoin);
      console.log(
        selectedNetwork3.network === "" ? "TRX" : selectedNetwork3.network
      );
      setyouget1(amount);
      let data1: any = data123.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });
      setcointo(data1[0].code);

      const { data } = await axios.get(
        `https://vip-api.changenow.io/v1.3/exchange/estimate?fromCurrency=${
          selectedNetwork4.code.toLowerCase() !== ""
            ? selectedNetwork4.code.toLowerCase()
            : "aud"
        }&&fromNetwork=${
          selectedNetwork4.code.toLowerCase() !== ""
            ? selectedNetwork4.code.toLowerCase()
            : "aud"
        }&fromAmount=${Number(amount)}&toCurrency=${
          BuyCoin?.coinFrom
        }&toNetwork=${
          selectedNetwork3.network === "" ? "BTC" : selectedNetwork3.network
        }&type=direct&promoCode=&withoutFee=false`
      );
      console.log(data);

      setRate1(
        data?.providers[0]?.estimatedAmount === null
          ? 0
          : data?.providers[0]?.estimatedAmount
      );

      setmin1(data?.summary?.minAmount);
      setbrn((data?.providers[0]?.estimatedAmount > 0).toString());
      setError1("");
    } catch (error: any) {
      if (error?.response?.data?.minAmount === undefined) {
        setError1(error?.response?.data.error);
      } else {
        setError1(`
        The min amount to exchange is ${error?.response?.data?.minAmount}
        `);
        setRate(0);
        setbrn("ture");
      }
    }
  };
  const createTransactiom123 = async (
    amount: string,
    resetForm: () => void
  ) => {
    try {
      setError1("");
      const { data } = await axios.get(
        `https://vip-api.changenow.io/v1.3/exchange/estimate?fromCurrency=${
          selectedNetwork4.code.toLowerCase() !== ""
            ? selectedNetwork4.code.toLowerCase()
            : "aud"
        }&&fromNetwork=${
          selectedNetwork4.code.toLowerCase() !== ""
            ? selectedNetwork4.code.toLowerCase()
            : "aud"
        }&fromAmount=${Number(amount)}&toCurrency=${
          BuyCoin?.coinFrom
        }&toNetwork=${
          selectedNetwork3.network === "" ? "BTC" : selectedNetwork3.network
        }&type=direct&promoCode=&withoutFee=false`
      );
      if (data) {
        const data12456 = await axios.get(
          `https://vip-api.changenow.io/v1.3/exchange/estimate?fromCurrency=${
            BuyCoin?.coinFrom
          }&fromNetwork=${
            selectedNetwork3.network === "" ? "BTC" : selectedNetwork3.network
          }&fromAmount=${Number(
            data?.providers[0]?.estimatedAmount
          )}&toCurrency=${"USDT"}&toNetwork=${"TRX"}&type=direct&promoCode=&withoutFee=false`
        );
        console.log(data12456);
        setShowLoading(true);
        await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
          transaction: {
            id: data?.providers[0]?.id,
            amount: data12456.data?.providers[0]?.estimatedAmount,
            coinFrom:
              selectedNetwork4.code.toLowerCase() !== ""
                ? selectedNetwork4.code.toLowerCase()
                : "aud",
            coinTo: BuyCoin?.coinFrom,
            status: "pending",
            time: new Date(),
            user_id: user._id,
            transactionType: "deposit",
          },
          userId: user._id,
        });
        setIsOpen(true);
        setyouget("");
        setRate(0);
        setError1("");
      }
    } catch (error: any) {
      if (error?.response?.data?.minAmount === undefined) {
        toast.error(error?.response?.data.error);
      } else {
        toast.error(`
      The min amount to exchange is ${error?.response?.data?.minAmount}
      `);
        setError1(`
        The min amount to exchange is ${error?.response?.data?.minAmount}
        `);
      }
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
        {type === "Exchange Crypto" && (
          <div className="pb-4">
            <button
              className={`px-3 py-2  mb-5 ${
                type !== "Buy / Sell Crypto" ? "active-btn" : ""
              }`}
              onClick={() => {
                settype("Exchange Crypto");
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              Exchange Crypto
            </button>
            <button
              className={`px-3 py-2 ${
                type === "Buy / Sell Crypto" ? "active-btn" : ""
              }`}
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={() => {
                settype("Buy / Sell Crypto");
              }}
            >
              Buy Crypto
            </button>
            <div
              className="ExchangeTop_advantage__baA2Y md:px-4 py-4 md:py-0"
              style={{ color: "#fff", display: "flex" }}
            >
              <div
                className="ExchangeTop_advantageItem__5TJeU"
                style={{ color: "#fff", display: "flex" }}
              >
                Excellent rating on
              </div>
              <div
                className="ExchangeTop_advantageItem__5TJeU"
                style={{ color: "#fff", display: "flex" }}
              >
                <div className="ExchangeTop_trust__hjLah">
                  <div
                    className="TrustBox_trustpilotBox__i66t2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <a
                        href="https://www.trustpilot.com/review/exolix.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="TrustBox_logo__-Ngun mb-1 px-2"
                          src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg"
                          alt="Trustpilot logo"
                          width="144"
                          height="36"
                          style={{ width: 100 }}
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.trustpilot.com/review/exolix.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="TrustBox_rating__qI0Fc false px-2"
                          src="https://exolix.com/img/stars/4.5_star.svg"
                          alt="Trustpilot rating stars"
                          width="300"
                          height="56"
                          style={{ width: 100 }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                          if (
                            e.target.value === "" ||
                            regex.test(e.target.value)
                          ) {
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
                          selectedValues={
                            flip ? selectedValues : selectedValues2
                          }
                          items={data.slice(0, 100)}
                          selected={flip ? selected2 : selected1}
                          selected1={flip ? selected2 : selected1}
                          handleSelect={handleSelect2}
                          setSelectedNetwork={setSelectedNetwork2}
                        />
                      </div>
                    </div>
                    <span
                      className={`ExchangeForm_exchangeBg__csoF9 ${
                        flip ? "open" : "null"
                      }`}
                      onClick={() => {
                        setflip(!flip);
                        setyouget("");
                        setRate(0);
                        setbrn("");
                      }}
                    >
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="exchange">
                          <path
                            id="Shape"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22.1589 5.99713L27.7373 11.7699L22.1589 17.5426V13.2131L12.3581 13.2131L12.3581 10.3267L22.1589 10.3267V5.99713ZM17.95 21.8722L8.1493 21.8722V26.2017L2.57086 20.429L8.1493 14.6562L8.1493 18.9858L17.95 18.9858L17.95 21.8722Z"
                            fill="white"
                          ></path>
                          <path
                            id="Shape_2"
                            d="M27.7354 11.7699L22.1569 5.99713V10.3267L12.3562 10.3267L12.3562 13.2131L22.1569 13.2131V17.5426L27.7354 11.7699Z"
                            fill="#F9DA0A"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <label htmlFor="currencyToSend" className="text-white">
                      You Get
                    </label>
                    <div className="flex relative w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                      <input
                        id="amount"
                        name="amount"
                        value={rate - (rate * 5) / 100}
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
                          selectedValues={
                            !flip ? selectedValues : selectedValues2
                          }
                          items={data.slice(0, 100)}
                          selected={!flip ? selected2 : selected1}
                          selected1={!flip ? selected2 : selected1}
                          handleSelect={handleSelect}
                          setSelectedNetwork={setSelectedNetwork}
                        />
                      </div>
                    </div>
                    {rate}
                    {
                      <>
                        <p className="text-gray-400 pt-2">
                          {youget < min
                            ? `minimum amount` +
                              " " +
                              min +
                              transactionCoin.coinTo
                            : ""}
                        </p>
                      </>
                    }
                    <button
                      type="submit"
                      className={`${
                        min > youget
                          ? "bg-[#242424] text-[#fff]"
                          : "bg-[#f9da0a] text-[#000]"
                      } mt-4 w-fit group gap-2 flex items-center rounded-lg p-4 text-sm `}
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      <img src="/assets/greentick.svg" alt="user" /> Deposit now
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}
        {type === "Buy / Sell Crypto" && (
          <div className="pb-4">
            <button
              className={`px-3 py-2  mb-5 ${
                type !== "Buy / Sell Crypto" ? "active-btn" : ""
              }`}
              onClick={() => {
                settype("Exchange Crypto");
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              Exchange Crypto
            </button>
            <button
              className={`px-3 py-2 ${
                type === "Buy / Sell Crypto" ? "active-btn" : ""
              }`}
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={() => {
                settype("Buy / Sell Crypto");
              }}
            >
              Buy Crypto
            </button>
            <div
              className="ExchangeTop_advantage__baA2Y md:px-4 py-4 md:py-0"
              style={{ color: "#fff", display: "flex" }}
            >
              <div
                className="ExchangeTop_advantageItem__5TJeU"
                style={{ color: "#fff", display: "flex" }}
              >
                Excellent rating on
              </div>
              <div
                className="ExchangeTop_advantageItem__5TJeU"
                style={{ color: "#fff", display: "flex" }}
              >
                <div className="ExchangeTop_trust__hjLah">
                  <div
                    className="TrustBox_trustpilotBox__i66t2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <a
                        href="https://www.trustpilot.com/review/exolix.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="TrustBox_logo__-Ngun mb-1 px-2"
                          src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg"
                          alt="Trustpilot logo"
                          width="144"
                          height="36"
                          style={{ width: 100 }}
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.trustpilot.com/review/exolix.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="TrustBox_rating__qI0Fc false px-2"
                          src="https://exolix.com/img/stars/4.5_star.svg"
                          alt="Trustpilot rating stars"
                          width="300"
                          height="56"
                          style={{ width: 100 }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Formik
              initialValues={{
                amount: "",
              }}
              validateOnChange={true}
              validationSchema={Yup.object({
                amount: Yup.number().required("Required"),
              })}
              onSubmit={(values, { resetForm }) => {
                createTransactiom123(values.amount, resetForm);
              }}
            >
              {({ handleChange: handleChange1, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-center items-start gap-2 md:p-4">
                    <label htmlFor="currencyToSend" className="text-white">
                      You Send
                    </label>
                    <div className="flex relative w-full rounded-lg flex-col md:flex-row justify-center border-1 md:border-2 border-[#454545] items-center  bg-[#242424]">
                      <input
                        id="amount"
                        name="amount"
                        value={youget1}
                        onChange={(e) => {
                          const regex: any = /^[0-9]*\.?[0-9]*$/;
                          if (
                            e.target.value === "" ||
                            regex.test(e.target.value)
                          ) {
                            handleChange1(e);
                            handleKeyDown1(e.target.value);
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
                          selectedValues={null}
                          items={data1234.slice(0, 100)}
                          selected={data1234[8]}
                          selected1={data1234[8]}
                          setSelectedNetwork={setSelectedNetwork4}
                          handleSelect={handleSelect4}
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
                        value={rate1}
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
                          selectedValues={
                            !flip ? selectedValues : selectedValues2
                          }
                          items={data.slice(0, 100)}
                          selected={selected1}
                          selected1={selected1}
                          handleSelect={handleSelect3}
                          setSelectedNetwork={setSelectedNetwork3}
                        />
                      </div>
                    </div>
                    {youget1 !== undefined && (
                      <p className="text-gray-400 pt-2">
                        {youget1 !== "" &&
                        (min1 > youget1).toString() === "true"
                          ? `minimum amount` + " " + min1 + " "
                          : ""}
                        {youget1 !== "" &&
                        (min1 > youget1).toString() === "true"
                          ? selectedNetwork4?.code
                            ? selectedNetwork4?.code
                            : "AUD"
                          : ""}
                      </p>
                    )}
                    <button
                      type="submit"
                      className={`${
                        min1 > youget1
                          ? "bg-[#242424] text-[#fff]"
                          : "bg-[#f9da0a] text-[#000]"
                      } mt-4 w-fit group gap-2 flex items-center rounded-lg p-4 text-sm `}
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      <img src="/assets/greentick.svg" alt="user" /> Deposit now
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}
        <div className="flex items-start text-left flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl cursor-pointer text-[#F9DA0A] font-medium">
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
        type={type}
        transaction={transaction}
      />
      {showLoading && <Loader />}
    </div>
  );
};

export default Deposit;
