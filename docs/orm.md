# ORM

FastAPI works with any database and any style of library to communicate with the database. A common pattern is to use an "ORM": an "object-relational mapping" library. An ORM, in essence, maps between objects in code and database tables. These ORMs also have tools to make the connections or relations between tables or entities.

With an ORM, we can create a class that represents a table in a SQL database (SQLite in our case), where each attribute of the class represents a column, with a name and a type. For example, a class `User` could represent a SQL table `users`. Each instance object of that class would represent a row in the database. An object `user_1` (an instance of `User`) could have an attribute user_1.name, for the column type. The value of that attribute could be, e.g. "Cole Matthews".

This functionality is exactly what we want, so that we can implement object-oriented design principles we have learned.

Reference: https://fastapi.tiangolo.com/tutorial/sql-databases/
