//iniciando .....

const dotenv = require('dotenv');
dotenv.config();

//importando pacotes

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./config/db');

//importando rotas
const ControllersRouter = require('./routers/router');
const authRouters = require('./routers/auth')

// configurando dependências
const app = express();

app.use(cors());
app.use(bodyParser.json());

//
app.use('/api/router', ControllersRouter);

app.use('/api/auth', authRouters);

//integração com front-end

app.use(express.static('public'));

//iniciando servidor

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log('SERVIDOR ONLINE: ' + process.env.DB_HOST + PORT);
})

//rota iniciais

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})












