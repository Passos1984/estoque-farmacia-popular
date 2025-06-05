const form = document.getElementById('form-medicamento');
const corpoTabela = document.getElementById('lista-medicamentos-corpo');
const botaoSubmit = form.querySelector('button');

let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];

function salvarNoLocalStorage() {
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
}

function calcularDiasRestantes(validade) {
  const hoje = new Date();
  const dataValidade = new Date(validade);
  const diffTempo = dataValidade - hoje;
  return Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
}

function definirClasseValidade(diasRestantes) {
  if (diasRestantes < 0) return 'validade-vencida';
  if (diasRestantes <= 7) return 'validade-critica';
  if (diasRestantes <= 30) return 'validade-proxima';
  return 'validade-longa';
}

function criarLinha(medicamento, index) {
  const tr = document.createElement('tr');
  tr.classList.add('medicamento-adicionado');

  const diasRestantes = calcularDiasRestantes(medicamento.validade);
  const classeValidade = definirClasseValidade(diasRestantes);

  tr.innerHTML = `
    <td>${medicamento.nome}</td>
    <td>${medicamento.dataEntrada}</td>
    <td>${medicamento.lote}</td>
    <td class="${classeValidade}">${medicamento.validade}</td>
    <td>${medicamento.finalidade}</td>
    <td style="text-align: right;">${medicamento.quantidade}</td>
    <td style="text-align: center;">
      <button type="button" onclick="removerMedicamento(${index})">Remover</button>
    </td>
  `;
  corpoTabela.appendChild(tr);
}

function renderizarTabela() {
  corpoTabela.innerHTML = medicamentos.length === 0 
    ? '<tr><td colspan="7" style="text-align:center;">Nenhum medicamento cadastrado</td></tr>'
    : medicamentos.forEach((medicamento, index) => criarLinha(medicamento, index));
}

form.addEventListener('input', () => {
  botaoSubmit.disabled = !form.nome.value.trim() || !form.validade.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  medicamentos.push({
    nome: form.nome.value.trim(),
    dataEntrada: form.dataEntrada.value,
    lote: form.lote.value.trim(),
    validade: form.validade.value,
    finalidade: form.finalidade.value.trim(),
    quantidade: parseInt(form.quantidade.value) || 1
  });

  salvarNoLocalStorage();
  renderizarTabela();
  form.reset();
});

function removerMedicamento(index) {
  medicamentos.splice(index, 1);
  salvarNoLocalStorage();
  renderizarTabela();
}

renderizarTabela();
