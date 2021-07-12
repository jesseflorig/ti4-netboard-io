import React from 'react';
import {
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Stack,
  Text,
} from '@chakra-ui/react';

import Store from './Store';

export default function Step3() {
  const { store, dispatch } = React.useContext(Store);

  const handleChangeInactiveTimer = valString => {
    const newVal = parseInt(valString);
    dispatch({ type: 'UPDATE_INACTIVITY_TIMER', payload: newVal });
  };

  return (
    <Stack spacing={2}>
      <Heading size="md">Inactivity Timer - Minutes</Heading>
      <Stack spacing={0}>
        <NumberInput
          value={store.inactivityTimer}
          min={5}
          max={30}
          onChange={handleChangeInactiveTimer}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text as="em" fontSize="sm">
          During each Phase and each player turn during the Action Phase, an
          alert will popup when the specified timer runs out
        </Text>
      </Stack>
    </Stack>
  );
}
