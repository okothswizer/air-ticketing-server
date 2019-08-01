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

app.get("/api/flight/:id", (req, res) => {
    pool.query(
        "SELECT id, departure, destination FROM flight WHERE id= ?",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });

            }
            res.json(rows);
        })
})

app.put("/api/flight/:id", (req, res) => {
    pool.query(
        "SELECT id, departure, destination FROM flight WHERE id= ?",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });

            }
            res.json(rows);
        })
})

app.post('/api/customer/:id', (req, res) => {
    const { name, mobile_number } = req.body;
    if (!name || !mobile_number) {
        return res.status(400).json({ error: "invalid payload" });
    }

    pool.query(
        "INSERT INTO customer ( name, mobile_number) VALUES (?,?)",
        [name, mobile_number, req.body.params],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.insertId);
        }
    )
})
app.post("/api/customer/:Id", (req, res) => {
    const customer = req.body;
    if (!customer.name) {
        return res.status(400).json({ error: "invalid payload" });
    }

    pool.query(
        "INSERT INTO customer ( name, mobile_number) VALUES (?,?)",
        [customer.name],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.insertId);
        }
    )
})


app.post("/api/flight_ticket_number/:Id", (req, res) => {
    const flight_ticket_number = req.body;
    if (!flight_ticket_number.ticket_number) {
        return res.status(400).json({ error: "invalid payload" });
    }

    pool.query(
        "INSERT INTO flight_ticket_number ( ticket_number) VALUE (?)",
        [flight_ticket_number.ticket_number],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
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

app.delete("/api/customer/:id", (req, res) => {
    pool.query(
        "DELETE FROM customer WHERE id = ?",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.affectedRows);
        }
    );
});
app.post("/api/flight", (req, res) => {
    const {
        Departure,
        Flight_number,
        Departure_time,
        Arrival_time,
        Destination,
        Id,
        Cover_url
    } = req.body;

    if (
        !Departure ||
        !Flight_number ||
        !Departure_time ||
        !Arrival_time ||
        !Destination ||
        !Id ||
        !Cover_url ||
        (Array.isArray(flight_ticket_number) && flight_ticket_number.length === 0)
    ) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).json({ error });
        }

        connection.beginTransaction(error => {
            if (error) {
                return res.status(500).json({ error });
            }

            connection.query(
                "INSERT INTO flight (Departure, Flight_number, Departure_time, arrival_time, cover_url, id, Destination) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [Departure, Flight_number, Departure_time, Arrival_time, cover_url, id, Destination],
                (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            res.status(500).json({ error });
                        });
                    }

                    const insertId = results.insertId;
                    const flight_ticket_numberValues = flight_ticket_number.map(flight_ticket_number => [insertId, flight_ticket_number]);

                    connection.query(
                        "INSERT INTO flight_ticket_number (id) VALUES ?",
                        [flight_ticket_numberValues],
                        (error, results) => {
                            if (error) {
                                return connection.rollback(() => {
                                    res.status(500).json({ error });
                                });
                            }

                            connection.commit(error => {
                                if (error) {
                                    return connection.rollback(() => {
                                        res.status(500).json({ error });
                                    });
                                }

                                connection.release();

                                res.json(insertId);
                            });
                        }
                    );
                }
            );
        });
    });
});


app.put("/api/flight/:id", (req, res) => {
        const {
            Departure,
            Flight_number,
            Departure_time,
            Arrival_time,
            Destination,
            Id,
            Cover_url
        } = req.body;
            

         if (
           ! Departure||
           ! Flight_number||
           ! Departure_time||
           ! Arrival_time||
           ! Destination||
           ! Id||
           ! Cover_url||
        
             (Array.isArray(genres) && genres.length === 0)
         ) {
             return res.status(400).json({ error: "Invalid payload" });
         }
    
         pool.getConnection((error, connection) => {
             if (error) {
                 return res.status(500).json({ error });
             }
    
             connection.beginTransaction(error => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
    
                 const flightId = req.params.id;
    
                 connection.query(
                     "UPDATE flight SET departure = ?, flight_number = ?, departure_time = ?, arrival_time = ?, destination = ?, Id = ?, Cover_url = ? WHERE id = ?",
                     [
                        Departure,
                        Flight_number,
                        Departure_time,
                        Arrival_time,
                        Destination,
                        Id,
                        Cover_url
                
                     ],
                     (error, results) => {
                         if (error) {
                             return connection.rollback(() => {
                                 res.status(500).json({ error });
                             });
                         }
    
                         const changedRows = results.changedRows;
                         const genreValues = genres.map(genre => [flightId, patment]);
    
                         connection.query(
                             "DELETE FROM payment WHERE payment_id = ?",
                             [flightId],
                             (error, results) => {
                                 if (error) {
                                     return connection.rollback(() => {
                                         res.status(500).json({ error });
                                     });
                                 }
    
                                 connection.query(
                                     "INSERT INTO payment (cost, id) VALUES ?",
                                     [paymentValues],
                                     (error, results) => {
                                         if (error) {
                                             return connection.rollback(() => {
                                                 res.status(500).json({ error });
                                             });
                                         }
    
                                         connection.commit(error => {
                                             if (error) {
                                                 return connection.rollback(() => {
                                                     res.status(500).json({ error });
                                                 });
                                             }
    
                                             connection.release();
    
                                             res.json(changedRows);
                                         });
                                     }
                                 );
                             }
                         );
                     }
                 );
             });
         });
     });
    
     app.delete("/api/flight/:id", (req, res) => {
             const flightId = req.params.id;
        
             pool.getConnection((error, connection) => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
        
                 connection.beginTransaction(error => {
                     if (error) {
                         return res.status(500).json({ error });
                     }
        
                     connection.query(
                         "DELETE FROM payment WHERE id = ?",
                         [flightId],
                         (error, results) => {
                             if (error) {
                                 return connection.rollback(() => {
                                     res.status(500).json({ error });
                                 });
                             }
        
                             connection.query(
                                 "DELETE FROM flight WHERE id = ?",
                                 [flightId],
                                 (error, results) => {
                                     if (error) {
                                         return connection.rollback(() => {
                                             res.status(500).json({ error });
                                         });
                                     }
        
                                     connection.commit(error => {
                                         if (error) {
                                             return connection.rollback(() => {
                                                res.status(500).json({ error });
                                             });
                                         }
        
                                         connection.release();
        
                                         res.json(results.affectedRows);
                                     });
                                 }
                             );
                         }
                     );
                 });
             });
         });
        
         app.post("/api/payment", (req, res) => {
                 const { customer_id, cost } = req.body;
            
                 if (!customer_id ||  !cost ) {
                     return res.status(400).json({ error: "Invalid payload" });
                 }
            
                 pool.query(
                     "INSERT INTO payment (customer_id, cost) VALUES (?, ?)",
                     [custom_id, cost],
                     (error, results) => {
                         if (error) {
                             return res.status(500).json({ error });
                         }
            
                         res.json(results.insertId);
                     }
                 );
             });
      app.listen(9000, () => console.log("App listening on port 9000"));
    
