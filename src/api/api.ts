import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import { ACCESS_TOKEN_KEY } from "../enums/constants";
import { logOut } from "../redux/user/authSlice";
import { removeTokens } from "../utils/removeTokens";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://photodropapp.fly.dev/clients",
  prepareHeaders(headers, { getState }) {
    const token =
      (getState() as RootState).auth.accessToken ||
      localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && token !== null) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});
const baseQueryWithLogOut: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && "originalStatus" in result.error) {
    if (result.error.originalStatus === 401) {
      api.dispatch(logOut());
      removeTokens();
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLogOut,
  endpoints: () => ({}),
});
