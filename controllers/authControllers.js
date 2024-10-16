//-------------------------------

const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função de registrar o usuário

const RegistrarUsuario = async (req, res) => {
    const { nome_usuario, email, senha, preferencias} = req.body;
    //
    try {
        const [existingUser] = await db.promise().query(
            'SELECT * FROM usuarios WHERE email=?', [email]);

            if(existingUser.length > 0) {
                return res.status(400).send('USUÁRIO JÁ CADASTRADO');
            };

            //
            const hashedSenha = await bcrypt.hash(senha, 10);

            await db.promise().query(
                'INSERT INTO usuarios(nome_usuario, email, senha, preferencias) VALUES ( ?, ?, ?, ?)',
                [nome_usuario, email, hashedSenha, preferencias]
                );
                res.status(201).send('USUÁRIO REGISTRADO');
    }
    catch (err) {
        console.error('ERRO. Não foi possível registrar o usuário', err);
        res.status(500).send('Erro ao registrar usuário');
    }
};

// função para autenticar usuário

const LogarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [user] = await db.promise().query(
            'SELECT * FROM usuarios WHERE email=?', [email]);

        if(user.length === 0) {
            res.status(400).send('CREDENCIAIS INVÁLIDAS. Email e senha incorretos');
        return
        }

        const isMatch = await bcrypt.compare(senha, user[0].senha);
        if(!isMatch) {
            res.status(400).send('ERRO. Senha incorreta');
        return
        }

        const token = jwt.sign({userId: user[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token});
    } catch(err) {
        console.error('ERRO AO AUTENTICAR USUÁRIO USUÁRIO', err);
        res.status(500).send('ERRO! Não possível logar o usuário');
    }
};




// exportando módulos

module.exports = {
    RegistrarUsuario,
    LogarUsuario
}



