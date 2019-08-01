import React from "react";

function flight({ flightpayment }) {
    const { id, departure, flight_number, poster_url, departure_time,Flight_number,Destination } = flightpayment;
    let customerText = "";

    if (customer_count === 0) {
        customerText = "Not paying in any flight";
    } else if (cinema_count === 1) {
        customerText = "paying in 1 flight";
    } else {
        customerText = `paying in ${customer_count} flight`;
    }

    return (
        <div className="mvls-flight">
            <img className="mvls-poster" src={poster_url} alt={flight_number} />
            <div className="mvls-flihgt-body">
                <div className="mvls-flight">{title}</div>
                <p className="mvls-customer-count">{customerText}</p>
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