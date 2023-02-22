"""
This file is for setting up the tables of the database
It is run to set up the tables if not existing and then the data is populated by the user
so that the data can be displayed and interacted with using components in the front end
"""
import sqlite3
from sqlite3 import Error


def create_connection(db_file):
    """
    Create a database connection to the SQLite database specified by db_file
    :param: db_file: database file in string
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)
        raise e

    return conn


def create_table(conn, create_table_sql):
    """
    Create a table from the create_table_sql statement
    :param: conn: Connection object
    :param: create_table_sql: a CREATE TABLE statement
    :return: no return
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)
        raise e


def db_setup():
    """
    Call the create_table function with the different sql for different tables
    :param: none
    :return: no return
    """
    db = "database/database.db"

    create_crossings_sql = """CREATE TABLE IF NOT EXISTS crossings (
                                    crossing_id text PRIMARY KEY,
                                    depart_port text NOT NULL,
                                    arrive_port text NOT NULL
                              );"""

    create_schedule_sql = """CREATE TABLE IF NOT EXISTS schedule (
                                    schedule_id text PRIMARY KEY,
                                    crossing_id text NOT NULL,
                                    ferry_id text NOT NULL,
                                    time text NOT NULL,
                                    seats_occupied integer,
                                    vehicles_occupied integer
                              );"""

    create_ferries_sql = """CREATE TABLE IF NOT EXISTS ferries (
                                    ferry_id text PRIMARY KEY,
                                    ferry_name text NOT NULL,
                                    passenger_capacity integer,
                                    vehicle_capacity integer
                              );"""

    create_port_sql = """CREATE TABLE IF NOT EXISTS ports (
                              port_id text PRIMARY KEY,
                              port_name text NOT NULL
                        );"""

    create_users_sql = """CREATE TABLE IF NOT EXISTS users (
                              user_id text PRIMARY KEY,
                              name text NOT NULL,
                              DOB text NOT NULL,
                              email text NOT NULL,
                              phone integer NOT NULL,
                              street text NOT NULL,
                              city text NOT NULL,
                              province NOT NULL,
                              postal_code NOT NULL
                         );"""

    create_entity_sql = """CREATE TABLE IF NOT EXISTS entity (
                              entity_id text PRIMARY KEY,
                              entity text NOT NULL
                        );"""

    create_pricings_sql = """CREATE TABLE IF NOT EXISTS pricings (
                              crossing_id text NOT NULL,
                              entity_id text NOT NULL,
                              price real NOT NULL,
                              PRIMARY KEY (crossing_id, entity_id)        
                              );"""

    create_bookings_sql = """CREATE TABLE IF NOT EXISTS bookings (
                                    booking_id text PRIMARY KEY,
                                    user_id text NOT NULL,
                                    schedule_id text NOT NULL,
                                    vehicle_id text,
                                    passengers text
                              )"""

    # create a database connection
    conn = create_connection(db)

    # create tables
    if conn is not None:
        # create crossings table
        create_table(conn, create_crossings_sql)

        # create schedule table
        create_table(conn, create_schedule_sql)

        # create ferries table
        create_table(conn, create_ferries_sql)

        # create port table
        create_table(conn, create_port_sql)

        # create users table
        create_table(conn, create_users_sql)

        # create entity table
        create_table(conn, create_entity_sql)

        # create pricings table
        create_table(conn, create_pricings_sql)

        # create bookings table
        create_table(conn, create_bookings_sql)

    else:
        print("Error: Connection to Database not established.")


if __name__ == "__main__":
    db_setup()
