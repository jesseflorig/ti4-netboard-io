import React from 'react';
import {
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Stack,
} from '@chakra-ui/react';

import Store from './Store';

export default function VictoryPointLimitSetting() {
  const { store, dispatch } = React.useContext(Store);

  const handleChangeVPLimit = newVal => {
    dispatch({ type: 'UPDATE_VP_LIMIT', payload: newVal });
  };

  return (
    <>
      <Stack spacing={2}>
        <Heading size="md">Victory Point Limit</Heading>
        <NumberInput
          step={4}
          min={10}
          max={14}
          value={store.victoryPointLimit}
          onChange={handleChangeVPLimit}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
    </>
  );
}
