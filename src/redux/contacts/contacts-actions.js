import { createAction} from '@reduxjs/toolkit';

export const filterAct = createAction('contacts/filter');

export const tokenAct = createAction('auth/token');

export const logAct = createAction('auth/loggedin')