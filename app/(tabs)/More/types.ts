import { FC } from 'react';
import { EScreens } from '~/types/INavigation';
import { SvgProps } from 'react-native-svg';

export interface IMoreItem {
  title: string;
  Icon: FC<SvgProps>;
  fill?: string; // Icon fill color
  navigateTo?: EScreens;
  navigateToParams?: any;
  onPress?: () => void;
  items?: IMoreItem[];
}
