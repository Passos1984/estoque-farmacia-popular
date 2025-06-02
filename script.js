
const listaMedicamentosCorpo = document.getElementById("lista-medicamentos-corpo");

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
      <td>${medicamento.lote}</td>
      <td>${medicamento.validade}</td>
      <td>${medicamento.finalidade}</td>
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

let medicamentos = JSON.parse(localStorage.getItem("medicamentos"));

if (!medicamentos) {
  medicamentos = [
    {
      nome: "ATENOLOL 25MG",
      finalidade: "HIPERTENSÃO",
      lote: "L001",
      validade: "2025-12-31",
      dataEntrada: "2024-06-01"
    },
    {
      nome: "BESILATO DE ANLODIPINO 5 MG",
      finalidade: "HIPERTENSÃO",
      lote: "L002",
      validade: "2026-01-15",
      dataEntrada: "2024-05-20"
    },
    {
      nome: "CAPTOPRIL 25MG",
      finalidade: "HIPERTENSÃO",
      lote: "L003",
      validade: "2025-11-30",
      dataEntrada: "2024-04-10"
    },
    {
      nome: "CLORIDRATO DE PROPRANOLOL 40MG",
      finalidade: "HIPERTENSÃO",
      lote: "L004",
      validade: "2025-09-15",
      dataEntrada: "2024-06-10"
    },
    {
      nome: "ESPIRONOLACTONA 25 MG",
      finalidade: "HIPERTENSÃO",
      lote: "L005",
      validade: "2025-08-31",
      dataEntrada: "2024-03-25"
    },
    {
      nome: "FUROSEMIDA 40 MG",
      finalidade: "HIPERTENSÃO",
      lote: "L006",
      validade: "2026-03-01",
      dataEntrada: "2024-05-05"
    },
    {
      nome: "HIDROCLOROTIAZIDA 25MG",
      finalidade: "HIPERTENSÃO",
      lote: "L007",
      validade: "2026-07-30",
      dataEntrada: "2024-01-15"
    },
    {
      nome: "LOSARTANA POTÁSSICA 50MG",
      finalidade: "HIPERTENSÃO",
      lote: "L008",
      validade: "2025-10-20",
      dataEntrada: "2024-02-10"
    },
    {
      nome: "MALEATO DE ENALAPRIL 10MG",
      finalidade: "HIPERTENSÃO",
      lote: "L009",
      validade: "2026-05-25",
      dataEntrada: "2024-04-22"
    },
    {
      nome: "SUCCINATO DE METOPROLOL 25 MG",
      finalidade: "HIPERTENSÃO",
      lote: "L010",
      validade: "2025-12-12",
      dataEntrada: "2024-03-18"
    },
    {
      nome: "ALENDRONATO DE SÓDIO 70MG",
      finalidade: "OSTEOPOROSE",
      lote: "L011",
      validade: "2027-01-10",
      dataEntrada: "2024-06-01"
    }
  ];
  salvarLocalStorage();
}

renderizarTabela();
