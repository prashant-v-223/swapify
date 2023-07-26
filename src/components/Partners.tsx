const Partners = () => {
  return (
    <div className="overflow-hidden">
      <div className="md:p-16 p-4">
        <h1 className="text-white text-3xl font-semibold leading-9 mb-4">
          <span
            className="text-[#f4ba2f]"
            style={{
              fontFamily: "FrutigerLTPro, inherit auto",
            }}
          >
            Swapfry
          </span>
          <span className=""> partners</span>
        </h1>
      </div>
      <div className="bg-[#141414] border-y-2 border-[#5C520B] grid md:p-10 gap-10 p-6 items-center md:grid-cols-4  justify-center ">
        <img
          data-aos="fade-left"
          src="/assets/bestchange.svg"
          className="md:w-[200px] w-[140px]"
          alt="bestchange"
        />
        <img
          data-aos="fade-right"
          src="/assets/swapspace.svg"
          className="md:w-[200px] w-[140px]"
          alt="swapspace"
        />
        <img
          data-aos="fade-left"
          src="/assets/edge.svg"
          className="md:w-[200px] w-[140px]"
          alt="edge"
        />
        <img
          data-aos="fade-right"
          src="/assets/exodus.svg"
          className="md:w-[200px] w-[140px]"
          alt="exodus"
        />
      </div>
    </div>
  );
};

export default Partners;
