const Features = () => {
  return (
    <div className="my-4 w-full ">
      <div className="md:p-16 p-6 grid">
        <h1 className="text-white text-3xl font-semibold leading-9">
          Escoswap <span className="text-[#F9DA0A]"> features</span>
        </h1>
        <h1 className="text-3xl md:text-5xl text-[#F4F4F4] font-semibold">
          Super easy for you to swap with us..
        </h1>
        <p className="text-[#9A9A9A] font-semibold mt-4 text-xl leading-9">
          Start your first swap with these easy steps.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:p-10">
        <div className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px] border-[#333333] border-b-[1px] border-r-[1px]">
          <img
            src="/assets/features.svg"
            alt="getstarted"
            width={60}
            height={60}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Fund your account
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Add funds to your escoswap account to start. You can add funds
              with a variety of payment methods.
            </p>
          </div>
        </div>
        <div className="flex bg-[#141414] items-center flex-row gap-4  p-6 md:h-[180px] border-b-[1px] border-[#333333]">
          <img
            src="/assets/features.svg"
            alt="getstarted"
            width={60}
            height={60}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              No KYC requirements
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              No need to Complete the identity verification process to secure
              your account and transactions.
            </p>
          </div>
        </div>
        <div className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px] border-b md:border-b-0 border-[#333333] border-r-[1px]">
          <img
            src="/assets/features.svg"
            alt="getstarted"
            width={60}
            height={60}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              Fund your account
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              Add funds to your escoswap account to start. You can add funds
              with a variety of payment methods.
            </p>
          </div>
        </div>
        <div className="flex bg-[#141414] items-center flex-row gap-4 p-6 md:h-[180px]">
          <img
            src="/assets/features.svg"
            alt="getstarted"
            width={60}
            height={60}
          />
          <div>
            <p className="text-white font-semibold text-xl md:text-2xl">
              No KYC requirements
            </p>
            <p className="text-[#C0C0C0] text-base mt-2">
              No need to Complete the identity verification process to secure
              your account and transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
