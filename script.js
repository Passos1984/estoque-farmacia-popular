document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('estoque-body');
    const adicionarItemBtn = document.getElementById('adicionar-item');
    const modalAdicionar = document.getElementById('modal-adicionar');
    const closeModalBtn = document.querySelector('.close-button');
    const formAdicionar = document.getElementById('form-adicionar');
    const firstInput = document.getElementById('medicacao');
    const selectAllCheckbox = document.getElementById('select-all');
    const excluirSelecionadosBtn = document.getElementById('excluir-selecionados');

    // Lista inicial dos medicamentos (exemplo)
    let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [
        {
            id: '01',
            nome: 'ACETATO DE MEDROXIPROGESTERONA 150MG',
            principio: 'ACETATO DE MEDROXIPROGESTERONA 150MG',
            finalidade: 'ANTICONCEPÇÃO',
            lote: 'L001',
            dataEntrada: '2025-05-24',
            validade: '2027-05-24',
            quantidade: 100,
            fornecedor: 'Fornecedor Padrão',
            ean: '7891268101782'
        },
        // Adicione mais itens conforme necessidade
    ];

    function salvarLocalStorage() {
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    }

    function renderizarTabela() {
        const validade = new Date(med.validade);
if (validade < hoje) {
    newRow.classList.add('vencido');
} else if ((validade - hoje) < 1000 * 60 * 60 * 24 * 30) { // menos de 30 dias
    newRow.classList.add('alerta-validade');
    const diffTime = validade.getTime() - hoje.getTime();
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

if (diffDays < 0) {
    newRow.classList.add('vencido');
} else if (diffDays <= 30) {
    newRow.classList.add('vencimento-proximo');
}

}

        medicamentos.forEach(med => {
            const newRow = tableBody.insertRow();

            newRow.innerHTML = `
                <td><input type="checkbox" class="select-item" data-id="${med.id}"></td>
                <td>${med.id}</td>
                <td>${med.nome}</td>
                <td>${med.finalidade}</td>
                <td>${med.lote}</td>
                <td>${med.dataEntrada}</td>
                <td>${med.validade}</td>
                <td>${med.quantidade}</td>
                <td>${med.fornecedor}</td>
                <td><button class="delete-btn" data-id="${med.id}">Excluir</button></td>
            `;

            const validade = new Date(med.validade);
            if (validade < hoje) {
                newRow.classList.add('vencido');
            } else if ((validade - hoje) < 1000 * 60 * 60 * 24 * 30) { // menos de 30 dias
                newRow.classList.add('alerta-validade');
            }
        });

        // Depois de renderizar, atualiza estado do botão e checkbox “select all”
        atualizarBotaoExcluir();
        atualizarSelectAllCheckbox();
    }

    function abrirModal() {
        modalAdicionar.style.display = 'block';
        firstInput.focus();
    }

    function fecharModal() {
        modalAdicionar.style.display = 'none';
        formAdicionar.reset();
    }

    function idExiste(id) {
        return medicamentos.some(med => med.id === id);
    }

    adicionarItemBtn.addEventListener('click', abrirModal);
    closeModalBtn.addEventListener('click', fecharModal);

    window.addEventListener('click', e => {
        if (e.target === modalAdicionar) fecharModal();
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalAdicionar.style.display === 'block') fecharModal();
    });

    formAdicionar.addEventListener('submit', function (event) {
        event.preventDefault();

        const medicacao = document.getElementById('medicacao').value.trim();
        const principio = document.getElementById('principio') ? document.getElementById('principio').value.trim() : medicacao; // se não existir, usar nome
        const finalidade = document.getElementById('finalidade').value.trim();
        const dataEntrada = document.getElementById('data').value;
        const validade = document.getElementById('validade').value;
        const quantidade = Number(document.getElementById('quantidade').value);
        const id = document.getElementById('id').value.trim();
        const lote = document.getElementById('lote').value.trim();
        const fornecedor = document.getElementById('fornecedor').value.trim();

        if (idExiste(id)) {
            alert('ID já existe! Por favor, insira um ID único.');
            return;
        }
        if (quantidade <= 0) {
            alert('Quantidade deve ser maior que zero.');
            return;
        }
        if (new Date(validade) < new Date(dataEntrada)) {
            alert('Data de validade não pode ser anterior à data de entrada.');
            return;
        }

        medicamentos.push({ id, nome: medicacao, principio, finalidade, lote, dataEntrada, validade, quantidade, fornecedor });
        salvarLocalStorage();
        renderizarTabela();
        fecharModal();
    });

    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.dataset.id;
            if (confirm('Tem certeza que deseja excluir este item?')) {
                medicamentos = medicamentos.filter(med => med.id !== id);
                salvarLocalStorage();
                renderizarTabela();
            }
        }
    });

    function atualizarBotaoExcluir() {
        const anyChecked = tableBody.querySelector('.select-item:checked') !== null;
        excluirSelecionadosBtn.disabled = !anyChecked;
    }

    function atualizarSelectAllCheckbox() {
        const checkboxes = tableBody.querySelectorAll('.select-item');
        const checkedBoxes = tableBody.querySelectorAll('.select-item:checked');
        selectAllCheckbox.checked = checkboxes.length > 0 && checkedBoxes.length === checkboxes.length;
        selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length;
    }

    selectAllCheckbox.addEventListener('change', function () {
        const checkboxes = tableBody.querySelectorAll('.select-item');
        checkboxes.forEach(cb => {
            cb.checked = selectAllCheckbox.checked;
            const row = cb.closest('tr');
            if (cb.checked) row.classList.add('selected');
            else row.classList.remove('selected');
        });
        atualizarBotaoExcluir();
    });

    tableBody.addEventListener('change', function (e) {
        if (e.target.classList.contains('select-item')) {
            const row = e.target.closest('tr');
            if (e.target.checked) {
                row.classList.add('selected');
            } else {
                row.classList.remove('selected');
            }
            atualizarBotaoExcluir();
            atualizarSelectAllCheckbox();
        }
    });

    excluirSelecionadosBtn.addEventListener('click', function () {
        const checkboxes = tableBody.querySelectorAll('.select-item:checked');
        if (checkboxes.length === 0) {
            alert('Nenhum item selecionado para exclusão.');
            return;
        }
        if (confirm(`Tem certeza que deseja excluir ${checkboxes.length} item(ns)?`)) {
            const idsParaExcluir = Array.from(checkboxes).map(cb => cb.dataset.id);
            medicamentos = medicamentos.filter(med => !idsParaExcluir.includes(med.id));
            salvarLocalStorage();
            renderizarTabela();
            selectAllCheckbox.checked = false;
            atualizarBotaoExcluir();
        }
    });

    // Inicializa tudo renderizando a tabela
    renderizarTabela();
});
