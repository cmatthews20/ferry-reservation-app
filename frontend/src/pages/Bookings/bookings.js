/*
This page loads the Booking table component to display the booking searched by booking ID.
*/

import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import BookingsTable from "@/components/BookingsTable.jsx";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import Navbar from '../../components/Navbar.jsx';
import Head from "next/head";

export default function Bookings() {
  return (
    <>
    <Head>
      <title>Bookings</title>
    </Head>
    <Navbar />
      <Box>
        <DarkModeSwitch />
          <VStack>
            <Heading>Bookings</Heading>
                <Box>
                    <BookingsTable/>
                </Box>
          </VStack>
      </Box>
    </>
  );
}
