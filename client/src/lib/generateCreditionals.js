export const generateCredentials = () => {
  const id = `user-${Math.random().toString(36).substring(2, 8)}`;
  const password = Math.random().toString(36).substring(2, 10);
  return { id, password };
};
