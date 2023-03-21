# Database

We spent a lot of time planning the database so that it could completely replace the Government of NL's website AND introduce the new reservation functionality. The columns of the demo database may differ slightly (and some tables, such as pricing, may not be included in initial versions). However, this is what we believe a final version of the database could look like, and what we have modelled our current database after.

Primary keys are in italics.

## Crossings Table

| *crossing_id* | depart_port | arrive_port |
| --- | --- | --- |
| Sample Data | Sample Data | Sample Data |

## Schedule Table

| *schedule_id* | crossing_id | ferry_id | time | seats_occupied | vehicles_occupied |
| --- | --- | --- | --- | --- | --- |
| Sample Data | Sample Data | Sample Data | Sample Data | Sample Data | Sample Data |

## Ports Table

| *port_id* | port_name |
| --- | --- |
| Sample Data | Sample Data |

## Entity Table

| *entity_id* | entity |
| --- | --- |
| Sample Data | Sample Data |

## Pricings Table

| *crossing_id* | *entity_id* | price |
| --- | --- | --- |
| Sample Data | Sample Data | Sample Data |

## Bookings

| *booking_id* | user_id | schedule_id | vehicle_id | passengers |
| --- | --- | --- | --- | --- |
| Sample Data | Sample Data | Sample Data | Sample Data | Sample Data |


## Ferry Table

| *ferry_id* | ferry_name | passenger_capacity | vehicle_capacity |
| --- | --- | --- | --- |
| Sample Data | Sample Data | Sample Data | Sample Data |

## Users

| *user_id* | name | email | phone | payment_info |
| --- | --- | --- | --- |  --- |
| Sample Data | Sample Data | Sample Data | Sample Data | Sample Data |
