import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
import { InfoIcon } from '@chakra-ui/icons';

import Store from './Store';

export default function PreferredFactionColorsSetting() {
  const { store, dispatch } = React.useContext(Store);

  const handleTogglePreferredColors = e => {
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
                    the Faction Colors listed on the Twilight Imperium Wiki.
                  </Text>
                  <Text>
                    When an appropriate color is not available, a color will be
                    chosen from the available colors left.
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
        onChange={handleTogglePreferredColors}
      />
    </FormControl>
  );
}
