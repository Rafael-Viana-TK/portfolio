// =========================================
// 1. ANIMAÇÃO DE REDE NEURAL NO CANVAS
// =========================================
const canvas = document.getElementById('network-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray = [];

function setCanvasSize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', setCanvasSize);
setCanvasSize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1.8; 
        this.speedX = Math.random() * 0.7 - 0.35; 
        this.speedY = Math.random() * 0.7 - 0.35; 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw(color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.size * 2, this.size * 2);
    }
}

function initParticles() {
    if (!canvas) return;
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 15000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.documentElement.classList.contains('light-theme');
    const rgbColor = isLight ? '37, 99, 235' : '255, 87, 34'; 
    const particleColor = `rgba(${rgbColor}, 0.75)`;
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(particleColor);

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 220) { 
                ctx.beginPath();
                const opacity = (1 - (distance / 220)) * 0.55;
                ctx.strokeStyle = `rgba(${rgbColor}, ${opacity})`;
                ctx.lineWidth = 1.4;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

if (canvas) {
    initParticles();
    animateParticles();
}

// =========================================
// 2. ALTERNÂNCIA DE TEMA
// =========================================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.add('theme-transition');
        document.documentElement.classList.toggle('light-theme');
        
        let theme = 'dark';
        if (document.documentElement.classList.contains('light-theme')) {
            theme = 'light';
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }
        
        localStorage.setItem('theme', theme);
        setTimeout(() => { document.body.classList.remove('theme-transition'); }, 800);
    });
}

// =========================================
// 3. TYPING EFFECT
// =========================================
const typingElement = document.getElementById('typing');
let textToType = "Software Developer";
let typingIndex = 0;
let isTypingFinished = false;

function typeWriter() {
    if (!typingElement) return;
    if (typingIndex < textToType.length) {
        typingElement.innerHTML = textToType.substring(0, typingIndex + 1) + '<span class="cursor">_</span>';
        typingIndex++;
        setTimeout(typeWriter, 120);
    } else {
        typingElement.innerHTML = textToType + '<span class="cursor">_</span>';
        isTypingFinished = true;
    }
}
setTimeout(typeWriter, 800);

// =========================================
// 4. BANCO DE DADOS DE SKILLS E POP-UPS
// =========================================
const skillsData = {
    html: { 
        title: "HTML5", icon: "<i class='fab fa-html5' style='color: #e34f26;'></i>",
        pt: "A base da web. Uso HTML5 para estruturação semântica, criando páginas web acessíveis, bem organizadas e otimizadas para SEO.", 
        en: "The foundation of the web. I use HTML5 for semantic structuring, creating web pages that are accessible, well-organized, and optimized for SEO." 
    },
    css: { 
        title: "CSS3", icon: "<i class='fab fa-css3-alt' style='color: #1572b6;'></i>",
        pt: "Responsável pelo design e layout. Tenho experiência com estilização avançada, animações suaves e design responsivo.", 
        en: "Responsible for design and layout. I have experience with advanced styling, smooth animations, and responsive design." 
    },
    js: { 
        title: "JavaScript", icon: "<i class='fab fa-js' style='color: #f7df1e;'></i>",
        pt: "O motor da interatividade. Utilizo JS moderno (ES6+) para lógica de programação, manipulação do DOM e consumo de APIs.", 
        en: "The engine of interactivity. I use modern JS (ES6+) for programming logic, DOM manipulation, and API consumption." 
    },
    react: { 
        title: "React", icon: "<i class='fab fa-react' style='color: #61dafb;'></i>",
        pt: "Biblioteca para interfaces modernas. Crio componentes reutilizáveis e interfaces reativas de alto desempenho.", 
        en: "Library for modern interfaces. I create reusable components and high-performance reactive interfaces." 
    },
    node: { 
        title: "Node.js", icon: "<i class='fab fa-node-js' style='color: #339933;'></i>",
        pt: "O backend do JavaScript. Desenvolvimento de APIs RESTful robustas e servidores de alta performance.", 
        en: "The backend of JavaScript. Development of robust RESTful APIs and high-performance servers." 
    },
    sql: { 
        title: "SQL", icon: "<i class='fas fa-database' style='color: #4479a1;'></i>",
        pt: "Gerenciamento de dados. Experiência em modelagem, consultas complexas e bancos relacionais.", 
        en: "Data management. Experience in modeling, complex queries, and relational databases." 
    },
    git: { 
        title: "Git", icon: "<i class='fab fa-git-alt' style='color: #f05032;'></i>",
        pt: "Ferramenta essencial para versionamento de código e controle de histórico seguro.", 
        en: "Essential tool for code versioning and secure history control." 
    },
    github: { 
        title: "GitHub", icon: "<i class='fab fa-github' style='color: var(--text-title);'></i>",
        pt: "Plataforma de hospedagem onde versiono meus projetos e colaboro com outros desenvolvedores.", 
        en: "Hosting platform where I version my projects and collaborate with other developers." 
    },
    map: {
        title: "Mapeamento & Ambientação", icon: "<i class='fa-solid fa-map' style='color: #ff5722;'></i>",
        pt: "Modelagem 3D e edição espacial personalizada para criar cidades e cenários altamente imersivos.",
        en: "3D modeling and custom spatial editing to create highly immersive cities and environments."
    },
    palette: {
        title: "UI / UX & Graphic Design", icon: "<i class='fa-solid fa-palette' style='color: #e34f26;'></i>",
        pt: "Criação de identidade visual, paletas de cores, prototipagem e telas intuitivas focadas na experiência do usuário.",
        en: "Visual identity creation, color palettes, prototyping, and intuitive screens focused on user experience."
    },
    clock: {
        title: "Automação de Ponto", icon: "<i class='fa-solid fa-clock' style='color: #27c93f;'></i>",
        pt: "Sistemas em tempo real para controle de horário, turnos e acompanhamento operacional da equipe.",
        en: "Real-time systems for schedule control, shifts, and operational team tracking."
    },
    ticket: {
        title: "Suporte & Ticket System", icon: "<i class='fa-solid fa-ticket' style='color: #ff5722;'></i>",
        pt: "Gestão automatizada de chamados, suporte interativo e triagem ágil de atendimento via Discord.",
        en: "Automated ticket management, interactive support, and agile customer triage via Discord."
    },
    invoice: {
        title: "Gestão Fiscal & NF-e", icon: "<i class='fas fa-file-invoice-dollar' style='color: #ffbd2e;'></i>",
        pt: "Leitura e integração de notas fiscais, automatizando o estoque e o cadastro de mercadorias no sistema.",
        en: "Invoice reading and integration, automating inventory and goods registration in the system."
    },
    cash: {
        title: "Frente de Caixa (PDV)", icon: "<i class='fas fa-cash-register' style='color: #27c93f;'></i>",
        pt: "Sistema de vendas rápidas, geração de orçamentos e registro contínuo de transações comerciais.",
        en: "Fast checkout system, quote generation, and continuous commercial transaction recording."
    },
    wallet: {
        title: "Módulo Financeiro & PIX", icon: "<i class='fas fa-wallet' style='color: #ff5722;'></i>",
        pt: "Abertura, fechamento, sangrias, relatórios financeiros e pagamento instantâneo via QR Code PIX.",
        en: "Opening, closing, cash-out operations, financial reports, and instant QR Code PIX payments."
    },
    key: {
        title: "Autenticação & Segurança", icon: "<i class='fas fa-key' style='color: #ffbd2e;'></i>",
        pt: "Proteção de rotas, criptografia de dados e gerenciamento de chaves de licença para clientes.",
        en: "Route protection, data encryption, and license key management for clients."
    }
};

// =========================================
// 5. GLOBAIS DE MODAL (ABRIR POP-UP AO CLICAR EM QUALQUER TECNOLOGIA)
// =========================================
const skillModal = document.getElementById('skill-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

document.addEventListener('click', (e) => {
    const skillTarget = e.target.closest('[data-skill]');
    if (skillTarget) {
        const skillId = skillTarget.getAttribute('data-skill');
        const data = skillsData[skillId];
        if (data && skillModal) {
            modalIcon.innerHTML = data.icon;
            modalTitle.textContent = data.title;
            modalDesc.innerHTML = data[currentLang] || data.pt; 
            skillModal.classList.add('active');
        }
    }
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => { if (skillModal) skillModal.classList.remove('active'); });
}
if (skillModal) {
    skillModal.addEventListener('click', (e) => { if (e.target === skillModal) skillModal.classList.remove('active'); });
}

// =========================================
// 6. DADOS DOS PROJETOS NA ÁRVORE (COM ATRIBUTOS DATA-SKILL PARA ABRIR O POP-UP)
// =========================================
const projectsTreeData = {
    horizon: [
        {
            generation: "Geração 01 — Raiz & Autoria",
            techs: "<i class='fab fa-js' data-skill='js' style='color:#f7df1e;' title='JavaScript'></i> <i class='fas fa-database' data-skill='sql' style='color:#4479a1;' title='SQL'></i>",
            pt: "Servidor de FiveM construído inteiramente do zero com autoria própria, estabelecendo a base de sincronização e economia.",
            en: "FiveM server built entirely from scratch with own authorship, establishing the base for synchronization and economy."
        },
        {
            generation: "Geração 02 — Ramo de Scripts (@AMOR1M)",
            techs: "<i class='fab fa-js' data-skill='js' style='color:#f7df1e;' title='JavaScript'></i> <i class='fab fa-node-js' data-skill='node' style='color:#339933;' title='Node.js'></i>",
            pt: "Implementação de sistemas avançados e otimização de scripts em conjunto com @AMOR1M para garantir fluidez.",
            en: "Implementation of advanced systems and script optimization alongside @AMOR1M to ensure smooth gameplay."
        },
        {
            generation: "Geração 03 — Ramo de Mapas (@C0STA)",
            techs: "<i class='fa-solid fa-map' data-skill='map' style='color:#ff5722;' title='Mapas'></i>",
            pt: "Moldagem de mapas e ambientação personalizada sob a responsabilidade de @C0STA, elevando a imersão visual.",
            en: "Map modeling and custom environment design under @C0STA's responsibility, elevating visual immersion."
        },
        {
            generation: "Geração 04 — Ramo Visual & UI (@M0RRET1M & @LENNON)",
            techs: "<i class='fab fa-react' data-skill='react' style='color:#61dafb;' title='React'></i> <i class='fa-solid fa-palette' data-skill='palette' style='color:#e34f26;' title='UI/UX'></i>",
            pt: "Criação de UI/UX, interfaces customizadas e design gráfico completo conduzido por @M0RRET1M e @LENNON.",
            en: "Creation of UI/UX, custom interfaces, and complete graphic design led by @M0RRET1M and @LENNON."
        }
    ],
    bot: [
        {
            generation: "Geração 01 — Núcleo & Arquitetura",
            techs: "<i class='fab fa-node-js' data-skill='node' style='color:#339933;' title='Node.js'></i> <i class='fab fa-js' data-skill='js' style='color:#f7df1e;' title='JavaScript'></i>",
            pt: "Estruturação inicial do bot em Node.js para gerenciar eventos assíncronos e conexões seguras com o Discord.",
            en: "Initial bot structuring in Node.js to manage asynchronous events and secure connections with Discord."
        },
        {
            generation: "Geração 02 — Ramificação de Bate-Ponto",
            techs: "<i class='fas fa-database' data-skill='sql' style='color:#4479a1;' title='SQL'></i> <i class='fa-solid fa-clock' data-skill='clock' style='color:#27c93f;' title='Automação de Ponto'></i>",
            pt: "Automação completa de ponto para equipe, registrando entradas, saídas e jornadas direto no banco de dados.",
            en: "Complete automated time tracking for the team, logging entries, exits, and shifts directly in the database."
        },
        {
            generation: "Geração 03 — Ramificação de Tickets Ágeis",
            techs: "<i class='fa-solid fa-ticket' data-skill='ticket' style='color:#ff5722;' title='Ticket System'></i> <i class='fab fa-github' data-skill='github' style='color:#fff;' title='GitHub'></i>",
            pt: "Implementação de sistema inteligente que delega quase toda a moderação e suporte para painéis interativos.",
            en: "Implementation of an intelligent system that delegates almost all moderation and support to interactive panels."
        }
    ],
    rm_v1: [
        {
            generation: "Geração 01 — Autenticação & Segurança",
            techs: "<i class='fab fa-node-js' data-skill='node' style='color:#339933;' title='Node.js'></i> <i class='fas fa-key' data-skill='key' style='color:#ffbd2e;' title='Autenticação'></i>",
            pt: "Desenvolvimento do sistema robusto de login, controle de sessões e gerenciamento seguro de keys de acesso para clientes.",
            en: "Development of a robust login system, session control, and secure access key management for clients."
        },
        {
            generation: "Geração 02 — Motor de Busca Geográfica",
            techs: "<i class='fas fa-database' data-skill='sql' style='color:#4479a1;' title='SQL'></i> <i class='fab fa-js' data-skill='js' style='color:#f7df1e;' title='JavaScript'></i>",
            pt: "Construção de rotas de consulta rápida por região para localizar empresas e CPFs com alta performance.",
            en: "Construction of fast regional query routes to locate companies and CPFs with high performance."
        },
        {
            generation: "Geração 03 — Painel de Dados Empresariais",
            techs: "<i class='fab fa-react' data-skill='react' style='color:#61dafb;' title='React'></i> <i class='fab fa-css3-alt' data-skill='css' style='color:#1572b6;' title='CSS3'></i>",
            pt: "Interface limpa exibindo dados detalhados como proprietário, site, endereço, contatos e porte empresarial em segundos.",
            en: "Clean interface displaying detailed data such as owner, website, address, contacts, and company size in seconds."
        }
    ],
    portfolio: [
        {
            generation: "Geração 01 — Tronco Conceitual",
            techs: "<i class='fab fa-html5' data-skill='html' style='color:#e34f26;' title='HTML5'></i> <i class='fab fa-css3-alt' data-skill='css' style='color:#1572b6;' title='CSS3'></i>",
            pt: "Idealização de um design moderno estilo cyberpunk/terminal com modo dia/noite dinâmico.",
            en: "Conceptualization of a modern cyberpunk/terminal style design with dynamic day/night mode."
        },
        {
            generation: "Geração 02 — Ramo de Interatividade & Canvas",
            techs: "<i class='fab fa-js' data-skill='js' style='color:#f7df1e;' title='JavaScript'></i> <i class='fa-solid fa-cube' data-skill='js' style='color:#ff5722;' title='Canvas/JS'></i>",
            pt: "Implementação do canvas de cubos interconectados no fundo e pop-ups dinâmicos de tecnologias.",
            en: "Implementation of the interconnected cubes background canvas and dynamic tech pop-ups."
        },
        {
            generation: "Geração 03 — Ramo de Árvore Genealógica & Idiomas",
            techs: "<i class='fab fa-react' data-skill='react' style='color:#61dafb;' title='React'></i> <i class='fa-solid fa-code-branch' data-skill='git' style='color:#3b82f6;' title='Git/Branches'></i>",
            pt: "Evolução para visualização em árvore genealógica inline na página e suporte multilíngue dinâmico.",
            en: "Evolution to inline genealogical tree visualization on the page and dynamic multilingual support."
        }
    ],
    rm_comercial: [
        {
            generation: "Geração 01 — Cadastro & Nota Fiscal",
            techs: "<i class='fas fa-file-invoice-dollar' data-skill='invoice' style='color:#ffbd2e;' title='Nota Fiscal'></i> <i class='fas fa-database' data-skill='sql' style='color:#4479a1;' title='SQL'></i>",
            pt: "Módulo de recebimento e envio de dados de produtos, permitindo cadastrar produtos no sistema automaticamente direto pela nota fiscal.",
            en: "Module for receiving and sending product data, allowing automatic product registration into the system directly via invoice."
        },
        {
            generation: "Geração 02 — Vendas & Orçamentos",
            techs: "<i class='fas fa-cash-register' data-skill='cash' style='color:#27c93f;' title='Frente de Caixa'></i> <i class='fab fa-js' data-skill='js' style='color:#f7df1e;' title='JavaScript'></i>",
            pt: "Estruturação completa do fluxo de atendimento ao cliente, realizando vendas ágeis e emissão de orçamentos detalhados.",
            en: "Complete structuring of the customer service flow, performing agile sales and issuing detailed quotes."
        },
        {
            generation: "Geração 03 — Gestão de Caixa & PIX",
            techs: "<i class='fas fa-wallet' data-skill='wallet' style='color:#ff5722;' title='Financeiro/Pix'></i> <i class='fas fa-qrcode' data-skill='wallet' style='color:#61dafb;' title='QR Code Pix'></i>",
            pt: "Controle financeiro integrado de loja: funções de caixa, abertura, sangria e saque PIX, cobrindo todo o processo operacional de vendas.",
            en: "Integrated store financial control: cash register functions, opening, cash-out (sangria), and PIX withdrawal, covering the entire sales operational process."
        }
    ]
};

function renderAllTrees() {
    for (const [key, nodes] of Object.entries(projectsTreeData)) {
        const container = document.getElementById(`tree-${key}`);
        if (!container) continue;
        
        let htmlContent = '';
        nodes.forEach(node => {
            let descText = (currentLang === 'pt') ? node.pt : node.en;
            htmlContent += `
                <div class="tree-node">
                    <div class="node-generation">${node.generation}</div>
                    <div class="node-techs">${node.techs}</div>
                    <div class="node-desc">${descText}</div>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
    }
}

// =========================================
// 7. DELEGAÇÃO GLOBAL PARA EXPANSÃO DOS PROJETOS (ACORDEÃO)
// =========================================
document.addEventListener('click', (e) => {
    const accordionHeader = e.target.closest('.accordion-header');
    if (accordionHeader) {
        const accordionItem = accordionHeader.closest('.accordion-item');
        if (accordionItem) {
            accordionItem.classList.toggle('active');
        }
    }
});

// =========================================
// 8. IDIOMAS E TRADUÇÃO (PT / EN)
// =========================================
let currentLang = 'pt';
const btnPt = document.getElementById('pt');
const btnEn = document.getElementById('en');

function updateVisitCountersText() {
    const personal = localStorage.getItem('rafael_portfolio_personal_visits') || 1;
    const total = localStorage.getItem('rafael_portfolio_total_visits') || personal;
    
    const visitContainer = document.getElementById('visit-text-container');
    if (visitContainer) {
        const textTemplate = visitContainer.getAttribute(`data-${currentLang}`);
        if (textTemplate) {
            visitContainer.innerHTML = textTemplate
                .replace("<span id='personal-visits' class='highlight'>1</span>", `<span id='personal-visits' class='highlight'>${personal}</span>`)
                .replace("<span id='total-visits' class='highlight'>1</span>", `<span id='total-visits' class='highlight'>${total}</span>`);
        }
    }
}

function setLanguage(lang, saveUserChoice = false) {
    currentLang = lang;
    document.querySelectorAll('[data-pt]').forEach(el => {
        if (el.id !== 'visit-text-container') {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        }
    });
    
    textToType = (lang === 'pt') ? "Desenvolvedor de Software" : "Software Developer";
    if (isTypingFinished && typingElement) {
        typingElement.innerHTML = textToType + '<span class="cursor">_</span>';
    }

    updateVisitCountersText();
    updateUptime();
    renderAllTrees();

    if (btnEn && btnPt) {
        if (lang === 'en') {
            btnEn.classList.add('active');
            btnPt.classList.remove('active');
        } else {
            btnPt.classList.add('active');
            btnEn.classList.remove('active');
        }
    }

    if (saveUserChoice) {
        localStorage.setItem('rafael_portfolio_user_lang', lang);
    }
}

if (btnPt) btnPt.addEventListener('click', () => setLanguage('pt', true));
if (btnEn) btnEn.addEventListener('click', () => setLanguage('en', true));

const savedUserLang = localStorage.getItem('rafael_portfolio_user_lang');
if (savedUserLang) {
    setLanguage(savedUserLang, false);
} else {
    const browserLang = navigator.language || navigator.userLanguage || 'pt';
    if (browserLang.toLowerCase().startsWith('pt')) {
        setLanguage('pt', false);
    } else {
        setLanguage('en', false);
    }
}

// =========================================
// 9. SCROLL E LINHA PONTILHADA
// =========================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const treeLine = document.getElementById('master-tree-line');
    if (treeLine) {
        treeLine.style.backgroundPositionY = `${scrollY * 0.4}px`;
    }
});

// =========================================
// 10. CONTADOR DE TEMPO DE ATUALIZAÇÃO
// =========================================
let secondsElapsed = parseInt(sessionStorage.getItem('portfolio_uptime')) || 0;

function updateUptime() {
    secondsElapsed++;
    sessionStorage.setItem('portfolio_uptime', secondsElapsed);

    let timeStringPt = "";
    let timeStringEn = "";

    if (secondsElapsed < 60) {
        timeStringPt = `há ${secondsElapsed} segundo${secondsElapsed === 1 ? '' : 's'}`;
        timeStringEn = `${secondsElapsed} second${secondsElapsed === 1 ? '' : 's'} ago`;
    } else if (secondsElapsed < 3600) {
        let mins = Math.floor(secondsElapsed / 60);
        timeStringPt = `há ${mins} minuto${mins === 1 ? '' : 's'}`;
        timeStringEn = `${mins} minute${mins === 1 ? '' : 's'} ago`;
    } else {
        let hours = Math.floor(secondsElapsed / 3600);
        timeStringPt = `há ${hours} hora${hours === 1 ? '' : 's'}`;
        timeStringEn = `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    const uptimeEl = document.getElementById('uptime-text');
    if (uptimeEl) {
        if (currentLang === 'pt') {
            uptimeEl.textContent = `Última atualização: ${timeStringPt}`;
        } else {
            uptimeEl.textContent = `Last update: ${timeStringEn}`;
        }
    }
}

setInterval(updateUptime, 1000);

// =========================================
// 11. CONTADOR DE VISITAS REAL
// =========================================
function initVisitCounters() {
    let personalVisits = localStorage.getItem('rafael_portfolio_personal_visits');
    if (!personalVisits) {
        personalVisits = 1;
    } else {
        personalVisits = parseInt(personalVisits) + 1;
    }
    localStorage.setItem('rafael_portfolio_personal_visits', personalVisits);

    fetch('https://api.counterapi.dev/v1/rafaelvianatk/portfolio/up')
        .then(response => response.json())
        .then(data => {
            let totalVisits = data && data.count ? data.count : personalVisits;
            localStorage.setItem('rafael_portfolio_total_visits', totalVisits);
            updateVisitCountersText();
        })
        .catch(() => {
            let totalVisits = localStorage.getItem('rafael_portfolio_total_visits');
            if (!totalVisits) {
                totalVisits = personalVisits;
            }
            updateVisitCountersText();
        });
}

initVisitCounters();
updateUptime();
renderAllTrees();
