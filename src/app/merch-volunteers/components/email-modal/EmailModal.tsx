"use client";

import {
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
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

export const EmailModal = (props: {
  entry: FormSubmissionEntry;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { entry, isOpen, onClose } = props;
  const toast = useToast();

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

    // confirmed will always be TRUE on this path
    const body = JSON.stringify({ ...entry, confirmed: true });

    // TODO: this should produce error toasts, it does not
    // const body = JSON.stringify({ entry, confirmed: true });

    const duration = 5000; // toast duration

    try {
      const emailResponse = await fetch("/api/volunteers/email", {
        method: "POST",
        body,
        cache: "no-store",
      });

      const emailResponseData = await emailResponse.json();
      console.log(JSON.stringify(emailResponseData, null, 2));

      toast({
        title: "Success: Email",
        description: `Successfully emailed ${entry?.email} related to show on ${entry?.date}`,
        status: "success",
        duration,
        position: "top",
      });
    } catch (err) {
      console.log(" - Error sending email - ", err);
      toast({
        title: "Error: Email",
        description: `There was an error emailing to address ${entry?.email} related to show on ${entry?.date}`,
        status: "error",
        duration,
        position: "top",
      });
    }

    try {
      const checkboxResponse = await fetch("/api/volunteers/data", {
        method: "PUT",
        body,
        cache: "no-store",
      });

      const checkboxResponseData = await checkboxResponse.json();
      console.log(JSON.stringify(checkboxResponseData, null, 2));

      toast({
        title: "Success: Storage",
        description: `Successfully updated ${entry?.email} as confirmed for show on ${entry?.date}`,
        status: "success",
        duration,
        position: "top",
      });
    } catch (err) {
      console.log(" - Error updating google sheet - ", err);
      toast({
        title: "Error: Storage",
        description: `There was an error updating google sheet for ${entry?.email} related to show on ${entry?.date}`,
        status: "error",
        duration,
        position: "top",
      });
    }

    try {
      const guetsListResponse = await fetch("/api/guestList", {
        method: "POST",
        body,
        cache: "no-store",
      });

      const guestListResponseData = await guetsListResponse.json();
      console.log(JSON.stringify(guestListResponseData, null, 2));

      toast({
        title: "Success: Guest List",
        description: `Successfully added ${entry?.name} to guest list on ${entry?.date}`,
        status: "success",
        duration,
        position: "top",
      });
    } catch (err) {
      console.log(" - Error updating guest list - ", err);
      toast({
        title: "Error: Guest List",
        description: `There was an error updating guest list for ${entry?.name} related to show on ${entry?.date}`,
        status: "error",
        duration,
        position: "top",
      });
    }

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
