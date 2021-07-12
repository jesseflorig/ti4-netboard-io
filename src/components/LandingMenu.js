import React from 'react';
import { Divider, Heading, VStack } from '@chakra-ui/react';

import NewGame from './NewGame';
import ContinueGame from './ContinueGame';

export default function LandingMenu() {
  return (
    <VStack spacing={4} justifySelf="center">
      <Heading>Netboard.IO</Heading>
      <Heading size="md">Twilight Imperium Helper</Heading>
      <Divider />
      <NewGame width="100%" />
      <ContinueGame width="100%" />
    </VStack>
  );
}
