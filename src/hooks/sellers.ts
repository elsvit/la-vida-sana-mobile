import { t } from '~/services';
import { ESeller } from '~/types/IProduct';

export const useGetAllSellersOptions = () => {
  return [
    {
      label: t('sellers.mercadona') || 'Mercadona',
      value: ESeller.MERCADONA,
    },
    {
      label: t('sellers.carrefour') || 'Carrefour',
      value: ESeller.CARREFOUR,
    },
    {
      label: t('sellers.another_seller') || 'Other',
      value: ESeller.ANOTHER_SELLER,
    },
  ];
};
