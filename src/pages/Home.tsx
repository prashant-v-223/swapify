import Dashboard from "@/components/Dashboard";
import Deposit from "@/components/Deposit";
import Withdraw from "@/components/Withdraw";
import { useUserInfo } from "@/store";
import { useEffect, useRef, useState } from "react";
const Home = () => {
  const [openTab, setOpenTab] = useState(2);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(profileRef.current === null) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { user } = useUserInfo((state) => state.data);
  return (
    <div className="flex flex-wrap relative md:px-4">
      <div className="w-full">
        <ul
          className="flex list-none pt-3 gap-4 overflow-x-auto pb-4 px-2 justify-start flex-row items-center"
          role="tablist"
        >
          <div className="flex md:w-2/3">
            <a
              className={
                "text-xs font-bold text-white w-fit py-[1rem] px-[2rem]  uppercase  rounded flex gap-2 leading-normal " +
                (openTab === 1 ? "bg-[#303131]" : "bg-transparent")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              <img src="/assets/dashboard.svg" alt="dashboard" />
              Dashboard
            </a>
            <a
              className={
                "text-xs font-bold text-white w-fit py-[1rem] px-[2rem]  uppercase  rounded flex gap-2 leading-normal " +
                (openTab === 2 ? "bg-[#303131]" : "bg-transparent")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              <img src="/assets/deposit.svg" alt="deposit" />
              Deposit
            </a>
            <a
              className={
                "text-xs font-bold text-white w-fit py-[1rem] px-[2rem]  uppercase  rounded flex gap-2 leading-normal " +
                (openTab === 3 ? "bg-[#303131]" : "bg-transparent")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              <img src="/assets/withdraw.svg" alt="withdraw" />
              Withdraw
            </a>
          </div>
          <div className="md:w-1/3 justify-end flex">
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowProfile(true)
              }}
              className="text-xs font-bold cursor-pointer text-white w-fit py-[1rem] px-[2rem]  uppercase  rounded flex gap-2 leading-normal"
            >
              <span>
                <img src="/assets/user.svg" alt="user" />
              </span>
              Profile
            </div>
          </div>
        </ul>
        {showProfile && (
          <div
            ref={profileRef}
            className="z-10 absolute rounded-lg right-2 bg-[#1B1B1B] px-1 py-1 flex gap-2 flex-col w-60"
          >
            <button
              className={
                "bg-transparent group gap-2 flex w-full items-center rounded-md px-2 py-2 text-sm text-white"
              }
            >
              <img src="/assets/user.svg" alt="user" /> {user?.email}
            </button>
            <button
              className={
                "bg-transparent group gap-2 flex w-full items-center rounded-md px-2 py-2 text-sm text-white"
              }
            >
              <img src="/assets/tick.svg" alt="user" /> Joined at :{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </button>
          </div>
        )}
        <div className="h-full flex flex-col min-w-0 w-full">
          {openTab === 1 ? (
            <Dashboard setOpenTab={setOpenTab} />
          ) : openTab === 2 ? (
            <Deposit />
          ) : (
            <Withdraw />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
