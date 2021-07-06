import React from 'react';
import { Stack } from '@chakra-ui/react';

import InactiveTimerSetting from './InactiveTimerSetting';

export default function Step3() {
  return (
    <Stack spacing={6}>
      <InactiveTimerSetting />
    </Stack>
  );
}
