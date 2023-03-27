/*
This is the Navbar component that is displayed at the top of every page in the application so that it allows for easier navigation.
It contains the links to direct users to the different pages.
*/
import {
    Button,
    Grid,
    GridItem,
  } from "@chakra-ui/react";
import Link from 'next/link';

function Navbar() {
    return(
        <Grid
        templateAreas={`"header""content"`}
        templateRows="4rem 1fr"
        templateColumns="1fr"
      >
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="left"
          area="header"
          shadow="base"
          bg="#D69E2E"
          px={5}
          py={4}
        >
          <Link href="../SearchPage/searchPage">
            <Button colorScheme="">Crossings</Button>
          </Link>
          <Link href="../Bookings/bookings">
            <Button colorScheme="">Bookings</Button>
          </Link>
          <Link href="../BookingsForm/bookingsForm">
            <Button colorScheme="">Booking Form</Button>
          </Link>
        </GridItem>
        <GridItem area="content">
        </GridItem>
      </Grid>
    );
}

export default Navbar;
