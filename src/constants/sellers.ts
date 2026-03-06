import { FC } from 'react';

import { SvgProps } from 'react-native-svg';

import CarrefourIcon from '~/assets/svg/sellers/carrefour.svg';
import MercadonaIcon from '~/assets/svg/sellers/mercadona.svg';
import AnotherSellerIcon from '~/assets/svg/sellers/anotherSeller.svg';
import { ESeller } from '~/types/IProduct';


export const SELLERS_ICONS: Record<ESeller, FC<SvgProps>> = {
  [ESeller.MERCADONA]: MercadonaIcon,
  [ESeller.CARREFOUR]: CarrefourIcon,
  [ESeller.ANOTHER_SELLER]: AnotherSellerIcon,
};
