import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      // Check if we are in the browser
      if (typeof window === "undefined") {
        return headers;
      }

      const token = localStorage.getItem("jwt_token");

      // Set headers
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", token);
      // if (token) {
      // }

      return headers;
    },
  }),
  tagTypes: ["Authuser"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user/authenticated",
      providesTags: ["Authuser"],
      transformResponse: (res, meta, arg) => {
        if (arg) return res.find((val) => val.name === arg);
        // console.log(res.user, "😀😀😀😀😀😀");
        return res.user;
      },
      onQueryFulfilled: (result, meta) => {
        // console.log("Response:", result, "😀😀😀😀😀😀😀😀😀");
        console.log("Meta:", meta);
      },
    }),
  }),
});

export const { useGetUserQuery } = userSlice;
