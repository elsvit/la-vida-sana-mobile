import React, { useEffect } from 'react';

import { Redirect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '~/store';
import { selectIsLangInitiating, selectLang } from '~/store/account/selectors';
import { initLanguage } from '~/store/account/slice';
import { fetchGenericProducts } from '~/store/genericProducts/slice';
import {
  fetchCarrefourProducts,
  fetchMercadonaProducts,
} from '~/store/products/slice';
import { EMainTabs } from '~/types/INavigation';

// Redirect the root path "/" to the Home tab route (route groups are invisible)
export default function Index() {
  return <Redirect href={`/${EMainTabs.Home}`} />;
}
