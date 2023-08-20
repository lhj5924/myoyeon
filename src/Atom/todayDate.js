import dayjs from "dayjs";

const DateChecker = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const before1D = dayjs().subtract(1, "d").format("YYYY-MM-DD");
  const before1M = dayjs().subtract(1, "M").format("YYYY-MM-DD");
  const before3Y = dayjs().subtract(3, "y").format("YYYY-MM-DD");

  return [today, before1D, before1M, before3Y];
};

export default DateChecker;
