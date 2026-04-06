import React from 'react';

import { Redirect } from 'expo-router';
import 'react-native-get-random-values';

import { EMainTabs } from '~/types/INavigation';

// Redirect the root path "/" to the Home tab route (route groups are invisible)
export default function Index() {
  return <Redirect href={`/${EMainTabs.Home}`} />;
}
