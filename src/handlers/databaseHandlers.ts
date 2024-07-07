import mysql from "mysql";
import * as dotenv from 'dotenv';

dotenv.config();

const connectDatabase = () => {
    const conn = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    conn.connect(err => {
        if (err) {
            console.error("Erreur de connexion : " + err.stack);
            return;
        }
        console.log('Connecté en tant que id ' + conn.threadId);
    });

    return conn;
};

export default connectDatabase;