import {
    ChakraProvider,
    Button,
    Grid,
    GridItem,
    Image,
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
          <Link href="../MyBookings/myBookings">
            <Button colorScheme="">My Bookings</Button>
          </Link>
          <Link href="/profile">
            <Button colorScheme="">Profile</Button>
          </Link>
        </GridItem>
        <GridItem area="content">
        </GridItem>
      </Grid>
    );
}

export default Navbar;
