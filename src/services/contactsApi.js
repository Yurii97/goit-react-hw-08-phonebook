import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com'
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
    getContacts: builder.query({
        query: token => ({
            url: '/contacts',
                headers: {
                    Authorization: token
                },
        }),
        providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
        query: ({token, newContact}) => ({
            url: `/contacts`,
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: newContact,
        }),
        invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
        query: ({id, token}) => ({
            url: `/contacts/${id}`,
            method: "DELETE", 
            headers: {
                    Authorization: token
                },            
        }),
        invalidatesTags:['Contacts']
    }),
    changeContact: builder.mutation({
        query: ({id, token, newContact}) => ({
            url: `/contacts/${id}`,
            method: "PATCH", 
            headers: {
                    Authorization: token
            },
            body: newContact,
        }),
        invalidatesTags:['Contacts']
    }),
  }),
})

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useChangeContactMutation } = contactsApi;