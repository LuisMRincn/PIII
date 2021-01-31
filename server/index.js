const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({

    host: "b0sfslo2fk2n7unict7p-mysql.services.clever-cloud.com",
    port: 3306,
    user: "ueu6tybzavoosuu6",
    password: "mIInHAx0SF37MxAhBXus",
    database: "b0sfslo2fk2n7unict7p",

})

app.get('/Works', (req, res) => {
    db.query("Select * from Works ORDER BY Publish_Date DESC", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/Works/Categorias', (req, res) => {
    db.query("Select * from Works ", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/Works/TipoCategorias', (req, res) => {
    db.query("Select Category_Name from Categories", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})



app.listen('3001', () => {
    console.log("Esta listo, en el puerto 3001")
})