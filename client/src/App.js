import React from "react";
import NavBar from "./NavBar";
import FlightList from "./FlightList";
import "./App.css";



function App() {
    return (
        <div className="mvls-app">
            <header className="mvls-header">
                <NavBar />
            </header>
            <main className="mvls-main">
                <flightList />
            </main>
        </div>
    );
}

export default App;