import React from 'react';
import { Heading } from '@chakra-ui/react';

export default function StrategySectionHeading({ text }) {
  return (
    <Heading size="xs" textAlign="left">
      {text}
    </Heading>
  );
}
