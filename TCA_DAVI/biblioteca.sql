CREATE DATABASE biblioteca_jogos;

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE generos (
    id_genero INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE plataformas (
    id_plataforma INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE jogos (
    id_jogo INT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    ano_lancamento INT,
    id_genero INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES generos(id_genero)
);

CREATE TABLE jogos_plataformas (
    id_jogo INT,
    id_plataforma INT,

    PRIMARY KEY (id_jogo, id_plataforma),

    FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo),

    FOREIGN KEY (id_plataforma) REFERENCES plataformas(id_plataforma)
);

CREATE TABLE biblioteca (
    id_biblioteca INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_jogo INT NOT NULL,
    status VARCHAR(30) NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo),

    UNIQUE (id_usuario, id_jogo),

    CHECK (status IN (
        'Concluído',
        'Jogando',
        'Quero Jogar'
        
        )
    )
);