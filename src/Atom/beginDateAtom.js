import { atom } from "recoil";
import DateChecker from "./todayDate";

const [today, before1D, before1M, before3Y] = DateChecker();
const beginDateAtom = atom({
  key: "beginDateAtom",
  default: before1M,
});

export default beginDateAtom;
