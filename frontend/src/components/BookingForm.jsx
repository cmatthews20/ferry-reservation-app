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
import { useRouter } from 'next/router'

const API_HOST = 'http://127.0.0.1:8000'
const CREATE_BOOKING_API_URL = `${API_HOST}/create_booking`

function BookingForm ({ schedule_data }) {
  const [addFormData, setAddFormData] = useState({
    name: '',
    phone: '',
    email: '',
    additional_passengers: '',
    vehicle: ''
  })

  const router = useRouter()

  async function createBooking (
    name,
    email,
    phone,
    schedule_id,
    vehicle_id,
    additional_passengers
  ) {
    const url = `${CREATE_BOOKING_API_URL}?name=${name}&email=${email}&phone=${phone}&schedule_id=${schedule_id}&vehicle_id=${vehicle_id}&additional_passengers=${additional_passengers}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }

  const handleAddFormChange = event => {
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = async event => {
    event.preventDefault()
    const newBooking = {
      name: addFormData.name,
      phone: addFormData.phone,
      email: addFormData.email,
      additional_passengers: addFormData.additional_passengers,
      vehicle: addFormData.vehicle
    }
    console.log(newBooking)
    try {
      const data = await createBooking(
        newBooking.name,
        newBooking.email,
        newBooking.phone,
        schedule_data.schedule_id,
        newBooking.vehicle,
        newBooking.additional_passengers
      )
      alert(`Booking created with ID: ${data.booking_id}`)
      router.push('/../SearchPage/searchPage')
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while creating the booking.')
    }
  }

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
      <VStack spacing={3} alignItems='flex-start'>
        <Heading size='xl'>Your details</Heading>
        <Text>Please fill out your reservation details.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={7} w='full'>
        <GridItem colSpan={2}>
          <Heading size='s'>
            {schedule_data.schedule_id} - {schedule_data.ferry_name} -{' '}
            {schedule_data.depart_port} to {schedule_data.arrive_port} -{' '}
            {schedule_data.time}
          </Heading>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              name='name'
              placeholder='John Doe'
              onChange={handleAddFormChange}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
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
          <FormControl isRequired>
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
                name='additional_passengers'
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
