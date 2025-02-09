async function carregarVagaParaEdicao() {
    const urlParams = new URLSearchParams(window.location.search);
    const vagaId = urlParams.get('id');

    if (!vagaId) {
        alert('Vaga não encontrada.');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/vagas/${vagaId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar vaga');
        }

        const vaga = await response.json();
        
        document.getElementById('vaga-id').value = vaga.vaga_id;
        document.getElementById('titulo').value = vaga.titulo;
        document.getElementById('descricao').value = vaga.descricao;
        document.getElementById('localizacao').value = vaga.localizacao || '';
        document.getElementById('salario').value = vaga.salario || '';
        document.getElementById('tipo_contrato').value = vaga.tipo_contrato;
        document.getElementById('nivel_experiencia').value = vaga.nivel_experiencia;
        document.getElementById('status').value = vaga.status;
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar dados da vaga.');
    }
}

// Função para salvar alterações na vaga
async function salvarAlteracoes(event) {
    event.preventDefault();  // Previne o comportamento padrão do formulário

    const vagaId = document.getElementById('vaga-id').value;
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const localizacao = document.getElementById('localizacao').value;
    const salario = document.getElementById('salario').value;
    const tipoContrato = document.getElementById('tipo_contrato').value;
    const nivelExperiencia = document.getElementById('nivel_experiencia').value;
    const status = document.getElementById('status').value;

    const token = localStorage.getItem('token');

    const dadosVaga = {
        titulo,
        descricao,
        localizacao,
        salario,
        tipo_contrato: tipoContrato,
        nivel_experiencia: nivelExperiencia,
        status
    };

    try {
        const response = await fetch(`/api/vagas/${vagaId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosVaga)
        });

        if (response.ok) {
            alert('Vaga atualizada com sucesso!');
            window.location.href = './lista-vaga-empresa.html';  // Redireciona para a lista de vagas
        } else {
            throw new Error('Erro ao salvar alterações');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao salvar alterações.');
    }
}

// Função para excluir a vaga
async function excluirVaga() {
    const vagaId = document.getElementById('vaga-id').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/vagas/${vagaId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Vaga excluída com sucesso!');
            window.location.href = './lista-vaga-empresa.html';  // Redireciona para a lista de vagas
        } else {
            throw new Error('Erro ao excluir vaga');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir vaga.');
    }
}

// Adiciona os eventos de submissão do formulário e exclusão
document.addEventListener('DOMContentLoaded', function() {
    // Seu código JavaScript aqui
    carregarVagaParaEdicao();
    const form = document.querySelector('.form-editar-vaga');
    form.addEventListener('submit', salvarAlteracoes);

    const btnExcluir = document.getElementById('btn-excluir');
    btnExcluir.addEventListener('click', excluirVaga);
});
