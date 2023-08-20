import { atom } from "recoil";

const petListAtom = atom({
  key: "petListAtom",
  default: [],
});

export default petListAtom;
