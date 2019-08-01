import React from "react";
import flight from "./flight";

function customerList({ FLIGHT_PAYMENT }) {
    return (
        <div className="cmls-container">
            <div className="cmls-customer-list">
                {FLIGHT_PAYMENT.map(m => (
                    <flight key={m.id} FLIGHT_PAYMENT={m} />
                ))}
            </div>
        </div>
    );
}

export default customerList;