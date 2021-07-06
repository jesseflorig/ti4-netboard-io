import React from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import Store from './Store';
import { playerFactions } from '../data';
import { capitalize, getFactionByName, getSetFactions } from '../util';

export default function ColorPicker({ value, playerNumber, player }) {
  const { store, dispatch } = React.useContext(Store);

  const playerColorLabel = capitalize(player.color);
  const playerFaction = getFactionByName(player.faction);
  const setFactions = getSetFactions(store.sets);
  const isAutoColor = store.usePreferredColors;

  const handleChangeFaction = e => {
    const newFaction = e.target.closest('button').value;

    if (newFaction !== player.faction) {
      dispatch({
        type: 'UPDATE_PLAYER_FIELD',
        payload: { field: 'faction', prev: player.faction, next: newFaction },
      });
    }
  };

  return (
    <Box>
      <Popover placement="right">
        <PopoverTrigger>
          <Button width="15.5em" bgColor={`player.${value}`} overflow="hidden">
            <HStack spacing={2}>
              <Box maxW="1.2em" overflow="hidden">
                <Image
                  src={`${process.env.PUBLIC_URL}/faction-symbols/${playerFaction.shortName}.png`}
                  alt={`${playerFaction.name} faction symbol`}
                />
              </Box>
              <Text fontSize="sm">{value}</Text>
            </HStack>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{`Select Faction for Player ${playerNumber}${
            isAutoColor ? '' : ` (${playerColorLabel})`
          }`}</PopoverHeader>
          <PopoverBody>
            <SimpleGrid columns={3} spacing={2}>
              {playerFactions.map(faction => {
                const isIncluded = setFactions.includes(faction.shortName);
                return (
                  isIncluded && (
                    <Tooltip key={faction.shortName} label={faction.name}>
                      <Button
                        aria-label={`Select ${faction.name}`}
                        fontSize="xs"
                        value={faction.name}
                        onClick={handleChangeFaction}
                        isDisabled={faction.name === player.faction}
                      >
                        <Image
                          src={`${process.env.PUBLIC_URL}/faction-symbols/${faction.shortName}.png`}
                          height="2.8em"
                          alt={`${faction.name} faction symbol`}
                        />
                      </Button>
                    </Tooltip>
                  )
                );
              })}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
