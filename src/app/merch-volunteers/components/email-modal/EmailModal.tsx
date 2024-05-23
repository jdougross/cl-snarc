"use client";

import {
  Button,
  Flex,
  Spacer,
  Text,
  useTheme,
  useToast,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { FormSubmissionEntry } from "../../types";
import { sendConfirmationEmail } from "./sendConfiirmationEmail";
import { buttonProps } from "../../../theme";
import { InfoBox } from "./subcomponents/InfoBox";

export const EmailModal = (props: {
  entry: FormSubmissionEntry;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { entry, isOpen, onClose } = props;
  const toast = useToast();
  const theme = useTheme();

  const handleClick = async () => {
    await sendConfirmationEmail(entry, (args) => toast(args));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <Flex>
        <ModalContent
          alignSelf="center"
          minWidth="fit-content"
          height="fit-content"
        >
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justifyContent="center"
            p="1rem"
          >
            <ModalHeader>Send Confirmation Email?</ModalHeader>
            <ModalBody>
              {!entry ? (
                <Text>ERROR</Text>
              ) : (
                <>
                  <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex>
                      <InfoBox
                        rows={[entry.date, entry.city, entry.venue]}
                        header={`Show:`}
                      />
                      <InfoBox
                        rows={[entry.name, entry.email, entry.phone]}
                        header={`Volunteer:`}
                      />
                      <InfoBox rows={["TJ"]} header={`Tour Contact:`} />
                    </Flex>
                    <Flex marginTop="1rem">
                      <Button onClick={handleClick} {...buttonProps}>
                        {"Send Confirmation"}
                      </Button>
                      <Button onClick={onClose} {...buttonProps}>
                        {"Cancel"}
                      </Button>
                    </Flex>
                  </Flex>
                </>
              )}
            </ModalBody>
            <ModalFooter />
          </Flex>
        </ModalContent>
      </Flex>
    </Modal>
  );
};
