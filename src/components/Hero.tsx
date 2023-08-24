import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import DropDown from "./Dropdown";
import data from "./data.json";
import data123 from "./data.json";
import React, { useEffect } from "react";
const fetchRate = async (url: string) => {
  const { data } = await axios.get(`${url}`);
  return data;
};
const Hero = () => {
  const [selected1, setSelected1] = useState<any>([]);
  const [youget, setyouget] = useState<any>(null);
  const [rate, setRate] = useState<any>(null);
  const [flip, setflip] = useState(true);
  const [cointo, setcointo] = useState("");
  const [selected2, setSelected2] = useState(data?.[2]);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValues2, setSelectedValues2] = useState({});
  const [min, setmin] = useState<any>(null);
  const [error1, setError1] = useState("");
  const [transactionCoin, setTransactionCoin] = useState({
    coinFrom: "BTC",
    coinTo: "USDT",
    networkFrom: "BTC",
    networkTo: "TRX",
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
    setSelected1([]);
  }, []);

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
  const handleKeyDown = async (amount: string) => {
    try {
      setRate(0);
      setError1("");
      setyouget(amount);
      console.log(transactionCoin);

      let data1: any = data123.filter((truck: any) => {
        return truck.name.toString().match(selected1.name);
      });
      setcointo(data1[0].code);

      await axios
        .get(
          `https://exolix.com/api/v2/rate?coinFrom=${
            flip ? "USDT" : !cointo ? data1[0].code : cointo
          }&coinTo=${
            !flip ? "USDT" : !cointo ? data1[0].code : cointo
          }&coinFromNetwork=&coinToNetwork=&amount=${Number(
            amount
          )}&rateType=fixed`
        )
        .then(async () => {
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
          setRate(
            data?.providers[0]?.estimatedAmount === null
              ? 0
              : data?.providers[0]?.estimatedAmount
          );
          setError1("");
        })
        .catch((data123xx) => {
          console.log(data123xx.response.data);
          setmin(data123xx.response.data?.minAmount);
          setError1(`
          The min amount to exchange is ${data123xx?.response?.data?.minAmount}
          `);
        });
    } catch (error: any) {
      if (error?.response?.data?.minAmount === undefined) {
        setError1(error?.response?.data.error);
      } else {
        setError1(`
        The min amount to exchange is ${error?.response?.data?.minAmount}
        `);
        setRate(0);
      }
    }
  };
  return (
    <div
      data-aos="fade-up"
      className="grid md:flex md:justify-around grid-col-1 gap-10 px-4 py-10 w-full"
    >
      <div className="flex flex-col gap-4 justify-center md:hidden ">
        <span className="text-white md:my-1 text-2xl font-bold leading-10">
          Exchange your crypto assets instantly on{" "}
          <span
            className="text-3xl font-bold leading-10 text-[#F9DA0A]"
            style={{
              fontFamily: "FrutigerLTPro, inherit auto",
            }}
          >
            Swapfry
          </span>
        </span>
        <div className="text-white text-base font-medium leading-9">
          You can instantly swap your cryptocurrency assets on Swapfry with
          minimal fees.
        </div>
        <Link
          to={"/login"}
          className="p-2 w-full text-center bg-[#F9DA0A] text-[#000000] font-semibold rounded-xl text-base "
        >
          Get started
        </Link>
      </div>
      <div className="md:flex flex-col gap-4  justify-center hidden ">
        <span className="text-white md:my-1 text-2xl md:text-[48px] font-bold leading-10">
          Exchange your crypto
        </span>
        <span className="text-white md:my-1 text-2xl md:text-[48px] font-bold leading-10">
          assets instantly on
        </span>
        <span
          className="text-3xl md:my-1 md:text-[48px] font-bold leading-10 text-[#F9DA0A]"
          style={{
            fontFamily: "FrutigerLTPro, inherit auto",
          }}
        >
          Swapfry
        </span>
        <div className="text-white text-base md:my-1 md:text-xl font-medium leading-9">
          You can instantly swap your cryptocurrency <br />
          assets on Swapfry with minimal fees.
        </div>
        <Link
          to={"/login"}
          className="p-3  text-center  md:p-4 md:w-52 w-full bg-[#F9DA0A] text-[#000000] font-semibold rounded-xl text-base "
        >
          Get started
        </Link>
      </div>
      <div className="justify-center  h-full bg-neutral-900 rounded-3xl p-4 px-6">
        <Formik
          initialValues={{
            amount: "",
          }}
          validateOnChange={true}
          validationSchema={Yup.object({
            amount: Yup.number().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            // createTransactiom(values.amount, resetForm);
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
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
                      selectedValues={!flip ? selectedValues : selectedValues2}
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
                    setRate("");
                    setyouget("");
                  }}
                  style={{
                    top: "35%",
                    left: "50%",
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
                      selectedValues={!flip ? selectedValues : selectedValues2}
                      items={data.slice(0, 100)}
                      selected={!flip ? selected2 : selected1}
                      selected1={!flip ? selected2 : selected1}
                      handleSelect={handleSelect}
                      setSelectedNetwork={setSelectedNetwork}
                    />
                  </div>
                </div>
                {
                  <p className="text-gray-400 pt-2">
                    {youget > 0
                      ? error1 === ""
                        ? ""
                        : error1 !== "Such exchange pair is not available"
                        ? `minimum amount  ${min}  ${
                            flip
                              ? transactionCoin.coinTo
                              : !cointo
                              ? ""
                              : cointo
                          }`
                        : min
                      : null}
                  </p>
                }
                <div className="flex items-center my-4">
                  <div className=" flex justify-center items-center rounded-full border-gray-300 focus:ring-2">
                    <img
                      width="40"
                      height="40"
                      src="/assets/accept.svg"
                      alt="Accepted"
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium text-[#898787]">
                    By clicking Swap assets you agree to the terms &amp; policy{" "}
                    of Swapfry <br /> exchange
                  </span>
                </div>
                <a
                  className="p-3 md:p-3.5 flex items-center gap-2 justify-center w-full bg-[#F9DA0A] text-[#000000] font-semibold rounded-xl text-base"
                  href="/login"
                >
                  <img src="/assets/swap.svg" alt="swap" />
                  Swap assets
                </a>
                {/* <button
                type="submit"
                className={
                  "bg-[#242424] mt-4 w-fit group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
                }
              >
                <img src="/assets/greentick.svg" alt="user" /> Deposit now
              </button> */}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Hero;
