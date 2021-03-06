import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

import Store from './Store';
import ColorPicker from './ColorPicker';
import FactionPicker from './FactionPicker';
import AutoFactionColorSetting from './AutoFactionColorSetting';

export default function PlayersSetting() {
  const { store, dispatch } = React.useContext(Store);
  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = store.sets.includes('pok') ? 8 : 6;

  const handleAddPlayer = () => {
    dispatch({ type: 'ADD_PLAYER' });
  };

  const handleDeletePlayer = player => {
    dispatch({ type: 'DELETE_PLAYER', payload: player });
  };

  const hasMaxPlayers = store.players.length >= MAX_PLAYERS;

  return (
    <Stack spacing={2}>
      <Heading size="md">Players</Heading>
      <Text as="em" fontSize="sm">
        Player 1 will be the initial Speaker; Players should be added in
        clockwise order
      </Text>
      <AutoFactionColorSetting />
      <Box>
        <OrderedList spacing={2}>
          {store.players.map((player, idx) => {
            const playerNum = idx + 1;

            return (
              <ListItem key={`player-${playerNum}`} pl={4}>
                <HStack spacing={2}>
                  <ColorPicker
                    value={player.color}
                    playerNumber={playerNum}
                    player={player}
                  />
                  <FactionPicker
                    value={player.faction}
                    playerNumber={playerNum}
                    player={player}
                  />
                  {store.players.length > MIN_PLAYERS && (
                    <IconButton
                      variant="ghost"
                      size="sm"
                      colorScheme="gray"
                      icon={<DeleteIcon />}
                      value={player}
                      onClick={() => handleDeletePlayer(player)}
                    />
                  )}
                </HStack>
              </ListItem>
            );
          })}
        </OrderedList>
      </Box>
      {!hasMaxPlayers && (
        <Button
          variant="ghost"
          leftIcon={<AddIcon />}
          onClick={handleAddPlayer}
          disabled={hasMaxPlayers}
        >
          Add Player
        </Button>
      )}
    </Stack>
  );
}
