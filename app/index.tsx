import { Redirect } from 'expo-router';
import { EMainTabs } from "~/types/INavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "~/store";
import React, { useEffect } from 'react';
import { fetchGenericProducts } from '~/store/genericProducts/slice';
import { initLanguage } from '~/store/account/slice';
import { selectIsLangInitiating, selectLang } from '~/store/account/selectors';
import { fetchCarrefourProducts, fetchMercadonaProducts, } from '~/store/products/slice';

// Redirect the root path "/" to the Home tab route (route groups are invisible)
export default function Index() {
  return <Redirect href={`/${EMainTabs.Home}`} />;
}
