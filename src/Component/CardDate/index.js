import React, { useState } from "react";
import "./cardDate.css";
import moment from "moment/moment";

function CardDate(props) {
  const [date, setDate] = useState("");

  setInterval(() => {
    setDate(new Date());
  }, [1000]);

  return (
    <div className="card-date">
      Today : {date && moment(date).format("MMMM Do YYYY, h:mm:ss a")}
    </div>
  );
}

export default CardDate;
