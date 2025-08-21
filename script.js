(() => {
  const canvas = document.getElementById('forca');
  const ctx = canvas.getContext('2d');

  const palavras = [
    { palavra: 'JAVASCRIPT', categoria: 'Linguagem de Programação' },
    { palavra: 'HTML', categoria: 'Linguagem de Marcação' },
    { palavra: 'CSS', categoria: 'Linguagem de Estilo' },
    { palavra: 'PROGRAMACAO', categoria: 'Atividade' },
    { palavra: 'FORCA', categoria: 'Jogo' },
    { palavra: 'DESAFIO', categoria: 'Conceito' },
    { palavra: 'LINGUAGEM', categoria: 'Conceito' },
    { palavra: 'CODIGO', categoria: 'Conceito' },
    { palavra: 'ALGORITMO', categoria: 'Conceito' },
    { palavra: 'FUNCAO', categoria: 'Conceito' },
    { palavra: 'OBJETO', categoria: 'Conceito' },
    { palavra: 'ARRAY', categoria: 'Estrutura de Dados' },
    { palavra: 'VARIAVEL', categoria: 'Conceito' },
    { palavra: 'EVENTO', categoria: 'Conceito' },
    { palavra: 'LOOP', categoria: 'Estrutura de Controle' },
    { palavra: 'CONSOLE', categoria: 'Ferramenta' },
    { palavra: 'DOM', categoria: 'Conceito' },
    { palavra: 'DEBUG', categoria: 'Ação' },
    { palavra: 'INTERFACE', categoria: 'Conceito' },
    { palavra: 'CLASSE', categoria: 'Conceito' }
  ];

  let palavraSecreta = '';
  let categoriaSecreta = '';
  let letrasCorretas = [];
  let letrasErradas = [];

  const palavraEl = document.getElementById('palavra');
  const letrasContainer = document.getElementById('letras-container');
  const statusEl = document.getElementById('status');
  const btnReiniciar = document.getElementById('btn-reiniciar');
  const dicaEl = document.getElementById('dica');

  const maxErros = 6;

  function escolherPalavra() {
    const index = Math.floor(Math.random() * palavras.length);
    return palavras[index];
  }

  function mostrarPalavra() {
    let display = palavraSecreta.split('').map(letra => {
      return letrasCorretas.includes(letra) ? letra : '_';
    }).join(' ');

    palavraEl.textContent = display;
  }

  function criarLetras() {
    letrasContainer.innerHTML = '';
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let letra of alfabeto) {
      const btn = document.createElement('button');
      btn.classList.add('letra-btn');
      btn.textContent = letra;
      btn.addEventListener('click', () => chute(letra, btn));
      letrasContainer.appendChild(btn);
    }
  }

  function desenharForca() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0f0';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Base
    ctx.beginPath();
    ctx.moveTo(10, 290);
    ctx.lineTo(240, 290);
    ctx.stroke();

    if (letrasErradas.length > 0) {
      // Poste vertical
      ctx.beginPath();
      ctx.moveTo(50, 290);
      ctx.lineTo(50, 20);
      ctx.stroke();
    }

    if (letrasErradas.length > 1) {
      // Poste horizontal
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(180, 20);
      ctx.stroke();
    }

    if (letrasErradas.length > 2) {
      // Corda
      ctx.beginPath();
      ctx.moveTo(180, 20);
      ctx.lineTo(180, 50);
      ctx.stroke();
    }

    if (letrasErradas.length > 3) {
      // Cabeça
      ctx.beginPath();
      ctx.arc(180, 75, 25, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (letrasErradas.length > 4) {
      // Corpo
      ctx.beginPath();
      ctx.moveTo(180, 100);
      ctx.lineTo(180, 180);
      ctx.stroke();
    }

    if (letrasErradas.length > 5) {
      // Braços
      ctx.beginPath();
      ctx.moveTo(180, 120);
      ctx.lineTo(150, 160);
      ctx.moveTo(180, 120);
      ctx.lineTo(210, 160);
      ctx.stroke();
    }
  }

  function chute(letra, btn) {
    btn.disabled = true;

    if (palavraSecreta.includes(letra)) {
      letrasCorretas.push(letra);
      mostrarPalavra();
      verificarVitoria();
    } else {
      letrasErradas.push(letra);
      desenharForca();
      verificarDerrota();
    }
  }

  function verificarVitoria() {
    const ganhou = palavraSecreta.split('').every(letra => letrasCorretas.includes(letra));
    if (ganhou) {
      statusEl.textContent = '🎉 Você ganhou!';
      bloquearTeclado(true);
      bloquearBotoes(true);
    }
  }

  function verificarDerrota() {
    if (letrasErradas.length >= maxErros) {
      statusEl.textContent = `💀 Você perdeu! A palavra era: ${palavraSecreta}`;
      mostrarPalavraCompleta();
      bloquearTeclado(true);
      bloquearBotoes(true);
    } else {
      statusEl.textContent = `Erros: ${letrasErradas.length} de ${maxErros}`;
    }
  }

  function mostrarPalavraCompleta() {
    palavraEl.textContent = palavraSecreta.split('').join(' ');
  }

  function bloquearTeclado(bloquear) {
    if (bloquear) {
      window.removeEventListener('keydown', onKeydown);
    } else {
      window.addEventListener('keydown', onKeydown);
    }
  }

  function bloquearBotoes(bloquear) {
    const botoes = letrasContainer.querySelectorAll('button');
    botoes.forEach(btn => {
      btn.disabled = bloquear;
    });
  }

  function onKeydown(e) {
    const letra = e.key.toUpperCase();
    const botoes = letrasContainer.querySelectorAll('button');
    botoes.forEach(btn => {
      if (btn.textContent === letra && !btn.disabled) {
        btn.click();
      }
    });
  }

  function reiniciar() {
    const escolhido = escolherPalavra();
    palavraSecreta = escolhido.palavra;
    categoriaSecreta = escolhido.categoria;
    letrasCorretas = [];
    letrasErradas = [];
    statusEl.textContent = '';
    dicaEl.textContent = `Dica: ${categoriaSecreta}`;
    mostrarPalavra();
    criarLetras();
    desenharForca();
    bloquearTeclado(false);
  }

  btnReiniciar.addEventListener('click', reiniciar);

  // Inicializa o jogo
  reiniciar();
})();
