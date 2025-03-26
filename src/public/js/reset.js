document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
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
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro ao enviar link de redefinição:', error);
        document.getElementById('error-message').textContent = 'Erro ao tentar enviar o link de redefinição.';
    }
});

document.getElementById('reset-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (password !== confirmPassword) {
        document.getElementById('error-message').textContent = 'As senhas não coincidem.';
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
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        document.getElementById('error-message').textContent = 'Erro ao redefinir a senha.';
    }
});
