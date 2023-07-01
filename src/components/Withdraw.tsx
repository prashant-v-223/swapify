import TransactionTable from "./TransactionTable";

const Withdraw = () => {
  return (
    <div className="p-4">
      <div className="grid bg-[#1B1B1B] w-full p-4 md:w-11/12 rounded-xl md:grid-cols-2">
        <div className="flex flex-col justify-center items-start gap-4 p-4">
          <input
            type="text"
            placeholder="Enter withdrawal address "
            className="text-white bg-transparent w-full h-full p-4 border-2 rounded-lg border-[#454545]"
          />
          <input
            type="text"
            placeholder="Enter withdrawal address"
            className="text-white bg-transparent w-full h-full p-4 rounded-lg border-2 border-[#454545]"
          />
          <button
            className={
              "bg-[#242424] w-fit group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
            }
          >
            <img src="/assets/greentick.svg" alt="user" /> Submit request
          </button>
        </div>
        <div className="flex items-start text-left flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl text-[#F3DE1B] font-medium">
            Please make sure
          </h1>
        <div className="flex gap-4">
        <img src="/assets/greentick.svg" alt="user" />    <p className="text-white text-base md:text-xl" > You have entered valid wallet address</p>
          </div> 
        <div className="flex gap-4">
        <img src="/assets/greentick.svg" alt="user" />  <p className="text-white text-base md:text-xl" >You have enough deposited balance to withdraw the currency</p>
          </div>
        </div>
      </div>
      <TransactionTable />
    </div>
  );
};

export default Withdraw;
