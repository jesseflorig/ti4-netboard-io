import React from 'react';
import { Box, HStack, Spinner, Text } from '@chakra-ui/react';

import Store from './Store';
import { getItemByPropValue } from '../util';

export default function CurrentActionTurn() {
  const { store } = React.useContext(Store);

  const currentPlayer = getItemByPropValue(
    store.players,
    'id',
    store.currentPlayerId
  );

  return (
    <Box
      width="30%"
      alignSelf="center"
      bg="blue.800"
      borderRadius="md"
      px={1}
      py={3}
    >
      <HStack justifyContent="center" spacing={4}>
        <Spinner color="yellow.200" />
        <Text as="em" fontSize="lg">
          <strong>{currentPlayer.faction}</strong>
          {` resolve an `}
          <strong>Action</strong>
        </Text>
      </HStack>
    </Box>
  );
}
