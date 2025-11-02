import { atom } from "recoil";

export const countNote = atom({
  key: 'countNote', // unique ID (with respect to other atoms/selectors)
  default: 0
});
