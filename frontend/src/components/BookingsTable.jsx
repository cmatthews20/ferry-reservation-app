/*
This component uses the Bookings Search Bar component to display booking info.
*/

import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BookingsSearchBar from './BookingsSearchBar';

const API_HOST = 'http://127.0.0.1:8000';
const BOOKING_API_URL = `${API_HOST}/booking_data`;
const PORTS_API_URL = `${API_HOST}/ports`;
const CANCEL_BOOKING_API_URL = `${API_HOST}/cancel_booking`;

export default function BookingsTable() {
  const [bookingData, setBookingData] = useState([]);
  const [portsData, setPortsData] = useState([]);
  var dataWithPorts = [];
  const router = useRouter();

  function handleSearch(booking_id, email) {
    fetchBookingData(booking_id, email);
    fetchPortsData();
  }

  async function fetchBookingData(BOOKING_ID, EMAIL) {
    try {
      const response = await fetch(
        `${BOOKING_API_URL}/${BOOKING_ID}/${EMAIL}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.length == 0) {
        alert(
          `Booking ID and Email was not found. Please try valid Booking ID and Email`
        );
      }
      setBookingData(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPortsData() {
    try {
      const response = await fetch(`${PORTS_API_URL}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setPortsData(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const getDataWithPorts = () => {
    return bookingData.map((item) => {
      const arrivalPort = portsData.find(
        (port) => port.port_id === item.Crossing.arrive_port
      );
      const departurePort = portsData.find(
        (port) => port.port_id === item.Crossing.depart_port
      );
      return {
        ...item,
        arrive_port_name: arrivalPort.port_name,
        depart_port_name: departurePort.port_name,
      };
    });
  };

  if (bookingData.length !== 0 && portsData.length !== 0) {
    dataWithPorts = getDataWithPorts();
  }

  function handleCancelBooking(booking_id) {
    console.log('Booking ID');
    console.log(booking_id);
    const url = `${CANCEL_BOOKING_API_URL}/${booking_id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        alert(`Booking ${booking_id} has been cancelled.`);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <BookingsSearchBar handleSearch={handleSearch} />
      <TableContainer>
        <Table variant="simple" style={{ textAlign: 'center' }}>
          <Thead>
            <Tr>
              <Th>Booking ID</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Depart Port</Th>
              <Th>Arrive Port</Th>
              <Th>Date and Time</Th>
              <Th>Personal Vehicle</Th>
              <Th>Total Passengers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataWithPorts.map((item) => (
              <Tr>
                <Td>{item.Booking.booking_id}</Td>
                <Td>{item.User.name}</Td>
                <Td>{item.User.phone}</Td>
                <Td>{item.depart_port_name}</Td>
                <Td>{item.arrive_port_name}</Td>
                <Td>{item.Schedule.time}</Td>
                <Td>{item.Booking.vehicle_id}</Td>
                <Td>{item.Booking.passengers}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleCancelBooking(item.Booking.booking_id)}
                  >
                    Cancel Booking
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
