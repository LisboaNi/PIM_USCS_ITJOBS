// Verificação e manipulação do formulário de recuperação de senha
const forgotPasswordForm = document.getElementById('forgot-password-form');
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Link de redefinição de senha enviado para seu e-mail!');
            } else {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.textContent = data.message;
                } else {
                    console.error('Elemento "error-message" não encontrado');
                }
            }
        } catch (error) {
            console.error('Erro ao enviar link de redefinição:', error);
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Erro ao tentar enviar o link de redefinição.';
            } else {
                console.error('Elemento "error-message" não encontrado');
            }
        }
    });
} else {
    console.log('Elemento "forgot-password-form" não encontrado');
}

// Verificação e manipulação do formulário de redefinição de senha
const resetPasswordForm = document.getElementById('reset-password-form');
if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (password !== confirmPassword) {
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.textContent = 'As senhas não coincidem.';
            } else {
                console.error('Elemento "error-message" não encontrado');
            }
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword: password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Senha redefinida com sucesso!');
                window.location.href = 'login.html'; // Redireciona para a página de login
            } else {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.textContent = data.message;
                } else {
                    console.error('Elemento "error-message" não encontrado');
                }
            }
        } catch (error) {
            console.error('Erro ao redefinir a senha:', error);
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Erro ao redefinir a senha.';
            } else {
                console.error('Elemento "error-message" não encontrado');
            }
        }
    });
} else {
    console.log('Elemento "reset-password-form" não encontrado');
}
