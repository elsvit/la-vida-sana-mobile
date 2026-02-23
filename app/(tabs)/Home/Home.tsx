import { t } from '~/services/localization/localization';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { ScreenHeader } from '~/components/blocks/ScreenHeader';

export default function Home() {
  const title = t('home.title');

  return (
    <SafeAreaBackground>
      <ScreenHeader title={title} />
    </SafeAreaBackground>
  );
};
