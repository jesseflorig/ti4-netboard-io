import React from 'react';
import { Text } from '@chakra-ui/react';

export default function Copyright() {
  return (
    <Text
      fontSize="sm"
      color="gray.600"
      width="45vw"
      mb={4}
      justifySelf="center"
      alignSelf="flex-end"
    >
      The literal and graphical information presented on this site about
      Twilight Imperium, including card images, symbols, and text, is copyright
      Fantasy Flight Publishing, Inc. Netboard.IO is not produced by, endorsed
      by, supported by, or affiliated with Fantasy Flight Publishing, Inc.
    </Text>
  );
}
