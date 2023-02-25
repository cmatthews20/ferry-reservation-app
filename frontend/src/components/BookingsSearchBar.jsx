/*
This is the Bookings SearchBar used to collect the Booking ID from users to search the Bookings database and display the bookings in a table
*/
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Field, Form, Formik} from 'formik';
import { Search2Icon } from '@chakra-ui/icons'

function BookingsSearchBar({handleSearch}) {

    function validateBookingID(value) {
        let error 
        if (!value) {
            error = 'Booking ID is required'
        }
        return error 
    }

    return (
        <Formik
            initialValues={{ booking_id: ''}}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    handleSearch(values["booking_id"])
                    actions.setSubmitting(false)
                }, 1000)
            }} 
    >
        {(props) => (
            <Form>
                <Field name='booking_id' validate={validateBookingID}>
                    {( {field, form} ) => (
                        <FormControl isInvalid={form.errors.booking_id && form.touched.booking_id}>
                            <FormLabel>Search Booking ID</FormLabel>
                            <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<Search2Icon color='gray.300' />}
                                />
                                <Input {...field} placeholder='Booking ID'/>
                            </InputGroup>
                            <FormErrorMessage>{form.errors.booking_id}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
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
