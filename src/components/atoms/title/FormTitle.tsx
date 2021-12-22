import { memo, ReactNode, VFC } from "react";
import { Heading } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};
const FormTitle: VFC<Props> = (props) => {
  const { children } = props;
  return (
    <Heading fontSize={"2xl"} textAlign={"center"}>
      {children}
    </Heading>
  );
};

export default memo(FormTitle);
      