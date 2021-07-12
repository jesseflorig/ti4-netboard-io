import React from 'react';
import { ChakraProvider, Box, Grid, Heading } from '@chakra-ui/react';
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Copyright from './Copyright';
import LandingMenu from './LandingMenu';
import Store, { initialState, reducer } from './Store';

function App() {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  React.useLayoutEffect(() => {
    dispatch({ type: 'INIT' });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Store.Provider value={{ store, dispatch }}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            {!store.activeGame && <LandingMenu />}
            {store.activeGame && <Heading>LETS GO</Heading>}
            <Copyright />
          </Grid>
        </Box>
      </Store.Provider>
    </ChakraProvider>
  );
}

export default App;
