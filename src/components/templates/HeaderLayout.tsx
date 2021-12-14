import { memo, ReactNode, VFC } from "react";

import { Header } from "../organisms";

type Props = {
  children: ReactNode;
};
const HeaderLayout: VFC<Props> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default memo(HeaderLayout)
