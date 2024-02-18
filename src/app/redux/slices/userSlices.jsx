import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
    reducerPath: "api",
    tagTypes: ["hello", "userId"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.unchiudaanclasses.com/api",
        prepareHeaders: (headers, { getState }) => {
            // Check if we are in the browser
            if (typeof window === 'undefined') {
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

    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "/user/authenticated",
            transformErrorResponse: (res, meta, arg) => {
                if (arg) return res.find((val) => val.name === arg);
                console.log(res,"🎉🎉🎉🎉🎉🎉")
                return res;
            },
            providerTags: ["hello"],
        }),
    }),
});

export const { useGetUserQuery } = userSlice;
