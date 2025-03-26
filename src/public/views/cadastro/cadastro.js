// public/register.js

// Função para registrar o usuário
async function registerUser(userData) {
  try {
    console.log("Iniciando requisição para registrar usuário...");

    const response = await fetch("/api/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log("Erro ao registrar usuário, status:", response.status);
      throw new Error("Erro ao registrar usuário");
    }

    const result = await response.json();
    alert("Usuário registrado com sucesso:", result);
    return result;
  } catch (error) {
    console.error("Erro durante o registro do usuário:", error);
  }
}

// Adicionando o listener para o evento de submit do formulário
document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Pegando os valores do formulário
    const form = event.target;
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      cpf_cnpj: form.cpf_cnpj.value,
      type_user_id: parseInt(form.type_user_id.value, 10),
    };

    console.log("Dados do usuário coletados:", userData);

    // Chamando a função de registro
    const result = await registerUser(userData);

    if (result) {
      console.log("Resultado do registro:", result);
      window.location.href = "../login/login.html";
    } else {
      console.log("Falha no registro do usuário");
    }
  });
