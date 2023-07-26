import { BsCassetteFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import { TbFreeRights } from "react-icons/tb";
import { SiSpringsecurity } from "react-icons/si";
import { MdOutlineSupportAgent } from "react-icons/md";

const Features = () => {
  return (
    <div className="my-4 w-full overflow-hidden">
      <div className="md:p-16 p-6 grid">
        <h1 className="text-white text-3xl font-semibold leading-9">
          {/* Swapfry <span className="text-[#f4ba2f]"> features</span> */}
          
        <h1 className="text-white text-3xl font-semibold leading-9 mb-4">
          <span
            className="text-[#f4ba2f]"
            style={{
              fontFamily: "FrutigerLTPro, inherit auto",
            }}
          >
            Swapfry
          </span>
          <span className=""> features</span>
        </h1>
        </h1>
        <h1 className="text-3xl md:text-5xl text-[#F4F4F4] font-semibold">
          Super easy for you to swap with us..
        </h1>
        <p className="text-[#9A9A9A] font-semibold mt-4 text-xl leading-9">
          Start your first swap with these easy steps.
        </p>
      </div>
      <div
        data-aos="fade-left"
        className="grid grid-cols-1 sm:grid-cols-2 md:p-10"
      >
        <div className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px] border-[#333333] border-b-[1px] border-r-[1px]">
          <img
            src="/assets/features.svg"
            alt="getstarted"
            width={40}
            height={40}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Instant Trade
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              With Swapfry, your transactions are executed in a blink of an eye.
              No more missed opportunities due to the volatile market
            </p>
          </div>
        </div>
        <div
          data-aos="fade-right"
          className="flex bg-[#141414] items-center flex-row gap-4  p-6 md:h-[180px] border-b-[1px] border-[#333333]"
        >
          <div className="">
            <BsCassetteFill style={{ color: "#f4ba2f", fontSize: "40px" }} />
          </div>
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Wide Asset Selection
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Swapfry supports a diverse range of cryptocurrencies, including
              Bitcoin (BTC), Ethereum (ETH), Tether (USDT) Litecoin (LTC),
              Ripple (XRP), Tether (USDT) and 400+ more currencies.
            </p>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px] border-b md:border-b-0 border-[#333333] border-r-[1px]"
        >
          <div className="">
            <FaUserShield style={{ color: "#f4ba2f", fontSize: "40px" }} />
          </div>
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              User-Friendly Interface
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              We believe that cryptocurrency trading should be accessible to
              everyone. Our intuitive platform provides a seamless experience
              for both newbies and experienced traders.
            </p>
          </div>
        </div>
        <div
          data-aos="fade-right"
          className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px] border-b  border-[#333333]"
        >
          <div className="">
            <TbFreeRights style={{ color: "#f4ba2f", fontSize: "40px" }} />
          </div>
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Transparent and Low Fees
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              At Swapfry, we believe in fair pricing. We keep zero fees, so you
              can retain more of your hard-earned assets.
            </p>
          </div>
        </div>{" "}
        <div
          data-aos="fade-left"
          className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px] border-b md:border-b-0 border-t md:border-t-1 border-[#333333] border-r-[1px]"
        >
          {" "}
          <div className="">
            <SiSpringsecurity style={{ color: "#f4ba2f", fontSize: "40px" }} />
          </div>
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Robust Security
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Your peace of mind is our top priority. Swapfry employs
              state-of-the-art security measures to protect your funds and
              personal information.
            </p>
          </div>
        </div>{" "}
        <div
          data-aos="fade-right"
          className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px]"
        >
          <div className="">
            <MdOutlineSupportAgent
              style={{ color: "#f4ba2f", fontSize: "40px" }}
            />
          </div>
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Reliable Customer Support
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Our dedicated support team is here to assist you every step of the
              way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
