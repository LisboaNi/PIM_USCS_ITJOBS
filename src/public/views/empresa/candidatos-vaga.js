const token = localStorage.getItem('token'); // Obtém o token do localStorage

// Verifica se o token está presente
if (!token) {
    alert('Token não encontrado! Faça login novamente.');
    window.location.href = '/login.html'; // Redireciona para a página de login
}

// Obtém o ID da vaga da URL
const vagaId = new URLSearchParams(window.location.search).get('id');
if (!vagaId) {
    alert('ID da vaga não encontrado!');
    window.location.href = '/vagas.html'; // Redireciona para a página de vagas
}

// Função para buscar candidatos de uma vaga
const obterCandidatos = async (vagaId, status = '') => {
    try {
        const response = await axios.get(`/api/vagas/${vagaId}/candidatos`, {
            params: { status }, // Enviar o status, se fornecido
            headers: { Authorization: `Bearer ${token}` }
        });
        mostrarCandidatos(response.data); // Exibe os candidatos na interface
    } catch (error) {
        console.error('Erro ao obter candidatos:', error);
        alert('Erro ao carregar os candidatos. Tente novamente.');
    }
};

// Função para mostrar candidatos na tela
const mostrarCandidatos = (candidatos) => {
    console.log('Candidatos recebidos:', candidatos); // Adicione este log
    const candidatosContainer = document.getElementById('candidatos-list');
    candidatosContainer.innerHTML = ''; // Limpa a lista antes de mostrar

    if (!Array.isArray(candidatos)) {
        candidatosContainer.innerHTML = '<p>Não há candidatos inscritos para esta vaga no momento. Tente novamente mais tarde.</p>';
        return;
    }

    const candidatosHeader = document.createElement('h3');
    candidatosHeader.textContent = `Quantidade de candidatos: ${candidatos.length}`;
    candidatosContainer.appendChild(candidatosHeader);

    if (candidatos.length === 0) {
        const aviso = document.createElement('p');
        aviso.textContent = 'Não há candidatos inscritos para esta vaga no momento.';
        aviso.style.color = 'red';
        candidatosContainer.appendChild(aviso);
        return;
    }

    candidatos.forEach(candidato => {
        const candidatoDiv = document.createElement('div');
        candidatoDiv.classList.add('candidato');
        candidatoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${candidato.user.name} 
            <button class="btn-detalhes" onclick="visualizarPerfil(${candidato.user.id})">Visualizar Perfil</button></p>
            <p><strong>Email:</strong> ${candidato.user.email}</p>
            <p><strong>Status:</strong> ${candidato.status_inscricao}</p>
            <p><strong>Alterar o Status:</strong>
            <button class="btn-detalhes" onclick="alterarStatus(${candidato.inscricao_id}, 'em andamento')">Em andamento</button>
            <button class="btn-detalhes" onclick="alterarStatus(${candidato.inscricao_id}, 'processo seletivo')">Processo Seletivo</button>
            <button class="btn-candidatar" onclick="alterarStatus(${candidato.inscricao_id}, 'aprovado')">Aprovar</button>
            <button class="btn-cancelar" onclick="alterarStatus(${candidato.inscricao_id}, 'encerrado')">Reprovar</button>
            </p>
            <hr>
        `;
        candidatosContainer.appendChild(candidatoDiv);
    });
};


// Função para redirecionar para a página de perfil
const visualizarPerfil = (userId) => {
    window.location.href = `visualizar-perfil.html?id=${userId}`;
};

// Função para alterar o status de uma inscrição
const alterarStatus = async (inscricaoId, novoStatus) => {
    try {
        const response = await axios.put(`/api/inscricoes/${inscricaoId}/status`, { novoStatus }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert(response.data.message); // Exibe mensagem de sucesso
        obterCandidatos(vagaId); // Atualiza a lista de candidatos
    } catch (error) {
        console.error('Erro ao alterar status:', error);
        alert('Erro ao alterar o status. Tente novamente.');
    }
};

// Inicializa a página buscando candidatos da vaga
obterCandidatos(vagaId);
