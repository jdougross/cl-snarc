"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import { SectionList } from "./components/section-list/SectionList";
import { formatSpreadsheetData } from "./utils";

import * as React from "react";
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
  const [windowWidth, setWindowWidth] = useState(0);

  const getVolunteerData = async () => {
    /**
     * TODO: check if actions that partially succeed will prompt refetch
     */

    const res = await fetch("/api/volunteers/data", { cache: "no-store" });
    const { data } = await res.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getVolunteerData();
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
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

  const narrowScreen = {
    w: "100%",
    minW: 450,
  };

  const wideScreen = {
    w: "70%",
    maxW: 1000,
  };

  const sizeProps = windowWidth > 800 ? wideScreen : narrowScreen;

  return (
    <FetchContext.Provider value={getVolunteerData}>
      <ContactContext.Provider value={openEmailModal}>
        <Flex justifyContent={"center"}>
          <Flex
            bg="brand.background"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            fontSize="md"
            p={5}
            {...sizeProps}
          >
            <SectionList sectionListData={byDate} />
            <EmailModal entry={modalEntry} isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Flex>
      </ContactContext.Provider>
    </FetchContext.Provider>
  );
};
