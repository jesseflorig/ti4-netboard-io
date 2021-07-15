import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import Store from './Store';
import { getFactionByName, getItemByPropValue } from '../util';

export default function SpeakerToken() {
  const { store } = React.useContext(Store);
  const { speakerPlayerId, players } = store;

  const speaker = getItemByPropValue(players, 'id', speakerPlayerId);
  const speakerFaction = getFactionByName(speaker.faction);

  return (
    <Flex justifyContent="center">
      <Stack spacing={2}>
        <Heading size="sm">Current Speaker</Heading>
        <Tooltip label="Change speaker">
          <Box
            borderWidth="1px"
            borderColor="gray.500"
            bg="gray.900"
            borderRadius="md"
            width="16em"
            px={1}
            py={3}
            cursor="pointer"
          >
            <HStack spacing={2} alignItems="center" justifyContent="center">
              <Box maxW="1.2em" alignItems="center" overflow="hidden">
                <Image
                  src={`${process.env.PUBLIC_URL}/faction-symbols/${speakerFaction.shortName}.png`}
                  alt="Speaker faction symbol"
                />
              </Box>
              <Text
                fontWeight="bold"
                textShadow="0 0 3px red"
              >{`${speaker.faction}`}</Text>
            </HStack>
          </Box>
        </Tooltip>
      </Stack>
    </Flex>
  );
}
