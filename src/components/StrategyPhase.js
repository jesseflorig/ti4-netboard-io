import React from 'react';
import { Stack } from '@chakra-ui/react';

import CurrentStrategyAction from './CurrentStrategyAction';
import StrategyCards from './StrategyCards';

export default function StrategyPhase() {
  return (
    <Stack spacing={4}>
      <CurrentStrategyAction />
      <StrategyCards />
    </Stack>
  );
}
