import dayjs from "dayjs";

export const formatDate = (startDate: Date, endDate: Date) => {
  return `${dayjs(startDate).format("MMMM YYYY")} - ${dayjs(endDate).format("MMMM YYYY")}`;
};
