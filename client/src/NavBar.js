import React from "react";

function NavBar() {
    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-title">air_ticketing</span>
                <a href="/">Flights</a>
                <a href="/cinemas">Customers</a>
                <a href="/admin">Admin</a>
            </nav>
        </div>
    );
}

export default NavBar;