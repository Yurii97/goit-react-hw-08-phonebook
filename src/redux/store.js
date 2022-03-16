import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {filter, token, isLoggedIn} from './contacts/contacts-reduser'
import { setupListeners } from '@reduxjs/toolkit/query'
import { contactsApi } from 'services/contactsApi'
import { authApi } from 'services/authApi'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const tokenPersistConfig = {
  key: 'token',
  storage,
  whitelist:["token"]
}

const rootReducer = combineReducers({
  [authApi.reducerPath]:authApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter,
    token,
    isLoggedIn,
})

const persistedReducer = persistReducer(tokenPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }), contactsApi.middleware, authApi.middleware]
  })

  export const persistor = persistStore(store)

setupListeners(store.dispatch)
  