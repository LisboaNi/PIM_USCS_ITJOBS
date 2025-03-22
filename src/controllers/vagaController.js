const jwt = require('jsonwebtoken');
const  Vaga = require('../models/vagas');
const { UserEmpresaProfile, UserProfissionalProfile } = require('../models/user');
const { Op } = require('sequelize');

// Criação de uma nova vaga
const criarVaga = async (req, res) => {
    const { 
        titulo, descricao, localizacao, salario, tipo_contrato, nivel_experiencia, 
        requisitos, diferenciais, beneficios, data_validade 
    } = req.body;

    try {
        console.log('Iniciando processo de criação de vaga...');
        
        // Verificação do token JWT
        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) {
            console.log('Token não fornecido.');
            return res.status(401).json({ message: 'Token não fornecido.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        console.log('Token decodificado:', decoded);

        // Busca o perfil da empresa do usuário
        const empresaProfile = await UserEmpresaProfile.findOne({ where: { user_id: userId } });
        
        if (!empresaProfile) {
            console.log('Perfil de empresa não encontrado para o usuário:', userId);
            return res.status(404).json({ message: 'Perfil de empresa não encontrado.' });
        }

        console.log('Perfil de empresa encontrado:', empresaProfile.nome_completo);

        // Criação da nova vaga com dados do perfil da empresa
        const novaVaga = await Vaga.create({
            titulo,
            descricao,
            localizacao,
            salario,
            tipo_contrato,
            nivel_experiencia,
            empresa_id: empresaProfile.id,
            empresa_nome: empresaProfile.nome_completo  // Nome da empresa
        });

        console.log('Vaga criada com sucesso:', novaVaga);
        res.status(201).json(novaVaga);
    } catch (error) {
        console.error('Erro ao criar vaga:', error);
        res.status(500).json({ message: 'Erro ao criar vaga.' });
    }
};

// Listar vagas com filtro opcional por título
const listarVagas = async (req, res) => {
    try {
        const { titulo } = req.query;
        
        const where = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : {};
        
        const vagas = await Vaga.findAll({ where });
        res.status(200).json(vagas);
    } catch (error) {
        console.error("Erro ao listar vagas:", error);
        res.status(500).json({ message: "Erro ao listar vagas." });
    }
};

// Atualizar dados de uma vaga existente
const atualizarVaga = async (req, res) => {
    try {
        const vagaId = req.params.id;
        
        const [affectedRows] = await Vaga.update(req.body, { where: { vaga_id: vagaId } });
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Vaga não encontrada." });
        }

        res.status(200).json({ message: "Vaga atualizada com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
        res.status(500).json({ message: "Erro ao atualizar vaga." });
    }
};

// Excluir uma vaga
const excluirVaga = async (req, res) => {
    try {
        const vagaId = req.params.id;
        
        const affectedRows = await Vaga.destroy({ where: { vaga_id: vagaId } });
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Vaga não encontrada." });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao excluir vaga:", error);
        res.status(500).json({ message: "Erro ao excluir vaga." });
    }
};

// Restaurar uma vaga excluída
const restaurarVaga = async (req, res) => {
    try {
        const vagaId = req.params.id;
        
        const affectedRows = await Vaga.restore({ where: { vaga_id: vagaId } });
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Vaga não encontrada ou não foi excluída anteriormente." });
        }

        res.status(200).json({ message: "Vaga restaurada com sucesso." });
    } catch (error) {
        console.error("Erro ao restaurar vaga:", error);
        res.status(500).json({ message: "Erro ao restaurar vaga." });
    }
};

// Buscar uma vaga específica pelo ID
const buscarVagaPorId = async (req, res) => {
    try {
        const vagaId = req.params.id;
        
        const vaga = await Vaga.findOne({ where: { vaga_id: vagaId } });
        if (!vaga) {
            return res.status(404).json({ message: "Vaga não encontrada." });
        }

        res.status(200).json(vaga);
    } catch (error) {
        console.error("Erro ao buscar vaga:", error);
        res.status(500).json({ message: "Erro ao buscar vaga." });
    }
};

// Análise de perfis compatíveis para uma vaga específica
const getVagaAnalise = async (req, res) => {
    const vagaId = req.params.vagaId;
    
    try {
        const vaga = await Vaga.findByPk(vagaId);
        if (!vaga) {
            return res.status(404).json({ message: "Vaga não encontrada." });
        }

        const perfisCompatíveis = await UserProfissionalProfile.findAll({
            where: {
                // Especifique a lógica para encontrar perfis compatíveis com a vaga
                // Exemplo: 'nivel_experiencia': vaga.nivel_experiencia, etc.
            }
        });

        res.status(200).json({ vaga, perfisCompatíveis });
    } catch (error) {
        console.error("Erro ao buscar análise da vaga:", error);
        res.status(500).json({ message: "Erro ao buscar análise da vaga." });
    }
};

const listarVagasAbertas = async (req, res) => {
    const { titulo } = req.query; // Parâmetro de busca por título (opcional)
  
    try {
      // Filtrando as vagas abertas
      const where = { status: 'aberta' }; // Filtrando apenas as vagas abertas
  
      if (titulo) {
        where.titulo = { [Op.like]: `%${titulo}%` }; // Pesquisa por título
      }
  
      const vagas = await Vaga.findAll({
        where,
      });
  
      res.status(200).json(vagas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar vagas.' });
    }
  };

// Exportação das funções para uso em outros módulos
module.exports = {
    criarVaga,
    listarVagas,
    atualizarVaga,
    excluirVaga,
    restaurarVaga,
    buscarVagaPorId,
    getVagaAnalise,
    listarVagasAbertas,
};
