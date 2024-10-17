//--------------------------------------

const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/authControllers');

// Rotas de login e registro

router.post('/registro', AuthControllers.RegistrarUsuario);

router.post('/login', AuthControllers.LogarUsuario);



// exportando módulos 

module.exports = router;


