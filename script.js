document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('estoque-body');
    const adicionarItemBtn = document.getElementById('adicionar-item');
    const modalAdicionar = document.getElementById('modal-adicionar');
    const closeModalBtn = document.querySelector('.close-button');
    const formAdicionar = document.getElementById('form-adicionar');
    const firstInput = document.getElementById('medicacao');
    const selectAllCheckbox = document.getElementById('select-all');
    const excluirSelecionadosBtn = document.getElementById('excluir-selecionados');

    // Lista inicial dos medicamentos corrigida e padronizada
    let medicamentos = [
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
        {
            id: '02',
            nome: 'SULFATO DE SALBUTAMOL 100MCG',
            principio: 'ASMA',
            finalidade: 'Asma',
            lote: 'L002',
            dataEntrada: '2025-05-24',
            validade: '2026-06-12',
            quantidade: 50,
            fornecedor: 'Fornecedor Padrão',
            ean: ''
        },
        {
            id: '03',
            nome: 'CLORIDRATO DE METFORMINA 850MG',
            principio: 'DIABETES',
            finalidade: 'Diabetes Tipo 2',
            lote: 'L003',
            dataEntrada: '2025-05-24',
            validade: '2027-01-15',
            quantidade: 200,
            fornecedor: 'Fornecedor Padrão',
            ean: ''
        },
        {
            id: '04',
            nome: 'IBUPROFENO 600MG',
            principio: 'ANALGÉSICO/ANTI-INFLAMATÓRIO',
            finalidade: 'Alívio da dor e inflamação',
            lote: 'L004',
            dataEntrada: '2025-05-24',
            validade: '2026-12-30',
            quantidade: 150,
            fornecedor: 'Fornecedor Padrão',
            ean: ''
        }
    ];

    // Carrega dados do localStorage, se existirem
    const dadosSalvos = localStorage.getItem('medicamentos');
    if (dadosSalvos) {
        medicamentos = JSON.parse(dadosSalvos);
    }

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
                <td>${med.finalidade}</td>
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

    selectAllCheckbox.addEventListener('change', function () {
        const checkboxes = tableBody.querySelectorAll('.select-item');
        checkboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        checkboxes.forEach(cb => {
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

    // Inicializa o botão "Excluir Selecionados" desabilitado
    excluirSelecionadosBtn.disabled = true;
});
