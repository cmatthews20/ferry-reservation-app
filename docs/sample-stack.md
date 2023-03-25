# Sample Stack Options

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
- JWT - User sessions

**Option 3 (the one we went with):**

- Next.js - Frontend Framework
- ChakraUI - UI component library
- FastAPI - Backend
- SQLite - Database
- SQLAlchemy - Object Relational Mapper
