
const Footer = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:p-16 justify-center p-8">
      <div className="flex flex-col items-start md:m-10 justify-center">
        <img src="/assets/logo.svg" width={160} alt="logo" />
        <p className="text-white text-xl my-4 font-semibold">
          One place for Swap.
        </p>
        <div className="flex gap-6 my-4">
          <img src="/assets/instagram.svg" alt="instagram" />{" "}
          <img src="/assets/whatsapp.svg" alt="whatsapp" />
          <img src="/assets/twitter.svg" alt="twitter" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="flex flex-col gap-2">
          <p className="text-white text-2xl font-bold my-2">About</p>
          <p className="text-[#969696] font-semibold text-base">
            Risk disclaimer
          </p>
          <p className="text-[#969696] font-semibold text-base">Privacy</p>
          <p className="text-[#969696] font-semibold text-base">
            Terms & Conditions
          </p>
          <p className="text-[#969696] font-semibold text-base">Contact us</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white text-2xl font-bold my-2">Learn</p>
          <p className="text-[#969696] font-semibold text-base">Governance</p>
          <p className="text-[#969696] font-semibold text-base">DAO</p>
          <p className="text-[#969696] font-semibold  text-base">Presale</p>
          <p className="text-[#969696] font-semibold text-base">Academy</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white text-2xl font-bold my-2">Watch</p>
          <p className="text-[#969696] font-semibold text-base">Governance</p>
          <p className="text-[#969696] font-semibold text-base">
            Cryptocurrency
          </p>
          <p className="text-[#969696] font-semibold text-base">Presale</p>
          <p className="text-[#969696] font-semibold text-base">Academy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
