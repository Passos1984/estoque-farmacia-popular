document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('estoque-body');
    const adicionarItemBtn = document.getElementById('adicionar-item');
    const modalAdicionar = document.getElementById('modal-adicionar');
    const closeModalBtn = document.querySelector('.close-button');
    const formAdicionar = document.getElementById('form-adicionar');
    const firstInput = document.getElementById('medicacao');
    const selectAllCheckbox = document.getElementById('select-all');
    const excluirSelecionadosBtn = document.getElementById('excluir-selecionados');

    // Lista inicial dos 41 medicamentos (exemplo resumido, complete conforme desejar)
    let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [
        {id: '001', nome: 'Losartana', principio: 'Losartana Potássica', lote: 'L001', dataEntrada: '2025-01-10', validade: '2027-01-10', quantidade: 100, fornecedor: 'FarmaDistribuidora'},
        {id: '002', nome: 'Enalapril', principio: 'Enalapril Maleato', lote: 'L002', dataEntrada: '2025-02-05', validade: '2027-02-05', quantidade: 120, fornecedor: 'FarmaDistribuidora'},
        {id: '003', nome: 'Hidroclorotiazida', principio: 'Hidroclorotiazida', lote: 'L003', dataEntrada: '2025-01-20', validade: '2027-01-20', quantidade: 90, fornecedor: 'MedPharma'},
        // ... complete com os demais medicamentos ...
    ];

    function salvarLocalStorage() {
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    }

    function renderizarTabela() {
        tableBody.innerHTML = '';
        medicamentos.forEach(med => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td><input type="checkbox" class="select-item" data-id="${med.id}"></td>
                <td>${med.id}</td>
                <td>${med.nome}</td>
                <td>${med.principio}</td>
                <td>${med.lote}</td>
                <td>${med.dataEntrada}</td>
                <td>${med.validade}</td>
                <td>${med.quantidade}</td>
                <td>${med.fornecedor}</td>
                <td><button class="delete-btn" data-id="${med.id}">Excluir</button></td>
            `;
        });
    }

    renderizarTabela();

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
        const principio = document.getElementById('principio').value.trim();
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

        medicamentos.push({id, nome: medicacao, principio, lote, dataEntrada, validade, quantidade, fornecedor});
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

    selectAllCheckbox.addEventListener('change', function () {
        const checkboxes = tableBody.querySelectorAll('.select-item');
        checkboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
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
        }
    });
});
