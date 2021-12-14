import { memo, VFC } from 'react';
import {
  Drawer,
  DrawerProps,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  ButtonProps,
  ModalBodyProps,
} from '@chakra-ui/react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
};

const MenuDrawer: VFC<Props> = (props) => {
  const { onClose, isOpen, onClickHome, onClickUserManagement, onClickSetting } = props;
  return (
    <SDrawer onClose={onClose} isOpen={isOpen}>
      {/* DrawerOverlay：開いたときに後ろを暗くする */}
      <DrawerOverlay>
        {/* DrawerContent：中身の部分 */}
        <DrawerContent>
          <SDrawerBody>
            <SButton onClick={onClickHome}>TOP</SButton>
            <SButton onClick={onClickUserManagement}>ユーザー一覧</SButton>
            <SButton onClick={onClickSetting}>設定</SButton>
          </SDrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </SDrawer>
  );
};

export default memo(MenuDrawer);

// style
const SDrawer: VFC<DrawerProps> = (props) => {
  return <Drawer placement='left' size='xs' {...props} />;
};

const SDrawerBody: VFC<DrawerBody> = (props) => {
  return <DrawerBody p={0} bg='gray.100' {...props} />;
};

const SButton: VFC<ButtonProps> = (props) => {
  return <Button w='100%' {...props} />;
};
