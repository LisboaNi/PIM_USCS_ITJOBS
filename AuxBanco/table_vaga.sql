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