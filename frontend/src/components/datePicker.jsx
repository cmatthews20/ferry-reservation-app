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
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TripsContext = React.createContext({
  trips: [], fetchSchedule: () => {},
  selectedDeparturePort: [], fetchDeparturePort: () => {},
  selectedArrivalPort: [], fetchArrivalPort: () => {},
})

export default function TableDatePicker() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [trips, setTrips] = useState([]);
  const [departurePorts, setDeparturePortOptions] = useState([]);
  const [selectedDeparturePort, setSelectedDeparturePort] = useState(null);
  const [arrivalPorts, setArrivalPortOptions] = useState([]);
  const [selectedArrivalPort, setSelectedArrivalPort] = useState(null);

  async function fetchSchedule(startDate,endDate,departure_Port,arrive_Port) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/schedules/${startDate}/${endDate}/${departure_Port}/${arrive_Port}`, {
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

  async function fetchDeparturePorts() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/ports`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const ports = await response.json();
        const portNames = ports.map((item) => {
          return {
            value: item.port_id,
            label: item.port_name
          };
        });
        setDeparturePortOptions(portNames);

    } catch (err) {
        console.log(err);
    }
  }

  async function fetchArrivalPorts(selectedDeparturePort) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/ports/${selectedDeparturePort}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const ports = await response.json();
        const portNames = ports.map((item) => {
          return {
            value: item.Crossing.arrive_port,
            label: item.Port.port_name
          };
        });
        setArrivalPortOptions(portNames);

    } catch (err) {
        console.log(err);
    }
  }

  const handleChangeDeparturePorts = (departurePorts) => {
    fetchArrivalPorts(Object.values(departurePorts)[0])
    setSelectedDeparturePort(departurePorts);
  }; 
  const handleChangeArrivalPorts = (arrivalPorts) => {
    setSelectedArrivalPort(arrivalPorts);
  }; 


  useEffect(() => {
    fetchDeparturePorts();
  }, []);

 return (
  <TripsContext.Provider value={{trips, fetchSchedule, selectedDeparturePort, fetchDeparturePorts, selectedArrivalPort, fetchArrivalPorts}}>
    <div>
      <Select
        value={selectedDeparturePort}
        onChange={handleChangeDeparturePorts}
        options={departurePorts}
      />
      <Select
        value={selectedArrivalPort}
        onChange={handleChangeArrivalPorts}
        options={arrivalPorts}
      />
      <DatePicker
        placeholderText="Select Start Date"
        //showTimeSelect
        //dateFormat="MMMM d, yyyy h:mmaa"
        //TODO:
        selected={startDate}
        startDate={startDate}
        onChange={date => setStartDate(date)}
      />
      <DatePicker
        placeholderText="Select End Date"
        //showTimeSelect
        //dateFormat="MMMM d, yyyy h:mmaa" 
        //TODO:
        selected={endDate}
        endDate={endDate}
        onChange={date => setEndDate(date)}
      />
      <button onClick={()=>
        fetchSchedule(startDate.toDateString(),endDate.toDateString(),Object.values(selectedDeparturePort)[0],Object.values(selectedArrivalPort)[0])}>      
        Click me!
        </button>
      </div>
    <TableContainer>
    <Table variant='simple'>
        <Thead>
          <Tr>
              <Th>schedule_id</Th>
              <Th>time</Th>
              <Th>seats_occupied</Th>
              <Th>vehicles_occupied</Th>
          </Tr>
        </Thead>
        <Tbody>
        {trips.map((value) => (
          <tr>
            <td>{value.ferry_name}</td>
            <td>{value.time}</td>
            <td>{value.passenger_capacity}</td>
            <td>{value.vehicle_capacity}</td>
          </tr>
        ))}
        </Tbody>
    </Table>
    </TableContainer>
  </TripsContext.Provider>
 );
}
