/*
This is the bookings table component that uses the Bookings Search Bar component to display searched bookings
*/
import React, { useState } from "react";
import {
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
import BookingsSearchBar from "./BookingsSearchBar";

const API_HOST = "http://127.0.0.1:8000";
const BOOKING_API_URL = `${API_HOST}/booking_data`;

export default function BookingsTable() {
  // setting up the state hook
  const [booking_data, setBookingData] = useState([]);

  //callback function from search bar to table
  function handleSearch(booking_id) {
    fetchBookingData(booking_id);
  }

  // GET request for booking data to DB
  async function fetchBookingData(BOOKING_ID) {
    try {
      const response = await fetch(`${BOOKING_API_URL}/${BOOKING_ID}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setBookingData(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <BookingsSearchBar handleSearch={handleSearch} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>booking_id</Th>
              <Th>name</Th>
              <Th>email</Th>
              <Th>phone</Th>
              <Th>Date and Time</Th>
              <Th>personal vehicle</Th>
              <Th>additional passengers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {booking_data.map((item, key) => (
              <Tr>
                <Td>{item.Booking.booking_id}</Td>
                <Td>{item.User.name}</Td>
                <Td>{item.User.email}</Td>
                <Td>{item.User.phone}</Td>
                <Td>{item.Schedule.time}</Td>
                <Td>{item.Booking.vehicle_id}</Td>
                <Td>{item.Booking.passengers}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
