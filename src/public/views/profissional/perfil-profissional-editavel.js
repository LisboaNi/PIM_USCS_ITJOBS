const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userResumo = document.getElementById('userResumo');
const userLocalizacao = document.getElementById('userLocalizacao');
const userContato = document.getElementById('userContato');
const userEspecializacao = document.getElementById('userEspecializacao');
const userLinkCurriculo = document.getElementById('userLinkCurriculo');
const userAvatar = document.getElementById('userAvatar');
const fileInput = document.getElementById('fileInput');
const saveButton = document.getElementById('saveButton');
const logoutButton = document.getElementById('logoutButton');
const messageDiv = document.getElementById('message');
const userDataNascimento = document.getElementById('userDataNascimento');

// Novos campos adicionados
const userEstadoCivil = document.getElementById('userEstadoCivil');
const userIdentidadeGenero = document.getElementById('userIdentidadeGenero');
const userOrientacaoSexual = document.getElementById('userOrientacaoSexual');
const userRacaEtnia = document.getElementById('userRacaEtnia');
const userDeficiencia = document.getElementById('userDeficiencia');  // Para o checkbox
const userGithub = document.getElementById('userGithub');
const userWebsite = document.getElementById('userWebsite');
const userPortfolio = document.getElementById('userPortfolio');
const userNacionalidade = document.getElementById('userNacionalidade');

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../login/login.html'; // Redireciona para login se não houver token
}

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

            // Preencher os campos de edição com os dados do usuário
                userName.value = data.user.profile.nome_completo || 'Não disponível';
                userEmail.value = data.user.email || 'Não disponível';
                userResumo.value = data.user.profile.descricao || 'Não disponível';  // Ajustado para 'descricao'
                userLocalizacao.value = data.user.profile.nacionalidade || 'Não disponível';  // Ajustado para 'nacionalidade'
                userContato.value = data.user.profile.contato || 'Não disponível';
                userEspecializacao.value = data.user.profile.especializacao || 'Não disponível';  // Se você tem um campo de especialização
                userLinkCurriculo.value = data.user.profile.link_curriculo || 'Não disponível';

                // Preencher os novos campos
                userEstadoCivil.value = data.user.profile.estado_civil || 'Não disponível';
                userIdentidadeGenero.value = data.user.profile.identidade_genero || 'Não disponível';
                userOrientacaoSexual.value = data.user.profile.orientacao_sexual || 'Não disponível';
                userRacaEtnia.value = data.user.profile.raca_etnia || 'Não disponível';
                userDeficiencia.checked = data.user.profile.deficiencia || false;  // Para o campo de checkbox (assumindo que é um campo de checkbox)
                userGithub.value = data.user.profile.github || 'Não disponível';
                userWebsite.value = data.user.profile.website || 'Não disponível';
                userPortfolio.value = data.user.profile.portfolio || 'Não disponível';
                userAvatar.value = data.user.profile.avatar || 'Não disponível';  // Se for um campo de imagem


            if (data.user.profile.avatar) {
                userAvatar.src = data.user.profile.avatar;
            }
            userDataNascimento.value = data.user.profile.data_nascimento || ''; // Preenche a data de nascimento

            showMessage('Perfil carregado com sucesso!', 'success');
        } else {
            showMessage('Erro ao carregar o perfil!', 'error');
            window.location.href = '../login/login.html';
        }
    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
        showMessage('Erro na comunicação com o servidor', 'error');
    }
}

// Função para pré-visualizar a imagem antes de enviar
fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userAvatar.src = e.target.result; // Exibe a imagem no campo de avatar
        };
        reader.readAsDataURL(file);
    }
});

async function saveProfile() {
    // Processa redes sociais (os links podem ser passados como uma string JSON para fácil manipulação)
  //  const redesSociais = JSON.parse(userRedesSociais.value || '{}'); 

    const updatedProfile = {
        nome_completo: userName.value,
        email: userEmail.value,
        resumo: userResumo.value,
        localizacao: userLocalizacao.value,
        contato: userContato.value,
        especializacao: userEspecializacao.value || 'Não disponível',  // Default para 'Não disponível' caso vazio
        link_curriculo: userLinkCurriculo.value,
       // redes_sociais: redesSociais, // Redes sociais como objeto JSON
        avatar: userAvatar.src,  // A URL da imagem
        data_nascimento: userDataNascimento.value,  // Data de nascimento
    };

    const confirmSave = confirm('Você tem certeza que deseja salvar as alterações?');
    if (!confirmSave) {
        return;
    }

    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile),
        });

        const data = await response.json();
        if (response.ok) {
            showMessage('Perfil atualizado com sucesso!', 'success');
            console.log('Perfil atualizado com sucesso!');
            // Redireciona para o perfil após salvar
            setTimeout(() => {
                window.location.href = 'perfil-profissional.html';
            }, 100); // Aguarda 100ms para o redirecionamento
        } else {
            showMessage('Erro ao atualizar o perfil!', 'error');
            console.error('Erro ao atualizar o perfil:', data);
        }
    } catch (error) {
        console.error('Erro ao salvar o perfil:', error);
        showMessage('Erro ao salvar as alterações', 'error');
    }
}

function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';
}

loadProfile();

saveButton.addEventListener('click', saveProfile);
