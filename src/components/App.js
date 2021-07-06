import React from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Store, { initialState, reducer } from './Store';
import NewGame from './NewGame';

function App() {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ChakraProvider theme={theme}>
      <Store.Provider value={{ store, dispatch }}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={4} justifySelf="center">
              <Heading>Netboard.IO</Heading>
              <Heading size="md">Twilight Imperium Helper</Heading>
              <Divider />
              <NewGame />
              <Button disabled={true}>Continue</Button>
            </VStack>
            <Text
              fontSize="sm"
              color="gray.600"
              width="45vw"
              mb={4}
              justifySelf="center"
              alignSelf="flex-end"
            >
              The literal and graphical information presented on this site about
              Twilight Imperium, including card images, symbols, and text, is
              copyright Fantasy Flight Publishing, Inc. Netboard.IO is not
              produced by, endorsed by, supported by, or affiliated with Fantasy
              Flight Publishing, Inc.
            </Text>
          </Grid>
        </Box>
      </Store.Provider>
    </ChakraProvider>
  );
}

export default App;
