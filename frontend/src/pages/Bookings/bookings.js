/*
This page loads the Booking table component to display the booking searched by booking ID.
*/
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import SearchBar from "../../components/BookingsSearchBar.jsx";
import BookingsTable from "@/components/BookingsTable.jsx";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import Navbar from '../../components/Navbar.jsx';

export default function Bookings() {
  return (
    <>
    <Navbar />
      <Box h="100vh">
        <DarkModeSwitch />
          <VStack>
            <Heading as='h2' size='2xl'>Bookings</Heading>
                <Box>
                    <BookingsTable/>
                </Box>
          </VStack>
      </Box>
    </>
  );
}
