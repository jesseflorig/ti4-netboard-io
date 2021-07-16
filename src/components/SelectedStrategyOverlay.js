import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

import { getFactionByName } from '../util';

export default function SelectedStrategyOverlay({ player }) {
  const playerFaction = getFactionByName(player.faction);
  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
    >
      <Image
        src={`${process.env.PUBLIC_URL}/faction-symbols/${playerFaction.shortName}.png`}
        alt="Selected faction symbol"
      />
      <Flex
        position="absolute"
        top="0"
        left="0"
        height="100%"
        width="100%"
        borderRadius="md"
        bgGradient={`linear(to-b, black,  player.${player.color})`}
        opacity="0.25"
      ></Flex>
    </Flex>
  );
}
