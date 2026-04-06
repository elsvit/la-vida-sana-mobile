import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { UserForm } from '~/components/users/User';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { updateUser } from '~/store/users';
import { EFormMode } from '~/types/ICommon';
import { IUser, UserFormProps } from '~/types/IUser';

export default function UserEdit() {
  useI18nHeaderTitle('users.edit_user');
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<Record<string, { userId: string }>, string>>();
  const userId = route.params?.userId;
  const handleSave = (user: UserFormProps) => {
    const newUser: IUser = {
      id: userId as string,
      updatedAt: new Date().toISOString(),
      ...user,
    } as IUser;

    dispatch(
      updateUser({
        entity: newUser,
      }),
    );
  };

  return (
    <SafeAreaBackground>
      <UserForm mode={EFormMode.Edit} onSave={handleSave} />
    </SafeAreaBackground>
  );
}
