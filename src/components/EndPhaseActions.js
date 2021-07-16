import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

import Store from './Store';

export default function EndStrategyPhase() {
  const { store, dispatch } = React.useContext(Store);

  const { currentPhase } = store;

  const handleResetPhase = () => {
    dispatch({ type: `RESET_${currentPhase.toUpperCase()}_PHASE` });
  };

  const handleEndPhase = () => {
    dispatch({ type: 'NEXT_PHASE' });
  };

  return (
    <Box width="30%" alignSelf="center" px={1} py={3}>
      <HStack justifyContent="center" spacing={2}>
        <Button variant="outline" colorScheme="gray" onClick={handleResetPhase}>
          {`Reset Phase`}
        </Button>
        <Button onClick={handleEndPhase}>{`End Phase`}</Button>
      </HStack>
    </Box>
  );
}
