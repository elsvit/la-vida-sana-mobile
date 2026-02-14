import { Action } from 'redux';
import { IError } from '~/types/IError';

export enum ECommonActions {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  RESET = 'RESET',
  RESET_ALL = 'RESET_ALL',
}

// Change ActionApiT to be a string type instead of action creator
export type ActionApiT = { type: string };

export interface IActionTypePayload {
  actionType: string; // Change from ActionApiT to string
}

export interface IErrorPayload {
  actionType: string; // Change from ActionApiT to string
  error?: IError;
  message?: string;
}

// export interface ILoadingAction extends Action<ECommonActions.LOADING> {
//   actionType: string;
// }

// export interface ILoadedAction extends Action<ECommonActions.LOADED> {
//   actionType: string;
// }

// export interface IErrorAction extends Action<ECommonActions.ERROR> {
//   actionType: string; // Change from ActionApiT to string
//   error?: IError;
//   message?: string;
// }

// export interface IResetAction extends Action<ECommonActions.RESET> {
//   actionType: string;
// }

// export type IResetAllAction = Action<ECommonActions.RESET_ALL>;

// export type CommonActionsT =
//   | ILoadingAction
//   | ILoadedAction
//   | IErrorAction
//   | IResetAction
//   | IResetAllAction;

export interface IStateCommon {
  [ECommonActions.LOADING]: RecordType<boolean>;
  [ECommonActions.LOADED]: RecordType<boolean>;
  [ECommonActions.ERROR]: RecordType<IError>;
}
