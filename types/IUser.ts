import { EAllergen } from './IElement';
import { ISellerAndProductId } from './IProduct';

export enum ESex {
  male = 'Male',
  female = 'Female',
}

export enum EActivityLevel {
  SedentaryActive = 'SedentaryActive', // Little to no excercises
  LightActive = 'LightActive', // Light exercises 1-3 days per week
  ModeratelyActive = 'ModeratelyActive', // Moderate exercises 3-5 days per week
  VeryActive = 'VeryActive', // Hard exercises 6-7 days per week
  ExtremelyActive = 'ExtremelyActive', // Very hard exercises, physical job
}

export enum EGoal {
  LoseWeight = 'LoseWeight',
  MaintainWeight = 'MaintainWeight',
  GainWeight = 'GainWeight',
  BuildMuscle = 'BuildMuscle',
  ImproveHealth = 'ImproveHealth',
}

export enum EWeeklyGoalApproach {
  Conservative = 'Conservative',
  Moderate = 'Moderate',
  Aggressive = 'Aggressive',
  VeryAggressive = 'VeryAggressive',
}

export interface IUser {
  id: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  lastName?: string;
  email?: string; // not for now
  passwordHash?: string; // not for now
  age?: number;
  sex?: ESex;
  weight?: number; // kg
  height?: number; // cm
  activityLevel?: EActivityLevel;
  allergens?: EAllergen[];
  goal?: EGoal;
  weeklyGoalApproach?: EWeeklyGoalApproach;
  dislikedProducts?: string[]; // GenericProduct ids, user's restrictions
  favoriteProducts?: string[]; // GenericProduct ids, our decision according to user behavior
  favoriteDishes?: string[]; // dish ids, our decision according to user behavior
  isDisabled?: boolean;
}
