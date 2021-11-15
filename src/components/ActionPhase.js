import React from 'react';
import { Stack } from '@chakra-ui/react';

import Store from './Store';
import CurrentActionTurn from './CurrentActionTurn';
import InitiativeTracker from './InitiativeTracker';

export default function ActionPhase() {
  const { store } = React.useContext(Store);

  return (
    <Stack spacing={4}>
      <CurrentActionTurn />
      <InitiativeTracker />
    </Stack>
  );
}
