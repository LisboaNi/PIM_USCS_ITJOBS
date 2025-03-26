-- TABELAS PRINCIPAIS DO BANCO --
-- -- Rodar depois de criar as tabelas auxiliares
-- -- Rodar os triggers depois de criar as tabelas principais

-- Tabela: perfil do profissional
CREATE TABLE user_profissional_profile (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    contato VARCHAR(255),
    nacionalidade VARCHAR(255),  
    endereco_rua VARCHAR(255),  
    endereco_cep VARCHAR(20),  
    endereco_cidade VARCHAR(255),  
    endereco_bairro VARCHAR(255),  
    resumo VARCHAR(255),
    descricao VARCHAR(30),
    estado_civil INT,  
    identidade_genero INT,  
    orientacao_sexual INT,  
    raca_etnia INT,  
    deficiencia BOOLEAN,  
    avatar LONGTEXT,
    github VARCHAR(255), 
    website VARCHAR(255),  
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

-- Tabela: perfil da empresa
CREATE TABLE user_empresa_profile (
    id INT AUTO_INCREMENT PRIMARY KEY,      
    user_id INT NOT NULL,                   
    setor_id INT NOT NULL,  
    nome_completo VARCHAR(255) NOT NULL,    
    endereco_rua VARCHAR(255),  
    endereco_cep VARCHAR(20),  
    endereco_cidade VARCHAR(255),  
    endereco_bairro VARCHAR(255),   
    data_fundacao DATE, 
    n_funcionarios INT,         
    contato VARCHAR(255),                   
    resumo TEXT,                            
    avatar LONGTEXT,                        
    website VARCHAR(255),                     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
    deleted_at TIMESTAMP NULL,              
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE SET NULL 
);

