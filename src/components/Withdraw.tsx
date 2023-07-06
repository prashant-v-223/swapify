import { useUserInfo } from "@/store";
import axios from "axios";
import { Formik  } from "formik";
import toast from "react-hot-toast";
import TransactionTable from "./TransactionTable";
const Withdraw = () => {
  const { user } = useUserInfo((state) => state.data);
  const createTransactiom = async (amount: string, address: string,resetForm:()=>void) => {
    try {
      let response = await axios.post(
        "https://exolix.com/api/v2/transactions",
        {
          amount: amount,
          coinFrom: "ETH",
          coinTo: "BTC",
          withdrawalAddress: address,
          withdrawalExtraId: user._id,
        }
      );
      await axios.post(`${process.env.VITE_SERVER_URL}/users/transactions`, {
        transaction: {
          id: response.data.id,
          amount: amount,
          coin: "BTC",
          status: "pending",
          time: response.data.createdAt,
          user_id: user._id,
          transactionType: "withdraw",
        },
        userId: user._id,
      });
      toast.success("Withdrawal request sent successfully");
    } catch (error) {
      toast.error("Error while requesting deposit...");
    }
    finally{
      resetForm()
    }
  };

  return (
    <div className="p-4">
      <div className="grid bg-[#1B1B1B] w-full p-4 md:w-11/12 rounded-xl md:grid-cols-2">
        <Formik
          initialValues={{
            amount: "",
            withdrawAddress: "",
          }}
          onSubmit={(values,{resetForm}) => {
            createTransactiom(values.amount, values.withdrawAddress,resetForm);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start gap-4 p-4">
                <input
                  id="withdrawAddress"
                  onChange={handleChange}
                  value={values.withdrawAddress}
                  name="withdrawAddress"
                  type="text"
                  placeholder="Enter withdrawal address "
                  className="text-white bg-transparent w-full h-full p-4 border-2 rounded-lg border-[#454545]"
                />
                <input
                  id="amount"
                  name="amount"
                  onChange={handleChange}
                  value={values.amount}
                  type="number"
                  inputMode="numeric"
                  placeholder="Select amount to withdraw"
                  className="text-white bg-transparent w-full h-full p-4 rounded-lg border-2 border-[#454545]"
                />
                <button
                  type="submit"
                  className={
                    "bg-[#242424] w-fit disabled:cursor-not-allowed group gap-2 flex items-center rounded-lg p-4 text-sm text-white"
                  }
                >
                  <img src="/assets/greentick.svg" alt="user" /> Submit request
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex items-start text-left flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl text-[#F3DE1B] font-medium">
            Please make sure
          </h1>
          <div className="flex gap-4">
            <img src="/assets/greentick.svg" alt="user" />{" "}
            <p className="text-white text-base md:text-xl">
              You have entered valid wallet address
            </p>
          </div>
          <div className="flex gap-4">
            <img src="/assets/greentick.svg" alt="user" />{" "}
            <p className="text-white text-base md:text-xl">
              You have enough deposited balance to withdraw the currency
            </p>
          </div>
        </div>
      </div>
      <TransactionTable/>
    </div>
  );
};

export default Withdraw;
