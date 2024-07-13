export const truncateId = (id) => {
  const maxLength = 6;
  return id.length > maxLength ? `${id.substring(0, maxLength)}...` : id;
};
