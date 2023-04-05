/*
This page loads the Booking table component to display the booking searched by booking ID and email.
*/

import { Box, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import BookingsTable from '@/components/BookingsTable.jsx';
import Navbar from '../../components/Navbar.jsx';
import Head from 'next/head';

export default function Bookings() {
  return (
    <>
      <Head>
        <title>Search Bookings</title>
      </Head>
      <Navbar />
      <Box>
        <VStack>
          <Heading>Search Bookings</Heading>
          <Box>
            <BookingsTable />
          </Box>
        </VStack>
      </Box>
    </>
  );
}
