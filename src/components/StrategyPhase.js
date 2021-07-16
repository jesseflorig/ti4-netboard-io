import React from 'react';
import { Stack } from '@chakra-ui/react';

import CurrentStrategyAction from './CurrentStrategyAction';
import EndPhaseActions from './EndPhaseActions';
import StrategyCards from './StrategyCards';

import Store from './Store';

export default function StrategyPhase() {
  const { store } = React.useContext(Store);
  const { currentPhaseComplete } = store;

  return (
    <Stack spacing={4}>
      {!currentPhaseComplete && <CurrentStrategyAction />}
      {currentPhaseComplete && <EndPhaseActions />}
      <StrategyCards />
    </Stack>
  );
}
