const express = require('express') //dependency
const app = express()
const bodyParser = require('body-parser') // analyser le code error
const cors = require('cors') //allows us to relax the security applied to an API

const mysql = require('mysql')
const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    database: "projectdb"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => { // send to front
    const sqlSelect = "select * from intern "
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => { // insertion
    const internName = req.body.internName;
    const internUniversity = req.body.internUniversity;
    const internInternship = req.body.internInternship;
    console.log(req.body);
    const sqlInsert = "INSERT INTO intern (name,university,internship) VALUES (?,?,?)"
    db.query(sqlInsert, [internName, internUniversity, internInternship], (err, result) => {
        console.log(err)
    })
})

app.delete('/api/deleteIntern/:id', (req, res) => {
    console.log(req);
    const id = req.params.id;
    const sqlSelect = "Delete from intern where id =?";
    db.query(sqlSelect, [id], (err, result) => {
        if (err) console.log(err);
    })
})

app.post("/api/updateIntern", (req, res) => {
    const internName = req.body.internName;
    const id = req.body.id;

    console.log(req.body);
    const sqlInsert = "update intern set name =? where id =?"
    db.query(sqlInsert, [internName, id], (err, result) => {
        console.log(err)
    })
})



app.listen(3001, () => {
    console.log("running on port 3001")
});