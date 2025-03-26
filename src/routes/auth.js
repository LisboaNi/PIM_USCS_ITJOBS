const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); // Modelo Sequelize
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const router = express.Router();

require('dotenv').config();
const SECRET_RESET = process.env.JWT_SECRET_RESET; // Chave específica para reset de senha

// Configurar transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 🔹 Endpoint para solicitar redefinição de senha
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Gerar token JWT válido por 15 minutos
        const token = jwt.sign({ id: user.id }, SECRET_RESET, { expiresIn: '15m' });

        const resetLink = `http://localhost:3000/views/reset/reset-password?token=${token}`;

        // Enviar e-mail com o link de redefinição
        await transporter.sendMail({
            from: '"Suporte" <seuemail@gmail.com>',
            to: user.email,
            subject: 'Redefinição de Senha',
            text: `Olá, ${user.name}! Clique no link para redefinir sua senha: ${resetLink}`
        });

        res.json({ message: 'E-mail de redefinição enviado!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar e-mail', error });
    }
});

// 🔹 Endpoint para redefinir a senha
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET_RESET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: 'Token inválido ou expirado' });
    }
});

module.exports = router;
