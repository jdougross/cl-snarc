"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import {
  SectionData,
  SectionList,
} from "./components/section-list/SectionList";
import { formatSpreadsheetData } from "./utils";

import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { FormSubmissionEntry, TourContact } from "../types/types";
import { EmailModal } from "./components/email-modal/EmailModal";

export const FetchContext = createContext(() => {});
export const VolunteerContactContext = createContext(
  (e: FormSubmissionEntry) => {},
);
export const TourContactContext = createContext([] as TourContact[]);

export const MerchVolunteers = () => {
  const [sectionListData, setSectionListData] = useState(
    undefined as Record<string, SectionData> | undefined,
  );
  const [isLoading, setLoading] = useState(true);
  const [modalEntry, setModalEntry] = useState({} as FormSubmissionEntry);
  const [tourContacts, setTourContacts] = useState([] as TourContact[]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [windowWidth, setWindowWidth] = useState(0);

  const getVolunteerData = async () => {
    /**
     * TODO: check if actions that partially succeed will prompt refetch
     */

    const volunteerResponse = await fetch("/api/volunteers/data", {
      cache: "no-store",
    });
    const { data: volunteerData } = await volunteerResponse.json();

    const showsResponse = await fetch("/api/shows", { cache: "no-store" });
    const { data: showsData } = await showsResponse.json();

    const { byDate } = formatSpreadsheetData({ volunteerData, showsData });
    setSectionListData(byDate);
    setLoading(false);
  };

  const getTourContactData = async () => {
    const tourContactResponse = await fetch("api/tourContacts");
    const { data: tourContactData } = await tourContactResponse.json();
    setTourContacts(tourContactData);
  };

  useEffect(() => {
    getVolunteerData();
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    getTourContactData();
  }, []);

  const openEmailModal = (e: FormSubmissionEntry) => {
    setModalEntry(e);
    !!e && onOpen();
  };

  if (!sectionListData || isLoading) return <div>Loading...</div>;

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
      <TourContactContext.Provider value={tourContacts}>
        <VolunteerContactContext.Provider value={openEmailModal}>
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
              <SectionList sectionListData={sectionListData} />
              <EmailModal
                entry={modalEntry}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Flex>
          </Flex>
        </VolunteerContactContext.Provider>
      </TourContactContext.Provider>
    </FetchContext.Provider>
  );
};
