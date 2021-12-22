import { memo,  VFC } from "react";
import { Image, ImageProps } from "@chakra-ui/react";

type Props = {
};
const LoginImage: VFC<Props> = () => {
  return (
    <SImage
      alt={"Login Image"}
      src={
        "https://images.unsplash.com/photo-1639755015936-8d9b1e181338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }
    />
  );
};

export default memo(LoginImage);

// style
const SImage: VFC<ImageProps> = (props) => {
  return <Image objectFit={"cover"} {...props} />;
};
