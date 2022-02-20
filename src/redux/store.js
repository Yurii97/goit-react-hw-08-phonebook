import { configureStore } from '@reduxjs/toolkit'
import {filter} from './contacts/contacts-reduser'
import { setupListeners } from '@reduxjs/toolkit/query'

import { contactsApi } from 'services/contactsApi'

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter,
  },
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware(), contactsApi.middleware]
  })


  setupListeners(store.dispatch)