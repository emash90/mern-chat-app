import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//define a service user base url

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    endpoints: (builder) => ({
        //creating the user
        registerUser: builder.mutation({
            query: (user) => ({
                url: '/api/user/register',
                method: 'POST',
                body: user,
            }),
        }),
        //login user
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/api/user/login',
                method: 'POST',
                body: user,
            }),
        }),
        //logout a user
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: '/api/user/login',
                method: 'DELETE',
                body: payload,
            }),
        }),
    }),
})

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useRegisterUserMutation
} = appApi


export default appApi