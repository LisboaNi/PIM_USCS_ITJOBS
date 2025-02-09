const form = document.getElementById('createJobForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const jobData = {
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        localizacao: formData.get('localizacao'),
        salario: formData.get('salario'),
        tipo_contrato: formData.get('tipo_contrato'),
        nivel_experiencia: formData.get('nivel_experiencia'),
    };

    // Verificação de campos obrigatórios
    if (!jobData.titulo || !jobData.descricao || !jobData.tipo_contrato || !jobData.nivel_experiencia) {
        responseMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        responseMessage.style.display = 'block';
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            responseMessage.textContent = 'Você precisa estar logado para criar uma vaga.';
            responseMessage.style.display = 'block';
            return;
        }

        const response = await fetch('/api/vagas', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });

        const result = await response.json();

        if (response.ok) {
            alert ('Vaga criada com sucesso!');
            responseMessage.classList.remove('error');
            responseMessage.classList.add('success');
        } else {
            alert ('Erro ao criar vaga.');
            responseMessage.classList.remove('success');
            responseMessage.classList.add('error');
        }
    } catch (error) {
        responseMessage.textContent = 'Erro na comunicação com o servidor.';
        responseMessage.classList.remove('success');
        responseMessage.classList.add('error');
    } finally {
        responseMessage.style.display = 'block';
    }
});
