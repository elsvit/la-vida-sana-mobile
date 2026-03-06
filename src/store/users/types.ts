import { EntityState } from '@reduxjs/toolkit';
import { IUser } from '~/types/IUser';

export interface IStateUsers extends EntityState<IUser, string> {}
