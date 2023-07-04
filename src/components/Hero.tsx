import { useState } from "react";

const Hero = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="grid md:flex md:justify-around grid-col-1 gap-4 p-4 md:p-0 w-full">
      <div className="flex flex-col gap-4  justify-center ">
        <span className="text-white md:my-1 text-3xl md:text-[48px] font-bold leading-10">
          Exchange your crypto
        </span>
        <span className="text-white md:my-1 text-3xl md:text-[48px] font-bold leading-10">
          assets instantly on
        </span>
        <span className="text-3xl md:my-1 md:text-[48px] font-bold leading-10 text-yellow-400">
          Escoswap
        </span>
        <div className="text-white text-base md:my-1 md:text-xl font-medium leading-9">
          You can instantly swap your cryptocurrency <br />
          assets on escoswap with minimal fees.
        </div>
        {/* \#F9DA0A, #7E6044 */}
        <button className="p-3 md:p-4 md:w-52 w-full bg-gradient-to-r from-[#F9DA0A] to-[#F9DA0A] text-[#000000] font-semibold rounded-xl text-base ">
          Get started
        </button>
      </div>
      <div className="md:w-[365px] lg:w-[450px] justify-center w-full h-full bg-neutral-900 rounded-3xl p-4 px-6">
        <p className="text-white my-4 text-xl font-medium leading-9">
          You send
        </p>
        <div className="flex text-white">
          <div className="relative gap-4 w-full">
            <input
              type="text"
              placeholder="1"
              className="py-4 px-4 rounded-md placeholder-white placeholder-inherit bg-transparent border border-[#4E4E4E80] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
           <div className="absolute w-fit flex gap-4 justify-center items-center placeholder-white bg-[#090807] right-0 top-0 bottom-0 h-full border-transparent bg-transparent text-white py-2 pr-8 pl-4 rounded-md appearance-none">
              <img src="/assets/btc.svg" alt="bitcoin" />
              <div className="flex flex-col">
                <p className="text-white font-semibold">BTC</p>
                <p className="text-[#7E6044] font-semibold">Bitcoin</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-white my-4 text-xl font-medium leading-9">You get</p>
        <div className="flex text-white">
          <div className="relative gap-4 w-full">
            <input
              type="text"
              placeholder="1"
              className="py-4 px-4 rounded-md placeholder-white placeholder-inherit bg-transparent border border-[#4E4E4E80] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <div className="absolute w-fit flex gap-4 justify-center items-center placeholder-white bg-[#090807] right-0 top-0 bottom-0 h-full border-transparent bg-transparent text-white py-2 pr-8 pl-4 rounded-md appearance-none">
              <img src="/assets/eth.svg" alt="bitcoin" />
              <div className="flex flex-col">
                <p className="text-white font-semibold">ETH</p>
                <p className="text-[#7E6044] font-semibold">Ethereum</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-4">
          <span className="text-white text-sm">Minimum amount 0.0035 BTC</span>
          <span className="text-white text-sm">1 BTC = 15.20 Ethereum</span>
        </div>
        <div className="flex items-center my-4">
          <label className="flex items-center">
            <input
              type="radio"
              className={isChecked ? "hidden" : "block"}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div
              className={` flex justify-center items-center rounded-full border-gray-300 focus:ring-2`}
            >
              {isChecked && (
                <img
                  width={40}
                  height={40}
                  src={"/assets/accept.svg"}
                  alt="Accepted"
                />
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-[#898787]">
              By clicking Swap assets you agree to the terms & policy of
              Escoswap exchange
            </span>
          </label>
        </div>
        <button className="p-3 md:p-3.5 flex items-center gap-2 justify-center w-full bg-[#F5D815E5] text-[#000000] font-semibold rounded-xl text-base">
          <img src="/assets/swap.svg" alt="swap" />
          Swap assets
        </button>
      </div>
    </div>
  );
};

export default Hero;
