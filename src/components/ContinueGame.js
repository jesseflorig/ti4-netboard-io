import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Stack,
  useDisclosure,
  useRadioGroup,
} from '@chakra-ui/react';

import Store from './Store';
import GameSaveCard from './GameSaveCard';

export default function ContinueGame(props) {
  const [selectedGameId, setSelectedGameId] = React.useState();
  const { store, dispatch } = React.useContext(Store);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasSaveGames = store.gameSaves.length > 0;

  const handleChangeSave = saveId => {
    setSelectedGameId(saveId);
  };

  const handleLoadSave = () => {
    dispatch({ type: 'LOAD_SAVE', payload: selectedGameId });
    onClose();
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gameSave',
    onChange: handleChangeSave,
  });
  const groupProps = getRootProps();

  return (
    <>
      <Button {...props} disabled={!hasSaveGames} onClick={onOpen}>
        Continue Game
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Select Saved Game`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack {...groupProps}>
              {store.gameSaves.map(saveString => {
                const save = JSON.parse(saveString);
                const radioProps = getRadioProps({ value: save.id });

                return (
                  <GameSaveCard
                    key={save.id}
                    gameSave={save}
                    onClose={onClose}
                    {...radioProps}
                  />
                );
              })}
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="flex-end">
            <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleLoadSave} disabled={!selectedGameId}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
