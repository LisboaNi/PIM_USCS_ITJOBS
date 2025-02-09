// Função para exibir as inscrições
async function exibirInscricoes() {
  try {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage

    if (!token) {
      throw new Error('Usuário não autenticado! Faça login novamente.');
    }

    const response = await fetch('/api/inscricoes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();  // Acesse os dados

    if (data.message) {
      alert(data.message); // Se a mensagem for de ausência de inscrições
      return;
    }

    if (!response.ok) {
      throw new Error('Erro ao carregar inscrições.');
    }

    const inscricoes = data;  // Quando a resposta não contém erro
    
    const inscricoesList = document.getElementById('inscricoes-list');
    inscricoesList.innerHTML = ''; // Limpa as inscrições existentes

    if (inscricoes.length === 0) {
      inscricoesList.innerHTML = '<tr><td colspan="4">Você ainda não se inscreveu em nenhuma vaga ativa.</td></tr>';
      return;
    }

    inscricoes.forEach(inscricao => {
      const tr = document.createElement('tr');
      const statusInscricao = inscricao.status_inscricao;
      const etapa = inscricao.etapa || 'Em análise'; // Exemplo de como exibir a etapa

      tr.innerHTML = `
        <td>${inscricao.vaga.titulo}</td>
        <td>${statusInscricao}</td>
        <td>${etapa}</td>
        <td>
        ${statusInscricao === 'em andamento' || statusInscricao === 'processo seletivo' 
          ? `<button class="btn-cancelar" onclick="cancelarInscricao(${inscricao.inscricao_id})">
                <i class="fas fa-times"></i> Cancelar Candidatura
             </button>` 
          : '<button class="btn-disabled" disabled><i class="fas fa-check"></i> Vaga Finalizada</button>'}
         </td>
      `;
      
      inscricoesList.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro na requisição:", error.message);
    alert(`Erro ao exibir inscrições: ${error.message}`);
  }
}

// Função para cancelar a inscrição
async function cancelarInscricao(inscricaoId) {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage

    if (!token) {
        alert('Usuário não autenticado!');
        return;
    }

    try {
        const response = await fetch(`/api/cancelar-inscricao/${inscricaoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao cancelar inscrição.');
        }

        alert('Inscrição cancelada com sucesso!');
        exibirInscricoes();  // Recarregar a lista de inscrições para refletir a mudança
    } catch (error) {
        console.error("Erro ao cancelar inscrição:", error.message);
        alert(`Erro ao cancelar inscrição: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', exibirInscricoes);