/*
This page loads the Booking form component to fill up the information to reserve a seat.
*/
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import BookingForm from "../../components/BookingForm"
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import Navbar from '../../components/Navbar.jsx';

export default function BookingsForm() {
  return (
    <>
    <Navbar />
      <Box h="100vh">
        <DarkModeSwitch />
          <VStack>
            <Heading as='h2' size='2xl'>Booking Form</Heading>
                <Box>
                    <BookingForm />
                </Box>
          </VStack>
      </Box>
    </>
  );
}