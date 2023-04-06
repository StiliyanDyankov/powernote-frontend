import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = "http://localhost:3000/api/auth/";

interface Credentials {
    email: string;
    password: string;
}

// Define a service using a base URL and expected endpoints
export const Api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: server }),
    endpoints: (builder) => ({
        postRegisterCredentials: builder.query<Credentials, any>({
            query: (credentials) => ({
                url: "register",
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostRegisterCredentialsQuery } = Api;
