
const GetStarted = () => {
  return (
    <div className="mt-4 overflow-hidden">
     <div className="flex justify-center">
     <h1 className="text-[#CCC9C7] text-center mb-12 font-semibold text-3xl border-b-2 border-[#393838] inline-block justify-center pb-4">
        How to get started ?
      </h1>
     </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div data-aos="fade-left" className="flex bg-[#141414] items-center flex-row gap-4 rounded-lg  p-4 md:h-[180px]">
          <img
            src="/assets/getstarted.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">Sign up</p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Create your Swapfry account in a few simple steps. Provide the
              required info
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className="flex bg-[#141414] items-center flex-row gap-4 rounded-lg  p-4 md:h-[180px]">
          <img
            src="/assets/getstarted.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">Fund account</p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Create your Swapfry account in a few simple steps. Provide the
              required info
            </p>
          </div>
        </div>
        <div data-aos="fade-right" className="flex bg-[#141414] items-center flex-row gap-4 rounded-lg p-4 md:h-[180px]">
          <img
            src="/assets/getstarted.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">Place order</p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Create your Swapfry account in a few simple steps. Provide the
              required info
            </p>
          </div>
        </div>
        <div data-aos="fade-left" className="flex bg-[#141414] items-center flex-row gap-4 rounded-lg p-4 md:h-[180px]">
          <img
            src="/assets/getstarted.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <p className="text-white font-semibold text-xl  md:text-2xl">Kyc above 1 BTC</p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Create your Swapfry account in a few simple steps. Provide the
              required info
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className="flex bg-[#141414] items-center flex-row gap-4 rounded-lg  p-4 md:h-[180px]">
          <img
            src="/assets/getstarted.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">Withdraw funds</p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Create your Swapfry account in a few simple steps. Provide the
              required info
            </p>
          </div>
        </div>
        <div data-aos="fade-right" className="flex bg-[#141414] items-center flex-row gap-4 rounded-lg p-4 md:h-[180px]">
          <img
            src="/assets/getstarted.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">100% Secure</p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Create your Swapfry account in a few simple steps. Provide the
              required info
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
