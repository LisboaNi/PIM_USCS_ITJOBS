-- TABELAS AUXILIARES --
-- -- Rodar antes de ciar as tabelas que dependem delas (principais)

-- Auxiliar da tabela User
CREATE TABLE TypeUsers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL UNIQUE
);

-- Auxiliar da Tabela Perfil do Profissional
CREATE TABLE estado_civil (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE identidade_genero (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE orientacao_sexual (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE raca_etnia (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

-- Auxiliar da Tabela do Perfil da Empresa
CREATE TABLE setores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- INSERT PADRAO DAS TABELAS AUXILIARES --

INSERT INTO TypeUsers (id, type_name) VALUES
(1, 'adm'),
(2, 'empresa'),
(3, 'profissional');

INSERT INTO estado_civil (descricao) VALUES
('Solteiro(a)'),
('Casado(a)'),
('Divorciado(a)'),
('Viúvo(a)'),
('Separado(a) Judicialmente');

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

INSERT INTO orientacao_sexual (descricao) VALUES
('Assexual'),
('Bissexual'),
('Heterossexual'),
('Homossexual'),
('Pansexual'),
('Outro'),
('Prefiro Não Responder');

INSERT INTO raca_etnia (descricao) VALUES
('Asiática'),
('Branca'),
('Indígena'),
('Mestiço'),
('Negra'),
('Parda');

INSERT INTO setores (nome) VALUES 
('Tecnologia da Informação'),
('Recursos Humanos'),
('Marketing'),
('Financeiro'),
('Vendas'),
('Atendimento ao Cliente'),
('Comércio'),
('Educação'),
('Saúde'),
('Construção Civil'),
('Indústria'),
('Logística e Transporte'),
('Agronegócio'),
('Energia e Meio Ambiente'),
('Turismo e Hotelaria'),
('Serviços Jurídicos'),
('Design e Arquitetura'),
('Mídia e Entretenimento');
