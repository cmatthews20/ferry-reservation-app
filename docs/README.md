# Database

## Crossings Table

| Crossing_ID | Ferry_ID | Depart_From | Arrive | Date | Time |
| --- | --- | --- | --- |  --- | --- |
| Content Cell | Content Cell | Content Cell | Content Cell | Content Cell | Content Cell |

## Ferry Table

Ferry table may not be necessary yet.

## Bookings

| Booking_ID | User_ID | Crossing_ID | 
| --- | --- | --- | 
| Content Cell | Content Cell | Content Cell |

## Users

| User_ID | Name | Email | Phone | Payment_Info |
| --- | --- | --- | --- |  --- |
| Content Cell | Content Cell | Content Cell | Content Cell | Content Cell |

# Stack Options

Option 1: 

- Remix.js - Full stack framework (removes need for JWT, asyncpg, FastAPI)
- Docker/DockerHub - Containerize the database
- PostgreSQL - Database (in a dialect of SQL)
- ChakraUI/MaterialUI (TailwindCSS to write our own UI) - UI library
- BCrypt - Password Encryption (for passwords stored in the database)

Option 2: 

- Next.js - Frontend Framework (maybe switch to remix for auth/user session purposes)
- FastAPI - Backend (the front end uses this API to get data)
- AsyncPG - Make SQL queries (can't make database queries in python)
- Docker/DockerHub - Containerize the database
- PostgreSQL - Database (in a dialect of SQL)
- ChakraUI/MaterialUI (TailwindCSS to write our own UI) - UI library
- BCrypt - Password Encryption (for passwords stored in the database)
- JWT - Need a way to do user sessions
