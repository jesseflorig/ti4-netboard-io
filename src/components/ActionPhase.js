import React from 'react';
import { Box } from '@chakra-ui/react';

import Store from './Store';

export default function ActionPhase() {
  const { store } = React.useContext(Store);

  return <Box>Actions stuff</Box>;
}
