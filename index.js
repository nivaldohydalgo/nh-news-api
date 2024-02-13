const express = require('express');
const { ClientRequest } = require('http');
const server = express();

const cors = require('cors')

server.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, PATCH, OPTIONS" );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    // server.use(cors())
    server.options('*', cors())
//    app.options('/*', (_, res) => {
//        res.sendStatus(200);
//    });
    next()
})

const path = require('path');

let env_config = 'development.env' 
if ( process.env.NODE_ENV == 'production' ) {
    env_config = 'production.env' 
} 
console.log('env_config: ', env_config)

require('dotenv').config({
    override: true,
    path: path.join(__dirname, env_config)
})
const { Pool, Clident } = require('pg');
const { appendFile } = require('fs');

console.log('NODE_ENV: ', process.env.NODE_ENV)


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
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

server.get('/', (req,res) => {
    return res.json([{mensagem: 'Servidor está executando...'}])
});

server.get('/categories', (req,res) => {
//  console.log("Iniciando o get!")
    //  let categories = new Array()
    (async () => {
        const client = await pool.connect();
        try {
            const {rows} = await client.query('SELECT * FROM category');
            const category0 = rows[0]['name']
            console.log('Categoria 0: ', category0);
            console.log('Categorias: ', rows);
            console.log("typeof rows: ", typeof rows)
//            categories = rows
            return res.json(rows)
        } catch (err) {
            console.error(err);
        } finally {
            client.release();
        }
    })();
  //  return res.json(categories)
//  console.log("Vai retornar!")

});


server.get('/news', (req,res) => {
        (async () => {
            const client = await pool.connect();
            try {
                const {rows} = await client.query('SELECT * FROM news');
                const category0 = rows[0]['title']
                console.log('Title 0: ', category0);
                console.log('News: ', rows);
                console.log("typeof rows: ", typeof rows)
    //            categories = rows
                return res.json(rows)
            } catch (err) {
                console.error(err);
            } finally {
                client.release();
            }
        })();
      //  return res.json(categories)
    //  console.log("Vai retornar!")
    
});
    
    


server.listen(3000, () => {
    console.log('Servidor em execução na porta 3000...')
});
