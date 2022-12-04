import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/user.actions';
import { User } from '../interfaces/state.interface';

export const initialState = {
  name: null,
  email: null,
  token: null,
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);
