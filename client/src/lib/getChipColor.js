export const getChipColor = (label) => {
  switch (label) {
    case "Start-Treatment":
      return { color: "#ffebee", borderColor: "#e57373" };
    case "Mid-Treatment":
      return { color: "#e3f2fd", borderColor: "#64b5f6" };
    case "End-Treatment":
      return { color: "#e8f5e9", borderColor: "#81c784" };
    default:
      return { color: "#e0e0e0", borderColor: "#9e9e9e" };
  }
};
