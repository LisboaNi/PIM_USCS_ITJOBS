const express = require('express');
const multer = require('multer');
const cors = require('cors');

const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const vagaRoutes = require('./routes/vagasRoutes');
const inscricaoRoutes = require('./routes/inscricaoRoutes');
const path = require('path');

require('dotenv').config();

const app = express(); // Definir o app antes de usá-lo
//app.use(cors());
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000', // Substitua pelo endereço do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));

const PORT = 3000;

// Limitar o tamanho do corpo da requisição (aqui está definido para 10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limitar o tamanho do arquivo para 10MB
});

// Usar o middleware no endpoint de upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.send('Arquivo enviado com sucesso!');
});

// Middleware para processar rotas de usuários
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src', 'views')));
app.use('/public', express.static('public'));

app.use('/api', vagaRoutes);
app.use('/api', inscricaoRoutes);
app.use('/api', userRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Caminho para o arquivo HTML
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}: http://localhost:${PORT}`);
    sequelize.authenticate()
        .then(() => console.log("Conectado ao banco de dados"))
        .catch((error) => console.log("Erro ao conectar ao banco de dados", error));
});
