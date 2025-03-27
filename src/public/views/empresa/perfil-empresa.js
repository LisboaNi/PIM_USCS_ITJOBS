// const userNomeEmpresa = document.getElementById("userNomeEmpresa");
const userNomeEmpresa = document.querySelectorAll("#userNomeEmpresa");
const userEmailEmpresa = document.getElementById("userEmailEmpresa");
const userResumoEmpresa = document.getElementById("userResumoEmpresa");
const userLocalizacaoEmpresa = document.getElementById(
  "userLocalizacaoEmpresa",
);
const userContatoEmpresa = document.getElementById("userContatoEmpresa");
//const userRedesSociaisEmpresa = document.getElementById('userRedesSociaisEmpresa');
// const userAvatarEmpresa = document.getElementById("userAvatarEmpresa");
const logoutButton = document.getElementById("logoutButton");
const messageDiv = document.getElementById("message");

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../login/login.html"; // Redireciona para login se não houver token
}

async function loadProfile() {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // Exibir informações específicas da empresa
      // userNomeEmpresa.textContent = data.user.name || "Não disponível";
      userNomeEmpresa.forEach((element) => {
        element.textContent = data.user.name || "Não disponível";
      });
      userEmailEmpresa.textContent = data.user.email;
      userResumoEmpresa.textContent =
        data.user.profile.resumo || "Não disponível";
      userLocalizacaoEmpresa.textContent =
        data.user.profile.localizacao || "Não disponível";
      userContatoEmpresa.textContent =
        data.user.profile.contato || "Não disponível";
      //   userRedesSociaisEmpresa.textContent = JSON.stringify(data.user.profile.redes_sociais || 'Não disponível');
      // if (data.user.profile.avatar) {
      //     userAvatarEmpresa.src = data.user.profile.avatar;
      // }

      showMessage("Perfil carregado com sucesso!", "success");
    } else {
      showMessage("Erro ao carregar o perfil!", "error");
      window.location.href = "../login/login.html";
    }
  } catch (error) {
    console.error("Erro ao carregar o perfil:", error);
    showMessage("Erro na comunicação com o servidor", "error");
  }
}

function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.classList.remove("success", "error");
  messageDiv.classList.add(type);
  messageDiv.style.display = "block";
}

function exibirResumo() {
  const inputResumo = document.getElementById("inputResumo").value;
  const resumoElement = document.getElementById("userResumoEmpresa");

  // Substitui quebras de linha por <br> para exibição
  resumoElement.innerHTML = inputResumo.replace(/\n/g, "<br>");
}

loadProfile();

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../login/login.html";
});
