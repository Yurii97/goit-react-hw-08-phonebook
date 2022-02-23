import { configureStore } from '@reduxjs/toolkit'
import {filter} from './contacts/contacts-reduser'
import { setupListeners } from '@reduxjs/toolkit/query'
import { token } from './contacts/contacts-reduser'
import { contactsApi } from 'services/contactsApi'
import { authApi } from 'services/authApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]:authApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter,
    token,
  },
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware(), contactsApi.middleware, authApi.middleware]
  })


  setupListeners(store.dispatch)