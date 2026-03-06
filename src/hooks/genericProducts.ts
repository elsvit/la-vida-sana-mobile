import React from 'react';
import { useSelector } from 'react-redux';

import { selectLang } from '~/store/account/selectors';
import {
  selectAllGenericProductCategories,
  selectGenericProductEntities,
} from '~/store/genericProducts/selectors';
import { ELang } from '~/types/ILang';
import { IStringOptions } from '~/types/ICommon';

export interface ISelectListCategory {
  title: string;
  data: IStringOptions[];
}

// Hook that returns data with their generic products formatted for Select components
export const useGenericProductsSelectListData = (): ISelectListCategory[] => {
  const lang = useSelector(selectLang);
  const categories = useSelector(selectAllGenericProductCategories);
  const productEntities = useSelector(selectGenericProductEntities);

  const categoriesSelectListData = React.useMemo<ISelectListCategory[]>(() => {
    const result: ISelectListCategory[] = [];
    if (!categories || !productEntities) return result;
    for (const cat of categories) {
      const ids: string[] = (cat as any).genericProductIds || [];
      const title: string =
        (lang === ELang.en ? (cat as any).nameEn || (cat as any).name : (cat as any).name) || '';
      result.push({
        title,
        data: ids.map(id => ({
          value: id,
          label: (productEntities as any)[id]?.name || id,
        })),
      });
    }
    return result;
  }, [categories, productEntities, lang]);

  return categoriesSelectListData;
};

export default useGenericProductsSelectListData;
