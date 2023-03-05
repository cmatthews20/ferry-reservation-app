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

function BookingForm () {
  const [addFormData, setAddFormData] = useState({
    name: '',
    phone: '',
    email: '',
    passengers: '',
    vehicle: ''
  })

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
  }

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
      <VStack spacing={3} alignItems='flex-start'>
        <Heading size='2xl'>Your details</Heading>
        <Text>Please fill out your reservation details.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={7} w='full'>
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
