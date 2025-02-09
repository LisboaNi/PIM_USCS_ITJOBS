const token = localStorage.getItem('token'); // Obtém o token armazenado no localStorage
if (!token) {
    window.location.href = '../login/login.html'; // Redireciona para o login se não houver token
}

// Obtém o userId da URL
const userId = new URLSearchParams(window.location.search).get('id');
if (!userId) {
    showMessage('ID do candidato não fornecido', 'error');
    window.location.href = '/'; // Redireciona para a página inicial ou uma página padrão
}

// Elementos da página
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userResumo = document.getElementById('userResumo');
const userLocalizacao = document.getElementById('userLocalizacao');
const userContato = document.getElementById('userContato');
const userEspecializacao = document.getElementById('userEspecializacao');
const userLinkCurriculo = document.getElementById('userLinkCurriculo');
//const userRedesSociais = document.getElementById('userRedesSociais');
const userAvatar = document.getElementById('userAvatar');
const messageDiv = document.getElementById('message');

// Função para exibir mensagens
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
}

// Função para carregar o perfil do candidato
async function loadProfile() {
    try {
        const response = await axios.get(`/api/perfil/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            const data = response.data;

            // Preenche os dados do perfil
            userName.textContent = data.user.name || 'Não disponível';
            userEmail.textContent = data.user.email || 'Não disponível';
            userResumo.textContent = data.user.profile.resumo || 'Não disponível';
            userLocalizacao.textContent = data.user.profile.localizacao || 'Não disponível';
            userContato.textContent = data.user.profile.contato || 'Não disponível';
            userEspecializacao.textContent = data.user.profile.especializacao || 'Não disponível';

            // Define o link do currículo
            if (data.user.profile.link_curriculo) {
                userLinkCurriculo.href = data.user.profile.link_curriculo;
                userLinkCurriculo.textContent = 'Clique aqui';
            } else {
                userLinkCurriculo.textContent = 'Não disponível';
                userLinkCurriculo.removeAttribute('href');
            }

            // Preenche as redes sociais
          //  userRedesSociais.textContent = JSON.stringify(data.user.profile.redes_sociais || 'Não disponível');

            // Define o avatar
            if (data.user.profile.avatar) {
                userAvatar.src = data.user.profile.avatar;
            } else {
                userAvatar.src = '/images/default-avatar.png'; // Avatar padrão
            }

            showMessage('Perfil carregado com sucesso!', 'success');
        } else {
            showMessage('Erro ao carregar o perfil!', 'error');
        }
    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
        showMessage('Erro na comunicação com o servidor.', 'error');
    }
}

// Chama a função para carregar o perfil
loadProfile();
