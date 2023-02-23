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
  useDisclosure
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  async function fetchSchedule() {
    try {
        const response = await fetch('http://127.0.0.1:8000/schedules', {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}

 useEffect(() => {
  fetchSchedule();
 }, []);
 return (

    <div>
     <DatePicker
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={date => setStartDate(date)}
     />
     <DatePicker
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       onChange={date => setEndDate(date)}
     />
     <button onClick={()=>console.log(startDate.toString())}>
      Click me!
    </button>
   </div>
 );
}
