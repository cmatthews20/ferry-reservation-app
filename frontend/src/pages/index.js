import { 
  Wrap, 
  Flex, 
  Text, 
  Image, 
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, 
} from "@chakra-ui/react";
import Navbar from '../components/Navbar.jsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <Flex as="main" flexDir="column" px={20}>
        <Flex
          flexDir="column"
          alignItems="center"
          pt={16}
          pb={10}
          gap={4}
          w="full"
        >
          <Heading as="h1" size="xl">
            Choose a Crossing
          </Heading>
        </Flex>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Table Caption</TableCaption>
            <Thead>
              <Tr>
                <Th>Crossing</Th>
                <Th>Date</Th>
                <Th>Departure</Th>
                <Th>Seats Rem.</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Bell Island - Portugal Cove</Td>
                <Td>2020/08/06</Td>
                <Td>10:30am</Td>
                <Td>60</Td>
              </Tr>
              <Tr>
                <Td>Bell Island - Portugal Cove</Td>
                <Td>2020/08/06</Td>
                <Td>10:30am</Td>
                <Td>60</Td>
              </Tr>
              <Tr>
                <Td>Bell Island - Portugal Cove</Td>
                <Td>2020/08/06</Td>
                <Td>10:30am</Td>
                <Td>60</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
