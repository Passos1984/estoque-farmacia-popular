document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('estoque-body');
    const adicionarItemBtn = document.getElementById('adicionar-item');
    const modalAdicionar = document.getElementById('modal-adicionar');
    const closeModalBtn = document.querySelector('.close-button');
    const formAdicionar = document.getElementById('form-adicionar');
    const firstInput = document.getElementById('medicacao');

    // Lista inicial dos 41 medicamentos (exemplo simplificado)
    const medicamentos = [
        {id: '001', nome: 'Losartana', principio: 'Losartana Potássica', lote: 'L001', dataEntrada: '2025-01-10', validade: '2027-01-10', quantidade: 100, fornecedor: 'FarmaDistribuidora'},
        {id: '002', nome: 'Enalapril', principio: 'Enalapril Maleato', lote: 'L002', dataEntrada: '2025-02-05', validade: '2027-02-05', quantidade: 120, fornecedor: 'FarmaDistribuidora'},
        {id: '003', nome: 'Hidroclorotiazida', principio: 'Hidroclorotiazida', lote: 'L003', dataEntrada: '2025-01-20', validade: '2027-01-20', quantidade: 90, fornecedor: 'MedPharma'},
        {id: '004', nome: 'Metformina', principio: 'Cloridrato de Metformina', lote: 'L004', dataEntrada: '2025-03-15', validade: '2027-03-15', quantidade: 150, fornecedor: 'MedPharma'},
        {id: '005', nome: 'Glibenclamida', principio: 'Glibenclamida', lote: 'L005', dataEntrada: '2025-02-25', validade: '2027-02-25', quantidade: 80, fornecedor: 'FarmaDistribuidora'},
        {id: '006', nome: 'Atenolol', principio: 'Atenolol', lote: 'L006', dataEntrada: '2025-01-12', validade: '2027-01-12', quantidade: 110, fornecedor: 'FarmaDistribuidora'},
        {id: '007', nome: 'Captopril', principio: 'Captopril', lote: 'L007', dataEntrada: '2025-02-10', validade: '2027-02-10', quantidade: 95, fornecedor: 'MedPharma'},
        {id: '008', nome: 'Nifedipino', principio: 'Nifedipino', lote: 'L008', dataEntrada: '2025-03-01', validade: '2027-03-01', quantidade: 130, fornecedor: 'MedPharma'},
        {id: '009', nome: 'Simvastatina', principio: 'Simvastatina', lote: 'L009', dataEntrada: '2025-01-18', validade: '2027-01-18', quantidade: 140, fornecedor: 'FarmaDistribuidora'},
        {id: '010', nome: 'Hidroxicloroquina', principio: 'Hidroxicloroquina', lote: 'L010', dataEntrada: '2025-02-20', validade: '2027-02-20', quantidade: 70, fornecedor: 'FarmaDistribuidora'},
        {id: '011', nome: 'Ácido acetilsalicílico', principio: 'Ácido acetilsalicílico', lote: 'L011', dataEntrada: '2025-01-25', validade: '2027-01-25', quantidade: 200, fornecedor: 'MedPharma'},
        {id: '012', nome: 'Cloridrato de propranolol', principio: 'Cloridrato de propranolol', lote: 'L012', dataEntrada: '2025-03-05', validade: '2027-03-05', quantidade: 85, fornecedor: 'MedPharma'},
        {id: '013', nome: 'Cloridrato de amitriptilina', principio: 'Cloridrato de amitriptilina', lote: 'L013', dataEntrada: '2025-02-15', validade: '2027-02-15', quantidade: 75, fornecedor: 'FarmaDistribuidora'},
        {id: '014', nome: 'Cloridrato de fluoxetina', principio: 'Cloridrato de fluoxetina', lote: 'L014', dataEntrada: '2025-01-30', validade: '2027-01-30', quantidade: 65, fornecedor: 'FarmaDistribuidora'},
        {id: '015', nome: 'Diazepam', principio: 'Diazepam', lote: 'L015', dataEntrada: '2025-02-28', validade: '2027-02-28', quantidade: 90, fornecedor: 'MedPharma'},
        {id: '016', nome: 'Loratadina', principio: 'Loratadina', lote: 'L016', dataEntrada: '2025-03-10', validade: '2027-03-10', quantidade: 150, fornecedor: 'MedPharma'},
        {id: '017', nome: 'Salbutamol', principio: 'Salbutamol', lote: 'L017', dataEntrada: '2025-01-22', validade: '2027-01-22', quantidade: 120, fornecedor: 'FarmaDistribuidora'},
        {id: '018', nome: 'Bromoprida', principio: 'Bromoprida', lote: 'L018', dataEntrada: '2025-02-18', validade: '2027-02-18', quantidade: 80, fornecedor: 'FarmaDistribuidora'},
        {id: '019', nome: 'Clonazepam', principio: 'Clonazepam', lote: 'L019', dataEntrada: '2025-03-12', validade: '2027-03-12', quantidade: 70, fornecedor: 'MedPharma'},
        {id: '020', nome: 'Carbamazepina', principio: 'Carbamazepina', lote: 'L020', dataEntrada: '2025-01-28', validade: '2027-01-28', quantidade: 95, fornecedor: 'MedPharma'},
        {id: '021', nome: 'Fenitoína', principio: 'Fenitoína', lote: 'L021', dataEntrada: '2025-02-22', validade: '2027-02-22', quantidade: 85, fornecedor: 'FarmaDistribuidora'},
        {id: '022', nome: 'Ácido fólico', principio: 'Ácido fólico', lote: 'L022', dataEntrada: '2025-03-08', validade: '2027-03-08', quantidade: 110, fornecedor: 'FarmaDistribuidora'},
        {id: '023', nome: 'Ferro', principio: 'Ferro', lote: 'L023', dataEntrada: '2025-01-15', validade: '2027-01-15', quantidade: 130, fornecedor: 'MedPharma'},
        {id: '024', nome: 'Vitamina B12', principio: 'Vitamina B12', lote: 'L024', dataEntrada: '2025-02-12', validade: '2027-02-12', quantidade: 140, fornecedor: 'MedPharma'},
        {id: '025', nome: 'Vitamina D', principio: 'Vitamina D', lote: 'L025', dataEntrada: '2025-03-03', validade: '2027-03-03', quantidade: 100, fornecedor: 'FarmaDistribuidora'},
        {id: '026', nome: 'Paracetamol', principio: 'Paracetamol', lote: 'L026', dataEntrada: '2025-01-08', validade: '2027-01-08', quantidade: 200, fornecedor: 'FarmaDistribuidora'},
        {id: '027', nome: 'Ibuprofeno', principio: 'Ibuprofeno', lote: 'L027', dataEntrada: '2025-02-09', validade: '2027-02-09', quantidade: 180, fornecedor: 'MedPharma'},
        {id: '028', nome: 'Dipirona', principio: 'Dipirona', lote: 'L028', dataEntrada: '2025-03-06', validade: '2027-03-06', quantidade: 170, fornecedor: 'MedPharma'},
        {id: '029', nome: 'Amoxicilina', principio: 'Amoxicilina', lote: 'L029', dataEntrada: '2025-01-19', validade: '2027-01-19', quantidade: 90, fornecedor: 'FarmaDistribuidora'},
        {id: '030', nome: 'Azitromicina', principio: 'Azitromicina', lote: 'L030', dataEntrada: '2025-02-14', validade: '2027-02-14', quantidade: 80, fornecedor: 'FarmaDistribuidora'},
        {id: '031', nome: 'Cefalexina', principio: 'Cefalexina', lote: 'L031', dataEntrada: '2025-03-11', validade: '2027-03-11', quantidade: 75, fornecedor: 'MedPharma'},
        {id: '032', nome: 'Cloranfenicol', principio: 'Cloranfenicol', lote: 'L032', dataEntrada: '2025-01-21', validade: '2027-01-21', quantidade: 60, fornecedor: 'MedPharma'},
        {id: '033', nome: 'Dexametasona', principio: 'Dexametasona', lote: 'L033', dataEntrada: '2025-02-17', validade: '2027-02-17', quantidade: 55, fornecedor: 'FarmaDistribuidora'},
        {id: '034', nome: 'Prednisona', principio: 'Prednisona', lote: 'L034', dataEntrada: '2025-03-07', validade: '2027-03-07', quantidade: 50, fornecedor: 'FarmaDistribuidora'},
        {id: '035', nome: 'Ranitidina', principio: 'Ranitidina', lote: 'L035', dataEntrada: '2025-01-14', validade: '2027-01-14', quantidade: 100, fornecedor: 'MedPharma'},
        {id: '036', nome: 'Omeprazol', principio: 'Omeprazol', lote: 'L036', dataEntrada: '2025-02-11', validade: '2027-02-11', quantidade: 120, fornecedor: 'MedPharma'},
        {id: '037', nome: 'Budesonida', principio: 'Budesonida', lote: 'L037', dataEntrada: '2025-03-09', validade: '2027-03-09', quantidade: 110, fornecedor: 'FarmaDistribuidora'},
        {id: '038', nome: 'Fluconazol', principio: 'Fluconazol', lote: 'L038', dataEntrada: '2025-01-17', validade: '2027-01-17', quantidade: 95, fornecedor: 'FarmaDistribuidora'},
        {id: '039', nome: 'Metronidazol', principio: 'Metronidazol', lote: 'L039', dataEntrada: '2025-02-13', validade: '2027-02-13', quantidade: 85, fornecedor: 'MedPharma'},
        {id: '040', nome: 'Salbutamol', principio: 'Salbutamol', lote: 'L040', dataEntrada: '2025-03-04', validade: '2027-03-04', quantidade: 130, fornecedor: 'MedPharma'},
        {id: '041', nome: 'Sinvastatina', principio: 'Sinvastatina', lote: 'L041', dataEntrada: '2025-01-16', validade: '2027-01-16', quantidade: 140, fornecedor: 'FarmaDistribuidora'}
    ];

    // Função para inserir uma linha na tabela
    function adicionarLinha(med) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
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
    }

    // Inserir os medicamentos iniciais na tabela
    medicamentos.forEach(adicionarLinha);

    // Abrir modal e focar no primeiro input
    function abrirModal() {
        modalAdicionar.style.display = 'block';
        firstInput.focus();
    }

    // Fechar modal e resetar formulário
    function fecharModal() {
        modalAdicionar.style.display = 'none';
        formAdicionar.reset();
    }

    // Verificar se ID já existe na tabela
    function idExiste(id) {
        return [...tableBody.rows].some(row => row.cells[0].textContent === id);
    }

    // Eventos
    adicionarItemBtn.addEventListener('click', abrirModal);

    closeModalBtn.addEventListener('click', fecharModal);

    window.addEventListener('click', function (event) {
        if (event.target === modalAdicionar) {
            fecharModal();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalAdicionar.style.display === 'block') {
            fecharModal();
        }
    });

    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const rowToDelete = event.target.closest('tr');
            if (confirm('Tem certeza que deseja excluir este item?')) {
                rowToDelete.remove();
            }
        }
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

        const novoMedicamento = {
            id,
            nome: medicacao,
            principio,
            lote,
            dataEntrada,
            validade,
            quantidade,
            fornecedor
        };

        adicionarLinha(novoMedicamento);
        fecharModal();
    });
});
