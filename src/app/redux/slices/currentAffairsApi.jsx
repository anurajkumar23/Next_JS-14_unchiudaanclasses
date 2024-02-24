import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currentAffairsApi = createApi({
    reducerPath: "currentAffairs",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}` }),
    endpoints: (builder) => ({
        getLastestCurrentAffairs: builder.query({
            query: () => "/currentaffairs/lastestAffairs",
            transformResponse:(res,meta,arg)=>{
                if (arg) return res.find((val)=>val.name===arg)
                console.log(res.data.affairs,"😀😀😀😀😀😀")
                return res.data.affairs
              },
            onQueryFulfilled: (result, meta) => {
                console.log("Response:", result, "😀😀😀😀😀😀😀😀😀");
                console.log("Meta:", meta);
            }
        })
    })
});

export const { useGetLastestCurrentAffairsQuery} = currentAffairsApi;
