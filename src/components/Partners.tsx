
const Partners = () => {
  return (
    <div>
      <div className="md:p-16 p-4">
        <h1 className="text-white text-3xl font-semibold leading-9 mb-4">
          Escoswap <span className="text-[#F9DA0A]"> partners</span>
        </h1>
      </div>
      <div className="bg-[#141414] grid md:p-10 gap-10 p-4 items-center md:grid-cols-4  justify-center ">
        <img src="/assets/bestchange.svg"  alt="bestchange" />
        <img src="/assets/swapspace.svg" alt="swapspace" />
        <img src="/assets/edge.svg"  alt="edge" />
        <img src="/assets/exodus.svg" alt="exodus" />
      </div>
    </div>
  );
};

export default Partners;
