import React from 'react';
import {
  Heading,
  FormControl,
  FormLabel,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';

import Store from './Store';

export default function ExpansionsSetting() {
  const { store, dispatch } = React.useContext(Store);

  const handleTogglePoK = newVal => {
    dispatch({ type: 'TOGGLE_POK' });
  };

  return (
    <>
      <Stack spacing={2}>
        <Heading size="md">Expansions</Heading>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel htmlFor="pok-content" mb="0">
            Prohecy of Kings
          </FormLabel>
          <Switch
            id="pok-content"
            isChecked={store.sets.includes('pok')}
            onChange={handleTogglePoK}
          />
        </FormControl>
        <Text as="em" fontSize="sm">
          +2 player count, +7 factions, new objectives and agendas
        </Text>
      </Stack>
    </>
  );
}
