// O código JavaScript (script.js) que você forneceu anteriormente está perfeito
// para a lógica de geração e gerenciamento de lista. Não precisa de alterações.
document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do Gerador
    const serviceNameInput = document.getElementById('service-name');
    const lengthInput = document.getElementById('length');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateButton = document.getElementById('generate-button');
    const generatedPasswordInput = document.getElementById('generated-password');
    const addEntryButton = document.getElementById('add-entry-button');

    // Referências aos elementos da Lista
    const entriesContainer = document.getElementById('entries-container');
    const emptyMessage = document.getElementById('empty-message');
    const itemTemplate = document.getElementById('password-item-template');

    // Caracteres para geração de senhas
    const CHARS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    // Array para armazenar as senhas (Salvas Localmente no JS)
    let savedPasswords = [];

    // --- FUNÇÕES DE GERAÇÃO E INTERAÇÃO ---

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        if (isNaN(length) || length < 8) {
            alert('Comprimento de senha inválido (mínimo 8).');
            return '';
        }

        let availableChars = '';
        if (includeUppercase.checked) availableChars += CHARS.uppercase;
        if (includeLowercase.checked) availableChars += CHARS.lowercase;
        if (includeNumbers.checked) availableChars += CHARS.numbers;
        if (includeSymbols.checked) availableChars += CHARS.symbols;

        if (availableChars.length === 0) {
            alert('Selecione pelo menos um tipo de caractere.');
            return '';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }
        return password;
    }

    function checkInputs() {
        // Habilita o botão 'Adicionar' se houver uma senha gerada E um nome de serviço
        const passwordReady = generatedPasswordInput.value !== '';
        const serviceReady = serviceNameInput.value.trim() !== '';

        if (passwordReady && serviceReady) {
            addEntryButton.disabled = false;
        } else {
            addEntryButton.disabled = true;
        }
    }

    // --- FUNÇÕES DE LISTA (ADICIONAR/REMOVER) ---

    function renderPasswords() {
        entriesContainer.innerHTML = '';
        if (savedPasswords.length === 0) {
            emptyMessage.style.display = 'block';
            entriesContainer.appendChild(emptyMessage);
            return;
        }

        emptyMessage.style.display = 'none';

        savedPasswords.forEach(item => {
            const newEntry = itemTemplate.content.cloneNode(true);
            const container = newEntry.querySelector('.password-item');

            container.dataset.id = item.id;
            container.querySelector('.service-name-display').textContent = item.service;
            container.querySelector('.real-password').textContent = item.password;

            // Anexar Listeners para o novo item
            attachItemListeners(container);

            entriesContainer.appendChild(container);
        });
    }

    function attachItemListeners(itemElement) {
        const showButton = itemElement.querySelector('.action-show');
        const copyButton = itemElement.querySelector('.action-copy');
        const removeButton = itemElement.querySelector('.action-remove');
        const passwordMask = itemElement.querySelector('.password-mask');
        const realPasswordSpan = itemElement.querySelector('.real-password');

        // Toggle Mostrar/Ocultar
        showButton.addEventListener('click', () => {
            if (passwordMask.style.display !== 'none') {
                passwordMask.style.display = 'none';
                realPasswordSpan.style.display = 'inline';
                showButton.textContent = 'Ocultar';
                showButton.classList.replace('primary', 'secondary');
            } else {
                passwordMask.style.display = 'inline';
                realPasswordSpan.style.display = 'none';
                showButton.textContent = 'Mostrar';
                showButton.classList.replace('secondary', 'primary');
            }
        });

        // Copiar
        copyButton.addEventListener('click', () => {
            const passwordToCopy = realPasswordSpan.textContent;
            navigator.clipboard.writeText(passwordToCopy)
                .then(() => {
                    copyButton.textContent = 'Copiado!';
                    setTimeout(() => { copyButton.textContent = 'Copiar'; }, 1500);
                });
        });

        // Remover
        removeButton.addEventListener('click', () => {
            const idToRemove = itemElement.dataset.id;
            savedPasswords = savedPasswords.filter(p => p.id !== idToRemove);
            renderPasswords();
        });
    }

    // --- EVENT LISTENERS ---

    generateButton.addEventListener('click', () => {
        const newPassword = generatePassword();
        generatedPasswordInput.value = newPassword;
        checkInputs();
    });

    serviceNameInput.addEventListener('input', checkInputs);
    generatedPasswordInput.addEventListener('input', checkInputs);

    addEntryButton.addEventListener('click', () => {
        const service = serviceNameInput.value.trim();
        const password = generatedPasswordInput.value;

        if (service && password) {
            const newEntry = {
                id: Date.now().toString(),
                service: service,
                password: password
            };

            savedPasswords.push(newEntry);
            renderPasswords();

            // Limpar formulário de geração
            serviceNameInput.value = '';
            generatedPasswordInput.value = '';
            addEntryButton.disabled = true;
        } else {
            alert('Gere uma senha e insira o nome do serviço primeiro!');
        }
    });

    // Inicia a renderização da lista ao carregar
    renderPasswords();
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DA TELA DE CARREGAMENTO (NOVO) ---
    const loadingScreen = document.getElementById('loading-screen');
    
    // Oculta a tela de carregamento após 1500ms (1.5 segundos)
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
        }
    }, 1500);

    // --- RESTANTE DO SEU CÓDIGO ---

    // Referências aos elementos do Gerador
    const serviceNameInput = document.getElementById('service-name');
// ... (o restante do seu código JavaScript permanece o mesmo) ...
});