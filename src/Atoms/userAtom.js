import { atom } from "recoil";

export const userAtom = atom({
  key: 'userAtom', // unique ID (with respect to other atoms/selectors)
  default: ''||localStorage.getItem("Token"), // default value (aka initial value)
});