// Função para carregar detalhes da vaga
async function carregarDetalhesVaga() {
    const urlParams = new URLSearchParams(window.location.search);
    const vagaId = urlParams.get('id');

    if (!vagaId) {
        alert('Vaga não encontrada.');
        return;
    }

    try {
        const response = await fetch(`/api/vagas/${vagaId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar detalhes da vaga');
        }

        const vaga = await response.json();

        // Preenche os campos com os dados da vaga
        document.getElementById('titulo').textContent = vaga.titulo;
        document.getElementById('descricao').textContent = vaga.descricao;
        document.getElementById('localizacao').textContent = vaga.localizacao || 'N/A';
        document.getElementById('salario').textContent = vaga.salario ? `R$ ${vaga.salario}` : 'N/A';
        document.getElementById('tipo_contrato').textContent = vaga.tipo_contrato;
        document.getElementById('nivel_experiencia').textContent = vaga.nivel_experiencia;
        document.getElementById('status').textContent = vaga.status;
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar dados da vaga.');
    }
}

// Carrega os detalhes da vaga ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDetalhesVaga);
