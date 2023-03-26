import Link from 'next/link';
import { Button, AbsoluteCenter, Box } from '@chakra-ui/react'

function LandingPage() {
  return (
    <Box
      backgroundImage="url('background.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      height="100vh"
    >
      <AbsoluteCenter>
      <Link href="/SearchPage/searchPage">
        <Button colorScheme='blue' size='lg'>Continue as Guest</Button>
      </Link>
      </AbsoluteCenter>
      
    </Box>
  );
}
export default LandingPage;
