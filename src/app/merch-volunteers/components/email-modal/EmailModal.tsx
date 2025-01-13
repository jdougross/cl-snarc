"use client";

import { Button, Flex, Text, useTheme, useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import {
  FormSubmissionEntry,
  TourContact,
  TourContactFields,
} from "../../../types/types";
import { sendConfirmationEmail } from "../../actions/sendConfiirmationEmail";
import { InfoBox } from "./subcomponents/InfoBox";
import { useContext, useState } from "react";
import { FetchContext, TourContactContext } from "../..";

export const EmailModal = (props: {
  entry: FormSubmissionEntry;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { entry, isOpen, onClose } = props;
  const toast = useToast();
  const theme = useTheme();

  const [selectedContact, setSelectedContact] = useState({} as TourContact);

  const refetch = useContext(FetchContext);
  const tourContacts = useContext(TourContactContext);

  const handleSubmit = async () => {
    const data = { entry, tourContact: selectedContact };
    await sendConfirmationEmail(data, (args) => toast(args));
    resetContact();
    refetch();
    onClose();
  };

  const handleClose = () => {
    resetContact();
    onClose();
  };

  const resetContact = () => {
    setSelectedContact({} as TourContact);
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
                      {/* <InfoBox rows={["TJ"]} header={`Tour Contact:`} /> */}
                      <InfoBox header={"Tour Contact"}>
                        {tourContacts.map((c, i) => (
                          <Button
                            key={JSON.stringify(c)}
                            onClick={() => setSelectedContact(c)}
                            width={150}
                            fontSize={"small"}
                            margin={1}
                            padding={1}
                            border={
                              selectedContact["Name"] == c["Name"]
                                ? "solid"
                                : "none"
                            }
                          >
                            {c[TourContactFields.NAME]}
                          </Button>
                        ))}
                      </InfoBox>
                    </Flex>
                    <Flex marginTop={10}>
                      <Button
                        m={2}
                        p={5}
                        fontSize={"medium"}
                        onClick={handleSubmit}
                      >
                        {"Send Confirmation"}
                      </Button>
                      <Button
                        m={2}
                        p={5}
                        fontSize={"medium"}
                        onClick={handleClose}
                      >
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
