import { t } from '~/services';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { ScreenHeader } from '~/components/blocks/ScreenHeader';

export default function Home() {
  const title = t('home.title');

  return (
    <SafeAreaBackground hasTopInsets>
      <ScreenHeader title={title} />
    </SafeAreaBackground>
  );
};
