import Footer from "@/components/Footer";

const RiskDisclaimer = () => {
  return (
    <>
      <div className="main md:flex">
        <div className="text-white p-8 py-24 flex gap-4 flex-col w-100">
          <h1 className="text-4xl font-bold mb-8">About us</h1>
          <p>
            Swapfry is a secure and anonymous crypto exchange service with fixed
            rates which is free of registration and any limits.
          </p>
          <p>
            Launched in 2023, Swapfry gained recognition as a fast and secure
            exchange.
          </p>
          <p>
            Swapfry provides its customers with the highest standards of
            confidentiality, as you do not have to register to make a
            transaction.
          </p>
          <p>
            The system also fixes the exchange rate at the beginning of the
            transaction, thus, users are protected from market volatility.
          </p>
          <p>
            In addition, Swapfry does not have maximum limits, which allows
            everyone to exchange any amount of cryptocurrencies.
          </p>
          <p>
            The main mission of Swapfry is to make an exchange process fast,
            easy and secure and we fulfil this intent with dignity.
          </p>
        </div>
        <div className="text-white p-8 md:py-24 flex gap-4 flex-col w-100">
          <img
            data-aos="fade-left"
            src="/assets/about-us 1.png"
            className="md:w-[500px] w-[100%]"
            alt="bestchange"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RiskDisclaimer;
