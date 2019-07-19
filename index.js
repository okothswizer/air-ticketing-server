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
    pool.query("SELECT name FROM customer", (error, rows) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows);
    });
});
app.get("/api/customer/:id", (req, res) => {
         pool.query(
             "SELECT name FROM customer WHERE id = ?",

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
            " SELECT flight_number,departure, destination FROM flight WHERE id = ?",
    
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

app.post('/api/customer/:id', (req, res) => {
    const { name, mobile_number} = req.body;
    if ( !name|| !mobile_number) {
        return res.status(400).json({ error: "invalid payload"});
    }

    pool.query(
        "INSERT INTO customer ( name, mobile_number) VALUES (?,?)",
        [ name, mobile_number,req.body.params],
        (error, results) => {
            if (error) {
                return res.status(500).json({error});
            }
            res.json(results.insertId);
        }
    )
})
app.post("/api/customer/:Id", (req, res) => {
    const customer = req.body;
    if (!customer.name) {
        return res.status(400).json({ error: "invalid payload"});
    }

    pool.query(
        "INSERT INTO customer ( name, mobile_number) VALUES (?,?)",
        [customer.name],
        (error, results) => {
            if (error) {
                return res.status(500).json({error});
            }
            res.json(results.insertId);
        }
    )
})


app.post("/api/flight_ticket_number/:Id", (req, res) => {
    const flight_ticket_number = req.body;
    if (!flight_ticket_number.ticket_number) {
        return res.status(400).json({ error: "invalid payload"});
    }

    pool.query(
        "INSERT INTO flight_ticket_number ( ticket_number) VALUE (?)",
        [flight_ticket_number.ticket_number],
        (error, results) => {
            if (error) {
                return res.status(500).json({error});
            }
            res.json(results.insertId);
        }
    )
})

app.put("/api/customer/:id", (req, res) => {
         const customer = req.body;
    
         if (!customer.name) {
             return res.status(400).json({ error: "Invalid payload" });
         }
    
         pool.query(
             "UPDATE customer SET name = ? WHERE id = ?",
             [customer.name, req.params.id],
             (error, results) => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
    
                 res.json(results.changedRows);
             }
         );
     });

app.listen(9000, () => console.log("App listening on port 9000"));