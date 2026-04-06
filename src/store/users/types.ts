import { EntityState } from '@reduxjs/toolkit';
import { IUser } from '~/types/IUser';

export interface IStateUsers extends EntityState<IUser, string> {}

export type AddUserPayload = {
  entity: IUser;
  onSuccess?: () => void;
};

export type UpdateUserPayload = AddUserPayload;

export type RemoveUserPayload = {
  entity: string;
  onSuccess?: () => void;
};
