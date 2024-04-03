"use client";

import { Button, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { SectionList } from "./components/section-list/SectionList";
import { formatSpreadsheetData } from "./utils";

import { createContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormSubmissionEntry } from "./types";

export const FetchContext = createContext(() => {});
export const ContactContext = createContext(
  (e: FormSubmissionEntry | null) => {},
);

const EmailModal = (props: {
  entry: FormSubmissionEntry | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { entry, isOpen, onClose } = props;

  const pmx = {
    p: "10px",
    m: "10px",
    // w: "100%"
  };

  const sendConfirmationEmail = async () => {
    // send entry to backend
    // where does email template come from?
    // toast success or failure?
    // close modal
    // refetch the data set
    const body = JSON.stringify(entry);

    const res = await fetch("/api/volunteers/email", { method: "POST", body });
    const data = await res.json();

    // TODO: if successful, make another request to mark confirmed? Or just handle in backend?
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <Flex alignItems={"center"} justifyContent={"center"}>
        <ModalContent
          // backgroundColor="#FFF"
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
            {/* <ModalCloseButton /> */}
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
                      <Button onClick={sendConfirmationEmail} {...pmx}>
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

export const MerchVolunteers = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modalEntry, setModalEntry] = useState(
    null as FormSubmissionEntry | null,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getVolunteerData = () => {
    fetch("/api/volunteers/data")
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  const openEmailModal = (e: FormSubmissionEntry | null) => {
    setModalEntry(e);
    !!e && onOpen();
  };

  if (!data || isLoading) return <div>Loading...</div>;

  const { byDate } = formatSpreadsheetData(data);

  return (
    <FetchContext.Provider value={getVolunteerData}>
      <ContactContext.Provider value={openEmailModal}>
        <Flex
          mx="20%"
          my="2%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button onClick={onOpen}>Open Modal</Button>

          <SectionList sectionListData={byDate} />
          <EmailModal entry={modalEntry} isOpen={isOpen} onClose={onClose} />
        </Flex>
      </ContactContext.Provider>
    </FetchContext.Provider>
  );
};
