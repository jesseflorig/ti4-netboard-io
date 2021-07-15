import React from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

export default function StrategyText({ cardText }) {
  return (
    <Box textAlign="left">
      <UnorderedList>
        {cardText.map((bulletText, idx) => {
          return (
            <ListItem key={`text-item-${idx}`}>
              <Text fontSize="xs">{bulletText}</Text>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
}
