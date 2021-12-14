import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { User } from '../types/api/User';
import { useMessage } from './useMessage';
import { useSetRecoilState } from 'recoil';
import { LoginUser } from 'store/LoginUser';

export const useAuth = () => {
  const router = useRouter();
  const { showMessage } = useMessage();
  const setLoginUser = useSetRecoilState(LoginUser);
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // contextにログインユーザーの情報を保存
            // サンプル的にidが10のユーザーを管理者としてみる
            const isAdmin = res.data.id === 10 ? true : false;
            // 『(res.data, isAdmin)』だと渡せないため下記の書き方
            setLoginUser({ isAdmin, ...res.data });
            showMessage({ title: 'ログインしました', status: 'success' });
            router.push('/home');
          } else {
            showMessage({
              title: 'ユーザーが見つかりません',
              status: 'error',
            });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: 'ログインできません', status: 'error' });
          setLoading(false);
        });
    },
    [router, setLoginUser, showMessage],
  );
  return { login, loading };
};
