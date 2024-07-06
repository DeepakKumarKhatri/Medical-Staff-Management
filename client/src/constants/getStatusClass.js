export const getStatusClass = (status) => {
  switch (status) {
    case "Start Treatment":
      return "bg-red-100 text-red-700";
    case "Mid Treatment":
      return "bg-blue-100 text-blue-700";
    case "End Treatment":
      return "bg-green-100 text-green-700";
    default:
      return "bg-white text-black";
  }
};
