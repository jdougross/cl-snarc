"use client";

import { Button, Flex, Spacer, Text, useToast } from "@chakra-ui/react";

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

export const EmailModal = (props: {
  entry: FormSubmissionEntry;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { entry, isOpen, onClose } = props;
  const toast = useToast();

  // TODO: theme this somewhere else
  const pmx = {
    p: "10px",
    m: "10px",
  };

  const handleClick = async () => {
    await sendConfirmationEmail(entry, (args) => toast(args));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <Flex alignItems={"center"} justifyContent={"center"}>
        <ModalContent
          textColor="#000"
          alignSelf="center"
          minWidth="fit-content"
          height="fit-content"
        >
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justifyContent="center"
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
                    <Flex
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        backgroundColor="#EEE"
                        {...pmx}
                      >
                        <Text>{entry.date}</Text>
                        <Text>{entry.city}</Text>
                        <Text>{entry.venue}</Text>
                      </Flex>
                      <Spacer />
                      <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        backgroundColor="#EEE"
                        {...pmx}
                      >
                        <Text>{entry.name}</Text>
                        <Text>{entry.email}</Text>
                        <Text>{entry.phone}</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      {...pmx}
                    >
                      <Button onClick={handleClick} {...pmx}>
                        <Text>Send Confirmation</Text>
                      </Button>
                      <Button onClick={onClose} {...pmx}>
                        <Text>Cancel</Text>
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
