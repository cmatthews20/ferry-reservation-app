/*
This component takes user input and queries the database for available crossings.
*/

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import {
  Button,
  VStack,
  StackDivider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const API_HOST = 'http://127.0.0.1:8000';
const SCHEDULE_API_URL = `${API_HOST}/schedules`;
const PORTS_API_URL = `${API_HOST}/ports`;
const ARRIVAL_PORTS_API_URL = `${API_HOST}/arrival_ports`;

const TripsContext = React.createContext({
  trips: [],
  fetchSchedule: () => {},
  selectedDeparturePort: [],
  fetchDeparturePort: () => {},
  selectedArrivalPort: [],
  fetchArrivalPort: () => {},
});

export default function TableDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [trips, setTrips] = useState([]);
  const [departurePorts, setDeparturePortOptions] = useState([]);
  const [selectedDeparturePort, setSelectedDeparturePort] = useState(null);
  const [arrivalPorts, setArrivalPortOptions] = useState([]);
  const [selectedArrivalPort, setSelectedArrivalPort] = useState(null);
  const [errorSearch, setErrorSearch] = useState({});
  const [errorSearchResult, setErrorSearchResult] = useState({});

  async function fetchSchedule(
    startDate,
    endDate,
    departure_Port,
    arrive_Port
  ) {
    const errorsR = {};
    try {
      const response = await fetch(
        `${SCHEDULE_API_URL}/${startDate}/${endDate}/${departure_Port}/${arrive_Port}`,
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
      const trips = await response.json();
      setTrips(trips);
      setErrorSearchResult(errorsR);
      if (!trips.length) {
        throw new Error('No trips found! Please try different dates.');
      }
    } catch (err) {
      errorsR.Response = err.message;
      setErrorSearchResult(errorsR);
    }
  }

  async function fetchDeparturePorts() {
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
      const ports = await response.json();
      const portNames = ports.map((item) => {
        return {
          value: item.port_id,
          label: item.port_name,
        };
      });
      setDeparturePortOptions(portNames);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchArrivalPorts(selectedDeparturePort) {
    try {
      const response = await fetch(
        `${ARRIVAL_PORTS_API_URL}/${selectedDeparturePort}`,
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
      const ports = await response.json();
      const portNames = ports.map((item) => {
        return {
          value: item.Crossing.arrive_port,
          label: item.Port.port_name,
        };
      });
      setArrivalPortOptions(portNames);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSearchSubmit = () => {
    event.preventDefault();

    const errors = {};

    if (startDate === null) {
      errors.startDate = 'Start Date is Required';
    }
    if (endDate === null) {
      errors.endDate = 'End Date is required';
    }
    if (selectedDeparturePort === null) {
      errors.departurePort = 'Departure Port is required';
    }
    if (selectedArrivalPort === null) {
      errors.arrivalPort = 'Arrival Port is required';
    }

    setErrorSearch(errors);

    if (Object.keys(errors).length === 0) {
      fetchSchedule(
        startDate.toDateString(),
        endDate.toDateString(),
        Object.values(selectedDeparturePort)[0],
        Object.values(selectedArrivalPort)[0]
      );
    }
  };

  const handleChangeDeparturePorts = (departurePorts) => {
    setSelectedArrivalPort(null);
    fetchArrivalPorts(Object.values(departurePorts)[0]);
    setSelectedDeparturePort(departurePorts);
  };
  const handleChangeArrivalPorts = (arrivalPorts) => {
    setSelectedArrivalPort(arrivalPorts);
  };

  useEffect(() => {
    fetchDeparturePorts();
  }, []);

  return (
    <TripsContext.Provider
      value={{
        trips,
        fetchSchedule,
        selectedDeparturePort,
        fetchDeparturePorts,
        selectedArrivalPort,
        fetchArrivalPorts,
      }}
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        mb={4}
      >
        <Heading style={{ textAlign: 'center' }}>Search</Heading>
        <SimpleGrid
          columns={5}
          columnGap={3}
          rowGap={2}
          w="full"
          justifyContent="space-between"
          alignContent="space-between"
          style={{ padding: '0 10px 0 10px' }}
        >
          <GridItem colSpan={1}>
            <Select
              value={selectedDeparturePort}
              onChange={handleChangeDeparturePorts}
              options={departurePorts}
              placeholder="Select departure port"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Select
              value={selectedArrivalPort}
              onChange={handleChangeArrivalPorts}
              options={arrivalPorts}
              placeholder="Select arrival port"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <DatePicker
              placeholderText="Select Start Date"
              selected={startDate}
              startDate={startDate}
              onChange={(date) => setStartDate(date)}
              style={{ width: '80%' }}
              isClearable={true}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              dateFormat="MMMM d, yyyy"
              showDisabledMonthNavigation
            />
          </GridItem>
          <GridItem colSpan={1}>
            <DatePicker
              placeholderText="Select End Date"
              selected={endDate}
              endDate={endDate}
              onChange={(date) => setEndDate(date)}
              style={{ width: '80%' }}
              isClearable={true}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              dateFormat="MMMM d, yyyy"
              showDisabledMonthNavigation
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Button onClick={handleSearchSubmit} colorScheme="blue" w="100%">
              Search!
            </Button>
          </GridItem>
          <GridItem gridColumn="1 / -1">
            {errorSearch && Object.keys(errorSearch).length > 0 && (
              <Alert status="error" w="100%">
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                {Object.entries(errorSearch).map(([key, value], index, arr) => (
                  <AlertDescription key={key}>
                    {`${value}${index === arr.length - 1 ? '.' : ',\u00A0'}`}
                  </AlertDescription>
                ))}
              </Alert>
            )}
          </GridItem>
        </SimpleGrid>
        <Heading padding="10px" style={{ textAlign: 'center' }}>
          Available Crossings
        </Heading>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            gap: '1rem',
          }}
        >
          <TableContainer style={{ width: '90%' }}>
            <Table variant="simple" style={{ textAlign: 'center' }}>
              <Thead>
                <Tr>
                  <Th style={{ textAlign: 'left' }}>Ferry Name</Th>
                  <Th style={{ textAlign: 'center' }}>Time</Th>
                  <Th style={{ textAlign: 'center' }}>Seats Left</Th>
                  <Th style={{ textAlign: 'center' }}>Vehicle Spots Left</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trips.map((value) => {
                  const dateTimeStr = value.time;
                  const dateTime = new Date(dateTimeStr);
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{value.ferry_name}</td>
                      <td style={{ textAlign: 'left' }}>
                        {dateTime.toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </td>
                      <td>{value.passenger_capacity - value.seats_occupied}</td>
                      <td>
                        {value.vehicle_capacity - value.vehicles_occupied}
                      </td>
                      <td>
                        <Link
                          href={{
                            pathname: '../BookingsForm/bookingsForm',
                            query: {
                              schedule_id: value.schedule_id,
                              ferry_name: value.ferry_name,
                              depart_port: value.depart_port,
                              arrive_port: value.arrive_port,
                              time: value.time,
                            },
                          }}
                        >
                          <Button colorScheme="blue" size="lg" w="100%">
                            Book!
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        {errorSearchResult && Object.keys(errorSearchResult).length > 0 && (
          <Alert status="error" w="99%" mx="auto">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            {Object.entries(errorSearchResult).map(([key, value]) => (
              <AlertDescription key={key}>{`${value}`}</AlertDescription>
            ))}
          </Alert>
        )}
      </VStack>
    </TripsContext.Provider>
  );
}
