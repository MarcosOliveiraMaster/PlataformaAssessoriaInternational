// Configuração dos Títulos e Subtítulos por Tela
const pageInfo = {
    'dashboard': {
        title: 'Visão Geral',
        subtitle: 'Bem-vindo de volta à sua central de controle.'
    },
    'products': {
        title: 'Meus Produtos',
        subtitle: 'Gerencie seus cursos, ebooks e mentorias.'
    },
    'market': {
        title: 'Mercado de Afiliação',
        subtitle: 'Encontre produtos vencedores para promover.'
    },
    'wallet': {
        title: 'Minha Carteira',
        subtitle: 'Gerencie seus ganhos e solicite saques.'
    },
    'settings': {
        title: 'Configurações',
        subtitle: 'Gerencie integrações e dados da conta.'
    }
};

// --- CONTROLE DO MENU MOBILE SANDUÍCHE ---

// Função para alternar menu mobile
function toggleMobileMenu() {
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.getElementById('menu-overlay');
    const hamburger = document.getElementById('hamburger');
    
    if (sidebar) {
        sidebar.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('show');
    }
}

// Função para fechar o menu mobile
function closeMobileMenu() {
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.getElementById('menu-overlay');
    const hamburger = document.getElementById('hamburger');
    
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('show');
    }
}

// Função Principal de Navegação
function navigateTo(screenId) {
    // 1. Esconder todas as seções (Views)
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('fade-in'); // Remove para reiniciar animação depois
    });

    // 2. Mostrar a seção desejada
    const targetView = document.getElementById(`view-${screenId}`);
    if (targetView) {
        targetView.classList.remove('hidden');
        // Pequeno delay para reiniciar a animação CSS
        setTimeout(() => {
            targetView.classList.add('fade-in');
        }, 10);
    }

    // 3. Atualizar Header (Título e Subtítulo)
    if (pageInfo[screenId]) {
        document.getElementById('page-title').innerText = pageInfo[screenId].title;
        document.getElementById('page-subtitle').innerText = pageInfo[screenId].subtitle;
    }

    // 4. Atualizar Menu Lateral DESKTOP (Active State)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    const activeNav = document.getElementById(`nav-${screenId}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // 5. Atualizar Menu Mobile (Bottom Navigation)
    const mobileNavItems = document.querySelectorAll('.bottom-nav .nav-item-mobile');
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeMobileNav = document.getElementById(`nav-${screenId}-mobile`);
    if (activeMobileNav) {
        activeMobileNav.classList.add('active');
    }

    // 6. Fechar o menu mobile ao navegar (mobile sidebar)
    closeMobileMenu();
}

// Inicialização: Se quiser carregar dados dinâmicos do Dashboard no futuro, faremos aqui.
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o dashboard é a primeira tela carregada
    navigateTo('dashboard');
});

// --- DADOS SIMULADOS (MOCK DATABASE) ---
let products = [
    {
        id: 1,
        name: 'Guia Definitivo de Importação',
        price: 97.00,
        type: 'ebook', // ebook ou curso
        status: 'active' // active ou draft
    },
    {
        id: 2,
        name: 'Mentoria Internacional VIP',
        price: 497.00,
        type: 'curso',
        status: 'draft'
    }
];

// --- FUNÇÕES DA TELA DE PRODUTOS ---

// 1. Renderizar Tabela
function renderProductsTable() {
    const tbody = document.getElementById('products-table-body');
    if (!tbody) return; // Segurança caso a tela não exista ainda

    tbody.innerHTML = ''; // Limpa tabela

    products.forEach(product => {
        // Define ícone baseado no tipo
        const icon = product.type === 'curso' 
            ? '<i class="fa-solid fa-video"></i>' 
            : '<i class="fa-solid fa-file-pdf"></i>';
        
        const iconColor = product.type === 'curso' ? 'text-brand-600 bg-brand-50' : 'text-blue-600 bg-blue-50';

        // Define badge de status
        const statusBadge = product.status === 'active' 
            ? '<span class="status-badge status-active">Ativo</span>'
            : '<span class="status-badge status-draft">Rascunho</span>';

        const row = `
            <tr class="hover:bg-gray-50 transition-colors group">
                <td class="p-5">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-lg ${iconColor}">
                            ${icon}
                        </div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">${product.name}</p>
                            <p class="text-xs text-gray-400 capitalize">${product.type}</p>
                        </div>
                    </div>
                </td>
                <td class="p-5 text-sm font-medium text-gray-600">
                    ${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td class="p-5">
                    ${statusBadge}
                </td>
                <td class="p-5 text-right">
                    <button class="text-gray-400 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-brand-50">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 ml-1">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 2. Lógica do Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    // Timeout pequeno para permitir que o navegador renderize o "display: block" antes de aplicar a opacidade (efeito fade)
    setTimeout(() => {
        modal.classList.add('modal-enter-active');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('modal-enter-active');
    
    // Aguarda a transição CSS (300ms) terminar antes de esconder
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 3. Salvar Novo Produto (Simulação)
function saveProduct() {
    const nameInput = document.getElementById('prod-name');
    const priceInput = document.getElementById('prod-price');
    const typeInput = document.querySelector('input[name="prod-type"]:checked');

    if (!nameInput.value || !priceInput.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name: nameInput.value,
        price: parseFloat(priceInput.value),
        type: typeInput.value,
        status: 'draft' // Novos produtos nascem como rascunho
    };

    // Adiciona ao array "banco de dados"
    products.unshift(newProduct); // Adiciona no topo
    
    // Atualiza a tela
    renderProductsTable();
    
    // Limpa e fecha
    nameInput.value = '';
    priceInput.value = '';
    closeModal('productModal');
    
    // Feedback visual (opcional)
    // alert('Produto criado com sucesso!');
}

// --- ATUALIZAÇÃO DO INITIAL LOAD ---
// Adicione esta chamada dentro do seu event listener 'DOMContentLoaded' existente
// Para garantir que a tabela carregue se o usuário der refresh na página de produtos.

// Exemplo de como integrar no listener existente:
/*
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('dashboard');
    renderProductsTable(); // <--- ADICIONE ISSO
});
*/

// --- DADOS DO MERCADO (MOCK) ---
const marketProducts = [
    {
        id: 101,
        title: "Espanhol para Negócios",
        description: "Aprenda a importar e exportar do zero com métodos validados.",
        niche: "Negócios",
        temp: 150, // Temperatura máxima
        rating: 4.8,
        price: 997.00,
        commission: 450.00,
        image: "fa-earth-americas" // Usando ícone como placeholder de imagem
    },
    {
        id: 102,
        title: "Compra e Aluguel de Imóveis no Paraguai",
        description: "Domine o vocabulário corporativo e feche contratos em dólar.",
        niche: "Idiomas",
        temp: 120,
        rating: 4.9,
        price: 297.00,
        commission: 130.00,
        image: "fa-comments-dollar"
    },
    {
        id: 103,
        title: "Espanhol para Estudantes de Medicina - Nível 1",
        description: "Guia completo para quem quer morar fora legalmente.",
        niche: "Viagem",
        temp: 90,
        rating: 5.0,
        price: 1500.00,
        commission: 500.00,
        image: "fa-passport"
    },
    {
        id: 104,
        title: "Espanhol para Estudantes de Medicina - Nível 2",
        description: "Proteja seu patrimônio investindo em moedas fortes.",
        niche: "Finanças",
        temp: 60,
        rating: 4.5,
        price: 497.00,
        commission: 200.00,
        image: "fa-chart-pie"
    },
    {
        id: 105,
        title: "Documentação para Vistos Brasileiros",
        description: "Otimize a cadeia de suprimentos da sua empresa.",
        niche: "Negócios",
        temp: 45,
        rating: 4.2,
        price: 2500.00,
        commission: 800.00,
        image: "fa-truck-fast"
    },
    {
        id: 106,
        title: "Plano de Saúde no Paraguai",
        description: "Conheça as melhores opções de cobertura de saúde no Paraguai.",
        niche: "Saúde",
        temp: 75,
        rating: 4.7,
        price: 1200.00,
        commission: 350.00,
        image: "fa-heart-pulse"
    }
];

// --- FUNÇÕES DE RENDERIZAÇÃO ---

function renderMarket() {
    const grid = document.getElementById('market-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Limpa grid

    marketProducts.forEach(prod => {
        // Lógica visual da temperatura
        let tempIcon = 'fa-fire';
        let tempColor = 'text-orange-500';
        if (prod.temp >= 100) tempColor = 'text-red-600 animate-pulse';

        grid.innerHTML += `
            <div class="market-card bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full">
                <div class="h-40 bg-gray-100 relative flex items-center justify-center group cursor-pointer">
                    <i class="fa-solid ${prod.image} text-6xl text-gray-300 group-hover:text-brand-600 transition-colors"></i>
                    
                    <div class="absolute top-3 right-3 temp-badge px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <i class="fa-solid ${tempIcon}"></i> ${prod.temp}°
                    </div>
                </div>

                <div class="p-5 flex-1 flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">${prod.niche}</span>
                        <div class="flex items-center text-yellow-400 text-xs">
                            <i class="fa-solid fa-star"></i>
                            <span class="text-gray-600 ml-1 font-bold">${prod.rating}</span>
                        </div>
                    </div>

                    <h3 class="font-bold text-gray-800 text-lg leading-tight mb-2 hover:text-brand-600 cursor-pointer transition-colors">${prod.title}</h3>
                    <p class="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">${prod.description}</p>

                    <div class="commission-box p-3 rounded-xl mb-4">
                        <p class="text-xs text-gray-500">Comissão de até:</p>
                        <p class="text-xl font-bold text-brand-600">
                            ${prod.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p class="text-xs text-gray-400 mt-1">Preço máx: ${prod.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <button onclick="requestAffiliation(${prod.id}, '${prod.title}', 'curso')" class="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors border border-gray-300">
                            Contratar Curso
                        </button>
                        <button onclick="requestAffiliation(${prod.id}, '${prod.title}', 'assessoria')" class="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20">
                            Contratar Assessoria
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Simulação de Ação
function requestAffiliation(id, title, type) {
    const typeLabel = type === 'curso' ? 'Contratar Curso' : 'Contratar Assessoria';
    alert(`Parabéns! Você solicitou:\n"${typeLabel}"\n\nProduto: "${title}"\n\nSeus links de divulgação foram gerados.`);
}

// --- ATUALIZAÇÃO DO INITIAL LOAD ---
// Atualize o listener DOMContentLoaded para renderizar o mercado também
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('dashboard');
    renderProductsTable(); // Da etapa anterior
    renderMarket();        // <--- NOVO
});

// --- DADOS DA CARTEIRA (MOCK) ---
const walletHistory = [
    {
        id: 1,
        date: "09 Fev 2024",
        desc: "Venda: Compra e Aluguel de Imóveis no Paraguai",
        type: "sale", // sale, withdraw, refund
        value: 450.00,
        status: "completed"
    },
    {
        id: 2,
        date: "09 Fev 2024",
        desc: "Venda: Espanhol para Negócios",
        type: "sale",
        value: 130.00,
        status: "pending" // saldo futuro
    },
    {
        id: 3,
        date: "05 Fev 2024",
        desc: "Espanhol para Estudantes de Medicina",
        type: "withdraw",
        value: 5000.00,
        status: "completed"
    },
    {
        id: 4,
        date: "01 Fev 2024",
        desc: "Documentação para Vistos Brasileiros",
        type: "refund",
        value: 1500.00,
        status: "completed"
    }
];

// --- FUNÇÕES DA CARTEIRA ---

function renderWallet() {
    const tbody = document.getElementById('wallet-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    walletHistory.forEach(item => {
        // Definição de Classes baseadas no tipo
        let valueClass = item.type === 'sale' ? 'transaction-in' : 'transaction-out';
        let typeLabel = '';
        let typeBadgeClass = '';

        switch(item.type) {
            case 'sale': 
                typeLabel = 'Venda'; 
                typeBadgeClass = 'type-sale';
                break;
            case 'withdraw': 
                typeLabel = 'Saque'; 
                typeBadgeClass = 'type-withdraw';
                break;
            case 'refund': 
                typeLabel = 'Reembolso'; 
                typeBadgeClass = 'type-refund';
                break;
        }

        const row = `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="p-4 text-gray-600 whitespace-nowrap">${item.date}</td>
                <td class="p-4 text-gray-800 font-medium">
                    ${item.desc}
                    ${item.status === 'pending' ? '<span class="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">Pendente</span>' : ''}
                </td>
                <td class="p-4">
                    <span class="type-badge ${typeBadgeClass}">${typeLabel}</span>
                </td>
                <td class="p-4 text-right font-bold font-mono ${valueClass}">
                    ${item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Simulação de Saque
function confirmWithdraw() {
    const amountInput = document.getElementById('withdraw-amount');
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    if (amount > 14320) { // Valor hardcoded do saldo mockado
        alert("Saldo insuficiente.");
        return;
    }

    // Adicionar ao histórico visualmente
    walletHistory.unshift({
        id: Date.now(),
        date: "Hoje",
        desc: "Saque Solicitado",
        type: "withdraw",
        value: amount,
        status: "completed"
    });

    renderWallet();
    closeModal('withdrawModal');
    amountInput.value = '';
    
    // Feedback
    alert(`Saque de R$ ${amount.toFixed(2)} solicitado com sucesso!`);
}

// --- ATUALIZAÇÃO DO INITIAL LOAD ---
// Não se esqueça de chamar renderWallet() no DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('dashboard');
    renderProductsTable();
    renderMarket();
    renderWallet(); // <--- NOVO
});