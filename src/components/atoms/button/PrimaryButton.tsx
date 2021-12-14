import { memo, ReactNode, VFC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

const PrimaryButton: VFC<Props> = (props) => {
  const { children, disabled = false, loading = false, onClick } = props;
  return (
    <SButton disabled={disabled || loading} isLoading={loading} onClick={onClick}>
      {children}
    </SButton>
  );
};

export default memo(PrimaryButton);

// style
const SButton: VFC<ButtonProps> = (props) => (
  <Button backgroundColor={'teal.400'} color={'white'} _hover={{ opacity: 0.8 }} {...props} />
);
