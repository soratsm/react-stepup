/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, VFC } from 'react';
import { Center, Spinner, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { UserCard, UserDetailModal } from 'components/organisms';
import { HeaderLayout } from 'components/templates';
import { useAllUsers } from '../../hooks/useAllUsers';
import { useSelectUser } from '../../hooks/useSelectUser';
import { LoginUser } from 'store/LoginUser';

const UserManagement: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const loginUser = useRecoilValue(LoginUser);

  // 画面表示に取得
  useEffect(() => getUsers(), []);

  // propsとして渡す関数は再レンダリングされると性能劣化するのでuseCallback
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
      // useCallbackの落とし穴
      // 依存配列を空にすると初期情報のまま（ここではuser）なためうまく表示できない
    },
    [users, onSelectUser, onOpen],
  );

  return (
    <HeaderLayout>
      {loading ? (
        // Center：囲った中身を中央寄せ
        // 100vh：全体を100としたときの中央
        <Center h={'100vh'}>
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            // mapの場合はkeyを設定するのを忘れない
            <WrapItem key={user.id} mx={'auto'}>
              <UserCard
                id={user.id}
                onClick={onClickUser}
                imageUrl='https://source.unsplash.com/random'
                userName={user.username}
                fullName={user.name}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
      />
    </HeaderLayout>
  );
};

export default memo(UserManagement);
