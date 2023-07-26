import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GetStarted from "@/components/GetStarted";
import Hero from "@/components/Hero";
import LookingHelp from "@/components/LookingHelp";
import Partners from "@/components/Partners";
import TopCrypto from "@/components/TopCrypto";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";
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
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#f4ba2f",
          padding: 12,
          cursor: "pointer",
          color: "#000",
          fontSize: 25,
          borderRadius: "50%",
        }}
      >
        <Link to="https://api.whatsapp.com/send?phone=18552025191">
          <MdOutlineSupportAgent />
        </Link>
      </div>
    </div>
  );
};

export default Main;
