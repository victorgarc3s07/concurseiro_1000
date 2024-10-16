const db = require('../config/db');

//-----visualizar todas as disciplinas

const LerDisciplinas = (req, res) => {
    db.query('SELECT* FROM disciplinas', (err, results) => {

        if(err) {
            console.error('ERRO! rota LerDisciplinas', err)
            res.status(500).send('erro');
        return
        }
        res.json(results);
    });
};

// ----- Adicionar Disciplina ------

const AdicionarDisciplina = (req, res) => {
    const {nome_disciplina, area, peso, dificuldade, professor} = req.body;

    db.query(
        'SELECT * FROM disciplinas WHERE nome_disciplina=? AND area=? AND peso=? AND dificuldade=? AND professor=?',
        [nome_disciplina, area, peso, dificuldade, professor],
        (err, results) => {
            if(err) {
                console.error('ERRO. Não foi possível adicionar a disciplina', err);
                res.status(500).send('Erro!');
                return
            }

            if(results.length > 0) {
                res.status(400).send('DISCIPLINA JÁ EXISTENTE');
            }

            db.query(
                'INSERT INTO disciplinas(nome_disciplina, area, peso, dificuldade, professor) VALUES(?,?,?,?,?)',
                [nome_disciplina, area, peso, dificuldade, professor],
                (err, results) => {
                    if(err) {
                        console.error('NÃO FOI POSSÍVEL ADICIONAR DISCIPLINA', err);
                        res.status(500).send('ERROOO');
                    return;
                    }
                    res.status(200).send('Disciplina adicionada');
                }
            )
        }
    )
};

// Atualizar Disciplina 


const AtualizarDisciplina = (req, res) => {
    const { id } = req.params;
    const { nome_disciplina, area, peso, dificuldade, professor } = req.body;

    db.query(
        'UPDATE disciplinas SET nome_disciplina = ?, area = ?, peso = ?, dificuldade = ?, professor = ? WHERE id = ?',
        [nome_disciplina, area, peso, dificuldade, professor, id],
        (err,results) => {
            if(err) {
                console.error('CRASH. Não foi possível atualizar', err);
                res.status(500).send('ERRO!');
            return
            }

            if(results.affectedRows === 0) {
                res.status(400).send('Disciplina não encontrada');
                return
            }
            res.send('Atualização completa');
        }
    );
};

//atualizar parcialmente

const AtualizarDisciplinaParcial = (req, res) => {
    
    const { id } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }

    values.push(id);

    db.query(
        `UPDATE disciplinas SET ${query.join(',')} WHERE id=?`, values,
        (err,results) => {
            if(err) {
                console.error('ERRO!Atualização parcial falhou', err)
                res.status(400).send('ERROOO')
                return
            }
            
            if(results.affectedRows === 0) {
                res.status(404).send('Disciplina não encontrada')
                return;
            }
            res.status(200).send("Atualização bem-sucedida")
        }
    );
};

// deletar as disciplinas

const DeletarDisciplina = (req, res) => {
    const {id} = req.params;
    
    db.query(
        'DELETE FROM disciplinas WHERE id=?',
        [id], 
        (err, results) => {
            if(err) {
                console.error('ERRO. Não foi possível deletar a disciplina', err);
                res.status(500).send('ERRO')
                return
            }
            res.send('DISCIPLINA DELETADA');
        }
    );
};

// -------- visualizar usuários cadastrados -------------

const LerUsuarios = (req, res) => {
    db.query(
        'SELECT* FROM usuarios',
        (err, results) => {
            if(err) {
                console.error('ERRO! Não foi ppssível visualizar os usuários', err);
                res.status(500).send('ERRO');
            return
            }
            res.json(results);
        }
    );
}

//-----------Realizar busca-----------

const BuscaDisciplina = async (req, res) => {

    const { busca } = req.body;
    db.query(
        'Select* from disciplinas where like '
    )


}

















module.exports = {
    LerDisciplinas,
    AdicionarDisciplina,
    AtualizarDisciplina,
    AtualizarDisciplinaParcial,
    DeletarDisciplina,
    LerUsuarios
}
