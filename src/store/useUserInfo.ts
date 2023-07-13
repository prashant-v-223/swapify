import { User } from "@/types";
import axios from "axios";
import { create } from "zustand";
interface IuseUserInfo {
  data: {
    user: User;
  };
  setUserInfo: (user: object) => void;
}

export const useUserInfo = create<IuseUserInfo>((set) => ({
  data: {
    user: {
      _id: "",
      name: "",
      role: "",
      email: "",
      password: "",
      isVerified: false,
      otp: 0,
      balance: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
      isKYC: false,
      transactionIds: [{
        id: "",
        amount: 0,
        coinFrom: "",
        coinTo: "",
        time: "",
        status: "",
        coin: 0,
        transactionType: "",
      }],
    },
  },
  // @ts-ignore
  setUserInfo: (data) => set(() => ({ data })),
}));


// Call this function to fetch and store user info
export const fetchAndStoreUserInfo = async () => {
  try {
    const response = await axios(
      `${process.env.VITE_SERVER_URL}/users/fetch-user`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    useUserInfo.setState({ data: response.data });
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
