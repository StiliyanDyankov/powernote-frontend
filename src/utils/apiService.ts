import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ResCredentialError,
    ResCredentialSuccess,
} from "../AuthPortal/RegisterSection";

const server = "http://localhost:3000/api/";

interface Credentials {
    email: string;
    password: string;
}

// Define a service using a base URL and expected endpoints
export const Api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: server }),
    endpoints: (builder) => ({
        postRegisterCredentials: builder.mutation<
            ResCredentialSuccess,
            any
        >({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        postRegisterCode: builder.mutation({
            query: ({code, token}) => ({
                url: "verification/register",
                method: "POST",
                body: code,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token.token}`,
                },
            }),
        })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostRegisterCredentialsMutation, usePostRegisterCodeMutation } = Api;
