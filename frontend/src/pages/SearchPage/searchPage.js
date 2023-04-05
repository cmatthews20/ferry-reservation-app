/*
Creates the crossings page where users can search by date and ports.
*/

import Head from "next/head";
import Navbar from "../../components/Navbar.jsx";
import TableDatePicker from "../../components/SearchCrossings.jsx";

export default function searchPage() {
  return (
    <>
      <Head>
        <title>Crossings</title>
      </Head>
      <Navbar />
      <TableDatePicker />
    </>
  );
}
