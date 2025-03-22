// Função para buscar vagas abertas
async function buscarVagas() {
  const titulo = document.getElementById('search-input').value;
  try {
    // Cria a URL base da API de vagas
    const url = new URL('/api/vagas', window.location.origin);
    
    // Adiciona o parâmetro de busca por título à URL, se o título não estiver vazio
    if (titulo) {
      url.searchParams.append('titulo', titulo);
    }

    const response = await fetch(url);

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao buscar vagas');
    }

    // Converte a resposta para JSON
    const vagas = await response.json();
    exibirVagas(vagas); // Exibe as vagas na tela
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar vagas. Por favor, tente novamente.');
  }
}

// Função para exibir as vagas na tabela
function exibirVagas(vagas) {
  const vagaList = document.getElementById('vaga-list');
  vagaList.innerHTML = ''; // Limpa a tabela antes de adicionar as novas vagas

  // Se não houver vagas, exibe uma mensagem indicando que não foram encontradas
  if (vagas.length === 0) {
    vagaList.innerHTML = '<tr><td colspan="8">Nenhuma vaga aberta encontrada.</td></tr>';
  }

  // Adiciona as vagas à tabela
  vagas.forEach(vaga => {
    const vagaRow = document.createElement('tr');

    vagaRow.innerHTML = `
      <td>${vaga.titulo}</td>
      <td>${vaga.localizacao || 'N/A'}</td>
      <td>${vaga.tipo_contrato}</td>
      <td>
        <!-- Botões com ícones -->
        <button class="btn-candidatar" onclick="candidatarVaga(${vaga.vaga_id})">
            <i class="fas fa-paper-plane"></i> Candidatar-se
        </button>
        <button class="btn-detalhes" onclick="detalhesVaga(${vaga.vaga_id})">
            <i class="fas fa-info-circle"></i> Detalhes
        </button>
    </td>
    `;

    vagaList.appendChild(vagaRow);
  });
}

// Função para redirecionar para a página de detalhes da vaga
function detalhesVaga(vagaId) {
  // Redireciona para a página de detalhes passando o ID da vaga como parâmetro na URL
  window.location.href = `./previa-detalhe-vaga.html?id=${vagaId}`;
}

// Função para o candidato se candidatar a uma vaga
const candidatarVaga = async (vagaId) => {
  try {
    // Verifica se o usuário está autenticado (presença de um token no localStorage, por exemplo)
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não houver token, redireciona para a página de cadastro
      window.location.href = '/views/cadastro/cadastro.html';
      return;
    }

    // Caso o usuário esteja autenticado, prossegue com o processo de candidatura
    const response = await fetch(`/api/vagas/${vagaId}/candidatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
      },
      body: JSON.stringify({
        vagaId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao se candidatar à vaga');
    }

    // Se a candidatura for bem-sucedida
    alert('Candidatura enviada com sucesso!');
  } catch (error) {
    console.error(error);
    alert('Erro ao se candidatar à vaga. Por favor, tente novamente.');
  }
};

// Inicializa a busca ao carregar a página
document.addEventListener('DOMContentLoaded', buscarVagas);
