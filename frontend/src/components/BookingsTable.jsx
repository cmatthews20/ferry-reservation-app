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
const PORTS_API_URL = `${API_HOST}/ports`;

export default function BookingsTable() {
  // setting up the state hook
  const [bookingData, setBookingData] = useState([]);
  const [portsData, setPortsData] = useState([]);
  var dataWithPorts = [];

  //callback function from search bar to table
  function handleSearch(booking_id) {
    fetchBookingData(booking_id);
    console.log("Before fetchPortsData");
    console.log(dataWithPorts);
    fetchPortsData();
    console.log("After fetchPortsData");
    console.log(dataWithPorts);
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

  // GET request for ports data to DB
  async function fetchPortsData() {
    try {
      const response = await fetch(`${PORTS_API_URL}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setPortsData(result);
      console.log("Inside ports data");
      console.log(dataWithPorts);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const getDataWithPorts = () => {
    // Combine booking data with port data
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

  if (bookingData !== null && portsData !== null) {
    dataWithPorts = getDataWithPorts();
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
              <Th>phone</Th>
              <Th>Depart Port</Th>
              <Th>Arrive Port</Th>
              <Th>Date and Time</Th>
              <Th>personal vehicle</Th>
              <Th>additional passengers</Th>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
