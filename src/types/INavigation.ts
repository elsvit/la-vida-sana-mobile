// import type { StackNavigationProp } from '@react-navigation/stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ESeller } from './IProduct';

export enum EMainTabs {
  Home = 'Home',
  Menu = 'Menu',
  Storage = 'Storage',
  Shopping = 'Shopping',
  More = 'More',
}

export enum EScreens {
  // MainTabs = 'MainTabs',
  Settings = 'more/Settings/Settings',
  UserAdd = 'users/UserAdd',
  UserEdit = 'users/UserEdit',
  UsersRemove = 'users/UsersRemove',
  Products = 'products/Products/Products',
  Product = 'products/Product/Product',
  Dishes = 'dishes/Dishes/Dishes',
  Dish = 'dishes/Dish/Dish',
}

export type ScreenRoutes = EMainTabs | EScreens;

export type ScreenRoutesParams = {
  // [EScreens.MainTabs]: undefined;
  [EMainTabs.Home]: undefined;
  [EMainTabs.Menu]: undefined;
  [EMainTabs.Storage]: undefined;
  [EMainTabs.Shopping]: undefined;
  [EMainTabs.More]: undefined;
  [EScreens.Settings]: undefined;
  // [EScreens.UserAdd]: undefined;
  // [EScreens.UserEdit]: { userId: string };
  [EScreens.Products]: { seller: ESeller };
  [EScreens.Product]: { id: string; seller: ESeller };
  // [EScreens.Product]: { productId: string; seller: ESeller };
  [EScreens.Dishes]: undefined;
  [EScreens.Dish]: { dishId: string };
};

export type NavigationProp = NativeStackNavigationProp<ScreenRoutesParams>;
