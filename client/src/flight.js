import React from "react";
import { Link } from "@reach/router";

function flight({ flightpayment }) {
    const { id, departure, flight_number, poster_url, departure_time,Flight_number,Destination } = flightpayment;
    
    return (
        <div className="mvls-flight">
            <img className="mvls-poster" src={poster_url} alt={flight_number} />
            <div className="mvls-flihgt-body">
                <div className="mvls-flight">{flight_number}</div>
                <div className="mvls-flight">{departure}</div>
                <div className="mvls-flight">{departure_time}></div>
                <div className="mvls-flight">{Flight_number}></div>
                <div className="mvls-flight">{Destination}</div>
            </div>
            <div className="mvls-flight-footer">
            <Link to={`/flight/${id}`} className="mvls-btn mvls-btn-customer">
                    See customer
                 </Link>
            </div>
        </div>
    );
}

export default flight;