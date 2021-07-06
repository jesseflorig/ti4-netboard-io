import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Store from './Store';

const maxSteps = 3;

const stepTitle = ['Game Setup', 'Player Setup', 'Dashboard Setup'];

export default function BasicUsage() {
  const [step, setStep] = React.useState(1);
  const { store } = React.useContext(Store);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNewGame = () => {
    setStep(1);
    onOpen();
  };

  const handleNext = () => {
    if (step < maxSteps) {
      setStep(step + 1);
    } else {
      console.log('store', store);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <Button onClick={handleNewGame}>New Game</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`New Game - ${stepTitle[step - 1]}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="30em">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Text as="em">{`Step ${step} of 3`}</Text>
            <Box>
              <Button
                variant="ghost"
                mr={3}
                onClick={handlePrev}
                disabled={step === 1}
              >
                Previous
              </Button>
              <Button onClick={handleNext}>
                {step === maxSteps ? 'Begin' : 'Next'}
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
