//Creates the search page, components should include date picker, the output table and search bar

import Head from "next/head";
import Navbar from "../../components/Navbar.jsx";
import TableDatePicker from "../../components/DatePicker.jsx";

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
