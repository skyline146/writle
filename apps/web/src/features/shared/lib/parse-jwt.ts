export const parseJwt = (token: string) => {
  return JSON.parse(atob(token.split('.')[1]));
};
