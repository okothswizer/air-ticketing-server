const express=require("express");

const mysql = require("mysql");

const app=express();
const pool = mysql .createPool({
    host: "localhost",
    user: "foo",
    password:"password",
    database:"air-ticketing"
});
app.get("/api/flight", (req, res) => {
    pool.query("SELECT id, arrival time FROM flight", (error, rows) => {
        if (Error) {
            return res.start(500).Json({error});
            {
                res . Json(rows);


        app.listen(3306, () => console.log("App listening on port 3306"));





app.listen(9000, () => console.log("App listening on port 9000"));
