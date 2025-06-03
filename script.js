const listaMedicamentosCorpo = document.getElementById("lista-medicamentos-corpo");
const formMedicamento = document.getElementById("form-medicamento");

let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
console.log("Medicamentos após carregamento inicial:", medicamentos); // Adicionei para debug

function salvarLocalStorage() {
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
}

function renderizarTabela() {
    listaMedicamentosCorpo.innerHTML = "";
    const hoje = new Date(); // Obtém a data atual

    medicamentos.forEach((medicamento, index) => {
        const tr = document.createElement("tr");
        const dataValidade = new Date(medicamento.validade);
        const diffEmDias = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));

        // Adiciona classes de alerta com base na diferença de dias
        if (diffEmDias > 90) { // Mais de 90 dias (aproximadamente 3 meses)
            tr.classList.add("validade-longa");
        } else if (diffEmDias <= 90 && diffEmDias > 30) { // Entre 31 e 90 dias (1 a 3 meses)
            tr.classList.add("validade-proxima");
        } else if (diffEmDias <= 30 && diffEmDias >= 0) { // Até 30 dias e não vencido
            tr.classList.add("validade-critica");
        } else { // Data de validade já passou
            tr.classList.add("validade-vencida");
        }

        tr.innerHTML = `
            <td>${medicamento.nome}</td>
            <td>${medicamento.dataEntrada}</td>
            <td>${medicamento.lote || '-'}</td>
            <td>${medicamento.validade}</td>
            <td>${medicamento.finalidade || '-'}</td>
            <td>${medicamento.quantidade !== undefined ? medicamento.quantidade : '-'}</td>
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
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataEntrada = document.getElementById("dataEntrada").value;
    const lote = document.getElementById("lote").value;
    const validade = document.getElementById("validade").value;
    const finalidade = document.getElementById("finalidade").value;
    const quantidade = document.getElementById("quantidade").valueAsNumber;

    const novoMedicamento = {
        nome: nome,
        dataEntrada: dataEntrada,
        lote: lote,
        validade: validade,
        finalidade: finalidade,
        quantidade: quantidade
    };

    medicamentos.push(novoMedicamento);
    salvarLocalStorage();
    renderizarTabela();

    formMedicamento.reset();
}

formMedicamento.addEventListener("submit", adicionarNovoMedicamento);

renderizarTabela();

if (!medicamentos || medicamentos.length === 0) {
    medicamentos = [
        { nome: "ATENOLOL 25MG", dataEntrada: "2024-06-01", lote: "L001", validade: "2025-09-30", finalidade: "HIPERTENSÃO", quantidade: 150 }, // Próximo
        { nome: "BESILATO DE ANLODIPINO 5 MG", dataEntrada: "2024-05-20", lote: "L002", validade: "2026-03-15", finalidade: "HIPERTENSÃO", quantidade: 200 }, // Longo
        { nome: "CAPTOPRIL 25MG", dataEntrada: "2024-04-10", lote: "L003", validade: "2025-06-15", finalidade: "HIPERTENSÃO", quantidade: 180 },  // Crítico
        { nome: "CLORIDRATO DE PROPRANOLOL 40MG", dataEntrada: "2024-06-10", lote: "L004", validade: "2025-05-01", finalidade: "HIPERTENSÃO", quantidade: 120 }, // Vencido (já passou)
        { nome: "ESPIRONOLACTONA 25 MG", dataEntrada: "2024-03-25", lote: "L005", validade: "2025-12-31", finalidade: "HIPERTENSÃO", quantidade: 90 }, // Longo
        { nome: "FUROSEMIDA 40 MG", dataEntrada: "2024-05-05", lote: "L006", validade: "2025-07-01", finalidade: "HIPERTENSÃO", quantidade: 220 },  // Próximo
        { nome: "HIDROCLOROTIAZIDA 25MG", dataEntrada: "2024-01-15", lote: "L007", validade: "2025-06-05", finalidade: "HIPERTENSÃO", quantidade: 160 },  // Crítico
        { nome: "LOSARTANA POTÁSSICA 50MG", dataEntrada: "2024-02-10", lote: "L008", validade: "2026-01-20", finalidade: "HIPERTENSÃO", quantidade: 250 }, // Longo
        { nome: "MALEATO DE ENALAPRIL 10MG", dataEntrada: "2024-04-22", lote: "L009", validade: "2025-07-10", finalidade: "HIPERTENSÃO", quantidade: 190 },  // Próximo
        { nome: "SUCCINATO DE METOPROLOL 25 MG", dataEntrada: "2024-03-18", lote: "L010", validade: "2025-06-20", finalidade: "HIPERTENSÃO", quantidade: 110 },  // Crítico
        { nome: "ALENDRONATO DE SÓDIO 70MG", dataEntrada: "2024-06-01", lote: "L011", validade: "2027-01-10", finalidade: "OSTEOPOROSE", quantidade: 75 }  // Longo
    ];
    salvarLocalStorage();
    console.log("Dados iniciais definidos:", medicamentos); // Adicionei para debug
    renderizarTabela();
}