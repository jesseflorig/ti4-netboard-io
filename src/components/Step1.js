import React from 'react';
import { Stack } from '@chakra-ui/react';

import ExpansionsSetting from './ExpansionsSetting';
import VictoryPointLimitSetting from './VictoryPointLimitSetting';

export default function Step1() {
  return (
    <Stack spacing={6}>
      <VictoryPointLimitSetting />
      <ExpansionsSetting />
    </Stack>
  );
}
