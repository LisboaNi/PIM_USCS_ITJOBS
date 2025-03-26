// Função para exibir as inscrições
async function exibirInscricoes() {
  try {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    if (!token) {
      throw new Error("Usuário não autenticado! Faça login novamente.");
    }

    const response = await fetch("/api/inscricoes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json(); // Acesse os dados

    if (data.message) {
      alert(data.message); // Se a mensagem for de ausência de inscrições
      return;
    }

    if (!response.ok) {
      throw new Error("Erro ao carregar inscrições.");
    }

    const inscricoes = data; // Quando a resposta não contém erro

    const inscricoesList = document.getElementById("inscricoes-list");
    inscricoesList.innerHTML = ""; // Limpa as inscrições existentes

    if (inscricoes.length === 0) {
      inscricoesList.innerHTML =
        '<tr><td colspan="4">Você ainda não se inscreveu em nenhuma vaga ativa.</td></tr>';
      return;
    }

    inscricoes.forEach((inscricao) => {
      const tr = document.createElement("tr");
      const statusInscricao = inscricao.status_inscricao;
      const etapa = inscricao.etapa || "Em análise"; // Exemplo de como exibir a etapa

      tr.innerHTML = `
        <td class="border-2 border-primary text-center text-xl text-primary ">${inscricao.vaga.titulo}</td>
        <td class="border-2 border-primary text-center text-xl text-primary ">${statusInscricao}</td>
        <td class="border-2 border-primary text-center text-xl text-primary ">${etapa}</td>
        <td class="border-2 border-primary text-center text-md text-primary p-5">
        ${
          statusInscricao === "em andamento" ||
          statusInscricao === "processo seletivo"
            ? `<button class="bg w-full px-6 py-2  flex items-center gap-5 justify-center text-text_primary rounded-xl" onclick="cancelarInscricao(${inscricao.inscricao_id})">
                <i class="fas fa-times"></i><span>Cancelar Candidatura</span> 
             </button>`
            : '<button class="bgd w-full px-6 py-2 flex items-center gap-5 justify-center text-text_primary rounded-xl" disabled><i class="fas fa-check"></i><span>Vaga Finalizada</span></button>'
        }
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
  const token = localStorage.getItem("token"); // Obtém o token do localStorage

  if (!token) {
    alert("Usuário não autenticado!");
    return;
  }

  try {
    const response = await fetch(`/api/cancelar-inscricao/${inscricaoId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao cancelar inscrição.");
    }

    alert("Inscrição cancelada com sucesso!");
    exibirInscricoes(); // Recarregar a lista de inscrições para refletir a mudança
  } catch (error) {
    console.error("Erro ao cancelar inscrição:", error.message);
    alert(`Erro ao cancelar inscrição: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", exibirInscricoes);
