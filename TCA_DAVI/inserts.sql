INSERT INTO generos (nome) VALUES
('Ação'),
('Aventura'),
('RPG'),
('Esporte'),
('Corrida'),
('Estratégia'),
('Simulação'),
('Terror'),
('Plataforma'),
('Luta');

INSERT INTO plataformas (nome) VALUES
('PC'),
('Xbox'),
('Playstation');

INSERT INTO jogos (nome, descricao, ano_lancamento, id_genero) VALUES
(
    'Red Dead Redemption 2',
    'A história se passa em 1899 em uma recriação fictícia do Velho Oeste americano, Red Dead Redemption 2 e acompanha a vida de Arthur Morgan e sua posição na notória gangue Van der Linde, que precisa lidar com seu declínio da gangue enquanto eles são perseguidos por agentes da lei, gangues rivais e agentes Pinkerton.',
    2018,
    1
);

INSERT INTO jogos_plataformas (id_jogo, id_plataforma) VALUES
(1, 1),
(1, 2),
(1, 3);

INSERT INTO usuarios (nome) VALUES
('Davi');

INSERT INTO biblioteca (id_usuario, id_jogo, status) VALUES
(1, 1, 'Jogando');