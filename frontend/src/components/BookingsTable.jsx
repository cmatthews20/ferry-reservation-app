import React, {useEffect, useState} from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from "@chakra-ui/react";

const API_HOST = "http://127.0.0.1:8000";
const BOOKINGS_API_URL = `${API_HOST}/bookings`;

export default function BookingsTable() {
    // setting up the state hook
    const [data, setData] = useState([]);
    
    // GET request function to DB
    async function fetchBookings() {
        try {
            const response = await fetch(`${BOOKINGS_API_URL}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            //console.log(result);
            setData(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    // Calling the function on component mount
    useEffect(() => {
        fetchBookings();
    }, []);

    return (
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
          <tr>
            <td>{value.booking_id}</td>
            <td>{value.user_id}</td>
            <td>{value.schedule_id}</td>
            <td>{value.vehicle_id}</td>
            <td>{value.passengers}</td>
          </tr>
        ))}
            </Tbody>
        </Table>
        </TableContainer>
    );
}
