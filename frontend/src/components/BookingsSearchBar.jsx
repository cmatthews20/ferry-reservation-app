/*
This is the Bookings SearchBar used to collect the Booking ID from users to search the Bookings database and display the bookings in a table
*/

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Search2Icon } from '@chakra-ui/icons';

function BookingsSearchBar({ handleSearch }) {
  function validateBookingID(value) {
    let error;
    if (!value) {
      error = 'Booking ID is required';
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ booking_id: '', email: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          handleSearch(values['booking_id'], values['email']);
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="booking_id" validate={validateBookingID}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.booking_id && form.touched.booking_id}
              >
                <FormLabel>Booking ID</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.300" />}
                  />
                  <Input {...field} placeholder="Booking ID" />
                </InputGroup>
                <FormErrorMessage>{form.errors.booking_id}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl
                mt={4}
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.300" />}
                  />
                  <Input {...field} placeholder="Email" />
                </InputGroup>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
            size="md"
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default BookingsSearchBar;
