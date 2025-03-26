const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userResumo = document.getElementById('userResumo');
const userLocalizacao = document.getElementById('userLocalizacao');
const userContato = document.getElementById('userContato');
const userEspecializacao = document.getElementById('userEspecializacao');
const userLinkCurriculo = document.getElementById('userLinkCurriculo');
const userAvatar = document.getElementById('userAvatar');
const userDataNascimento = document.getElementById('userDataNascimento');

// Novos campos adicionados
const userEstadoCivil = document.getElementById('userEstadoCivil');
const userIdentidadeGenero = document.getElementById('userIdentidadeGenero');
const userOrientacaoSexual = document.getElementById('userOrientacaoSexual');
const userRacaEtnia = document.getElementById('userRacaEtnia');
const userDeficiencia = document.getElementById('userDeficiencia');
const userGithub = document.getElementById('userGithub');
const userWebsite = document.getElementById('userWebsite');
const userPortfolio = document.getElementById('userPortfolio');
const userNacionalidade = document.getElementById('userNacionalidade');


const logoutButton = document.getElementById('logoutButton');
const messageDiv = document.getElementById('message');

const token = localStorage.getItem('token');

// Redireciona para login se não houver token
if (!token) {
    window.location.href = '../login/login.html';
}

// Função para carregar o perfil do usuário
async function loadProfile() {
    try {
        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            // Exibir informações do usuário
                userName.textContent = data.user.profile.nome_completo || 'Não disponível';
                userDataNascimento.textContent = data.user.profile.data_nascimento || 'Não disponível';
                userEmail.textContent = data.user.email || 'Não disponível';
                userResumo.textContent = data.user.profile.descricao || 'Não disponível';
                userLocalizacao.textContent = data.user.profile.nacionalidade || 'Não disponível';  // Atualizado para 'nacionalidade'
                userContato.textContent = data.user.profile.contato || 'Não disponível';
                userEspecializacao.textContent = data.user.profile.especializacao || 'Não disponível';  // Se você tem um campo de especialização, ou ajustar conforme o seu banco de dados

                // Exibindo os novos campos
                userEstadoCivil.textContent = data.user.profile.estado_civil || 'Não disponível';
                userIdentidadeGenero.textContent = data.user.profile.identidade_genero || 'Não disponível';
                userOrientacaoSexual.textContent = data.user.profile.orientacao_sexual || 'Não disponível';
                userRacaEtnia.textContent = data.user.profile.raca_etnia || 'Não disponível';
                userDeficiencia.textContent = data.user.profile.deficiencia ? 'Sim' : 'Não';  // Para exibir 'Sim' ou 'Não'
                userGithub.textContent = data.user.profile.github || 'Não disponível';
                userWebsite.textContent = data.user.profile.website || 'Não disponível';
                userPortfolio.textContent = data.user.profile.portfolio || 'Não disponível';
                userLinkCurriculo.textContent = data.user.profile.link_curriculo || 'Não disponível';

            // Exibir o link do currículo (como um link clicável, se houver)
            if (data.user.profile.link_curriculo) {
                userLinkCurriculo.innerHTML = `<a href="${data.user.profile.link_curriculo}" target="_blank">Currículo</a>`;
            } else {
                userLinkCurriculo.textContent = 'Não disponível';
            }

            // Configura avatar ou usa padrão
            userAvatar.src = data.user.profile.avatar || 'avatar.png';

            showMessage('Perfil carregado com sucesso!', 'success');
        } else {
            alert('Erro ao carregar o perfil!', 'error');
            window.location.href = '../login/login.html';
        }
    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
        alert('Erro na comunicação com o servidor', 'error');
    }
}

// Função para exibir mensagens de sucesso ou erro
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';
}

// Carregar o perfil assim que a página for carregada
loadProfile();

// Evento de logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
});
