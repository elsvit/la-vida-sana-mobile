import { EntityState } from '@reduxjs/toolkit';
import { IDish } from '../../../LaVidaSana/src/types/IDish';

export interface IStateDishes extends EntityState<IDish, string> {}
