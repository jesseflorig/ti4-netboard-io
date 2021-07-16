import React from 'react';
import { Box, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import Store from './Store';
import StrategySectionHeading from './StrategySectionHeading';
import StrategyText from './StrategyText';
import SelectedStrategyOverlay from './SelectedStrategyOverlay';
import { strategyCards } from '../data';
import { capitalize, extractProp, getItemByPropValue } from '../util';

export default function StrategyCards() {
  const [isSecondary, setIsSecondary] = React.useState(false);
  const { store, dispatch } = React.useContext(Store);

  const isComplete = store.currentPhaseComplete;

  React.useEffect(() => {
    setIsSecondary(false);
  }, [isComplete]);

  const selectedStrategies = [
    ...extractProp(store.players, 'currentStrategy'),
    ...extractProp(store.players, 'currentSecondaryStrategy'),
  ].filter(strat => !!strat);

  const handleStrategyClick = (isSelected, strategy, playerId) => {
    if (isSelected || isComplete) return false;
    dispatch({
      type: 'PICK_STRATEGY',
      payload: { strategy, playerId, isSecondary },
    });

    const playerCount = store.players.length;
    const selectedCount = selectedStrategies.length + 1;
    const needsSecondaryPick = playerCount < 5;
    const finishedPicking = needsSecondaryPick
      ? selectedCount === playerCount * 2
      : selectedCount === playerCount;

    // Check if secondary strategy pick is applicable
    if (needsSecondaryPick && selectedCount === playerCount) {
      setIsSecondary(true);
    }

    //Check if all picks happened
    if (finishedPicking) {
      dispatch({ type: 'COMPLETE_CURRENT_PHASE' });
    }
  };

  return (
    <Box>
      <HStack justifyContent="center">
        {strategyCards.map(strategy => {
          const strategyLabel = capitalize(strategy.name);
          const isSelected = selectedStrategies.includes(strategy.name);
          const borderColor = isSelected
            ? 'gray.700'
            : `strategy.${strategy.name}`;
          const cursor = isComplete
            ? 'default'
            : isSelected
            ? 'not-allowed'
            : 'pointer';
          const textColor = isSelected ? 'gray.700' : 'inherit';
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

          return (
            <Box
              key={`${strategy.name}-strategy`}
              position="relative"
              height="22em"
              width="10em"
              bg="gray.900"
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="md"
              boxShadow="md"
              px={3}
              py={1}
              cursor={cursor}
              onClick={() =>
                handleStrategyClick(
                  isSelected,
                  strategy.name,
                  store.currentPlayerId
                )
              }
            >
              {isSelected && (
                <SelectedStrategyOverlay player={strategyPlayer} />
              )}
              <Stack spacing={4} color={textColor}>
                <Box>
                  <HStack justifyContent="space-between">
                    <Text>{strategyLabel}</Text>
                    <Heading>{strategy.initiative}</Heading>
                  </HStack>
                  <Divider />
                </Box>
                <StrategySectionHeading text="Primary" />
                <StrategyText cardText={strategy.primaryText} />
                <StrategySectionHeading text="Secondary" />
                <StrategyText cardText={strategy.secondaryText} />
              </Stack>
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
