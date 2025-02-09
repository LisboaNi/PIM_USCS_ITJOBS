        // Verificar se o token já está salvo e redirecionar o usuário para o perfil
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Token encontrado. Tentando acessar perfil...");
            acessarPerfil();
        }

        // Adicionar o evento de envio de formulário
        document.getElementById('loginForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            console.log("Formulário de login enviado:", { email, password });

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                console.log("Resposta do servidor:", data);

                if (response.ok) {
                    // Salvar o token no LocalStorage
                    localStorage.setItem('token', data.token);
                    console.log("Token armazenado com sucesso.");

                    // Redirecionar com base no tipo de perfil do usuário
                    if (data.user.type_user_id === 3) {
                        console.log("Perfil Profissional encontrado. Redirecionando...");
                        window.location.href = '../profissional/perfil-profissional.html';
                    } else if (data.user.type_user_id === 2) {
                        console.log("Perfil Empresa encontrado. Redirecionando...");
                        window.location.href = '../empresa/perfil-empresa.html';
                    }
                } else {
                    console.error("Erro no login:", data.message);
                    errorMessage.textContent = data.message || 'Erro ao realizar login!';
                }
            } catch (error) {
                console.error("Erro na comunicação com o servidor:", error);
                errorMessage.textContent = 'Erro na comunicação com o servidor!';
            }
        });

        // Função para acessar o perfil com autenticação e redirecionar
        async function acessarPerfil() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token não encontrado.");
                return;
            }

            try {
                console.log("Tentando acessar perfil com token:", token);
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                const data = await response.json();
                console.log("Resposta da requisição do perfil:", data);

                if (response.ok) {
                    // Redirecionar o usuário para o perfil adequado
                    if (data.user.type_user_id === 3) {
                        console.log("Perfil Profissional encontrado. Redirecionando...");
                        window.location.href = '../profissional/perfil-profissional.html';
                    } else if (data.user.type_user_id === 2) {
                        console.log("Perfil Empresa encontrado. Redirecionando...");
                        window.location.href = '../empresa/perfil-empresa.html';
                    }
                } else {
                    console.error("Erro ao acessar o perfil:", data.message);
                    localStorage.removeItem('token'); // Remover token inválido
                }
            } catch (error) {
                console.error("Erro na requisição do perfil:", error);
                localStorage.removeItem('token'); // Remover token se houver erro
            }
        }