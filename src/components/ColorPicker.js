import React from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';

import { playerColors } from '../data';
import { getSetColors } from '../util';
import Store from './Store';

export default function ColorPicker({ value, playerNumber, player }) {
  const { store, dispatch } = React.useContext(Store);
  const { isOpen, onOpen, onClose } = useDisclosure;

  const setColors = getSetColors(store.sets);

  const handleChangeColor = e => {
    const newColor = e.target.value;
    if (newColor !== player.color) {
      dispatch({
        type: 'UPDATE_PLAYER_FIELD',
        payload: { field: 'color', prev: player.color, next: newColor },
      });
    }
  };

  return (
    <Box>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <PopoverTrigger>
          <Button
            width="5em"
            bgColor={`player.${value}`}
            textTransform="capitalize"
            isDisabled={store.usePreferredColors}
          >
            {value}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{`Player ${playerNumber} Color (${player.faction})`}</PopoverHeader>
          <PopoverBody>
            <SimpleGrid columns={4} spacing={2}>
              {playerColors.map(({ color }) => {
                const isIncluded = setColors.includes(color);
                return (
                  isIncluded && (
                    <Button
                      key={`${color}-picker`}
                      bgColor={`player.${color}`}
                      textTransform="capitalize"
                      value={color}
                      onClick={handleChangeColor}
                      disabled={color === player.color}
                    >
                      {color}
                    </Button>
                  )
                );
              })}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
