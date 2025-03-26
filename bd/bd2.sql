create database pim character set utf8mb4 collate utf8mb4_unicode_ci;

-------- Tabelas básicas do banco

CREATE TABLE TypeUsers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO TypeUsers (id, type_name) VALUES
(1, 'adm'),
(2, 'empresa'),
(3, 'profissional');


CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) NOT NULL UNIQUE,
    type_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (type_user_id) REFERENCES TypeUsers(id) ON DELETE CASCADE
);

CREATE TABLE user_profissional_profile (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    contato VARCHAR(255),
    nacionalidade VARCHAR(255),  -- Alterado de 'localizacao' para 'nacionalidade'
    endereco_rua VARCHAR(255),  -- Novo campo para rua
    endereco_cep VARCHAR(20),  -- Novo campo para CEP
    endereco_cidade VARCHAR(255),  -- Novo campo para cidade
    endereco_bairro VARCHAR(255),  -- Novo campo para bairro
    descricao VARCHAR(30),
    estado_civil INT,  -- Novo campo para estado civil
    identidade_genero INT,  -- Novo campo para identidade de gênero
    orientacao_sexual INT,  -- Novo campo para orientação sexual
    raca_etnia INT,  -- Novo campo para raça/etnia
    deficiencia BOOLEAN,  -- Alterado para BOOLEAN
    avatar LONGTEXT,
    github VARCHAR(255),  -- Novo campo para GitHub
    website VARCHAR(255),  -- Novo campo para Website
    portfolio VARCHAR(255),
    link_curriculo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (estado_civil) REFERENCES estado_civil(id),
    FOREIGN KEY (identidade_genero) REFERENCES identidade_genero(id),
    FOREIGN KEY (orientacao_sexual) REFERENCES orientacao_sexual(id),
    FOREIGN KEY (raca_etnia) REFERENCES raca_etnia(id)
);

CREATE TABLE formacao_academica (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    instituicao VARCHAR(255) NOT NULL,  
    data_inicio DATE,  
    data_conclusao DATE,  
    FOREIGN KEY (user_id) REFERENCES user_profissional_profile(id) ON DELETE CASCADE
);

CREATE TABLE estado_civil (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

INSERT INTO estado_civil (descricao) VALUES
('Solteiro(a)'),
('Casado(a)'),
('Divorciado(a)'),
('Viúvo(a)'),
('Separado(a) Judicialmente');

CREATE TABLE identidade_genero (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

INSERT INTO identidade_genero (descricao) VALUES
('Homem Cis'),
('Mulher Cis'),
('Homem Trans'),
('Mulher Trans'),
('Intersexo'),
('Agênero'),
('Não Binário'),
('Outro'),
('Prefiro Não Responder');

CREATE TABLE orientacao_sexual (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

INSERT INTO orientacao_sexual (descricao) VALUES
('Assexual'),
('Bissexual'),
('Heterossexual'),
('Homossexual'),
('Pansexual'),
('Outro'),
('Prefiro Não Responder');

CREATE TABLE raca_etnia (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

INSERT INTO raca_etnia (descricao) VALUES
('Asiática'),
('Branca'),
('Indígena'),
('Mestiço'),
('Negra'),
('Parda');


