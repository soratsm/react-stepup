import { memo, VFC } from 'react';

import { HeaderLayout } from 'components/templates';

const Setting: VFC = () => {
  return (
    <HeaderLayout>
      <p>設定ページです</p>
    </HeaderLayout>
  );
};

export default memo(Setting);
