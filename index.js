const express = require("express");

const mysql = require("mysql");

const app = express();
const pool = mysql.createPool({
    host: "localhost",
    user: "foo",
    password: "password",
    database: "air_ticketing"

});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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

app.post('/api/customer', (req, res) => {
    const customer= req.body;
    if (!customer.name,id, mobile_number) {
        return res.status(400).json({ error: "invalid payload"});
    }

    pool.query(
        "INSERT INTO customer (id, name, mobile_number) VALUES (5, 'sam', 723678542)",
        [id, name, mobile_number],
        (error, results) => {
            if (error) {
                return res.status(500).json({error});
            }
            res.json(results.insertId);
        }
    )
})
app.listen(9000, () => console.log("App listening on port 9000"));