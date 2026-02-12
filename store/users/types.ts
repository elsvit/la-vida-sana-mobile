import { EntityState } from '@reduxjs/toolkit';
import { IUser } from '../../../LaVidaSana/src/types/IUser';

export interface IStateUsers extends EntityState<IUser, string> {}
