const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userResumo = document.getElementById('userResumo');
const userLocalizacao = document.getElementById('userLocalizacao');
const userContato = document.getElementById('userContato');
const userEspecializacao = document.getElementById('userEspecializacao');
const userLinkCurriculo = document.getElementById('userLinkCurriculo');
//const userRedesSociais = document.getElementById('userRedesSociais');
const userAvatar = document.getElementById('userAvatar');
const fileInput = document.getElementById('fileInput');
const saveButton = document.getElementById('saveButton');
const logoutButton = document.getElementById('logoutButton');
const messageDiv = document.getElementById('message');
const userDataNascimento = document.getElementById('userDataNascimento');

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
            userName.value = data.user.profile.nome_completo;
            userEmail.value = data.user.email;
            userResumo.value = data.user.profile.resumo;
            userLocalizacao.value = data.user.profile.localizacao;
            userContato.value = data.user.profile.contato;
            userEspecializacao.value = data.user.profile.especializacao || 'Não disponível';
            userLinkCurriculo.value = data.user.profile.link_curriculo || 'Não disponível';
        //    userRedesSociais.value = JSON.stringify(data.user.profile.redes_sociais || 'Não disponível');
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
