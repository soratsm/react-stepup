import { memo, ReactNode, VFC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

type Props = {
  icon: IconBaseProps;
  disabled?:boolean
  onClick: () => void;
  children: ReactNode;
};
const PrimaryButton: VFC<Props> = (props) => {
  const { icon,disabled=false, onClick, children } = props;
  return (
    <SButton disabled={disabled} onClick={onClick}>
      {icon}
      {children}
    </SButton>
  );
};

export default memo(PrimaryButton);

// style
const SButton: VFC<ButtonProps> = (props) => {
  return <Button colorScheme={"blue"} variant={"solid"} {...props} />;
};
