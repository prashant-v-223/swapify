import Footer from "@/components/Footer";

const RiskDisclaimer = () => {
  return (
    <>
      <div className="main text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Risk Disclaimer</h1>
        <p>
          Please read this Risk Disclaimer carefully before using the services
          provided by SwapFry. Cryptocurrency trading involves inherent risks,
          and it is important to understand and acknowledge these risks before
          engaging in any transactions on our platform. By accessing or using
          SwapFry, you agree to accept and assume all risks associated with
          cryptocurrency trading.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Volatility of Cryptocurrencies
        </h2>
        <p>
          Cryptocurrencies are known for their high price volatility. The value
          of cryptocurrencies can fluctuate dramatically within short periods.
          Prices can be influenced by various factors, including market demand,
          regulatory changes, technological developments, and investor
          sentiment. As a result, there is a risk of significant financial loss
          when trading cryptocurrencies.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Market Risks</h2>
        <p>
          Cryptocurrency markets operate 24/7 and are highly decentralized. They
          are susceptible to rapid and substantial price movements, which can be
          triggered by market manipulation, speculation, or unforeseen events.
          These price fluctuations can lead to gains or losses, and there is no
          guarantee of profit or protection against losses.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Regulatory and Legal Risks
        </h2>
        <p>
          The regulatory landscape surrounding cryptocurrencies is evolving, and
          new laws and regulations can impact the trading environment. Changes
          in government policies, regulations, or restrictions may affect the
          legality, use, and value of cryptocurrencies. Compliance with
          applicable laws and regulations is the responsibility of the user.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Technical Risks</h2>
        <p>
          Cryptocurrency transactions and trading involve technical risks. These
          include but are not limited to network disruptions, system failures,
          hacking attacks, and cybersecurity breaches. While we implement
          security measures to protect your data and funds, there is no
          guarantee that our platform will be free from vulnerabilities or
          technical issues.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">User Responsibility</h2>
        <p>
          As a user of SwapFry, you are solely responsible for conducting your
          research, analysis, and due diligence before engaging in any
          cryptocurrency trading activity. You should be aware of the risks and
          potential rewards associated with the market. It is important to
          understand the nature of cryptocurrencies, their underlying
          technology, and the factors that can impact their value.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Financial Loss</h2>
        <p>
          Trading cryptocurrencies carries the risk of financial loss. You
          should only trade with funds that you can afford to lose. Never invest
          more than you are willing to risk, and consider seeking advice from a
          qualified financial professional before making any investment
          decisions.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">No Investment Advice</h2>
        <p>
          The information provided on the SwapFry platform, including
          educational content, market analysis, and price data, is for
          informational purposes only and should not be considered as investment
          advice. We do not provide personalized financial advice or
          recommendations. Any decisions based on the information provided on
          our platform are made at your discretion and risk.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          No Guarantee of Results
        </h2>
        <p>
          Trading cryptocurrencies involves uncertainties, and past performance
          is not indicative of future results. The outcome of your trading
          activities may differ from historical data or performance metrics.
          There is no guarantee of profit or success.
        </p>

        <p className="mt-8">
          By using SwapFry, you acknowledge and understand the risks associated
          with cryptocurrency trading. You accept full responsibility for any
          financial losses or gains that may occur as a result of your trading
          activities. We recommend exercising caution and making informed
          decisions when engaging in cryptocurrency transactions.
        </p>

        <p className="mt-8">
          If you have any questions or concerns regarding the risks associated
          with cryptocurrency trading or the use of our services, please contact
          us at support@swapfry.com.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default RiskDisclaimer;
