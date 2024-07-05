export const generateUniqueId = (first, last) => {
  return `${first.toLowerCase()}_${last.toLowerCase()}_${new Date().getTime()}`;
};

export const generatePassword = (first, last) => {
  return `${first.toLowerCase()}${last.toLowerCase()}123!`;
};
