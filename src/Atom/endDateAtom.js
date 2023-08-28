import { atom } from "recoil";
import DateChecker from "./todayDate";

const [today] = DateChecker();

const endDateAtom = atom({
  key: "endDateAtom",
  default: today,
});

export default endDateAtom;
