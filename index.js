const express = require('express');
const { ClientRequest } = require('http');

const { Pool, Clident } = require('pg');
const { appendFile } = require('fs');

const server = express();
const cors = require('cors')

/*=============================
       API CONFIGURATION
=============================*/

console.log('NODE_ENV....: ', process.env.NODE_ENV)
let environment = require('./development.env.js'); 
if ( process.env.NODE_ENV == 'production' ) {
    environment = require('./production.env.js'); 
} 

server.use((req, res, next) => {
    console.log('environment.ORIGIN', environment.ORIGIN)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header('Access-Control-Allow-Origin', environment.ORIGIN)
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, PATCH, OPTIONS" )
    res.header( 'Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')
    server.options('*', cors())
    next()
})

/*=============================
           CONNECT DB
=============================*/

const pool = new Pool({
    user: environment.USER,
    host: environment.HOST,
    database: environment.DATABASE,
    password: environment.PASSWORD,
    port: environment.PORT
});

(async () => {
    const client = await pool.connect();
    try {
        const {rows} = await client.query('SELECT current_user');
        const currentUser = rows[0]['current_user']
        console.log('Current User: ', currentUser);
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
    }
})();

/*=============================
           ENDPOINTS
=============================*/

server.get('/', (req,res) => {
    return res.json([{mensagem: 'Servidor está executando...'}])
});

server.get('/categories', (req,res) => {
    (async () => {
        const client = await pool.connect();
        try {
            const {rows} = await client.query('SELECT * FROM category');
            return res.json(rows)
        } catch (err) {
            console.error(err);
        } finally {
            client.release();
        }
    })();
});

server.get('/news', (req,res) => {
        (async () => {
            const client = await pool.connect();
            try {
                const {rows} = await client.query('SELECT * FROM news');
                return res.json(rows)
            } catch (err) {
                console.error(err);
            } finally {
                client.release();
            }
        })();
});
    
/*=============================
        SERVER EXECUTE
=============================*/

server.listen(3000, () => {
    console.log('Servidor em execução na porta 3000...')
});
