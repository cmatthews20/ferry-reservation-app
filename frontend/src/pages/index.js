import Link from 'next/link';
import { Button, AbsoluteCenter, Box, Text, VStack } from '@chakra-ui/react';

function LandingPage() {
  return (
    <>
      <Box
        backgroundImage="url('background.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        height="100vh"
      ></Box>
      <Box textAlign={'center'} opacity="80%">
        <AbsoluteCenter>
          <VStack
            bgGradient="linear(to-r, #C4F1F9, #3182CE)"
            rounded="lg"
            spacing="5"
            p="3"
            borderWidth="3px"
            borderColor="grey"
          >
            <Text color="black" as="b" fontSize="5xl">
              Ferry Reservation Service
            </Text>
            <Link href="/SearchPage/searchPage">
              <Button colorScheme="blue" size="lg">
                Continue as Guest
              </Button>
            </Link>
          </VStack>
        </AbsoluteCenter>
      </Box>
    </>
  );
}
export default LandingPage;
