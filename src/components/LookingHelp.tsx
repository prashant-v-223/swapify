import { Link } from "react-router-dom";

const LookingHelp = () => {
  return (
    <div className="md:p-16 p-4 overflow-hidden">
      <p className="text-white mb-8 font-semibold text-3xl">
        Looking for a help?
      </p>
      <div className="flex gap-4 justify-around flex-col md:flex-row">
        <div  data-aos="fade-left" className="flex bg-[#141414] items-center  flex-row gap-10 rounded-lg p-4 md:p-6 md:h-[180px]">
          <img
            src="/assets/support.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <Link to="/login" className="text-white font-semibold text-xl md:text-2xl">
              24/7 Chat support
            </Link>
            <p className="text-[#C0C0C0] text-base mt-2">
              Get 24/7 chat support with our friendly customer service agents at
              your service.
            </p>
          </div>
        </div>
        <div  data-aos="fade-right" className="flex bg-[#141414] items-center  flex-row gap-10 rounded-lg  p-4 md:p-6 md:h-[180px]">
          <img
            src="/assets/support.svg"
            alt="getstarted"
            width={30}
            height={30}
          />
          <div>
            <Link to="/faq" className="text-white font-semibold text-xl md:text-2xl">FAQ’s</Link>
            <p className="text-[#C0C0C0] text-base mt-2">
              Get answers of all your questions from frequently asked questions
              on Rijex
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingHelp;
