import { Coinlist } from "./fakedata";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const TopCrypto = ({ view, setOpenTab, setSelected1 }: any) => {
  const navigate = useNavigate();
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
  const parallelRequest = async () => {
    try {
      const coinPromises = [
        fetchRate("BTC", "USDT"),
        fetchRate("ETH", "USDT"),
        fetchRate("BNB", "USDT"),
        fetchRate("XRP", "USDT"),
        fetchRate("ADA", "USDT"),
        fetchRate("DOGE", "USDT"),
        fetchRate("LTC", "USDT"),
      ];

      const coins = await Promise.allSettled(coinPromises);

      const updatedCoins = coins.map((result, index) => {
        if (result.status === "fulfilled") {
          const { image, name, id } = Coinlist[index];
          return { ...result.value, image, name, id };
        } else {
          // Handle rejected promise (optional)
          console.log(`Promise at index ${index} rejected: ${result.reason}`);
          return null; // or any other fallback value
        }
      });

      return updatedCoins.filter((coin) => coin !== null) as any;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery("coins", parallelRequest);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  return (
    <>
      <div className={` ${view !== "deshbord" ? "px-16" : "px-0"}  py-10`}>
        <p className="text-white font-semibold text-3xl py-10">
          Top cryptocurrencies
        </p>
        <div className={`${view !== "deshbord" ? "m-6" : "m-0"}`}>
          <div className="flex relative  rounded-3xl topcrypto overflow-x-auto mt-4 justify-around flex-col md:flex-wrap md:flex-row px-8 pb-6">
            <div className="w-full overflow-x-auto min-w-[600px] font-semibold text-sm text-left text-gray-500 ">
              <div className="text-sm sm:text-base text-center bg-transparent rounded-lg text-white p-6 grid grid-cols-4">
                <p className="p-6 flex justify-flex-start items-center">From</p>
                <p className="p-6 flex justify-flex-start items-center">To</p>
                <p className="p-6 ">Price</p>
                <p className="p-6 text-transparent">Price</p>
              </div>
              <div className="">
                {isLoading ? (
                  <div
                    role="status"
                    className="w-full p-4 space-y-4  divide-y rounded shadow animate-pulse divide-gray-700 md:p-6 border-gray-700"
                  >
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pt-4"
                      >
                        <div>
                          <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                        </div>
                        <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
                        <div>
                          <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  data?.map((crypto: any, index: number) => (
                    <div
                      key={crypto.id}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                      className="bg-transparent text-center text-white grid grid-cols-4 hover:bg-[#35353770] cursor-pointer items-center"
                    >
                      <div className="px-6 py-4 flex justify-flex-start">
                        <div className="gap-4 flex justify-flex-start items-center">
                          <img
                            width={30}
                            height={40}
                            src={crypto.image}
                            alt={crypto.id}
                          />
                          <span>{crypto.name.split(" ")[0]}</span>
                        </div>
                      </div>
                      <p className="px-6 py-4 flex justify-flex-start items-center">
                        {" "}
                        <img
                          width={40}
                          height={50}
                          src={
                            "https://static.openfintech.io/payment_methods/usdt/icon.png?w=278&c=v0.59.26#w100"
                          }
                          alt={crypto.id}
                        />
                        USDT
                      </p>
                      <p className="px-6 py-4 flex justify-center items-center">
                        {isLoading ? 0 : Number(crypto.rate).toFixed(3)} $
                      </p>
                      {hoveredIndex === index ? (
                        <div
                          data-aos="flip-left"
                          onClick={() => {
                            if (localStorage.getItem("token") === null) {
                              navigate("/login");
                            } else {
                              setOpenTab(2);
                              setSelected1(crypto);
                              console.log("localStorage.getItem(token)");
                            }
                          }}
                          className="bg-[#cb9b27] w-fit h-fit py-2 rounded-md px-4 block m-auto"
                        >
                          {" "}
                          Exchange{" "}
                        </div>
                      ) : (
                        <img
                          src="/assets/eswap.svg"
                          alt="swap"
                          className="block m-auto"
                          onMouseOver={() => {
                            setHoveredIndex(index);
                          }}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCrypto;
