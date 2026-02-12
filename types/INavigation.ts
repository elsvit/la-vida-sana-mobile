// import type { StackNavigationProp } from '@react-navigation/stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ESeller } from './IProduct';

export enum EMainTabs {
  Home = 'MainTabs.Home',
  Menu = 'MainTabs.Menu',
  Storage = 'MainTabs.Storage',
  Shopping = 'MainTabs.Shopping',
  More = 'MainTabs.More',
}

export enum EScreens {
  MainTabs = 'MainTabs',
  Settings = 'Screens.Settings',
  UserAdd = 'Screens.UserAdd',
  UserEdit = 'Screens.UserEdit',
  Products = 'Screens.Products',
  Product = 'Screens.Product',
  Dishes = 'Screens.Dishes',
  Dish = 'Screens.Dish',
}

export type ScreenRoutes = EMainTabs | EScreens;

export type ScreenRoutesParams = {
  [EScreens.MainTabs]: undefined;
  [EMainTabs.Home]: undefined;
  [EMainTabs.Menu]: undefined;
  [EMainTabs.Storage]: undefined;
  [EMainTabs.Shopping]: undefined;
  [EMainTabs.More]: undefined;
  [EScreens.Settings]: undefined;
  [EScreens.UserAdd]: undefined;
  [EScreens.UserEdit]: { userId: string };
  [EScreens.Products]: { seller: ESeller };
  [EScreens.Product]: { productId: string; seller: ESeller };
  [EScreens.Dishes]: undefined;
  [EScreens.Dish]: { dishId: string };
};

export type NavigationProp = NativeStackNavigationProp<ScreenRoutesParams>;
