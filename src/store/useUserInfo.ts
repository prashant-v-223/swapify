import { create } from "zustand";
interface IuseUserInfo {
  user: object;
  setUserInfo: (isAnimating: object) => void;
}
export const useUserInfo = create<IuseUserInfo>((set) => ({
  user: {},
  setUserInfo: (user: object) => set(() => ({ user })),
}));
