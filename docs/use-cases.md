# Use Cases

It is intended that the following use cases will be implemented by March 21, 2023:

### 1. Name: View schedule

a. Short description: Users should be able to view a table containing the ferry
schedule that has been filtered based on their needs.

b. Precondition: The schedule page has been selected and a filter has been selected.

c. Postcondition: N/A (No action needed).

d. Error situations: Invalid filter.

e. System state in the event of an error: The schedule shows an empty table.

f. Actors: User (Passenger).

g. Trigger: User wants to see the ferry schedule.

h. Standard process:
    i. User loads the website.
    ii. User selects the Schedule page, if not chosen.
    iii. User selects a filter (Destination and time).
    iv. User confirms the filter.
    v. The system processes the filter and shows a schedule.

i. Alternate process:
    i. User selects invalid filter.
    ii. The system shows an empty table and outputs “No associated schedule”.
    iii. User selects an alternate filter.


### 2. Name: Create a reservation

a. Short description: Users should be able to create a reservation on the ferry from
the schedule page.

b. Precondition: User has filtered the schedule table.

c. Postcondition: User has made the reservation.

d. Error situations: Ferry is full.

e. System state in the event of an error: The system requests the user to select a
different ferry.

f. Actors: User (Passenger).

g. Trigger: User wants to create a reservation.

h. Standard process:
    i. User clicks the book button on the schedule page.
    ii. User inputs information on a form.
    iii. User gets a booking ID.

i. Alternate process:
    i. User submits an empty form.
    ii. System prompts user to fill out the form.
    iii. User fills the form or cancels the booking request.


### 3. Name: Check reservation

a. Short description: User should be able to check their reservation made by
searching a booking ID provided at the time of reservation

b. Precondition: User has a booking ID from the reservation.

c. Postcondition: User has viewed their booking itinerary.

d. Error situations: Booking ID not found.

e. System state in the event of an error: The system prompts the user to enter a valid
Booking ID.

f. Actors: User (Passenger).

g. Trigger: User wants to check the reservation made.

h. Standard process:
    i. User inputs the booking ID in the search bar.
    ii. Booking info is returned.

i. Alternate process:
    i. User inputs an invalid ID.
    ii. The system prompts the user to input a valid ID.


It is intended that the following use cases, as well as those in the previous section, will be implemented by March 28, 2023:

### 1. Name: Email booking confirmation

a. Short description: Users will receive an email with their booking itinerary.

b. Precondition: User has to input email in booking input form.

c. Postcondition: User receives an email with booking information.

d. Error situations: User email is not valid.

e. System state in the event of an error: Email is not sent to the user.

f. Actors: User (Passenger).

g. Trigger: User makes a booking.

h. Standard process:
    i. User makes a booking.
    ii. Itinerary email is sent.

i. Alternate process:
    i. Invalid email is input.
    ii. User does not receive an itinerary email.

### 2. Name: Cancel booking

a. Short description: Users should be able to cancel a booking. This is an
improvement of the interim submission of the booking process.

b. Precondition: User has a booking ID and email from reservation.

c. Postcondition: User has canceled their booking.

d. Error situations: Booking ID and Email not found.

e. System state in the event of an error: System prompts user to enter valid Booking
ID and Email

f. Actors: User (Passenger).

g. Trigger: User wants to cancel the reservation made.

h. Standard process:
    i. User inputs booking ID and email in input bar.
    ii. Booking info is returned.
    iii. User cancels the booking by pressing the cancel button.

i. Alternate process:
    i. User inputs an invalid ID and email in the input bar.
    ii. System prompts users to input valid booking details.
