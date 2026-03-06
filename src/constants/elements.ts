import { EAllergen } from '~/types/IElement';
import { t } from 'i18next';

export const ALLERGENS: Record<EAllergen, string> = {
  [EAllergen.CELERY]: t('allergens.celery'),
  [EAllergen.CORN]: t('allergens.corn'),
  [EAllergen.CRUSTACEAN_SHELLFISH]: t('allergens.crustacean_shellfish'),
  [EAllergen.EGG]: t('allergens.egg'),
  [EAllergen.FISH]: t('allergens.fish'),
  [EAllergen.FRUITS]: t('allergens.fruits'),
  [EAllergen.GELATIN]: t('allergens.gelatin'),
  [EAllergen.GLUTEN]: t('allergens.gluten'),
  [EAllergen.LUPIN]: t('allergens.lupin'),
  [EAllergen.MEAT]: t('allergens.meat'),
  [EAllergen.MILK]: t('allergens.milk'),
  [EAllergen.MOLLUSKS]: t('allergens.mollusks'),
  [EAllergen.MUSTARD]: t('allergens.mustard'),
  [EAllergen.PEANUTS]: t('allergens.peanuts'),
  [EAllergen.SESAME]: t('allergens.sesame'),
  [EAllergen.SOYBEANS]: t('allergens.soybeans'),
  [EAllergen.SPICES]: t('allergens.spices'),
  [EAllergen.TREE_NUTS]: t('allergens.tree_nuts'),
  [EAllergen.WHEAT]: t('allergens.wheat'),
};

export const ALLERGENS_OPTIONS = (Object.values(EAllergen) as EAllergen[])
  .map((value) => ({
    value,
    label: ALLERGENS[value],
  }));
