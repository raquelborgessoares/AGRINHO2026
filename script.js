document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica do Menu Hambúrguer
    const menuBtn = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuBtn.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // 2. Validação do Formulário
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real
        
        const nome = form.querySelector('input[type="text"]').value;
        
        if (nome) {
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
            form.reset();
        } else {
            alert("Por favor, preencha seu nome.");
        }
    });

    // 3. Efeito de Animação ao Scroll (Fade-in)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observa todos os cards para animar
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});
