import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authUser',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.herokuapp.com' }),
    tagTypes: ['User'],
    endpoints: (buider) => ({
        getUser: buider.query({
            query: (token) => ({
                url: '/users/current',
                headers: {
                    Authorization: token
                },
            }),
            invalidatesTags: ['User'],
        }),
        addUser: buider.mutation({
            query: (newUser) => ({
                url: '/users/signup',
                method: 'POST',
                body: newUser,                
            }),
            invalidatesTags: ['User'],
        }),
        login: buider.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user,                
            }),
            invalidatesTags: ['User'],
        }),
        logout: buider.mutation({
            query: (token) => ({
                url: '/users/logout',
                method: 'POST',
                body: token,                
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const {useGetUserQuery, useAddUserMutation, useLoginMutation, useLogoutMutation} = authApi