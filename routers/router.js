//importando dependências
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

//criando rotas

const authMiddelware = require('../middelwares/authMiddelwares');

router.get('/', authMiddelware, controller.LerDisciplinas);

router.post('/', authMiddelware, controller.AdicionarDisciplina);

<<<<<<< HEAD
router.put('/:id', authMiddelware, controller.AtualizarDisciplina);

router.patch('/:id', authMiddelware, controller.AtualizarDisciplinaParcial);

router.delete('/:id', authMiddelware, controller.DeletarDisciplina);

router.get('/usuarios', authMiddelware, controller.LerUsuarios);
=======
router.put('/:id', controller.AtualizarDisciplina);

router.patch('/:id', controller.AtualizarDisciplinaParcial);

router.delete('/:id', controller.DeletarDisciplina);

router.get('/usuarios',controller.LerUsuarios);
>>>>>>> 2a6f87670e0d2d967c2672de44f2b5de54c8cc7d

//

module.exports = router;

