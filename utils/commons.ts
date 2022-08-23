import dayjs from "dayjs";

export const getRandomGradientColor = () => {
  const colors = [
    "linear-gradient(180deg, rgba(255, 154, 158, 1) 0%, rgba(250, 208, 196, 1) 99%, rgba(250, 208, 196, 1) 100%)",
    "linear-gradient(180deg, rgba(19, 84, 122, 1) 0%, rgba(128, 208, 199, 1) 100%)",
    "linear-gradient(90deg, rgba(61, 78, 129, 1) 0%, rgba(87, 83, 201, 1) 48%, rgba(110, 127, 243, 1) 100%)",
  ];

  const index = Math.ceil(Math.random() * colors.length);

  return colors[index - 1];
};

export const formatDate = (date: string) => {
  return dayjs(date).format("YYYY / MM / DD");
};

export const urlFormat = (url: string) => {
  return url.replaceAll("//", "/");
};
