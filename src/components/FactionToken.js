import React from 'react';
import { Box, Flex, Image, Tooltip } from '@chakra-ui/react';

import { capitalize, getFactionByName } from '../util';

export default function FactionToken({
  player: { color, faction, victoryPoints },
  ...props
}) {
  const playerFaction = getFactionByName(faction);
  const colorLabel = capitalize(color);
  return (
    <Box {...props}>
      <Tooltip
        label={`${colorLabel} (${playerFaction.name}) - ${victoryPoints} VP`}
      >
        <Flex
          height="1.3em"
          maxW="2em"
          borderRadius="md"
          bgColor={`player.${color}`}
          px={3}
          py={1}
          overflow="hidden"
          boxShadow="md"
          justifyContent="center"
        >
          <Image
            src={`${process.env.PUBLIC_URL}/faction-symbols/${playerFaction.shortName}.png`}
            alt={`${playerFaction.name} faction symbol`}
          />
        </Flex>
      </Tooltip>
    </Box>
  );
}
