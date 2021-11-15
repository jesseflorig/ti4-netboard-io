import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import Store from './Store';
import { strategyCards } from '../data';
import {
  capitalize,
  extractProp,
  getFactionByName,
  getItemByPropValue,
} from '../util';

export default function StrategyCards() {
  const { store, dispatch } = React.useContext(Store);

  const selectedStrategies = [
    ...extractProp(store.players, 'currentStrategy'),
    ...extractProp(store.players, 'currentSecondaryStrategy'),
  ].filter(strat => !!strat);

  const selectedStrategyCards = strategyCards.filter(strategy =>
    selectedStrategies.includes(strategy.name)
  );

  return (
    <Box>
      <HStack justifyContent="center">
        {selectedStrategyCards.map(strategy => {
          const strategyLabel = capitalize(strategy.name);
          const isPassed = false;
          const borderColor = isPassed
            ? 'gray.700'
            : `strategy.${strategy.name}`;
          const textColor = isPassed ? 'gray.700' : 'inherit';
          const strategyPlayer =
            getItemByPropValue(
              store.players,
              'currentStrategy',
              strategy.name
            ) ||
            getItemByPropValue(
              store.players,
              'currentSecondaryStrategy',
              strategy.name
            );
          const playerFaction = getFactionByName(strategyPlayer.faction);

          return (
            <Box
              key={`${strategy.name}-strategy`}
              position="relative"
              height="8em"
              width="10em"
              bg="gray.900"
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="md"
              boxShadow="md"
              px={3}
              py={1}
            >
              <Stack spacing={4} color={textColor}>
                <Box>
                  <HStack justifyContent="space-between">
                    <Text>{strategyLabel}</Text>
                    <Heading>{strategy.initiative}</Heading>
                  </HStack>
                  <Divider />
                  <Flex h="5em" alignItems="center" justifyContent="center">
                    <Image
                      src={`${process.env.PUBLIC_URL}/faction-symbols/${playerFaction.shortName}.png`}
                      alt={`${playerFaction.name} faction symbol`}
                    />
                  </Flex>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
