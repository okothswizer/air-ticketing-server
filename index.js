const express = require("express");

const mysql = require("mysql");

const app = express();
const pool = mysql.createPool({
    host: "localhost",
    user: "foo",
    password: "password",
    database: "air_ticketing"

});
app.get("/api/customer", (req, res) => {
    pool.query("SELECT id, name FROM customer", (error, rows) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows);
    });
});
app.get("/api/customer/:id", (req, res) => {
         pool.query(
             "SELECT id, name FROM customer WHERE id = ?",

            [req.params.id],
            (error, rows) => {
                if (error) {
                    return res.status(500).json({ error });
                 }
    
                 res.json(rows);
            }
         );
     });
    
    app.get("/api/flight/:id", (req, res) => {
             pool.query(
            " SELECT id, flight_number,departure, destination FROM flight WHERE id = ?",
    
                [req.params.id],
                (error, rows) => {
                    if (error) {
                        return res.status(500).json({ error });
                     }
        
                     res.json(rows);
                }
             );
         });
 
 app.get("/api/flight/:id",(req, res)=>{
     pool.query(
         "SELECT id, departure, destination FROM flight WHERE id= ?",
         [req.params.id],
         (error, rows) => {
             if (error) {
                 return res.status(500).json({error});
                
             }
             res.json(rows);
         })
 })    
        
 app.put("/api/flight/:id",(req, res)=>{
    pool.query(
        "SELECT id, departure, destination FROM flight WHERE id= ?",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({error});
               
            }
            res.json(rows);
        })
})    
         
app.listen(9000, () => console.log("App listening on port 9000"));