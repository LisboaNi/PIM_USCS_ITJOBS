DELIMITER $$

CREATE TRIGGER create_user_professional_profile
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_profissional_profile (
        user_id,
        nome_completo,
        data_nascimento,
        nacionalidade,
        contato,
        endereco_rua,
        endereco_cep,
        endereco_cidade,
        endereco_bairro,
        descricao,
        estado_civil,
        identidade_genero,
        orientacao_sexual,
        raca_etnia,
        deficiencia,
        avatar,
        github,
        website,
        portfolio,
        link_curriculo
    ) VALUES (
        NEW.id,  -- user_id será o id do novo usuário
        '',      -- nome_completo (deixe em branco ou coloque um valor padrão)
        NULL,    -- data_nascimento (deixe como NULL ou coloque um valor padrão)
        '',      -- nacionalidade (deixe em branco ou coloque um valor padrão)
        '',      -- contato
        '',      -- endereco_rua (deixe em branco ou coloque um valor padrão)
        '',      -- endereco_cep (deixe em branco ou coloque um valor padrão)
        '',      -- endereco_cidade (deixe em branco ou coloque um valor padrão)
        '',      -- endereco_bairro (deixe em branco ou coloque um valor padrão)
        '',      -- descricao (deixe em branco ou coloque um valor padrão)
        NULL,    -- estado_civil (deixe como NULL ou coloque um valor padrão)
        NULL,    -- identidade_genero (deixe como NULL ou coloque um valor padrão)
        NULL,    -- orientacao_sexual (deixe como NULL ou coloque um valor padrão)
        NULL,    -- raca_etnia (deixe como NULL ou coloque um valor padrão)
        FALSE,   -- deficiencia (deixe como FALSE ou coloque um valor padrão)
        NULL,    -- avatar (deixe como NULL ou coloque um valor padrão)
        '',      -- github (deixe em branco ou coloque um valor padrão)
        '',      -- website (deixe em branco ou coloque um valor padrão)
        '',      -- portfolio (deixe em branco ou coloque um valor padrão)
        ''       -- link_curriculo (deixe em branco ou coloque um valor padrão)
    );
END$$

DELIMITER ;
