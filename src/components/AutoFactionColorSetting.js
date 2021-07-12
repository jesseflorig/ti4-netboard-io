import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';

import Store from './Store';

export default function AutoFactionColorSetting() {
  const { store, dispatch } = React.useContext(Store);

  const handleToggleAutoColor = e => {
    dispatch({
      type: 'TOGGLE_PREFERRED_COLORS',
      payload: e.target.checked,
    });
  };

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack spacing={1}>
        <FormLabel htmlFor="use-suggested-colors" mb="0">
          Auto-assign preferred faction colors
        </FormLabel>
        <Box>
          <Popover placement="right">
            <PopoverTrigger>
              <IconButton
                colorScheme="gray"
                variant="ghost"
                size="sm"
                icon={<InfoIcon />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                Auto-Assign Preferred Faction Colors
              </PopoverHeader>
              <PopoverBody>
                <Stack>
                  <Text>
                    When enabled, colors will be automatically assigned based on
                    the{' '}
                    <Link
                      href="https://twilight-imperium.fandom.com/wiki/Faction_Colors"
                      isExternal
                    >
                      Faction Colors from the Twilight Imperium Wiki
                      <ExternalLinkIcon mx={1} />
                    </Link>
                    .
                  </Text>
                  <Text>
                    When an appropriate color is not available, a player color
                    will be assigned from the available colors left.
                  </Text>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </HStack>
      <Switch
        id="use-suggested-colors"
        isChecked={store.usePreferredColors}
        onChange={handleToggleAutoColor}
      />
    </FormControl>
  );
}
