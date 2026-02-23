import { RouteProp } from '@react-navigation/native';
import { t } from '~/services/localization/localization';
import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';

export const User = ({ route }: { route: RouteProp<any, any> }) => {
  const title = t('more.title');

  return (
    <SafeAreaBackground>
      <ScreenHeader title={title} />
    </SafeAreaBackground>
  );
};
