import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import CrossIcon from '~/assets/svg/common/cross-circle.svg';
// import { useStyle } from '~/styles';
// import themedStyles from './styles';

import SearchIcon from '~/assets/svg/common/search.svg';

export const Search = ({ onChange }: { onChange: (v: string) => void }) => {
  // const [styles] = useStyle(themedStyles);
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
    onChange(text);
  };

  const clear = () => {
    setValue('');
    onChange('');
  };

  return (
    <View style={styles.container}>
      <SearchIcon width={20} height={20} />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder="Search..."
      />

      {value.length > 0 && (
        <Pressable onPress={clear}>
          <CrossIcon width={18} height={18} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 10,
    // backgroundColor: theme.colors.backgroundSecondary,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
  },
});
