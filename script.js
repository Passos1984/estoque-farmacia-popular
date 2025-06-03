const listaMedicamentosCorpo = document.getElementById("lista-medicamentos-corpo");
const formMedicamento = document.getElementById("form-medicamento");

let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];

function salvarLocalStorage() {
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
}

function renderizarTabela() {
    listaMedicamentosCorpo.innerHTML = "";
    medicamentos.forEach((medicamento, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${medicamento.nome}</td>
            <td>${medicamento.dataEntrada}</td>
            <td>${medicamento.lote || '-'}</td>
            <td>${medicamento.validade}</td>
            <td>${medicamento.finalidade || '-'}</td>
            <td><button onclick="removerMedicamento(${index})">Remover</button></td>
        `;

        listaMedicamentosCorpo.appendChild(tr);
    });
}

function removerMedicamento(index) {
    medicamentos.splice(index, 1);
    salvarLocalStorage();
    renderizarTabela();
}

function adicionarNovoMedicamento(event) {
    event.preventDefault(); // Evita o envio padrão do formulário (recarregar a página)

    const nome = document.getElementById("nome").value;
    const dataEntrada = document.getElementById("dataEntrada").value;
    const lote = document.getElementById("lote").value;
    const validade = document.getElementById("validade").value;
    const finalidade = document.getElementById("finalidade").value;

    const novoMedicamento = {
        nome: nome,
        dataEntrada: dataEntrada,
        lote: lote,
        validade: validade,
        finalidade: finalidade
    };

    medicamentos.push(novoMedicamento);
    salvarLocalStorage();
    renderizarTabela();

    // Limpa o formulário após adicionar
    formMedicamento.reset();
}

// Adiciona um listener de evento para o envio do formulário
formMedicamento.addEventListener("submit", adicionarNovoMedicamento);

renderizarTabela();