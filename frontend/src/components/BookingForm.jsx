/*
This is the booking form component that takes the user information to create a booking to the booking table and update user information in user table
*/
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Checkbox,
  Button
} from '@chakra-ui/react'
import { PhoneIcon, EmailIcon, AddIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

const API_HOST = "http://127.0.0.1:8000";
const CREATE_BOOKING_API_URL = `${API_HOST}/create_booking`;

function BookingForm ({ scheduleId }) {
  const [addFormData, setAddFormData] = useState({
    name: '',
    phone: '',
    email: '',
    passengers: '',
    vehicle: ''
  })

  function createBooking(name, email, phone, schedule_id, vehicle_id, passengers) {
    const url = `${CREATE_BOOKING_API_URL}?name=${name}&email=${email}&phone=${phone}&schedule_id=${schedule_id}&vehicle_id=${vehicle_id}&passengers=${passengers}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleAddFormChange = event => {
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = event => {
    const newBooking = {
      name: addFormData.name,
      phone: addFormData.phone,
      email: addFormData.email,
      passengers: addFormData.passengers,
      vehicle: addFormData.vehicle
    }
    console.log(newBooking)
    createBooking(newBooking.name, newBooking.email, newBooking.phone, scheduleId, newBooking.vehicle, newBooking.passengers)
  }

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
      <VStack spacing={3} alignItems='flex-start'>
        <Heading size='2xl'>Your details</Heading>
        <Text>Please fill out your reservation details.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={7} w='full'>
        <GridItem colSpan={2}>
          <Heading size='s'>{scheduleId} - Port Bell Island-Port Portugal Cove - Mon 5th May: 22:00 (DEMO DATA)</Heading>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name='name'
              placeholder='John Doe'
              onChange={handleAddFormChange}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<PhoneIcon color='gray.300' />}
              />
              <Input
                name='phone'
                type='tel'
                placeholder='Phone number'
                onChange={handleAddFormChange}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='gray.300' />}
              />
              <Input
                name='email'
                type='email'
                placeholder='Email'
                onChange={handleAddFormChange}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Additional Passengers</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AddIcon color='gray.300' />}
              />
              <Input
                name='passengers'
                type='number'
                placeholder='0'
                onChange={handleAddFormChange}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel>Vehicle</FormLabel>
          <Checkbox name='vehicle' value='Yes' onChange={handleAddFormChange}>
            Personal Vehicle
          </Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            size='lg'
            w='full'
            type='submit'
            onClick={handleAddFormSubmit}
          >
            Place Reservation
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default BookingForm
