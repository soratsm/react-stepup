import { memo, VFC } from 'react';
import {
  Box,
  BoxProps,
  Stack,
  StackProps,
  Image,
  ImageProps,
  Text,
  TextProps,
} from '@chakra-ui/react';

type Props = {
  id: number;
  imageUrl: string;
  userName: string;
  fullName: string;
  onClick: (id: number) => void;
};

const UserCard: VFC<Props> = (props) => {
  const { id, imageUrl, userName, fullName, onClick } = props;
  return (
    <SBox onClick={() => onClick(id)}>
      <SStack>
        <SImage src={imageUrl} alt={userName} />
        <STextLg>{userName}</STextLg>
        <STextSm>{fullName}</STextSm>
      </SStack>
    </SBox>
  );
};

export default memo(UserCard);

// style
const SBox: VFC<BoxProps> = (props) => (
  <Box
    w={'260px'}
    h={'260px'}
    bg={'white'}
    borderRadius={'10px'}
    shadow={'md'}
    p={4}
    _hover={{
      cursor: 'pointer',
      opacity: 0.8,
    }}
    {...props}
  />
);

const SStack: VFC<StackProps> = (props) => <Stack textAlign={'center'} {...props} />;

const SImage: VFC<ImageProps> = (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <Image borderRadius={'full'} boxSize={'160px'} m={'auto'} {...props} />
);

const STextLg: VFC<TextProps> = (props) => <Text fontSize={'lg'} fontWeight={'bold'} {...props} />;

const STextSm: VFC<TextProps> = (props) => <Text fontSize={'sm'} color={'gray'} {...props} />;
