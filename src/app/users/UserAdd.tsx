import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { UserForm } from '~/components/users/User/UserForm';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { addUser, clearUsers } from '~/store/users/slice';
import { EFormMode } from '~/types/ICommon';
import { IUser, UserFormProps } from '~/types/IUser';

export default function UserAdd() {
  useI18nHeaderTitle('users.add_user');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = (user: UserFormProps) => {

    const id = uuidv4();
    const newUser: IUser = {
      id,
      createdAt: new Date().toISOString(),
      ...user,
    } as IUser;

    dispatch(
      addUser({
        entity: newUser,
      }),
      {
        onSuccess: () => {
          if (router.canGoBack()) {
            router.back();
          }
        },
      },
    );
  };

  return (
    <SafeAreaBackground>
      <UserForm mode={EFormMode.Add} onSave={handleSave} />
    </SafeAreaBackground>
  );
}
