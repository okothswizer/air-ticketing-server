import React from "react";
import flight from "./flight";

function flightList({ flightpayment }) {
    return (
        <div className="mvls-container">
            <div className="mvls-flight-list">
                {moviesShowing.map(m => (
                    <Movie key={m.id} flightpayment={m} />
                ))}
            </div>
        </div>
    );
}

export default flightList;