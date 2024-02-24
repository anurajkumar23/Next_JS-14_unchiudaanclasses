import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pdfApi = createApi({
    reducerPath: "pdf",
    baseQuery: fetchBaseQuery({ baseUrl: "${process.env.NEXT_PUBLIC_BACKEND_URL}" }),
    endpoints: (builder) => ({
        getLastestPDF: builder.query({
            query: () => "/pdfs/lastestPdfs",
            transformResponse: (res, meta, arg) => {
                if (arg) {
                    return res.find((val) => val.name === arg);
                } else {
                    console.log(res, "😀😀😀😀😀😀");
                    return res.data.pdf
                }
            },
            onQueryFulfilled: (result, meta) => {
                console.log("Response:", result, "😀😀😀😀😀😀😀😀😀");
                console.log("Meta:", meta);
            }
        })
    })
});

export const { useGetLastestPDFQuery } = pdfApi;
