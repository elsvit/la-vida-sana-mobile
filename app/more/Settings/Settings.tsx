import React from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationService, t } from '~/services/localization/localization';
import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { setLanguage } from '~/store/account/slice';
import { selectLang } from '~/store/account/selectors';
import { ELang } from '~/types/ILang';
import { themedStyles } from './styles';
import { palette, useStyle } from '~/styles';
import CheckIcon from '~/assets/svg/common/check.svg';

export default function Settings() {
  const dispatch = useDispatch();
  const [styles] = useStyle(themedStyles);
  const currentLang = useSelector(selectLang);
  const title = t('settings.title');
  const handleLanguageChange = async (selectedLang: ELang) => {
    // Update Redux store
    if (selectedLang === currentLang) return;
    try {
      await LocalizationService.changeLanguage(selectedLang);
      dispatch(setLanguage(selectedLang));
    } catch (error) {
      // Handle error if needed
      console.error('Language change failed:', error);
    }
  };

  const languages = [
    { code: ELang.es, name: 'Español' },
    { code: ELang.en, name: 'English' },
  ];

  return (
    <SafeAreaBackground bgColor={palette.background.primary}>
      <ScreenHeader
        title={title}
        hasBackButton
        containerStyle={styles.headerContainer}
      />

      <ScrollView>
        <List.Section>
          <List.Subheader style={styles.listSubheader}>
            {t('settings.language')}
          </List.Subheader>
          {languages.map(language => {
            const isChecked = currentLang === language.code;
            const onPress = () => handleLanguageChange(language.code);

            const renderLeft = () => (
              <View style={styles.checkboxStyle}>
                {isChecked ? <CheckIcon /> : null}
              </View>
            );

            return (
              <List.Item
                key={language.code}
                title={language.name}
                style={styles.item}
                titleStyle={{
                  ...styles.titleStyle,
                  color: isChecked
                    ? palette.text.primary
                    : palette.text.secondary,
                }}
                onPress={onPress}
                left={renderLeft}
              />
            );
          })}
        </List.Section>
      </ScrollView>
    </SafeAreaBackground>
  );
};
