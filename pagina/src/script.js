let passwordHistory = [];

// Função para gerar senha
function generatePassword() {
    const length = document.getElementById('length').value;

    // Validação do tamanho da senha
    if (length < 8 || length > 64) {
        showError("O tamanho da senha deve estar entre 8 e 64 caracteres.");
        return;
    }

    let chars = "";
    if (document.getElementById('uppercase').checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('lowercase').checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById('numbers').checked) chars += "0123456789";
    if (document.getElementById('symbols').checked) chars += "!@#$%^&*()_+";

    if (document.getElementById('pronounceable').checked) {
        chars = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZaeiouAEIOU0123456789";
    }

    if (chars === "") {
        showError("Selecione pelo menos uma opção para gerar a senha.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('password').value = password;

    // Atualiza força da senha
    updatePasswordStrength(password);

    // Adiciona ao histórico
    passwordHistory.push(password);
    updatePasswordHistory();

    // Animação do botão
    const button = document.getElementById('generate-btn');
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 500);

    // Limpa mensagem de erro
    clearError();
}

// Atualiza a força da senha
function updatePasswordStrength(password) {
    const strengthIndicator = document.getElementById('strength-indicator');
    let strength = 0;

    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    strengthIndicator.style.width = `${strength * 25}%`;
    strengthIndicator.className = '';
    if (strength <= 1) strengthIndicator.classList.add('weak');
    else if (strength <= 3) strengthIndicator.classList.add('medium');
    else strengthIndicator.classList.add('strong');
}

// Atualiza o histórico de senhas
function updatePasswordHistory() {
    const historyList = document.getElementById('password-history');
    historyList.innerHTML = '';
    passwordHistory.slice(-5).reverse().forEach(pwd => {
        const li = document.createElement('li');
        li.textContent = pwd;
        historyList.appendChild(li);
    });
}

// Copia a senha
function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand("copy");

    const notification = document.getElementById('notification');
    notification.classList.add('visible');
    setTimeout(() => notification.classList.remove('visible'), 3000);
}

// Exporta senhas para um arquivo .txt
function exportPasswords() {
    if (passwordHistory.length === 0) {
        showError("Nenhuma senha foi gerada ainda.");
        return;
    }

    const blob = new Blob([passwordHistory.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'senhas.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Alterna entre modo escuro e claro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
}

// Exibe mensagem de erro
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.add('visible');
}

// Limpa mensagem de erro
function clearError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.classList.remove('visible');
}

// Função para alternar modo escuro
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Seleciona todos os elementos relevantes para aplicar o fade-in
    const elementsToFade = document.querySelectorAll(
        '.container, .sidebar, .floating-menu, button, h1, h2, h3, label, li, span'
    );

    // Adiciona a classe 'fade-in' temporariamente
    elementsToFade.forEach(element => {
        element.classList.add('fade-in');
        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 500); // Remove a classe após a duração da animação
    });

    // Altera o texto do botão
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.textContent = body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
}

