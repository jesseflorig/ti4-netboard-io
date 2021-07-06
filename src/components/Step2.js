import React from 'react';
import { Stack } from '@chakra-ui/react';

import PlayersSetting from './PlayersSetting';

export default function Step2() {
  return (
    <Stack spacing={6}>
      <PlayersSetting />
    </Stack>
  );
}
