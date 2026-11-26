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
('Playstation'),
('Nintendo');

INSERT INTO jogos (nome, descricao, desenvolvedora, ano_lancamento, id_genero) VALUES
(
    'Red Dead Redemption 2',
    'A história se passa em 1899 em uma recriação fictícia do Velho Oeste americano, Red Dead Redemption 2 e acompanha a vida de Arthur Morgan e sua posição na notória gangue Van der Linde, que precisa lidar com seu declínio da gangue enquanto eles são perseguidos por agentes da lei, gangues rivais e agentes Pinkerton.',
    'Rockstar Games',
    2018,
    2
),

(
    'Cyberpunk 2077',
    'Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais. Você joga como V, um mercenário fora da lei em busca de um implante único que carrega a chave para a imortalidade.',
    'CD Projekt Red',
    2020,
    3
),

(
    'The Legend of Zelda: Ocarina of Time (Remake)',
    'Uma nova versão da clássica aventura de Link pelo reino de Hyrule. O jovem herói precisa impedir os planos de Ganondorf, explorar templos, resolver enigmas e viajar através do tempo com a ajuda da Ocarina do Tempo para salvar o reino e a Princesa Zelda.',
    'Nintendo',
    2026,
    2
),

(
    'Grand Theft Auto VI',
    'Grand Theft Auto VI é um jogo de ação e aventura em mundo aberto ambientado no estado fictício de Leonida, incluindo a cidade de Vice City. A história acompanha Jason e Lucia, um casal de criminosos envolvidos em uma série de acontecimentos perigosos enquanto tentam sobreviver no mundo do crime.',
    'Rockstar Games',
    2026,
    1
),

(
    'Persona 4 Revival',
    'Persona 4 Revival é uma recriação do RPG Persona 4, ambientado na cidade japonesa de Inaba. A história acompanha um estudante que se muda para a região e, junto de seus amigos, investiga uma série de assassinatos misteriosos ligados a um mundo sobrenatural escondido dentro das televisões.',
    'ATLUS',
    2027,
    3
);

INSERT INTO usuarios (nome) VALUES
('Davi'),
('Fabiano');

INSERT INTO biblioteca (id_usuario, id_jogo, status) VALUES
(1, 1, 'Concluído'), (1, 2, 'Concluído'), (1, 3, 'Quero Jogar'), (1, 4, 'Jogando'), (1, 5, 'Quero Jogar'),
(2, 1, 'Concluído'), (2, 2, 'Quero Jogar'), (2, 3, 'Jogando'), (2, 5, 'Quero Jogar');

INSERT INTO jogos_plataformas (id_jogo, id_plataforma) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2), (2, 3),
(3, 4),
(4, 2), (4, 3),
(5, 1), (5, 2), (5, 3);