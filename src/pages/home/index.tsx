import { memo, VFC } from "react";

import { HeaderLayout } from "components/templates";

const Home: VFC = () => {
  return(
    <HeaderLayout>
      <p>Homeページです</p>
    </HeaderLayout>)
};

export default memo(Home)
