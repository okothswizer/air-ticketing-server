import React from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import flightList from "./flightList";
 import flightDetails from "./flightDetails";
 import customerList from "./customerList";
 import customerDetails from "./customerDetails";
 import Admin from "./Admin";
 import NotFound from "./NotFound";
import "./App.css";



function App() {
    return (
        <div className="mvls-app">
            <header className="mvls-header">
                <NavBar />
            </header>
            <main className="mvls-main">
            <Router>
                     <flightList path="/" />
                     <flightDetails path="/flight/:flightId" />
                     <flightList path="/flight" />
                     <customerDetails path="/customer/:customerId" />
                     <Admin path="/admin" />
                     <NotFound default />
                 </Router>
              </main>
          </div>
      );
  }       

export default App;