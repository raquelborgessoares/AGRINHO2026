// ==========================================================================
// NAVEGAÇÃO E SCROLL
// ==========================================================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const btnTopo = document.getElementById('btnTopo');

// Menu Mobile
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        btnTopo.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        btnTopo.classList.remove('visible');
    }
});

// Voltar ao topo
btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================================
// ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER)
// ==========================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ==========================================================================
// CONTADORES ANIMADOS
// ==========================================================================
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.nextElementSibling?.classList.contains('stat-suffix') 
        ? element.nextElementSibling.textContent 
        : '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================================================
// CALCULADORA DE IMPACTO AMBIENTAL
// ==========================================================================
const calcularBtn = document.getElementById('calcularBtn');
const compartilharBtn = document.getElementById('compartilharBtn');

const calcularImpacto = () => {
    const area = parseFloat(document.getElementById('area').value) || 0;
    const sistema = document.getElementById('sistema').value;
    const irrigacao = document.getElementById('irrigacao').value;
    const energia = document.getElementById('energia').value;
    
    if (area === 0 || !sistema || !irrigacao || !energia) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Cálculos baseados em dados reais
    let economiaAgua = 0;
    let reducaoCO2 = 0;
    let economiaFinanceira = 0;
    
    // Fatores de economia por sistema
    const fatoresSistema = {
        'convencional': { agua: 1, co2: 1, financeiro: 1 },
        'precisao': { agua: 1.3, co2: 1.4, financeiro: 1.5 },
        'organica': { agua: 1.2, co2: 1.6, financeiro: 1.3 },
        'ilpf': { agua: 1.5, co2: 2.0, financeiro: 1.8 }
    };
    
    const fatoresIrrigacao = {
        'convencional': 1,
        'gotejamento': 1.4,
        'pivocentral': 1.2,
        'inteligente': 1.8
    };
    
    const fatoresEnergia = {
        'rede': 1,
        'diesel': 0.8,
        'solar': 2.5,
        'biogas': 2.2
    };
    
    const fatorSistema = fatoresSistema[sistema];
    const fatorIrrigacao = fatoresIrrigacao[irrigacao];
    const fatorEnergia = fatoresEnergia[energia];
    
    // Cálculos (valores baseados em médias reais por hectare/ano)
    economiaAgua = Math.round(area * 50000 * fatorIrrigacao * fatorSistema);
    reducaoCO2 = parseFloat((area * 2.5 * fatorSistema * fatorEnergia).toFixed(2));
    economiaFinanceira = Math.round(area * 1200 * fatorSistema * fatorEnergia);
    
    // Atualizar UI
    document.getElementById('valorAgua').textContent = economiaAgua.toLocaleString('pt-BR');
    document.getElementById('valorCO2').textContent = reducaoCO2.toLocaleString('pt-BR');
    document.getElementById('valorFinanceiro').textContent = `R$ ${economiaFinanceira.toLocaleString('pt-BR')}`;
    
    // Mensagem personalizada
    let mensagem = '';
    const scoreTotal = (fatorSistema.financeiro + fatorIrrigacao + fatorEnergia) / 3;
    
    if (scoreTotal >= 2) {
        mensagem = '🌟 Excelente! Sua propriedade é modelo em sustentabilidade! Continue assim e inspire outros produtores.';
    } else if (scoreTotal >= 1.5) {
        mensagem = '👍 Muito bom! Você está no caminho certo. Considere implementar mais tecnologias sustentáveis.';
    } else {
        mensagem = '💡 Bom começo! Que tal explorar mais tecnologias sustentáveis para aumentar ainda mais seu impacto positivo?';
    }
    
    document.getElementById('resultadoMensagem').textContent = mensagem;
    
    // Mostrar botão de compartilhar
    compartilharBtn.style.display = 'block';
    
    // Animar resultados
    document.querySelectorAll('.resultado-item').forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(10px)';
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
            }, 300);
        }, index * 200);
    });
};

calcularBtn.addEventListener('click', calcularImpacto);

compartilharBtn.addEventListener('click', () => {
    const texto = `Calculei meu impacto ambiental no Agrinho 2026! 💚\nEconomia de água: ${document.getElementById('valorAgua').textContent}L/ano\nRedução de CO₂: ${document.getElementById('valorCO2').textContent} ton/ano\nEconomia: ${document.getElementById('valorFinanceiro').textContent}/ano\n\nDescubra seu impacto também: #Agrinho2026 #AgroSustentavel`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Meu Impacto Ambiental - Agrinho 2026',
            text: texto
        });
    } else {
        navigator.clipboard.writeText(texto);
        alert('Resultados copiados para a área de transferência!');
    }
});

// ==========================================================================
// QUIZ INTERATIVO
// ==========================================================================
const quizData = [
    {
        pergunta: "Qual porcentagem do PIB brasileiro o agronegócio representa atualmente?",
        opcoes: [
            "10%",
            "24%",
            "35%",
            "50%"
        ],
        correta: 1,
        explicacao: "O agronegócio representa aproximadamente 24% do PIB brasileiro, sendo um dos principais pilares da economia nacional."
    },
    {
        pergunta: "Qual tecnologia permite economia de 30-50% de água na irrigação?",
        opcoes: [
            "Irrigação por aspersão convencional",
            "Irrigação por inundação",
            "Irrigação inteligente com IoT",
            "Irrigação manual"
        ],
        correta: 2,
        explicacao: "Sistemas de irrigação inteligente com sensores IoT monitoram a umidade do solo e fornecem água sob demanda, economizando até 50%."
    },
    {
        pergunta: "O que significa a sigla ILPF?",
        opcoes: [
            "Integração Lavoura-Pecuária-Floresta",
            "Irrigação Localizada de Plantas Florestais",
            "Instituto de Lavouras e Plantas Frutíferas",
            "Indústria de Laticínios e Produtos Florestais"
        ],
        correta: 0,
        explicacao: "ILPF significa Integração Lavoura-Pecuária-Floresta, um sistema sustentável que combina diferentes atividades na mesma área."
    },
    {
        pergunta: "Qual a principal vantagem dos drones na agricultura de precisão?",
        opcoes: [
            "Substituir completamente os trabalhadores rurais",
            "Detecção precoce de pragas e doenças",
            "Aumentar o uso de defensivos agrícolas",
            "Reduzir a produtividade das lavouras"
        ],
        correta: 1,
        explicacao: "Drones com câmeras multiespectrais identificam problemas antes que sejam visíveis a olho nu, permitindo ações preventivas e localizadas."
    },
    {
        pergunta: "Qual porcentagem da vegetação nativa é preservada em propriedades rurais brasileiras?",
        opcoes: [
            "25%",
            "45%",
            "66%",
            "80%"
        ],
        correta: 2,
        explicacao: "Cerca de 66% da vegetação nativa é preservada em propriedades rurais, demonstrando que produção e conservação podem coexistir."
    }
];

let questaoAtual = 0;
let pontuacao = 0;
let quizFinalizado = false;

const quizPergunta = document.getElementById('quizPergunta');
const quizOpcoes = document.getElementById('quizOpcoes');
const quizFeedback = document.getElementById('quizFeedback');
const btnProxima = document.getElementById('btnProxima');
const questaoAtualEl = document.getElementById('questaoAtual');
const questaoTotalEl = document.getElementById('questaoTotal');
const progressFill = document.getElementById('progressFill');

const carregarQuestao = () => {
    const questao = quizData[questaoAtual];
    
    quizPergunta.textContent = questao.pergunta;
    questaoAtualEl.textContent = questaoAtual + 1;
    questaoTotalEl.textContent = quizData.length;
    
    // Atualizar barra de progresso
    const progresso = ((questaoAtual + 1) / quizData.length) * 100;
    progressFill.style.width = `${progresso}%`;
    
    // Limpar opções anteriores
    quizOpcoes.innerHTML = '';
    quizFeedback.className = 'quiz-feedback';
    quizFeedback.style.display = 'none';
    btnProxima.style.display = 'none';
    
    // Criar opções
    questao.opcoes.forEach((opcao, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-opcao';
        div.innerHTML = `
            <span style="font-weight: 600; color: var(--verde-primario);">${String.fromCharCode(65 + index)})</span>
            <span>${opcao}</span>
        `;
        div.addEventListener('click', () => selecionarResposta(index, div));
        quizOpcoes.appendChild(div);
    });
};

const selecionarResposta = (index, elemento) => {
    if (quizFinalizado) return;
    
    const questao = quizData[questaoAtual];
    const opcoes = document.querySelectorAll('.quiz-opcao');
    
    // Desabilitar todas as opções
    opcoes.forEach(op => op.classList.add('disabled'));
    
    // Verificar resposta
    if (index === questao.correta) {
        elemento.classList.add('correct');
        pontuacao++;
        quizFeedback.className = 'quiz-feedback correct show';
        quizFeedback.innerHTML = `
            <strong><i class="fas fa-check-circle"></i> Correto!</strong>
            <p>${questao.explicacao}</p>
        `;
    } else {
        elemento.classList.add('incorrect');
        opcoes[questao.correta].classList.add('correct');
        quizFeedback.className = 'quiz-feedback incorrect show';
        quizFeedback.innerHTML = `
            <strong><i class="fas fa-times-circle"></i> Incorreto</strong>
            <p>${questao.explicacao}</p>
        `;
    }
    
    // Mostrar botão próxima
    if (questaoAtual < quizData.length - 1) {
        btnProxima.style.display = 'inline-flex';
    } else {
        btnProxima.textContent = 'Ver Resultado';
        btnProxima.style.display = 'inline-flex';
        btnProxima.onclick = mostrarResultado;
    }
};

btnProxima.addEventListener('click', () => {
    if (questaoAtual < quizData.length - 1) {
        questaoAtual++;
        carregarQuestao();
    }
});

const mostrarResultado = () => {
    quizFinalizado = true;
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResultado').style.display = 'block';
    
    document.getElementById('pontuacaoNumero').textContent = pontuacao;
    
    let titulo = '';
    let icone = '';
    let mensagem = '';
    
    if (pontuacao === 5) {
        titulo = 'Parabéns! Você é um Expert!';
        icone = 'fa-trophy';
        mensagem = 'Você domina o assunto! Continue compartilhando conhecimento sobre sustentabilidade no agro.';
    } else if (pontuacao >= 3) {
        titulo = 'Muito Bom!';
        icone = 'fa-medal';
        mensagem = 'Você tem um bom conhecimento! Que tal revisar os conteúdos para acertar todas?';
    } else {
        titulo = 'Continue Estudando!';
        icone = 'fa-book';
        mensagem = 'Aproveite para explorar mais o site e aprender sobre sustentabilidade no agronegócio!';
    }
    
    document.getElementById('resultadoTitulo').textContent = titulo;
    document.getElementById('resultadoIcone').className = `fas ${icone}`;
    document.getElementById('resultadoMensagem').textContent = mensagem;
};

document.getElementById('btnReiniciar').addEventListener('click', () => {
    questaoAtual = 0;
    pontuacao = 0;
    quizFinalizado = false;
    btnProxima.textContent = 'Próxima Pergunta';
    btnProxima.onclick = () => {
        if (questaoAtual < quizData.length - 1) {
            questaoAtual++;
            carregarQuestao();
        }
    };
    
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResultado').style.display = 'none';
    carregarQuestao();
});

// Iniciar quiz
carregarQuestao();

// ==========================================================================
// NEWSLETTER
// ==========================================================================
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nomeNewsletter').value;
    const email = document.getElementById('emailNewsletter').value;
    
    // Simular envio
    alert(`Obrigado, ${nome}! \n\nVocê foi inscrito com sucesso na newsletter!\nEm breve você receberá novidades em: ${email}`);
    
    newsletterForm.reset();
});

// ==========================================================================
// FORMULÁRIO DE CONTATO
// ==========================================================================
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nomeContato').value;
    const email = document.getElementById('emailContato').value;
    const assunto = document.getElementById('assuntoContato').value;
    const mensagem = document.getElementById('mensagemContato').value;
    
    // Simular envio
    alert(`Mensagem enviada com sucesso!\n\nObrigado pelo contato, ${nome}!\nRetornaremos em breve para: ${email}`);
    
    contatoForm.reset();
});

// ==========================================================================
// ANIMAÇÃO SUAVE NOS CARDS
// ==========================================================================
document.querySelectorAll('.tech-card, .dado-card, .acao-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==========================================================================
// PREVENIR SCROLL HORIZONTAL
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});
