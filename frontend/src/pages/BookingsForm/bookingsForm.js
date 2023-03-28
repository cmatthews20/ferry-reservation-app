/*
This page loads the Booking form component to fill up the information to reserve a seat.
*/

import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import BookingForm from "../../components/BookingForm";
import Navbar from "../../components/Navbar.jsx";
import { useRouter } from "next/router";
import Head from "next/head";

export default function BookingsForm() {
  const router = useRouter();
  const schedule_data = router.query;
  return (
    <>
      <Head>
        <title>Booking Form</title>
      </Head>
      <Navbar />
      <Box h="100vh">
        <VStack>
          <Heading as="h2" size="2xl">
            Booking Form
          </Heading>
          <Box>
            <BookingForm schedule_data={schedule_data} />
          </Box>
        </VStack>
      </Box>
    </>
  );
}
