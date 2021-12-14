/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, VFC } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Link,
  useDisclosure,
} from '@chakra-ui/react';

import { MenuIconButton } from '../../atoms';
import { MenuDrawer } from '../../molecules';

const Header: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const onClickHome = () => {
    console.log('onClickHome');
    router.push('/home', undefined, { shallow: true });
  };

  const onClickUserManagement = useCallback(() => {
    console.log('onClickUserManagement');
    router.push('/home/user_management', undefined, { shallow: true });
  }, []);
  const onClickSetting = useCallback(() => {
    console.log('onClickSetting');
    router.push('/home/setting', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    router.prefetch('/home');
    router.prefetch('/home/user_management');
    router.prefetch('/home/setting');
  }, []);

  return (
    <>
      <SFlexNav>
        <SFlexA onClick={onClickHome}>
          {/* Heading：H1やH2みたいな表現 */}
          <SHeading>ユーザー管理アプリ</SHeading>
        </SFlexA>
        <SFlexLinks>
          {/* Box：レイアウトの調整divタグみたいなもの */}
          <SBox>
            {/* Link：chakra-uiからimport*/}
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </SBox>
          <Link onClick={onClickSetting}>設定</Link>
        </SFlexLinks>
        <MenuIconButton onOpen={onOpen} />
      </SFlexNav>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
      />
    </>
  );
};

export default memo(Header);

// style
const SFlexNav: VFC<FlexProps> = (props) => {
  return (
    <Flex
      as='nav'
      bg='teal.500'
      color='gray.50'
      align='center'
      justify='space-between'
      padding={{ base: 3, md: 5 }}
      {...props}
    />
  );
};

const SFlexA: VFC<FlexProps> = (props) => {
  return <Flex align='center' as='a' mr={8} _hover={{ cursor: 'pointer' }} {...props} />;
};

const SFlexLinks: VFC<FlexProps> = (props) => {
  return (
    <Flex
      align='center'
      fontSize='sm'
      flexGrow={2}
      display={{ base: 'none', md: 'flex' }}
      {...props}
    />
  );
};

const SHeading: VFC<HeadingProps> = (props) => {
  return <Heading as='h1' fontSize={{ base: 'md', md: 'lg' }} {...props} />;
};

const SBox: VFC<BoxProps> = (props) => {
  return <Box pr={4} {...props} />;
};
