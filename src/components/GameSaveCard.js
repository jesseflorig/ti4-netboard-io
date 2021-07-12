import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Tag,
  Text,
  useRadio,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { DateTime } from 'luxon';

import Store from './Store';
import { getFactionByName } from '../util';

export default function GameSaveCard({ gameSave, onClose, ...props }) {
  const { store, dispatch } = React.useContext(Store);
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const saveDate = DateTime.fromSeconds(gameSave.startTime).toLocaleString(
    DateTime.DATETIME_FULL
  );

  const handleDeleteSave = () => {
    dispatch({ type: 'DELETE_SAVE', payload: gameSave.id });
    if (store.gameSaves.length === 1) onClose();
  };

  return (
    <HStack>
      <Box as="label" width="25em">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: 'blue.700',
            borderColor: 'blue.700',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          <Stack spacing={2}>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">{saveDate}</Text>
              {gameSave.sets.includes('pok') && <Tag>PoK</Tag>}
            </HStack>
            <HStack spacing={2}>
              {gameSave.players.map(player => {
                const playerFaction = getFactionByName(player.faction);
                return (
                  <Box
                    key={player.id}
                    borderRadius="md"
                    borderWidth="1px"
                    bg={`player.${player.color}`}
                    title={`${playerFaction.name}`}
                  >
                    <Flex
                      h="2em"
                      maxW="2em"
                      p={1}
                      overflow="hidden"
                      alignItems="center"
                    >
                      <Image
                        src={`${process.env.PUBLIC_URL}/faction-symbols/${playerFaction.shortName}.png`}
                        alt={`${playerFaction.name} faction symbol`}
                      />
                    </Flex>
                  </Box>
                );
              })}
            </HStack>
            <Text fontSize="xs">{`${gameSave.players.length} players, ${gameSave.victoryPointLimit} VPs`}</Text>
          </Stack>
        </Box>
      </Box>
      <IconButton
        aria-label="Delete Save"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="gray"
        size="sm"
        title="Delete Save"
        onClick={handleDeleteSave}
      />
    </HStack>
  );
}
