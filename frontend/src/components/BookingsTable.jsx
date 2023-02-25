/*
This is the bookings table component that uses the Bookings Search Bar component to display searched bookings
*/
import React, {useState} from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from "@chakra-ui/react";
import BookingsSearchBar from './BookingsSearchBar';

const API_HOST = "http://127.0.0.1:8000";
const BOOKINGS_API_URL = `${API_HOST}/bookings`;

export default function BookingsTable() {
    // setting up the state hook
    const [data, setData] = useState([]);

    //callback function from search bar to table
    function handleSearch(booking_id) {
        fetchBookings(booking_id);
    }

    // GET request function to DB
    async function fetchBookings(BOOKING_ID) {
        try {
            const response = await fetch(`${BOOKINGS_API_URL}/${BOOKING_ID}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            // console.log("result is " + JSON.stringify(result));
            setData(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <BookingsSearchBar handleSearch={handleSearch}/>
        <TableContainer>
        <Table variant='simple'>
            <Thead>
            <Tr>
                <Th>booking_id</Th>
                <Th>user_id</Th>
                <Th>schedule_id</Th>
                <Th>vehicle_id</Th>
                <Th>passengers</Th>
            </Tr>
            </Thead>
            <Tbody>
            {data.map((value,key) => (
          <Tr>
            <Td>{value.booking_id}</Td>
            <Td>{value.user_id}</Td>
            <Td>{value.schedule_id}</Td>
            <Td>{value.vehicle_id}</Td>
            <Td>{value.passengers}</Td>
          </Tr>
        ))
        }
            </Tbody>
        </Table>
        </TableContainer>
        </>
    );
}
