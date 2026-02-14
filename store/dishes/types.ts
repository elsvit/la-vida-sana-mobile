import { EntityState } from '@reduxjs/toolkit';
import { IDish } from '~/types/IDish';

export interface IStateDishes extends EntityState<IDish, string> {}
