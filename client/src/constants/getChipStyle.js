export const getChipStyle = (status) => {
  if (status === "Active") {
    return {
      backgroundColor: "#a5d6a7",
      animation: "pulse-green 2s infinite",
    };
  } else {
    return {
      backgroundColor: "#ef9a9a",
      animation: "pulse-red 2s infinite",
    };
  }
};
