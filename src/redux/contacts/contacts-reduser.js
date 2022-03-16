import {
  createReducer,  
} from '@reduxjs/toolkit';
import * as contactsAction from './contacts-actions';

 export const filter = createReducer('', {
  [contactsAction.filterAct]: (_, { payload }) => payload,
});

export const token = createReducer('', {
  [contactsAction.tokenAct]: (_, { payload }) => payload
});

export const isLoggedIn = createReducer(false, {
  [contactsAction.logAct]: (_, { payload }) => payload
});