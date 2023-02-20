//The date picker component fot the search bar
import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
 const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(new Date());
 
 return (
   <div>
     <DatePicker
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={date => setStartDate(date)}
     />
     <DatePicker
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       onChange={date => setEndDate(date)}
     />
     <button onClick={()=>console.log(startDate.toString())}>
      Click me!
    </button>
   </div>
 );
}
