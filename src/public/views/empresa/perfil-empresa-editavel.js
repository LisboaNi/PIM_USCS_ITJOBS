const userNomeEmpresa = document.getElementById('userNomeEmpresa');
const userResumoEmpresa = document.getElementById('userResumoEmpresa');
const userLocalizacaoEmpresa = document.getElementById('userLocalizacaoEmpresa');
const userContatoEmpresa = document.getElementById('userContatoEmpresa');
//const userRedesSociaisEmpresa = document.getElementById('userRedesSociaisEmpresa');
const userAvatarEmpresa = document.getElementById('userAvatarEmpresa');
const fileInput = document.getElementById('fileInput');
const saveButton = document.getElementById('saveButton');
const logoutButton = document.getElementById('logoutButton');
const messageDiv = document.getElementById('message');

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
            // Preencher campos editáveis com dados existentes
            userNomeEmpresa.value = data.user.profile.nome_completo || '';
            userResumoEmpresa.value = data.user.profile.resumo || '';
            userLocalizacaoEmpresa.value = data.user.profile.localizacao || '';
            userContatoEmpresa.value = data.user.profile.contato || '';
           // userRedesSociaisEmpresa.value = JSON.stringify(data.user.profile.redes_sociais || '');
            if (data.user.profile.avatar) {
                userAvatarEmpresa.src = data.user.profile.avatar;
            }

            showMessage('Perfil carregado com sucesso!', 'success');
            console.log('Perfil carregado com sucesso!');
        } else {
            showMessage('Erro ao carregar o perfil!', 'error');
            console.error('Erro ao carregar o perfil!');
            window.location.href = '../login/login.html';
        }
    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
        showMessage('Erro na comunicação com o servidor', 'error');
        console.error('Erro na comunicação com o servidor');
    }
}

// Função para pré-visualizar a imagem antes de enviar
fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userAvatarEmpresa.src = e.target.result; // Exibe a imagem no campo de avatar
        };
        reader.readAsDataURL(file);
    }
});

async function saveProfile() {
    const updatedProfile = {
        nome_completo: userNomeEmpresa.value,
        resumo: userResumoEmpresa.value,
        localizacao: userLocalizacaoEmpresa.value,
        contato: userContatoEmpresa.value,
    //    redes_sociais: JSON.parse(userRedesSociaisEmpresa.value), // Assume-se que as redes sociais sejam passadas como JSON
        avatar: userAvatarEmpresa.src // A URL da imagem
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
                window.location.href = 'perfil-empresa.html';
            }, 100); // Aguarda 2 segundos para o redirecionamento
        } else {
            showMessage('Erro ao atualizar o perfil!', 'error');
            console.error('Erro ao atualizar o perfil:', data);
        }
    } catch (error) {
        console.error('Erro ao salvar o perfil:', error);
        showMessage('Erro ao salvar as alterações', 'error');
        console.error('Erro ao salvar as alterações');
    }
}

function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';
}

// Carregar perfil ao abrir a página
loadProfile();

// Salvar alterações ao clicar no botão "Salvar"
saveButton.addEventListener('click', saveProfile);

// Logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
});