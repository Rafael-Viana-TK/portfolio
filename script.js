// =========================================
// 0. VARIÁVEL DE IDIOMA GLOBAL
// =========================================
let currentLang = 'pt';

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
// 5. DELEGAÇÃO GLOBAL PARA EXPANSÃO DOS PROJETOS (ACORDEÃO)
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
// 6. MODAL DE SKILLS / POP-UP DE TECNOLOGIAS
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
// 7. IDIOMAS E TRADUÇÃO (PT / EN)
// =========================================
const btnPt = document.getElementById('pt');
const btnEn = document.getElementById('en');

let globalServerVisits = 150;

function updateVisitCountersText() {
    let personal = parseInt(localStorage.getItem('rafael_portfolio_personal_visits')) || 1;
    let total = globalServerVisits;
    
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

    document.querySelectorAll('.node-desc').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });
    
    textToType = (lang === 'pt') ? "Desenvolvedor de Software" : "Software Developer";
    if (isTypingFinished && typingElement) {
        typingElement.innerHTML = textToType + '<span class="cursor">_</span>';
    }

    updateVisitCountersText();
    updateDeployUptime();

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
// 8. SCROLL E LINHA PONTILHADA
// =========================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const treeLine = document.getElementById('master-tree-line');
    if (treeLine) {
        treeLine.style.backgroundPositionY = `${scrollY * 0.4}px`;
    }
});

// =========================================
// 9. TEMPO DA ÚLTIMA ATUALIZAÇÃO DO ADMIN (COM FUSO HORÁRIO FIXO -03:00)
// =========================================
const ADMIN_DEPLOY_TIMESTAMP = '2026-08-02T05:30:00-03:00';

function updateDeployUptime() {
    const now = new Date();
    const deployDate = new Date(ADMIN_DEPLOY_TIMESTAMP);
    let diffMs = now - deployDate;
    if (diffMs < 0) diffMs = 0;
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let timeStringPt = "";
    let timeStringEn = "";

    if (diffDays > 0) {
        const remHours = diffHours % 24;
        timeStringPt = `há ${diffDays} dia${diffDays === 1 ? '' : 's'} e ${remHours} hora${remHours === 1 ? '' : 's'}`;
        timeStringEn = `${diffDays} day${diffDays === 1 ? '' : 's'} and ${remHours} hour${remHours === 1 ? '' : 's'} ago`;
    } else if (diffHours > 0) {
        const remMins = diffMins % 60;
        timeStringPt = `há ${diffHours} hora${diffHours === 1 ? '' : 's'} e ${remMins} minuto${remMins === 1 ? '' : 's'}`;
        timeStringEn = `${diffHours} hour${diffHours === 1 ? '' : 's'} and ${remMins} minute${remMins === 1 ? '' : 's'} ago`;
    } else if (diffMins > 0) {
        timeStringPt = `há ${diffMins} minuto${diffMins === 1 ? '' : 's'}`;
        timeStringEn = `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else {
        timeStringPt = `há poucos segundos`;
        timeStringEn = `a few seconds ago`;
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

updateDeployUptime();
setInterval(updateDeployUptime, 30000);

// =========================================
// 10. CONTADOR DE VISITAS BLINDADO COM INCREMENTO LOCAL E GLOBAL
// =========================================
function initVisitCounters() {
    // Incrementa o histórico pessoal deste navegador
    let personalVisits = parseInt(localStorage.getItem('rafael_portfolio_personal_visits')) || 0;
    personalVisits++;
    localStorage.setItem('rafael_portfolio_personal_visits', personalVisits);

    // Incrementa globalmente e garante soma contínua mesmo se a API oscilar
    fetch('https://api.counterapi.dev/v1/rafaelvianatk/portfolio/up')
        .then(response => {
            if (!response.ok) {
                return fetch('https://api.counterapi.dev/v1/rafaelvianatk/portfolio', { method: 'PUT' })
                    .then(() => fetch('https://api.counterapi.dev/v1/rafaelvianatk/portfolio/up').then(r => r.json()));
            }
            return response.json();
        })
        .then(data => {
            if (data && data.count) {
                globalServerVisits = data.count;
            } else {
                globalServerVisits++;
            }
            updateVisitCountersText();
        })
        .catch(() => {
            // Fallback inteligente caso a API caia: soma ao total anterior salvo no navegador
            let fallbackTotal = parseInt(localStorage.getItem('rafael_portfolio_fallback_total')) || 176;
            fallbackTotal++;
            localStorage.setItem('rafael_portfolio_fallback_total', fallbackTotal);
            globalServerVisits = fallbackTotal;
            updateVisitCountersText();
        });
}

initVisitCounters();
