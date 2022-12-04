import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/state.interface';

export const login = createAction('[User] Login', props<{ user: User }>());
export const logout = createAction('[User] Logout');
