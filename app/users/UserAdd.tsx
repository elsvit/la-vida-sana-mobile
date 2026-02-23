// import { RouteProp } from '@react-navigation/native';
import { t } from '~/services/localization/localization';
import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';

export default function UserAdd() {
  const title = t('users.add_user');

  return (
    <SafeAreaBackground>
      <ScreenHeader title={title} />
    </SafeAreaBackground>
  );
};
