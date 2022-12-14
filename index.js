const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "Krishan@123",
    // database: "YogaClasses",

    host: "sql6.freesqldatabase.com",
    user: "sql6584642",
    password: "WVvZSTaIyU",
    database: "sql6584642",

    // host: "b2k3hobmlf1x337kz2xy-mysql.services.clever-cloud.com",
    // user: "ujufsll1fbww3gre",
    // password: "rIaPmaTgOLf1OmUAoMiK",
    // database: "b2k3hobmlf1x337kz2xy",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res)=> {
    const sqlSelect = "SELECT * FROM Users";
    db.query(sqlSelect, (err, result)=> {
        res.send(result);
    });
});

app.post("/api/insert", (req, res)=> {

    const UId = req.body.UId
    const Name = req.body.Name
    const Email = req.body.Email
    const Password = req.body.Password
    const Payment = req.body.Payment
    const Slot = req.body.Slot
    const SlotSelectionStatus = req.body.SlotSelectionStatus

    const sqlInsert = "INSERT INTO Users (UId, Name, Email, Password, Payment, Slot, SlotSelectionStatus) VALUES (?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [UId, Name, Email, Password, Payment, Slot, SlotSelectionStatus], (err, result)=> {
        console.log("result");
    });
});

app.put("/api/updatePaymentStatus", (req, res)=> {
    const PaymentStatus = req.body.PaymentStatus;
    const UId = req.body.UId;

    const sqlUpdate = "UPDATE Users SET Payment = ? WHERE UId = ?"

    db.query(sqlUpdate, [PaymentStatus, UId], (err, result)=> {
        if(err) console.log(err);
    });
});

app.put("/api/updateSlot", (req, res)=> {
    const Slot = req.body.Slot;
    const UId = req.body.UId;
    const SlotSelectionStatus = true;

    const sqlUpdateSlot = "UPDATE Users SET Slot = ? WHERE UId = ?"

    db.query(sqlUpdateSlot, [Slot, UId], (err, result)=> {
        if(err) console.log(err);
    });

    const sqlUpdateSlotSelectionStatus = "UPDATE Users SET SlotSelectionStatus = ? WHERE UId = ?"

    db.query(sqlUpdateSlotSelectionStatus, [SlotSelectionStatus, UId], (err, result)=> {
        if(err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});

