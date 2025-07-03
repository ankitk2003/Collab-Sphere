import { atom } from "recoil";

export const authAtom = atom({
  key: "authState",
  default: localStorage.getItem("token") ? true : false, 
});
