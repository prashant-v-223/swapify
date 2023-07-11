import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GetStarted from "@/components/GetStarted";
import Hero from "@/components/Hero";
import LookingHelp from "@/components/LookingHelp";
import Partners from "@/components/Partners";
import TopCrypto from "@/components/TopCrypto";
const Main = () => {
  return (
    <div className=" main h-full gap-10 flex flex-col relative">
      <Hero />
      <div className="p-4 my-4 md:p-12">
        <GetStarted />
      </div>
      <div className="bg-[#141414]">
        <Features />
      </div>
      <LookingHelp />
      <TopCrypto />
      <Partners />
      <Footer />
    </div>
  );
};

export default Main;
