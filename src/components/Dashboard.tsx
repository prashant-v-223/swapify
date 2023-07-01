import { Link } from "react-router-dom";
import TransactionTable from "./TransactionTable";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="bg-[#303131] text-white md:max-w-md w-full md:p-6 p-4 rounded-xl">
        <div className="flex justify-around gap-4">
          <img width={20} src="/assets/dollar.svg" alt="notfound" />
          <div className="flex flex-col">
            <h1 className="text-xl">Amount deposited</h1>
            <h1 className="text-2xl md:text-3xl">0.5969 <span className="font-bold">$</span></h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-[#242424] p-3 flex gap-4 items-center justify-center rounded-lg text-center">
            <img src="/assets/deposit.svg" alt="notfound" />
            <Link to={"/deposit"}>Deposit</Link>
          </div>
          <div className="bg-[#242424] p-3 flex gap-4 items-center justify-center rounded-lg text-center">
            <img src="/assets/withdraw.svg" alt="notfound" />
            <Link to={"/withdraw"}>Withdraw</Link>
          </div>
        </div>
      </div>
      <TransactionTable />
    </div>
  );
};

export default Dashboard;
