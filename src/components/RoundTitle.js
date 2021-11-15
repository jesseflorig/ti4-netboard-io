import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';

import { capitalize } from '../util';

export default function RoundTitle({ roundNumber, phaseName, turnNumber }) {
  const phaseLabel = capitalize(phaseName);

  return (
    <Stack spacing={2}>
      <Heading>{`Round ${roundNumber} ${phaseLabel} Phase`}</Heading>
      {phaseName === 'action' && (
        <Heading size="sm">{`Turn ${turnNumber}`}</Heading>
      )}
    </Stack>
  );
}
