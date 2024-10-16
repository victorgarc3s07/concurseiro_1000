//importando dependências
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

//criando rotas

const authMiddelware = require('../middelwares/authMiddelwares');

router.get('/', authMiddelware, controller.LerDisciplinas);

router.post('/', authMiddelware, controller.AdicionarDisciplina);

router.put('/:id', authMiddelware, controller.AtualizarDisciplina);

router.patch('/:id', authMiddelware, controller.AtualizarDisciplinaParcial);

router.delete('/:id', authMiddelware, controller.DeletarDisciplina);

router.get('/usuarios', authMiddelware, controller.LerUsuarios);

//

module.exports = router;

