"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import { SectionList } from "./components/section-list/SectionList";
import { formatSpreadsheetData } from "./utils";

import { createContext, useEffect, useState } from "react";
import { FormSubmissionEntry } from "./types";
import { EmailModal } from "./components/email-modal/EmailModal";

export const FetchContext = createContext(() => {});
export const ContactContext = createContext((e: FormSubmissionEntry) => {});

export const MerchVolunteers = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modalEntry, setModalEntry] = useState({} as FormSubmissionEntry);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getVolunteerData = () => {
    fetch("/api/volunteers/data", { cache: "no-store" })
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  const openEmailModal = (e: FormSubmissionEntry) => {
    setModalEntry(e);
    !!e && onOpen();
  };

  if (!data || isLoading) return <div>Loading...</div>;

  const { byDate } = formatSpreadsheetData(data);
  /**
   * TODO: margins on overall section should be responsive to dimensions
   */

  return (
    <FetchContext.Provider value={getVolunteerData}>
      <ContactContext.Provider value={openEmailModal}>
        <Flex justifyContent={"center"}>
          <Flex
            bg="brand.background"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            maxW={1000}
          >
            <SectionList sectionListData={byDate} />
            <EmailModal entry={modalEntry} isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Flex>
      </ContactContext.Provider>
    </FetchContext.Provider>
  );
};
