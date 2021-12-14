import { memo, VFC } from "react";
import { IconButton ,IconButtonProps} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
  // 引数なしで返却値なしの関数
  onOpen: () => void;
};

const MenuIconButton: VFC<Props> = (props) => {
  const { onOpen } = props;
  return (
    <SIconButton
      aria-label='メニューボタン'
      onClick={onOpen}
    />
  );
};

export default memo(MenuIconButton)

// style
const SIconButton: VFC<IconButtonProps> = (props) => (
  <IconButton
    icon={<HamburgerIcon />}
    size='sm'
    variant='unstyled'
    display={{ base: 'block', md: 'none' }}
    {...props}
  />
);
