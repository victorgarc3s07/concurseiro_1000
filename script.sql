-- criando database
create database concurseiro_1000;
use concurseiro_1000;

-- criando tabela "usuários"
create table usuarios (
	id int primary key auto_increment not null,
    nome_usuario varchar(100),
    email varchar(50) not null,
    senha varchar(255) not null,
    preferencias varchar(50)
);

-- criando a tabela "disciplinas"
create table disciplinas (
	id int primary key not null auto_increment,
    nome_disciplina varchar(100) not null,
    area varchar(50) not null,
    peso int not null,
    dificuldade varchar(50) not null,
    professor varchar(100) not null
);

<<<<<<< HEAD
select * from usuarios;
select * from disciplinas;
=======
-- inserindo dados na tabela "usuarios"

INSERT INTO usuarios (nome_usuario, email, senha, preferencias) VALUES
    ('Maria Souza', 'maria@email.com', 'senha456', 'policiais'),
    ('Pedro Santos', 'pedro@email.com', 'senha789', 'administrativo');
    
select* from usuarios;
>>>>>>> 2a6f87670e0d2d967c2672de44f2b5de54c8cc7d








    





