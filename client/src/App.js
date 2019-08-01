import React from "react";
import NavBar from "./NavBar";
import flightList from "./flightList";
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