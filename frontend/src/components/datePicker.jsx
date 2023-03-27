//The date picker component fot the search bar

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  SimpleGrid,
  GridItem,
  Heading,
  Button,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

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

  async function fetchSchedule(
    startDate,
    endDate,
    departure_Port,
    arrive_Port
  ) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/schedules/${startDate}/${endDate}/${departure_Port}/${arrive_Port}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const trips = await response.json();
      setTrips(trips);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchDeparturePorts() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/ports`, {
        method: "GET",
        headers: {
          accept: "application/json",
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
        `http://127.0.0.1:8000/arrival_ports/${selectedDeparturePort}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
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

  const handleChangeDeparturePorts = (departurePorts) => {
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
        <Heading style={{ textAlign: "center" }}>Search</Heading>
        <SimpleGrid
          columns={5}
          columnGap={3}
          w="full"
          justifyContent="space-between"
          alignContent="space-between"
          style={{ padding: "0 10px 0 10px" }}
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
              style={{ width: "80%" }}
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
              style={{ width: "80%" }}
              isClearable={true}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              dateFormat="MMMM d, yyyy"
              showDisabledMonthNavigation
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              onClick={() =>
                fetchSchedule(
                  startDate.toDateString(),
                  endDate.toDateString(),
                  Object.values(selectedDeparturePort)[0],
                  Object.values(selectedArrivalPort)[0]
                )
              }
              colorScheme="blue"
              w="100%"
            >
              Search!
            </Button>
          </GridItem>
        </SimpleGrid>
        <Heading style={{ textAlign: "center" }}>Available Crossings</Heading>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: "1rem",
          }}
        >
          <TableContainer style={{ width: "90%" }}>
            <Table variant="simple" style={{ textAlign: "center" }}>
              <Thead>
                <Tr>
                  <Th style={{ textAlign: "left" }}>Ferry Name</Th>
                  <Th style={{ textAlign: "center" }}>Time</Th>
                  <Th style={{ textAlign: "center" }}>Seats Left</Th>
                  <Th style={{ textAlign: "center" }}>Vehicle Spots Left</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trips.map((value) => {
                  const dateTimeStr = value.time;
                  const dateTime = new Date(dateTimeStr);
                  return (
                    <tr>
                      <td style={{ textAlign: "left" }}>{value.ferry_name}</td>
                      <td style={{ textAlign: "left" }}>
                        {dateTime.toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
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
                            pathname: "../BookingsForm/bookingsForm",
                            query: { schedule_id: value.schedule_id },
                          }}
                        >
                          <Button colorScheme="blue" size="lg" w="100%">
                            Book
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
      </VStack>
    </TripsContext.Provider>
  );
}
