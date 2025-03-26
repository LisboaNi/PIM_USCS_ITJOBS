// Função para buscar vagas abertas
async function buscarVagas() {
  const titulo = document.getElementById("search-input").value;
  try {
    // Cria a URL base da API de vagas
    const url = new URL("/api/vagas", window.location.origin);

    // Adiciona o parâmetro de busca por título à URL, se o título não estiver vazio
    if (titulo) {
      url.searchParams.append("titulo", titulo);
    }

    const response = await fetch(url);

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error("Erro ao buscar vagas");
    }

    // Converte a resposta para JSON
    const vagas = await response.json();
    exibirVagas(vagas); // Exibe as vagas na tela
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar vagas. Por favor, tente novamente.");
  }
}

// Função para exibir as vagas na tabela
function exibirVagas(vagas) {
  const vagaList = document.getElementById("vaga-list");
  vagaList.innerHTML = ""; // Limpa a tabela antes de adicionar as novas vagas

  // Se não houver vagas, exibe uma mensagem indicando que não foram encontradas
  if (vagas.length === 0) {
    vagaList.innerHTML =
      '<tr><td colspan="8">Nenhuma vaga aberta encontrada.</td></tr>';
  }

  // Limitar o número de vagas a 10
  const vagasLimite = vagas.slice(0, 10);

  // Adiciona as vagas à tabela
  vagasLimite.forEach((vaga) => {
    const vagaRow = document.createElement("tr");

    vagaRow.innerHTML = `
      <td class="border-2 border-primary text-center text-xl text-primary ">${vaga.titulo}</td>
      <td class="border-2 border-primary text-center text-xl text-primary ">${vaga.localizacao || "N/A"}</td>
      <td class="border-2 border-primary text-center text-xl text-primary ">${vaga.tipo_contrato}</td>
      <td class="border-2 border-primary  text-center text-sm text-primary p-5">
        <div class="flex gap-5">
        <!-- Botões com ícones -->
          <button class="btn-candidatar" onclick="candidatarVaga(${vaga.vaga_id})">
              <i class="fas fa-paper-plane"></i> Candidatar-se
          </button>
          <button class="btn-detalhes" onclick="detalhesVaga(${vaga.vaga_id})">
              <i class="fas fa-info-circle"></i> Detalhes
          </button>
        </div>
       
    </td>
    `;

    vagaList.appendChild(vagaRow);
  });
}

// Função para redirecionar para a página de detalhes da vaga
function detalhesVaga(vagaId) {
  // Redireciona para a página de detalhes passando o ID da vaga como parâmetro na URL
  window.location.href = `./detalhe-vaga.html?id=${vagaId}`;
}

// Função para o candidato se candidatar a uma vaga
const candidatarVaga = async (vagaId) => {
  try {
    // Faz a requisição para a API de candidatura
    const response = await fetch("/api/candidatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Token JWT para autenticação
      },
      body: JSON.stringify({ vaga_id: vagaId }), // Envia o ID da vaga no corpo da requisição
    });

    // Se a candidatura for bem-sucedida, exibe a mensagem de sucesso
    if (response.ok) {
      const result = await response.json();
      alert(result.message); // Mensagem de sucesso ou erro
    } else {
      throw new Error("Erro ao se candidatar à vaga");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao se candidatar à vaga. Por favor, tente novamente.");
  }
};

// Inicializa a busca ao carregar a página
document.addEventListener("DOMContentLoaded", buscarVagas);
