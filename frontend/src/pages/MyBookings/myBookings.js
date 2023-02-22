/*
This page loads the Booking table component to display the bookings of the active and past bookings of the users.
*/
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import BookingTable from "../../components/BookingTable";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import Navbar from '../../components/Navbar.jsx';

export default function MyBookings() {
  return (
    <>
    <Navbar />
      <Box h="100vh">
        <DarkModeSwitch />
          <VStack>
            <Heading as='h2' size='2xl'>My Bookings</Heading>
                <Box shadow="md">
                <BookingTable />
                </Box>
          </VStack>
      </Box>
    </>
  );
}