// ==========================================================================
// 1. MENU HAMBÚRGUER
// ==========================================================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================================================
// 2. ANIMAÇÃO DE SCROLL (FADE-IN)
// ==========================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos os cards
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// ==========================================================================
// 3. ANIMAÇÃO DOS NÚMEROS (ESTATÍSTICAS)
// ==========================================================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateNumber(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 25 || target === 40 || target === 30 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ==========================================================================
// 4. QUIZ INTERATIVO
// ==========================================================================
const quizData = [
    {
        question: "Qual porcentagem do PIB brasileiro o agronegócio representa?",
        options: ["10%", "25%", "40%", "60%"],
        correct: 1
    },
    {
        question: "Qual prática ajuda na conservação do solo?",
        options: ["Queimadas", "Plantio direto", "Desmatamento", "Monocultura intensiva"],
        correct: 1
    },
    {
        question: "Qual tecnologia reduz o uso de água na agricultura?",
        options: ["Irrigação por inundação", "Irrigação inteligente", "Aspersão convencional", "Nenhuma das anteriores"],
        correct: 1
    },
    {
        question: "O que é agricultura regenerativa?",
        options: ["Uso intensivo de químicos", "Práticas que restauram o ecossistema", "Queimada controlada", "Cultivo em estufas"],
        correct: 1
    },
    {
        question: "Qual a principal fonte de energia renovável no campo?",
        options: ["Carvão mineral", "Energia solar", "Petróleo", "Gás natural"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');

    if (currentQuestion < quizData.length) {
        const currentQuiz = quizData[currentQuestion];
        questionText.textContent = currentQuiz.question;
        currentQuestionSpan.textContent = currentQuestion + 1;
        totalQuestionsSpan.textContent = quizData.length;

        optionsContainer.innerHTML = '';
        currentQuiz.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('quiz-option');
            button.addEventListener('click', () => selectAnswer(index, button));
            optionsContainer.appendChild(button);
        });
    } else {
        showQuizResult();
    }
}

function selectAnswer(selectedIndex, button) {
    const currentQuiz = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selectedIndex === currentQuiz.correct) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        options[currentQuiz.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuiz();
    }, 1500);
}

function showQuizResult() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('totalScore').textContent = quizData.length;

    const feedbackMessage = document.getElementById('feedbackMessage');
    const percentage = (score / quizData.length) * 100;

    if (percentage === 100) {
        feedbackMessage.textContent = "Excelente! Você é um especialista em sustentabilidade! 🌱";
    } else if (percentage >= 60) {
        feedbackMessage.textContent = "Muito bom! Você tem bom conhecimento sobre o tema! 👍";
    } else {
        feedbackMessage.textContent = "Continue estudando! A sustentabilidade é importante! 📚";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    loadQuiz();
}

// Iniciar quiz
loadQuiz();

// ==========================================================================
// 5. CALCULADORA DE IMPACTO AMBIENTAL
// ==========================================================================
function calculateImpact() {
    const area = parseFloat(document.getElementById('areaInput').value) || 0;
    const water = parseFloat(document.getElementById('waterInput').value) || 0;
    const energy = document.getElementById('energyInput').value;
    const forest = parseFloat(document.getElementById('forestInput').value) || 0;

    if (area === 0) {
        alert('Por favor, preencha pelo menos a área da propriedade.');
        return;
    }

    // Cálculos
    const waterPerHectare = (water / area).toFixed(2);
    let energyScore = 0;
    let energyLabel = '';

    switch(energy) {
        case 'solar':
            energyScore = 10;
            energyLabel = 'Excelente - Energia 100% renovável';
            break;
        case 'biogas':
            energyScore = 9;
            energyLabel = 'Ótimo - Biogás é sustentável';
            break;
        case 'hybrid':
            energyScore = 6;
            energyLabel = 'Bom - Mistura de energias';
            break;
        case 'fossil':
            energyScore = 3;
            energyLabel = 'Atenção - Dependente de combustíveis fósseis';
            break;
    }

    let forestStatus = '';
    let forestMessage = '';
    if (forest >= 20) {
        forestStatus = '✅ Excelente';
        forestMessage = 'Sua propriedade está acima da média de reserva legal!';
    } else if (forest >= 10) {
        forestStatus = '⚠️ Regular';
        forestMessage = 'Considere aumentar a área de reserva florestal.';
    } else {
        forestStatus = '❌ Insuficiente';
        forestMessage = 'É necessário aumentar a reserva florestal para atender a legislação.';
    }

    // Cálculo do score geral
    const generalScore = Math.round((energyScore + (forest / 5)) / 2 * 10) / 10;

    let recommendation = '';
    if (generalScore >= 8) {
        recommendation = '🌟 Sua propriedade é modelo em sustentabilidade! Continue assim!';
    } else if (generalScore >= 5) {
        recommendation = '👍 Bom começo! Invista em energias renováveis e aumente a reserva florestal.';
    } else {
        recommendation = '⚠️ Sua propriedade precisa de melhorias urgentes em sustentabilidade.';
    }

    // Exibir resultados
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `
        <div class="result-item">
            <div class="result-label">Consumo de água por hectare</div>
            <div class="result-value">${waterPerHectare} m³/ha/dia</div>
        </div>
        <div class="result-item">
            <div class="result-label">Tipo de energia</div>
            <div class="result-value" style="font-size: 1.2rem;">${energyLabel}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Reserva florestal</div>
            <div class="result-value">${forest}% - ${forestStatus}</div>
            <div style="margin-top: 5px; font-size: 0.9rem;">${forestMessage}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Score de Sustentabilidade</div>
            <div class="result-value" style="font-size: 2rem;">${generalScore}/10</div>
        </div>
        <div class="result-message">
            ${recommendation}
        </div>
    `;
}

// ==========================================================================
// 6. GALERIA INTERATIVA (LIGHTBOX)
// ==========================================================================
function openLightbox(element) {
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-overlay p').textContent;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Fechar lightbox com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ==========================================================================
// 7. FORMULÁRIO DE CONTATO
// ==========================================================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação simples
    if (nome && email && assunto && mensagem) {
        alert(`Obrigado, ${nome}! \n\nSua mensagem sobre "${assunto}" foi enviada com sucesso!\n\nEntraremos em contato pelo e-mail: ${email}`);
        this.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// ==========================================================================
// 8. EFEITO DE SCROLL SUAVE NO HEADER
// ==========================================================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================================================
// 9. ANIMAÇÃO DE DIGITAÇÃO NO HERO (OPCIONAL)
// ==========================================================================
const heroText = document.querySelector('.hero p');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Iniciar animação após 1 segundo
    setTimeout(typeWriter, 1000);
}
