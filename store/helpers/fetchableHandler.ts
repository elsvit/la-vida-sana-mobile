import {
  Effect,
  ActionPattern,
  ActionMatchingPattern,
  Action,
} from '@redux-saga/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest, ForkEffect, put } from 'redux-saga/effects';
import { Saga } from '../types';
import { setError, setLoaded, setLoading } from '../common/slice';
import { ActionApiT } from '../common/types';
import { IError } from '../../../LaVidaSana/src/types/IError';

export function* captureError(error: any, context?: any) {
  // ToDo: add user notification handler
  // yield put(addNotification(NotificationDict.ERROR, e.message));
  // errorTracking.captureError({ error, context });
}

/**
 * Prototype of shared saga error handler.
 *
 * @param saga
 * @param onError
 * @param context
 */
export const withFatchable = ({
  saga,
  onError,
  context,
  actionType,
}: {
  saga: Saga;
  onError?: Effect;
  context?: any;
  actionType: ActionApiT;
}) =>
  function* withFatchableSaga(action: PayloadAction<any>) {
    try {
      // Pass only the action type string, not the entire action creator
      yield put(setLoading({ actionType: actionType.type }));
      yield call(saga, action);
      yield put(setLoaded({ actionType: actionType.type }));
    } catch (error: any) {
      yield captureError(error, context);

      // Convert Error object to serializable IError format
      const serializableError: IError = {
        code: error?.code || 'UNKNOWN_ERROR',
        message: error?.message || 'An unknown error occurred',
      };

      yield put(
        setError({
          actionType: actionType.type,
          error: serializableError,
        }),
      );

      if (onError != null) {
        yield onError;
      }
    }
  };

export function takeLatestWithFetchable<
  A extends Action,
  Fn extends (...args: any[]) => any,
>(
  actionType: ActionApiT,
  saga: Fn,
  options?: { args: any[]; onError?: Effect; context?: any },
): ForkEffect<never> {
  const { args = [], onError, context } = options || {};
  const wrappedSaga = withFatchable({
    saga,
    onError,
    context,
    actionType,
  }) as any;
  return takeLatest(actionType.type, wrappedSaga, ...args);
}
