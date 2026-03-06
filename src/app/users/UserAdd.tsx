import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { UserForm } from '~/components/users/User/UserForm';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { EFormMode } from '~/types/ICommon';
import { IUser, UserFormProps } from '~/types/IUser';
import { useDispatch } from 'react-redux';
import { addUser } from '~/store/users/slice';

export default function UserAdd() {
  useI18nHeaderTitle('users.add_user');
  const dispatch = useDispatch();
  const handleSave = (user: UserFormProps) => {
    const newUser: IUser = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      ...user,
    } as IUser;

    dispatch(
      addUser({
        entity: newUser,
      }),
    );
  };

  return (
    <SafeAreaBackground>
      <UserForm mode={EFormMode.Add} onSave={handleSave} />
    </SafeAreaBackground>
  );
}
