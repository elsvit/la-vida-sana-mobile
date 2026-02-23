import { ScreenHeader } from '~/components/blocks/ScreenHeader';
// import { useEffect } from 'react';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
// import { useGetDishes } from '~/hooks/dishes';
import { t } from '~/services/localization/localization';

export default function Storage() {
  const title = t('storage.title');

  return (
    <SafeAreaBackground>
      <ScreenHeader title={title} />
    </SafeAreaBackground>
  );
};
