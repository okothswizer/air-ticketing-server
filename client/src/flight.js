import React from "react";

function flight({ flightpayment }) {
    const { id, departure, flight_number, poster_url, departure_time,Flight_number,Destination } = flightpayment;
    
    return (
        <div className="mvls-flight">
            <img className="mvls-poster" src={poster_url} alt={flight_number} />
            <div className="mvls-flihgt-body">
                <div className="mvls-flight">{flight_number}</div>
            </div>
            <div className="mvls-flight-footer">
                <a href={`/flight/${id}`} className="mvls-btn mvls-btn-flights">
                    See customerText
                </a>
            </div>
        </div>
    );
}

export default flight;