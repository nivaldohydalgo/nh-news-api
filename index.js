const express = require('express');
const server = express();

server.get('/', (req,res) => {
    return res.json({mensagem: 'Nossa API está funcionando bem agora...'})
});

server.listen(3000, () => {
    console.log('Servidor em execução...')
});