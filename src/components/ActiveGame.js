import React from 'react';
import { Stack } from '@chakra-ui/react';

import RountTitle from './RoundTitle';
import Scoreboard from './Scoreboard';
import SpeakerToken from './SpeakerToken';
import Store from './Store';
import ActionPhase from './ActionPhase';
import StrategyPhase from './StrategyPhase';

export default function ActiveGame() {
  const { store } = React.useContext(Store);
  const { currentRound, currentPhase, currentTurn } = store;

  return (
    <Stack spacing={4} justifyContent="space-between">
      <Scoreboard />
      <RountTitle
        roundNumber={currentRound}
        phaseName={currentPhase}
        turnNumber={currentTurn}
      />
      {currentPhase === 'strategy' && <StrategyPhase />}
      {currentPhase === 'action' && <ActionPhase />}
      <SpeakerToken />
    </Stack>
  );
}
