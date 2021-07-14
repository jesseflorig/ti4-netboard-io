import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';

import Store from './Store';
import FactionToken from './FactionToken';

export default function Scoreboard() {
  const { store, dispatch } = React.useContext(Store);

  const handleTokenClick = (evt, playerId) => {
    const amount = evt.shiftKey ? -1 : 1;
    dispatch({ type: 'UPDATE_PLAYER_SCORE', payload: { amount, playerId } });
  };

  return (
    <Box>
      <HStack justifyContent="center" alignItems="flex-start" spacing={3}>
        {[...Array(store.victoryPointLimit + 1)].map((_, idx) => {
          return (
            <Stack key={`vp-space-${idx}`} spacing={2}>
              <Box
                borderColor="gray.500"
                borderWidth="1px"
                borderRadius="md"
                width="5em"
              >
                <Heading textShadow="0 0 4px red">{idx}</Heading>
              </Box>
              <SimpleGrid columns={2} spacing={1}>
                {store.players.map(player => {
                  return (
                    player.victoryPoints === idx && (
                      <Flex
                        key={`player-${player.id}-token`}
                        justifyContent="center"
                      >
                        <FactionToken
                          player={player}
                          onClick={e => handleTokenClick(e, player.id)}
                          cursor="pointer"
                        />
                      </Flex>
                    )
                  );
                })}
              </SimpleGrid>
            </Stack>
          );
        })}
      </HStack>
    </Box>
  );
}
