const form = document.getElementById('form-medicamento');
const corpoTabela = document.getElementById('lista-medicamentos-corpo');

let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
// Função para validar medicamento
function validarMedicamento(medicamento) {
  if (!medicamento.nome || !medicamento.validade || medicamento.quantidade < 0) {
    return false;
  }
  return true;
}


function salvarNoLocalStorage() {
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
}

function criarLinha(medicamento, index) {
  const tr = document.createElement('tr');
  tr.classList.add('medicamento-adicionado');

  const hoje = new Date();
  const validade = new Date(medicamento.validade);
  const diffTempo = validade - hoje;
  const diasRestantes = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
  let classeValidade = '';

  if (diasRestantes < 0) {
    classeValidade = 'validade-vencida'; //vermelho
  } else if (diasRestantes <= 7) {
    classeValidade = 'validade-critica'; //vermelho escuro
  } else if (diasRestantes <= 30) {
    classeValidade = 'validade-proxima'; //vermelho claro
  } else {
    classeValidade = 'validade-longa'; //verde
  }
  tr.innerHTML = `
    <td data-label="Nome">${medicamento.nome}</td>
    <td data-label="Data de Entrada">${medicamento.dataEntrada}</td>
    <td data-label="Lote">${medicamento.lote}</td>
    <td data-label="Validade" class="${classeValidade}">${medicamento.validade}</td>
    <td data-label="Finalidade">${medicamento.finalidade}</td>
    <td data-label="Quantidade" style="text-align: right;">${medicamento.quantidade}</td>
    <td data-label="Ações" style="text-align: center;">
      <button type="button" onclick="removerMedicamento(${index})">Remover</button>
    </td>
  `;

  corpoTabela.appendChild(tr);
}

function renderizarTabela() {
  corpoTabela.innerHTML = '';

  if (medicamentos.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="7" style="text-align:center; font-weight:bold;">Nenhum medicamento cadastrado</td></tr>';
    return;
  }

  medicamentos.forEach((medicamento, index) => criarLinha(medicamento, index));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const novoMedicamento = {
    nome: form.nome.value.trim(),
    dataEntrada: form.dataEntrada.value,
    lote: form.lote.value.trim(),
    validade: form.validade.value,
    finalidade: form.finalidade.value.trim(),
    quantidade: parseInt(form.quantidade.value) || 0
  };

  if (!novoMedicamento.nome || !novoMedicamento.validade) {
    alert('Por favor, preencha os campos obrigatórios: Nome e Validade.');
    return;
  }

  medicamentos.push(novoMedicamento);
  salvarNoLocalStorage();
  renderizarTabela();
  form.reset();
});

function removerMedicamento(index) {
  const linha = corpoTabela.children[index];
  if (!linha) return;

  linha.classList.add('medicamento-removido');

  setTimeout(() => {
    medicamentos.splice(index, 1);
    salvarNoLocalStorage();
    renderizarTabela();
  }, 400);
}

// **Inicializa medicamentos padrão, se necessário**
if (medicamentos.length === 0) {
  medicamentos = [
    { nome: "ATENOLOL 25MG", dataEntrada: "2024-06-01", lote: "L001", validade: "2025-09-30", finalidade: "HIPERTENSÃO", quantidade: 150 },
    { nome: "BESILATO DE ANLODIPINO 5 MG", dataEntrada: "2024-05-20", lote: "L002", validade: "2026-03-15", finalidade: "HIPERTENSÃO", quantidade: 200 },
    { nome: "CAPTOPRIL 25MG", dataEntrada: "2024-04-10", lote: "L003", validade: "2025-06-15", finalidade: "HIPERTENSÃO", quantidade: 180 },
    { nome: "CLORIDRATO DE PROPRANOLOL 40MG", dataEntrada: "2024-06-10", lote: "L004", validade: "2025-05-01", finalidade: "HIPERTENSÃO", quantidade: 120 },
    { nome: "ESPIRONOLACTONA 25 MG", dataEntrada: "2024-03-25", lote: "L005", validade: "2025-12-31", finalidade: "HIPERTENSÃO", quantidade: 90 },
    { nome: "FUROSEMIDA 40 MG", dataEntrada: "2024-05-05", lote: "L006", validade: "2025-07-01", finalidade: "HIPERTENSÃO", quantidade: 220 },
    { nome: "HIDROCLOROTIAZIDA 25MG", dataEntrada: "2024-01-15", lote: "L007", validade: "2025-06-05", finalidade: "HIPERTENSÃO", quantidade: 160 },
    { nome: "LOSARTANA POTÁSSICA 50MG", dataEntrada: "2024-02-10", lote: "L008", validade: "2026-01-20", finalidade: "HIPERTENSÃO", quantidade: 250 },
    { nome: "MALEATO DE ENALAPRIL 10MG", dataEntrada: "2024-04-22", lote: "L009", validade: "2025-07-10", finalidade: "HIPERTENSÃO", quantidade: 190 },
    { nome: "SUCCINATO DE METOPROLOL 25 MG", dataEntrada: "2024-03-18", lote: "L010", validade: "2025-06-20", finalidade: "HIPERTENSÃO", quantidade: 110 },
    { nome: "ALENDRONATO DE SÓDIO 70MG", dataEntrada: "2024-06-01", lote: "L011", validade: "2027-01-10", finalidade: "OSTEOPOROSE", quantidade: 75 }
  ];
  salvarNoLocalStorage();
  console.log("Dados iniciais definidos:", medicamentos);
}

// **Renderiza a tabela ao carregar a página**
renderizarTabela();
