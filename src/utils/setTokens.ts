import { ACCESS_TOKEN_KEY} from "../enums/constants";

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};
