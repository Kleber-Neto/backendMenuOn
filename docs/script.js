const api = 'https://menuon.onrender.com/api/anotacoes'; // ← Substitua pela URL real   
let indexEditando = null;
let anotacoes = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarAnotacoes();

    document.getElementById('form-anotacao').addEventListener('submit', async e => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const texto = document.getElementById('texto').value;
        const autor = document.getElementById('autor').value;
        const dataCriacao = new Date().toISOString().split('T')[0];

        const novaAnotacao = { titulo, texto, autor, dataCriacao };

        if (indexEditando !== null) {
            anotacoes[indexEditando] = novaAnotacao;
            await fetch(api, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(anotacoes)
            });
            indexEditando = null;
        } else {
            await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaAnotacao)
            });
        }

        e.target.reset();
        carregarAnotacoes();
    });
});

async function carregarAnotacoes() {
    const lista = document.getElementById('lista-anotacoes');
    lista.innerHTML = '';

    const resposta = await fetch(api);
    anotacoes = await resposta.json();

    anotacoes.forEach((a, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span><strong>Título:</strong> ${a.titulo}</span>
            <span><strong>Texto:</strong> ${a.texto}</span>
            <span><strong>Autor:</strong> ${a.autor}</span>
            <span><strong>Data:</strong> ${a.dataCriacao}</span>
            <button onclick="editarAnotacao(${index})">Editar</button>
            <button onclick="removerAnotacao(${index})">Excluir</button>
        `;
        lista.appendChild(item);
    });
}

async function removerAnotacao(index) {
    anotacoes.splice(index, 1);
    await fetch(api, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anotacoes)
    });
    carregarAnotacoes();
}

function editarAnotacao(index) {
    const a = anotacoes[index];
    document.getElementById('titulo').value = a.titulo;
    document.getElementById('texto').value = a.texto;
    document.getElementById('autor').value = a.autor;
    indexEditando = index;
}
