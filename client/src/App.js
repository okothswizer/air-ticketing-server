import React from "react";
import NavBar from "./NavBar";
import FlightList from "./FlightList";
import "./App.css";


const FLIGHTS_PAYMENT = [
    {
        id: 2,
        flight_number:1112 ,
        poster_url: "www.indiatoday.in",
        customer_count: 2
    },
    {
        id: 1,
        departure:"NAIROBI",
        flight_number: 1111,
        poster_url: "www.independent.co.uk",
        destination:"KISUMU"
    },
    {
        id: 3,
        departure:"CHINA",
        flight_number: 2345,
        poster_url: "www.theatlantic.com",
        destination:"KENYA"
    }
];
function App() {
    return (
        <div className="mvls-app">
            <header className="mvls-header">
                <NavBar />
            </header>
            <main className="mvls-main">
                <CustomerList flightpayment={FLIGHT_PAYMENT} />
            </main>
        </div>
    );
}

export default App;