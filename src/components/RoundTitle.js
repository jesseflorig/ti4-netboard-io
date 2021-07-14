import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { capitalize } from '../util';

export default function RoundTitle({ roundNumber, phaseName }) {
  const phaseLabel = capitalize(phaseName);

  return (
    <Box>
      <Heading>{`Round ${roundNumber} ${phaseLabel} Phase`}</Heading>
    </Box>
  );
}
