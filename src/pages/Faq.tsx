import Footer from "@/components/Footer";

const FaqPage = () => {
  return (
    <>
      <div className="py-10 min-h-screen px-4 main">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h1 className="text-4xl font-bold mb-2 md:mb-6 text-white">FAQ</h1>
          <div className="rounded-lg shadow-md py-6 px-8">
            <h2 className="text-xl md:text-3xl text-white font-bold mb-4 tracking-wide">
              Q1. What is SwapFry?
            </h2>
            <p className="text-white mb-6 text-base">
              Swapfry is a secure and user-friendly platform that allows you to
              instantly exchange your cryptocurrency assets. Whether you want to
              convert Bitcoin to USDT or any other crypto pair, Swapfry enables
              seamless transactions at competitive rates.
            </p>
            <h2 className="text-xl md:text-3xl text-white font-bold mb-4 tracking-wide">
              Q2. How does Swapfry ensure the safety of my assets?
            </h2>
            <p className="text-white mb-6 text-base">
              At Swapfry, we prioritize the security of your assets. We utilize
              advanced encryption technology and adhere to strict security
              measures. Your funds are always protected, and we only work with
              reputable blockchain networks.
            </p>
            <h2 className="text-xl md:text-3xl text-white font-bold mb-4 tracking-wide">
              Q3. Are there any transaction limits on Swapfry?
            </h2>
            <p className="text-white mb-6 text-base">
              No, we do not impose any transaction limits. Swapfry empowers you
              to swap any amount of cryptocurrency you desire, ensuring
              flexibility for both small and large transactions.
            </p>
            <h2 className="text-xl md:text-3xl text-white font-bold mb-4 tracking-wide">
              Q4. How long does a swap take on Swapfry?
            </h2>
            <p className="text-white text-base">
              Swaps on Swapfry are lightning-fast. You can expect most
              transactions to be completed within minutes. However, in rare
              cases where network congestion occurs, it might take slightly
              longer.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FaqPage;
