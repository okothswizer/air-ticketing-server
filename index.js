const express = require("express");

const mysql = require("mysql");

const app = express();
const pool = mysql.createPool({
    host: "localhost",
    user: "foo",
    password: "password",
    database: "air-ticketing"

});
app.get("/api/flight", (req, res) => {
    pool.query("SELECT id, arrival time FROM flight", (error, rows) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows);
    });
});
app.get("/api/flight/:id", (req, res) => {
         pool.query(
             "SELECT id, name FROM flight WHERE id = ?",
            [req.params.id],
            (error, rows) => {
                if (error) {
                    return res.status(500).json({ error });
                 }
    
                 res.json(rows);
            }
         );
     });
    

app.listen(3306, () => {
    console.log("App running on port 3306");
});
