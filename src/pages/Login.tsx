import { ChangeEvent, memo, useState, VFC } from 'react';
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Input,
  Stack,
} from '@chakra-ui/react';

import { PrimaryButton } from 'components/atoms';
import { useAuth } from 'hooks/useAuth';

const Login: VFC = () => {
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState('');

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

  const onClickLogin = () => login(userId);

  return (
    <SFlex>
      <SBox>
        <SHeading>ユーザー管理アプリ</SHeading>
        <Divider my={'4'} />
        {/* Stack：囲った中を等間隔に並べる */}
        <SStack>
          <Input placeholder='ユーザーID' value={userId} onChange={onChangeUserId} />
          <PrimaryButton disabled={userId === ''} loading={loading} onClick={onClickLogin}>
            ログイン
          </PrimaryButton>
        </SStack>
      </SBox>
    </SFlex>
  );
};

export default memo(Login);

const SStack: VFC<StackProps> = (props) => <Stack spacing={6} py={4} px={10} {...props} />;

const SFlex: VFC<FlexProps> = (props) => (
  <Flex align={'center'} justify={'center'} height={'100vh'} {...props} />
);

const SBox: VFC<BoxProps> = (props) => (
  <Box backgroundColor={'white'} w={'sm'} p={'4'} borderRadius={'md'} shadow={'md'} {...props} />
);

const SHeading: VFC<HeadingProps> = (props) => (
  <Heading as='h1' size={'lg'} textAlign={'center'} {...props} />
);
