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
    logo VARCHAR(255),
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
    localizacao VARCHAR(255),
    contato VARCHAR(255),
    especializacao VARCHAR(255),
    resumo TEXT,
    avatar LONGTEXT,
    redes_sociais JSON,
    link_curriculo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_empresa_profile (
    id INT AUTO_INCREMENT PRIMARY KEY,      
    user_id INT NOT NULL,                   
    nome_completo VARCHAR(255) NOT NULL,    
    localizacao VARCHAR(255),               
    contato VARCHAR(255),                   
    resumo TEXT,                            
    avatar LONGTEXT,                        
    redes_sociais JSON,                     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
    deleted_at TIMESTAMP NULL,              
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);

CREATE TABLE vagas (
    vaga_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    empresa_id INT NOT NULL,
    empresa_nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255), 
    salario DECIMAL(10, 2), 
    tipo_contrato ENUM('CLT', 'PJ', 'Freelancer', 'Estágio') NOT NULL,
    nivel_experiencia ENUM('Júnior', 'Pleno', 'Sênior') NOT NULL,
    status ENUM('Aberta', 'Fechada') DEFAULT 'Aberta',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (empresa_id) REFERENCES user_empresa_profile(id) ON DELETE CASCADE
);

CREATE TABLE inscricoes (
    inscricao_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vaga_id INT NOT NULL,
    status_inscricao ENUM('em andamento', 'processo seletivo', 'encerrado', 'aprovado') DEFAULT 'em andamento',
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vaga_id) REFERENCES vagas(vaga_id) ON DELETE CASCADE,
    UNIQUE (user_id, vaga_id)
);

------------- Trigger auxilia para criar um perfil automatico

DELIMITER $$

CREATE TRIGGER trg_fill_professional_profile
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.type_user_id = 3 THEN
        INSERT INTO user_profissional_profile (
            user_id, 
            nome_completo, 
            data_nascimento, 
            localizacao, 
            contato, 
            especializacao, 
            resumo, 
            avatar, 
            redes_sociais, 
            link_curriculo,
            created_at, 
            updated_at
        ) VALUES (
            NEW.id, 
            NEW.name, 
            NULL, 
            NULL, 
            NULL, 
            NULL, 
            NULL, 
            NULL, 
            JSON_OBJECT(), 
            NULL,
            NOW(), 
            NOW()
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_fill_company_profile
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.type_user_id = 2 THEN
        INSERT INTO user_empresa_profile (
            user_id, 
            nome_completo, 
            localizacao, 
            contato, 
            resumo, 
            avatar, 
            redes_sociais, 
            created_at, 
            updated_at
        ) VALUES (
            NEW.id, 
            NEW.name, 
            NULL, 
            NULL, 
            NULL, 
            NULL, 
            JSON_OBJECT(), 
            NOW(), 
            NOW()
        );
    END IF;
END$$

DELIMITER;
