/*
My Bookings Table shows the current active bookings of the user and the past bookings done
Along with options to choose an action to either cancel or reschedule
*/
import { ChevronDownIcon} from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Heading, Flex } from '@chakra-ui/react'
import { Button, ButtonGroup, Stack, VStack, StackDivider } from '@chakra-ui/react'
export default function BookingTable() {
    return (
    <>
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'>   
    <Heading>Active Bookings</Heading>
    <TableContainer>
        <Table variant='simple'>
            <Thead>
            <Tr>
                <Th>Booking Reference</Th>
                <Th>Name</Th>
                <Th>Schedule</Th>
                <Th isNumeric>No. of Passengers</Th>
                <Th is Numeric>Vehicle Pass</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>B7896</Td>
                <Td>John Doe</Td>
                <Td>S1234</Td>
                <Td isNumeric>5</Td>
                <Td>Yes</Td>
                <Td><Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Actions
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Cancel</MenuItem>
                            <MenuItem>Reschedule</MenuItem>
                        </MenuList>
                    </Menu></Td>
            </Tr>
            <Tr>
                <Td>B8907</Td>
                <Td>John Doe</Td>
                <Td>S1234</Td>
                <Td isNumeric>4</Td>
                <Td>Yes</Td>
            </Tr>
            </Tbody>
        </Table>
    <Heading>Past Bookings</Heading>
    </TableContainer>
        <TableContainer>
            <Table variant='simple'>
            <Thead>
            <Tr>
                <Th>Booking Reference</Th>
                <Th>Name</Th>
                <Th>Schedule</Th>
                <Th isNumeric>No. of Passengers</Th>
                <Th is Numeric>Vehicle Pass</Th>
            </Tr>
            </Thead>
                <Tbody>
                <Tr>
                    <Td>B7896</Td>
                    <Td>John Doe</Td>
                    <Td>S1234</Td>
                    <Td isNumeric>4</Td>
                    <Td>Yes</Td>
                    <Td><Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Cancel</MenuItem>
                                <MenuItem>Reschedule</MenuItem>
                            </MenuList>
                        </Menu></Td>
                </Tr>
                <Tr>
                    <Td>B8907</Td>
                    <Td>John Doe</Td>
                    <Td>S1234</Td>
                    <Td isNumeric>2</Td>
                    <Td>Yes</Td>
                </Tr>
                </Tbody>
            </Table>
        </TableContainer>
        </VStack>
        </>
  );
}
