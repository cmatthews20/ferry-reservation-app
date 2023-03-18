//The date picker component fot the search bar
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Table, 
  Thead, 
  Tbody, 
  Tfoot, 
  Tr, 
  Th, 
  Td, 
  TableCaption, 
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TripsContext = React.createContext({
  trips: [], fetchSchedule: () => {}
})

export default function TableDatePicker() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [trips, setTrips] = useState([]);
  async function fetchSchedule(startDate,endDate) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/schedules/${startDate}/${endDate}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const trips = await response.json();
        console.log(trips);
        setTrips(trips);
    } catch (err) {
        console.log(err);
    }
  }

 return (
  <TripsContext.Provider value={{trips, fetchSchedule}}>
    <div>
      <DatePicker
        placeholderText="Select Start Date"
        //showTimeSelect
        //dateFormat="MMMM d, yyyy h:mmaa"
        //TODO:
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={date => setStartDate(date)}
      />
      <DatePicker
        placeholderText="Select End Date"
        //showTimeSelect
        //dateFormat="MMMM d, yyyy h:mmaa" 
        //TODO:
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        onChange={date => setEndDate(date)}
      />
      <button onClick={()=> 
        fetchSchedule(startDate.toDateString(),endDate.toDateString())}>      
        Click me!
        </button>
      </div>
    <TableContainer>
    <Table variant='simple'>
        <Thead>
          <Tr>
              <Th>schedule_id</Th>
              <Th>crossing_id</Th>
              <Th>ferry_id</Th>
              <Th>time</Th>
              <Th>seats_occupied</Th>
              <Th>vehicles_occupied</Th>
          </Tr>
        </Thead>
        <Tbody>
        {trips.map((value,key) => (
          <tr>
            <td>{value.schedule_id}</td>
            <td>{value.crossing_id}</td>
            <td>{value.ferry_id}</td>
            <td>{value.time}</td>
            <td>{value.seats_occupied}</td>
            <td>{value.vehicles_occupied}</td>
          </tr>
        ))}
        </Tbody>
    </Table>
    </TableContainer>
  </TripsContext.Provider>
 );
}
