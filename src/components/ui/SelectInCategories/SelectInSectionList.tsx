import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Modal as PaperModal, Portal } from 'react-native-paper';
import { TextInput } from '~/components/ui';
import { INPUT_HEIGHT } from '~/constants/sizes';
import { IStringOptions } from '~/types/ICommon';
import { SectionListWithSearch } from '~/components/blocks/SectionListWithSearch/SectionListWithSearch';

const MAX_SYMBOLS_IN_INPUT = 25;

type SelectInCategoriesProps = {
  label?: string;
  isMultiple?: boolean;
  value?: string[]; // optional controlled values
  selectListData: {
    title: string; // category name
    data: string[] | IStringOptions[]; // product id[] or {id: value, label: name}[]
  }[];
  renderItem?: (value: string) => React.ReactNode; // value is product id
  onChange: (value: string[]) => void;
};

export function SelectInSectionList({
  label,
  isMultiple,
  value,
  selectListData,
  renderItem,
  onChange,
}: SelectInCategoriesProps) {
  const [visible, setVisible] = React.useState(false);
  const [selectedMany, setSelectedMany] = React.useState<string[]>([]);
  const [selectedOne, setSelectedOne] = React.useState<string | null>(null);

  // Derive effective selection from controlled prop when provided
  const effectiveSelectedMany = React.useMemo(() => {
    if (isMultiple) return (value ?? selectedMany) as string[];
    return [];
  }, [isMultiple, value, selectedMany]);

  const effectiveSelectedOne = React.useMemo(() => {
    if (isMultiple) return null;
    const v = Array.isArray(value) && value.length ? value[0] : selectedOne;
    return v ?? null;
  }, [isMultiple, value, selectedOne]);

  // Aggregate labels map across all sections for quick id->label lookup
  const labelsMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of selectListData) {
      for (const it of c.data as (string | IStringOptions)[]) {
        if (typeof it !== 'string' && it) {
          const id = String((it as IStringOptions).value ?? (it as any).value ?? '');
          const label = (it as IStringOptions).label;
          if (id && label) map[id] = String(label);
        }
      }
    }
    return map;
  }, [selectListData]);

  const displayValue = React.useMemo(() => {
    const truncate = (str: string, max: number) =>
      str.length > max ? `${str.slice(0, max)}...` : str;

    if (isMultiple) {
      if (!effectiveSelectedMany.length) return '';
      const labels = effectiveSelectedMany.map(id => labelsMap[id] || id);

      // Build comma-separated string until limit, then append rest count
      let result = '';
      for (let i = 0; i < labels.length; i++) {
        const seg = labels[i];
        const candidate = result ? `${result}, ${seg}` : seg;
        if (candidate.length > MAX_SYMBOLS_IN_INPUT) {
          const rest = labels.length - i;
          if (!result) {
            const restMinusOne = rest - 1;
            const truncatedSeg = truncate(seg, MAX_SYMBOLS_IN_INPUT);
            return restMinusOne ? `${truncatedSeg} (+${restMinusOne})` : truncatedSeg;
          }
          console.log('TEST_80', result, rest);
          return rest ? `${result}... (+${rest})` : result;
        }
        result = candidate;
      }
      return result;
    }

    if (!effectiveSelectedOne) return '';
    const label = labelsMap[effectiveSelectedOne] || effectiveSelectedOne;
    return truncate(label, MAX_SYMBOLS_IN_INPUT);
  }, [isMultiple, labelsMap, effectiveSelectedMany, effectiveSelectedOne]);

  const handleChangeFromList = React.useCallback(
    (values: string[]) => {
      if (isMultiple) {
        setSelectedMany(values);
        onChange(values);
      } else {
        const value = values[0] || null;
        setSelectedOne(value);
        onChange(value ? [value] : []);
        if (value) setVisible(false);
      }
    },
    [isMultiple, onChange],
  );

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label}
        value={displayValue}
        editable={false}
        multiline={false}
        onPressIn={() => setVisible(true)}
        right={
          <TextInput.Icon
            icon="chevron-down"
            onPress={() => setVisible(true)}
            forceTextInputFocus={false}
            accessibilityLabel="Open list"
          />
        }
        outlineStyle={styles.outlineStyle}
        style={styles.input}
      />

      <Portal>
        <PaperModal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Appbar.Header mode="center-aligned" statusBarHeight={0}>
            <Appbar.Action icon="close" onPress={() => setVisible(false)} />
            <Appbar.Content title={label || ''} />
          </Appbar.Header>

          <SectionListWithSearch
            style={styles.list}
            isMultiple={isMultiple}
            value={isMultiple ? effectiveSelectedMany : effectiveSelectedOne ? [effectiveSelectedOne] : []}
            data={selectListData}
            renderItem={renderItem}
            onChange={handleChangeFromList}
          />
        </PaperModal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  outlineStyle: {
    borderRadius: 12,
    borderColor: '#9E9E9E',
  },
  input: {
    height: INPUT_HEIGHT,
  },
  list: {
    flex: 1,
  },
  modalContainer: {
    height: '85%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
});
