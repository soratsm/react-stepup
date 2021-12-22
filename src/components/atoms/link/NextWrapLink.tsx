// ChakraUIのリンクはNextLinkではないのでラッピングすることで使用する
import { memo, VFC } from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

const NextWrapLink: VFC<LinkProps> = (props) => {
  const { href = '' } = props;
  return (
    <NextLink href={href}>
      <Link {...props} onClick={() => (document.activeElement as HTMLElement).blur()} />
    </NextLink>
  );
};

export default memo(NextWrapLink)
