import { useCallback, useState } from "react";

import { User } from "../types/api/User";

type Props = {
  id: number;
  users: User[];
  onOpen: () => void;
};

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find((user) => user.id === id);
    // findは見つからない場合もありundifindとなる
    // この場合『targetUser ?? null』はundifindの時明示的にnullを設定することになるのでエラー解消される
    // もしくは到達前にif文でチェックすればOK
    // または必ず来ることが確定しているのであれば『targetUser!』でもいい
    setSelectedUser(targetUser!);
    onOpen();
  }, []);

  return { onSelectUser, selectedUser };
};
