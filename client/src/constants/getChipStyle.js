export const getChipStyle = (status) => {
  switch (status) {
    case "Mid Treatment":
      return {
        backgroundColor: "#5791ad",
        animation: "pulse-blue 2s infinite",
      };
    case "End Treatment":
      return {
        backgroundColor: "#a5d6a7",
        animation: "pulse-green 2s infinite",
      };
    case "Start Treatment":
      return {
        backgroundColor: "#ef9a9a",
        animation: "pulse-red 2s infinite",
      };
  }
};
