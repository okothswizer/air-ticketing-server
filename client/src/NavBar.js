import React from "react";
import { Link } from "@reach/router";
function NavBar() {
    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-title">air_ticketing</span>
                <Link to="/">flight</Link>
+                 <Link to="/customer">Customer</Link>
+                 <Link to="/admin">Admin</Link>
            </nav>
        </div>
    );
}

export default NavBar;