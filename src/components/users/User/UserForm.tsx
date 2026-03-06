import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { GenericProductSelectItem } from '~/components/genericProducts';
import {
  Button,
  Card,
  Select,
  SelectInSectionList,
  Space,
  Switch,
  Text,
  TextInput,
} from '~/components/ui';
import { useGenericProductsSelectListData } from '~/hooks/genericProducts';
import { useGetAllSellersOptions } from '~/hooks/sellers';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { t } from '~/services';
import { EFormMode } from '~/types/ICommon';
import { ESeller } from '~/types/IProduct';
import {
  EActivityLevel,
  EGoal,
  ESex,
  EWeeklyGoalApproach,
  IUser,
  UserFormProps,
} from '~/types/IUser';

type Props = {
  mode: EFormMode;
  user?: IUser;
  onSave?: (user: UserFormProps) => void;
};

export const UserForm: React.FC<Props> = ({ mode, user, onSave }) => {
  useI18nHeaderTitle(
    mode === EFormMode.Add ? 'users.add_user' : 'users.edit_user',
  );

  const allSellersOptions = useGetAllSellersOptions();

  const [name, setName] = React.useState(user?.name ?? '');
  const [lastName, setLastName] = React.useState(user?.lastName ?? '');
  const [birthYear, setBirthYear] = React.useState(
    user?.birthYear?.toString() ?? '',
  );
  const [sex, setSex] = React.useState<ESex | undefined>(user?.sex);
  const [weight, setWeight] = React.useState(user?.weight?.toString() ?? '');
  const [height, setHeight] = React.useState(user?.height?.toString() ?? '');
  const [activityLevel, setActivityLevel] = React.useState<
    EActivityLevel | undefined
  >(user?.activityLevel);
  const [goal, setGoal] = React.useState<EGoal | undefined>(user?.goal);
  const [goalApproach, setWeeklyGoalApproach] = React.useState<
    EWeeklyGoalApproach | undefined
  >(user?.goalApproach);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(
    Boolean(user?.isDisabled),
  );
  const [numberOfMeals, setNumberOfMeals] = React.useState<number | undefined>(
    user?.numberOfMeals,
  );
  const [weeklyBudget, setWeeklyBudget] = React.useState<number | undefined>(
    user?.weeklyBudget,
  );
  const [selectedSellers, setSelectedSellers] = React.useState<ESeller[]>(
    user?.sellers ?? [],
  );
  const [dislikedProducts, setDislikedProducts] = React.useState<string[]>(
    user?.dislikedProducts ?? [],
  );
  const [favoriteProducts, setFavoriteProducts] = React.useState<string[]>(
    user?.favoriteProducts ?? [],
  );

  const categoriesSelectListData = useGenericProductsSelectListData();

  const ACTIVITY_LEVEL_OPTIONS = [
    {
      label: t('users.userActivity.sedentary') || 'Sedentario',
      value: EActivityLevel.SedentaryActive,
    },
    {
      label: t('users.userActivity.light') || 'Ligero',
      value: EActivityLevel.LightActive,
    },
    {
      label: t('users.userActivity.moderate') || 'Moderado',
      value: EActivityLevel.ModeratelyActive,
    },
    {
      label: t('users.userActivity.very') || 'Muy activo',
      value: EActivityLevel.VeryActive,
    },
    {
      label: t('users.userActivity.extreme') || 'Extremo',
      value: EActivityLevel.ExtremelyActive,
    },
  ];

  const SEX_OPTIONS = [
    {
      label: t('users.female') || 'Female',
      value: ESex.female,
    },
    {
      label: t('users.male') || 'Male',
      value: ESex.male,
    },
  ];

  const GOAL_OPTIONS = [
    {
      label: t('users.userGoal.lose_weight') || 'Lose weight',
      value: EGoal.LoseWeight,
    },
    {
      label: t('users.userGoal.maintain_weight') || 'Maintain weight',
      value: EGoal.MaintainWeight,
    },
    {
      label: t('users.userGoal.gain_weight') || 'Gain weight',
      value: EGoal.GainWeight,
    },
    {
      label: t('users.userGoal.build_muscle') || 'Build muscle',
      value: EGoal.BuildMuscle,
    },
    {
      label: t('users.userGoal.improve_health') || 'Improve health',
      value: EGoal.ImproveHealth,
    },
  ];

  const WEEKLY_GOAL_APPROACH_OPTIONS = [
    {
      label: t('users.goalApproach.conservative') || 'Conservative',
      value: EWeeklyGoalApproach.Conservative,
    },
    {
      label: t('users.goalApproach.moderate') || 'Moderate',
      value: EWeeklyGoalApproach.Moderate,
    },
    {
      label: t('users.goalApproach.aggressive') || 'Aggressive',
      value: EWeeklyGoalApproach.Aggressive,
    },
    {
      label: t('users.goalApproach.very_aggressive') || 'Very aggressive',
      value: EWeeklyGoalApproach.VeryAggressive,
    },
  ];

  const handleSellerChange = (selected: ESeller[]) => {
    setSelectedSellers(selected);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const newUser: UserFormProps = {
      // id: user?.id ?? '',
      // createdAt: user?.createdAt ?? '',
      // updatedAt: user?.updatedAt ?? '',
      name,
      lastName,
      birthYear: Number(birthYear),
      sex,
      weight: Number(weight),
      height: Number(height),
      activityLevel,
      goal,
      goalApproach,
      numberOfMeals,
      weeklyBudget,
      sellers: selectedSellers.length ? selectedSellers : undefined,
      dislikedProducts: dislikedProducts.length ? dislikedProducts : undefined,
      favoriteProducts: favoriteProducts.length ? favoriteProducts : undefined,
      isDisabled,
    };
    onSave?.(newUser);
  };

  return (
    <SafeAreaBackground>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card>
          <Card.Content>
            {/* 0) Name, LastName */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <TextInput
                  label={t('users.name') || 'Name'}
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                />
              </View>
              <View style={styles.secondInRow}>
                <TextInput
                  label={t('users.last_name') || 'Last name'}
                  value={lastName}
                  onChangeText={setLastName}
                  mode="outlined"
                />
              </View>
            </View>
            <Space size={12} />

            {/* 1) BirthYear, Sex */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <TextInput
                  label={t('users.birth_year') || 'Birth Year'}
                  value={birthYear}
                  onChangeText={setBirthYear}
                  mode="outlined"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.secondInRow}>
                <Select
                  label={t('users.sex') || 'Sex'}
                  value={sex ?? SEX_OPTIONS[0].value}
                  onChange={v => setSex(v as ESex)}
                  options={SEX_OPTIONS}
                />
              </View>
            </View>
            <Space size={12} />

            {/* 2) Weight, Height */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <TextInput
                  label={`${t('users.weight')} (${t('sizes.kg')})`}
                  value={weight}
                  onChangeText={setWeight}
                  mode="outlined"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.secondInRow}>
                <TextInput
                  label={`${t('users.height')} (${t('sizes.cm')})`}
                  value={height}
                  onChangeText={setHeight}
                  mode="outlined"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            <Space size={12} />

            {/* 3) Goal, GoalApproach */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <Select
                  label={t('users.goal') || 'Goal'}
                  value={goal ?? GOAL_OPTIONS[0].value}
                  onChange={v => setGoal(v as EGoal)}
                  options={GOAL_OPTIONS}
                />
              </View>
              <View style={styles.secondInRow}>
                <Select
                  label={t('users.goal_approach') || 'Weekly goal approach'}
                  value={goalApproach ?? WEEKLY_GOAL_APPROACH_OPTIONS[1].value}
                  onChange={v =>
                    setWeeklyGoalApproach(v as EWeeklyGoalApproach)
                  }
                  options={WEEKLY_GOAL_APPROACH_OPTIONS}
                />
              </View>
            </View>
            <Space size={12} />

            {/* 4) Activity level, Number of meals */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <Select
                  label={t('users.activity_level') || 'Activity level'}
                  value={activityLevel ?? ACTIVITY_LEVEL_OPTIONS[1].value}
                  onChange={v => setActivityLevel(v as EActivityLevel)}
                  options={ACTIVITY_LEVEL_OPTIONS}
                />
              </View>
              <View style={styles.secondInRow}>
                <TextInput
                  label={t('users.number_of_meals') || 'Number of meals'}
                  value={numberOfMeals?.toString() ?? ''}
                  onChangeText={v => setNumberOfMeals(Number(v))}
                  mode="outlined"
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <Space size={12} />

            {/* 5) Weekly budget, Sellers */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <TextInput
                  label={t('users.weekly_budget') || 'Weekly budget'}
                  value={weeklyBudget?.toString() ?? ''}
                  onChangeText={v => setWeeklyBudget(Number(v))}
                  mode="outlined"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.secondInRow}>
                <Select
                  label={t('sellers.title') || 'Sellers'}
                  value={selectedSellers}
                  onChange={handleSellerChange}
                  options={allSellersOptions}
                  isMultiple
                />
              </View>
            </View>

            {/* 6) Disliked / Favorite Generic Products */}
            <Space size={12} />
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <SelectInSectionList
                  label={t('users.disliked_products') || 'Disliked Products'}
                  selectListData={categoriesSelectListData}
                  isMultiple
                  renderItem={(id: string) => (
                    <GenericProductSelectItem
                      genericProductId={id}
                      isSelected={dislikedProducts.includes(id)}
                    />
                  )}
                  onChange={(ids: string[]) => setDislikedProducts(ids)}
                />
              </View>
            </View>
            <Space size={12} />
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <SelectInSectionList
                  label={t('users.favorite_products') || 'Favorite Products'}
                  selectListData={categoriesSelectListData}
                  isMultiple
                  renderItem={(id: string) => (
                    <GenericProductSelectItem
                      genericProductId={id}
                      isSelected={favoriteProducts.includes(id)}
                    />
                  )}
                  onChange={(ids: string[]) => setFavoriteProducts(ids)}
                />
              </View>
            </View>
            <Space size={16} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Switch
                value={isDisabled}
                onValueChange={setIsDisabled}
                style={styles.disabledSwitch}
              />
              <Text>{t('common.disabled') || 'Disabled'}</Text>
            </View>

            <Space size={24} />

            <Button
              mode="contained"
              onPress={handleSave}
              disabled={!name.trim()}
            >
              {t('button.save') || 'Save'}
            </Button>
            <Space size={24} />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  firstInRow: {
    flex: 1,
    marginRight: 8,
  },
  secondInRow: {
    flex: 1,
    marginLeft: 8,
  },
  disabledSwitch: {
    marginRight: 8,
  },
});
