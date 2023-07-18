import { Transaction } from "@/types";
import toast from "react-hot-toast";
import QRCodeGenerator from "./QRCodeGenerator";
type TDialogBox = {
  closeModal(): void;
  address: any;
  transaction: Transaction;
  isOpen: boolean;
};
const DialogBox = ({ closeModal, isOpen, transaction }: TDialogBox) => {
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(transaction?.depositAddress);
    toast.success("Copied Successfully !");
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-10 text-white">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen border-xl border-black">
              &#8203;
            </span>
            <div className="relative w-full inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-[#1B1B1B] rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div className="py-4">
                <div className="flex items-center justify-center ">
                  <div className="mt-4 text-center">
                    <h3
                      className="font-bold leading-6 capitalize"
                      id="modal-title"
                    >
                      TransactionId : {transaction?.id}
                    </h3>
                  </div>
                </div>
                <QRCodeGenerator walletAddress={transaction?.depositAddress} />
                <div className="mt-4">
                  <label className="text-sm " htmlFor="share link">
                    Deposit {transaction?.coinFrom?.coinName} address
                  </label>
                  <div className="flex items-center mt-2 -mx-1">
                    <p
                      className="text-center items-center flex flex-1 h-10 px-4 mx-1 text-xs  bg-[#1B1B1B] border-2 border-[#454545] rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      style={{
                        fontSize: "9.5px",
                      }}
                    >
                      {transaction?.depositAddress}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex md:flex-row flex-col w-full gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="w-full gap-2 px-4 py-2 mt-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#facc15] rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 justify-center flex"
                  >
                    Copy
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                    className="w-full gap-2 px-4 py-2 mt-3 text-sm tracking-wide text-white capitalize transition-colors  bg-[#facc15] duration-300 transform bg-{#facc15] rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 justify-center flex"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBox;
