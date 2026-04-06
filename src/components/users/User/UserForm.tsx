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
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  mode: EFormMode;
  user?: IUser;
  onSave?: (user: UserFormProps) => void;
};

type FormValues = {
  name: string;
  birthYear: string; // keep as string in UI; zod will coerce to number
  sex?: ESex;
  weight: string; // keep as string in UI; zod will coerce to number
  height: string; // keep as string in UI; zod will coerce to number
  activityLevel?: EActivityLevel;
  goal?: EGoal;
};

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, t('common.required') || 'Required'),
  birthYear: z.coerce
    .number()
    .finite({ message: t('common.required') || 'Required' }),
  sex: z.nativeEnum(ESex, {
    error: t('common.required') || 'Required',
  }),
  weight: z.coerce
    .number()
    .finite({ message: t('common.required') || 'Required' }),
  height: z.coerce
    .number()
    .finite({ message: t('common.required') || 'Required' }),
  activityLevel: z.nativeEnum(EActivityLevel, {
    error: t('common.required') || 'Required',
  }),
  goal: z.nativeEnum(EGoal, {
    error: t('common.required') || 'Required',
  }),
});

export const UserForm: React.FC<Props> = ({ mode, user, onSave }) => {
  useI18nHeaderTitle(
    mode === EFormMode.Add ? 'users.add_user' : 'users.edit_user',
  );

  const allSellersOptions = useGetAllSellersOptions();

  const [lastName, setLastName] = React.useState(user?.lastName ?? '');
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

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name ?? '',
      birthYear: user?.birthYear?.toString() ?? '',
      sex: user?.sex,
      weight: user?.weight?.toString() ?? '',
      height: user?.height?.toString() ?? '',
      activityLevel: user?.activityLevel ?? EActivityLevel.SedentaryActive,
      goal: user?.goal ?? EGoal.MaintainWeight,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

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

  const onSubmit = (raw: FormValues) => {
    // Validate with zod
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormValues | undefined;
        if (field) {
          setError(field, { type: 'manual', message: issue.message });
        }
      }
      return;
    }

    const d = parsed.data;
    const newUser: UserFormProps = {
      name: d.name,
      lastName,
      birthYear: d.birthYear,
      sex: d.sex,
      weight: d.weight,
      height: d.height,
      activityLevel: d.activityLevel,
      goal: d.goal,
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
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        label={t('users.name') || 'Name'}
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                      />
                      {!!errors.name && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.name.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
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
                <Controller
                  control={control}
                  name="birthYear"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        label={t('users.birth_year') || 'Birth Year'}
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        keyboardType="number-pad"
                      />
                      {!!errors.birthYear && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.birthYear.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View style={styles.secondInRow}>
                <Controller
                  control={control}
                  name="sex"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Select
                        label={t('users.sex') || 'Sex'}
                        value={value}
                        onChange={v => onChange(v as ESex)}
                        options={SEX_OPTIONS}
                      />
                      {!!errors.sex && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.sex.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
            </View>
            <Space size={12} />

            {/* 2) Weight, Height */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <Controller
                  control={control}
                  name="weight"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        label={`${t('users.weight')} (${t('sizes.kg')})`}
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        keyboardType="decimal-pad"
                      />
                      {!!errors.weight && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.weight.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View style={styles.secondInRow}>
                <Controller
                  control={control}
                  name="height"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        label={`${t('users.height')} (${t('sizes.cm')})`}
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        keyboardType="decimal-pad"
                      />
                      {!!errors.height && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.height.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
            </View>
            <Space size={12} />

            {/* 3) Goal, GoalApproach */}
            <View style={styles.row}>
              <View style={styles.firstInRow}>
                <Controller
                  control={control}
                  name="goal"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Select
                        label={t('users.goal') || 'Goal'}
                        value={value}
                        onChange={v => onChange(v as EGoal)}
                        options={GOAL_OPTIONS}
                      />
                      {!!errors.goal && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.goal.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
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
                <Controller
                  control={control}
                  name="activityLevel"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Select
                        label={t('users.activity_level') || 'Activity level'}
                        value={value}
                        onChange={v => onChange(v as EActivityLevel)}
                        options={ACTIVITY_LEVEL_OPTIONS}
                      />
                      {!!errors.activityLevel && (
                        <Text style={{ color: 'red', marginTop: 4 }}>
                          {errors.activityLevel.message || (t('common.required') || 'Required')}
                        </Text>
                      )}
                    </>
                  )}
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
                  value={dislikedProducts}
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
                  value={favoriteProducts}
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

            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
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
