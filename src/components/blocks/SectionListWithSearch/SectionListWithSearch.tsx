import * as React from 'react';
import { Pressable, SectionList, StyleProp, View, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { IStringOptions } from '~/types/ICommon';
import { t } from '~/services';
import { Search } from '~/components/ui/Search';

type TNormalizedSection = {
  title: string;
  ids: string[];
  labels?: Record<string, string>;
};

type Props = {
  style?: StyleProp<ViewStyle>;
  isMultiple?: boolean;
  value?: string[]; // optional controlled selected values
  data: {
    title: string;
    data: string[] | IStringOptions[];
  }[];
  renderItem?: (value: string) => React.ReactNode;
  onChange: (value: string[]) => void;
  ListEmptyComponent?: React.ReactElement | null;
};

export const SectionListWithSearch: React.FC<Props> = ({
  style,
  isMultiple,
  value,
  data,
  renderItem,
  onChange,
  ListEmptyComponent,
}) => {
  // Collapsible sections state
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  React.useEffect(() => {
    setExpanded(prev => {
      const next: Record<string, boolean> = {};
      for (const c of data) next[c.title] = prev[c.title] ?? false;
      return next;
    });
  }, [data]);

  const toggleSection = React.useCallback((title: string) => {
    setExpanded(prev => ({ ...prev, [title]: !prev[title] }));
  }, []);

  // Normalize incoming data to ids and labels map
  const normalized = React.useMemo<TNormalizedSection[]>(() => {
    return data.map(c => {
      const ids: string[] = [];
      const labels: Record<string, string> = {};
      for (const it of c.data as (string | IStringOptions)[]) {
        if (typeof it === 'string') {
          ids.push(it);
        } else if (it) {
          const id = String((it as IStringOptions).value ?? (it as any).value ?? '');
          if (id) {
            ids.push(id);
            const label = (it as IStringOptions).label;
            if (label) labels[id] = String(label);
          }
        }
      }
      return { title: c.title, ids, labels };
    });
  }, [data]);

  // Local selected state managed inside the component
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

  const onToggleItem = React.useCallback(
    (value: string) => {
      if (isMultiple) {
        const base = effectiveSelectedMany;
        const exists = base.includes(value);
        const next = exists ? base.filter(v => v !== value) : [...base, value];
        // Optimistically update internal state for instant UI
        setSelectedMany(next);
        onChange(next);
      } else {
        // Optimistically update internal state for instant UI
        setSelectedOne(value);
        onChange([value]);
      }
    },
    [isMultiple, onChange, effectiveSelectedMany],
  );

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');

  // Apply filtering by id (value) and label
  const effectiveNormalized = React.useMemo<TNormalizedSection[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return normalized;

    return normalized
      .map(sec => {
        const filteredIds = sec.ids.filter(id => {
          const idMatch = id.toLowerCase().includes(q);
          const label = sec.labels?.[id] || '';
          const labelMatch = label.toLowerCase().includes(q);
          return idMatch || labelMatch;
        });
        const newLabels: Record<string, string> = {};
        for (const id of filteredIds) {
          if (sec.labels?.[id]) newLabels[id] = sec.labels[id];
        }
        return { title: sec.title, ids: filteredIds, labels: newLabels };
      })
      .filter(sec => sec.ids.length > 0);
  }, [normalized, searchQuery]);

  const sections = React.useMemo(
    () => {
      const base = searchQuery ? effectiveNormalized : normalized;
      return base.map(c => ({
        key: c.title,
        title: c.title,
        // Visible items depend on search/expanded, but keep full ids on the section
        data: (searchQuery || expanded[c.title]) ? c.ids : [],
        allIds: c.ids,
        labels: c.labels || {},
      }));
    },
    [effectiveNormalized, expanded, normalized, searchQuery],
  );

  return (
    <View style={{ flex: 1 }}>
      <Search value={searchQuery} onChangeText={setSearchQuery} />
      <SectionList
        style={style}
        bounces={false}
        sections={sections}
      keyExtractor={(item, index) => `${item as string}-${index}`}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="always"
      persistentScrollbar
      renderSectionHeader={({ section }) => {
        const segItems: string[] = (section as any).data || [];
        const allIds: string[] = (section as any).allIds || segItems;
        let segSelectedCount = 0;
        if (isMultiple) {
          const set = new Set(effectiveSelectedMany);
          segSelectedCount = allIds.filter(id => set.has(String(id))).length;
        } else {
          segSelectedCount = effectiveSelectedOne && allIds.includes(String(effectiveSelectedOne)) ? 1 : 0;
        }
        const totalCount = allIds.length;
        const headerTitle = `${section.title} (${segSelectedCount}/${totalCount})`;
        const isOpen = searchQuery ? true : expanded[section.title as string];
        return (
          <List.Item
            title={headerTitle}
            onPress={() => {
              if (!searchQuery) toggleSection(section.title as string);
            }}
            right={() => <List.Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} />}
          />
        );
      }}
      renderItem={({ item, section }) => {
        const id = String(item);
        const isSelected = isMultiple ? effectiveSelectedMany.includes(id) : effectiveSelectedOne === id;
        const onPress = () => onToggleItem(id);
        if (renderItem) {
          return (
            <Pressable
              onPress={onPress}
              style={{
                borderRadius: 12,
                paddingHorizontal: 8,
                borderColor: isSelected ? '#007AFF' : '#9E9E9E',
                borderWidth: 1,
                margin: 4,
              }}
            >
              {renderItem(id)}
            </Pressable>
          ) as any;
        }
        const labelMap = (section as any).labels || {};
        return (
          <List.Item
            title={labelMap[id] || id}
            onPress={onPress}
            left={() =>
              isSelected ? <List.Icon icon="check" /> : <View style={{ width: 24 }} />
            }
          />
        );
      }}
      stickySectionHeadersEnabled={false}
      initialNumToRender={20}
      windowSize={5}
      maxToRenderPerBatch={20}
      removeClippedSubviews={false}
      ListEmptyComponent={
        ListEmptyComponent || <List.Item title={t('common.no_items')} />
      }
    />
    </View>
  );
};

export default SectionListWithSearch;
