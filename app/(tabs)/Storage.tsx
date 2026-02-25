import { ScreenHeader } from '~/components/blocks/ScreenHeader';
// import { useEffect } from 'react';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
// import { useGetDishes } from '~/hooks/dishes';
import { t } from '~/services/localization/localization';
import { styleSheetFactory } from '~/styles';

export default function Storage() {
  const title = t('storage.title');

  return (
    <SafeAreaBackground hasTopInsets>
      <ScreenHeader title={title} />
    </SafeAreaBackground>
  );
};

const themedStyles = styleSheetFactory(palette => ({
  root: {
    flex: 1,
    backgroundColor: palette.background.primary,
    position: 'relative',
  },
}));
