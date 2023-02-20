import Head from 'next/head';
import Navbar from '../../components/Navbar.jsx';
import TableDatePicker from '../../components/datePicker.jsx';
export default function searchPage() {
    return(
      <>
        <Head>
          <title>Book Crossings</title>
        </Head>
        <Navbar/>
        <TableDatePicker/>
        <h1>First Post</h1>
      </>
    );
  }