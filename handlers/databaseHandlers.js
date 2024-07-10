const asciitable = require('ascii-table')
const mysql = require('mysql')
require('dotenv').config()

function loadDatabase() {
    let db = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    })

    db.connect(function(err) {
        if(err) {
            console.error("Erreur lors de la connexion à la base de données (dataHandler.js): " + err.message);
            printStatus("❌");
            console.log(err)
        } else {
            console.log("Connexion à la base de données établie!");
            printStatus("✅");
        }
    })

    return db;
}

function printStatus(status) {
    const table = new asciitable().setHeading("Autre", "Statut")
    table.addRow("dataHandler", status)
    console.log(table.toString());
}

module.exports = { loadDatabase };