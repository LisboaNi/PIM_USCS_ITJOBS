async function carregarVagas() {
    try {
        const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage
        const response = await fetch('/api/vagas', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar vagas');
        }

        const vagas = await response.json();
        const vagaList = document.getElementById('vaga-list');
        vagaList.innerHTML = '';

        vagas.forEach(vaga => {
            const vagaRow = document.createElement('tr');

            vagaRow.innerHTML = `
                <td>${vaga.titulo}</td>
                <td>${vaga.localizacao || 'N/A'}</td>
                <td>${vaga.salario ? `R$ ${vaga.salario}` : 'N/A'}</td>
                <td>${vaga.tipo_contrato}</td>
                <td>${vaga.nivel_experiencia}</td>
                <td class="status ${vaga.status === 'Fechada' ? 'fechada' : ''}">
                    ${vaga.status}
                </td>
                <td>
                    <button class="btn-candidatar" onclick="verCandidatos(${vaga.vaga_id})"><i class="fas fa-info-circle"></i>Candidatos</button>
                    <button class="btn-detalhes" onclick="editarVaga(${vaga.vaga_id})"><i class="fas fa-pencil"></i>Editar</button>
                </td>
            `;

            vagaList.appendChild(vagaRow);
        });
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar vagas. Por favor, tente novamente.');
    }
}

// Função para redirecionar para a página de edição de vaga
function editarVaga(vagaId) {
    window.location.href = `./editar-vaga.html?id=${vagaId}`;
}

// Função para redirecionar para a página de visualização de candidatos
function verCandidatos(vagaId) {
    window.location.href = `./candidatos-vaga.html?id=${vagaId}`;
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarVagas);
