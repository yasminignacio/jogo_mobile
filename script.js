(() => {
  const canvas = document.getElementById('forca');
  const ctx = canvas.getContext('2d');

  const palavras = [
    'JAVASCRIPT', 'HTML', 'CSS', 'PROGRAMACAO', 'FORCA', 'DESAFIO', 'LINGUAGEM',
    'CODIGO', 'ALGORITMO', 'FUNCAO', 'OBJETO', 'ARRAY', 'VARIAVEL', 'EVENTO',
    'LOOP', 'CONSOLE', 'DOM', 'DEBUG', 'INTERFACE', 'CLASSE'
  ];

  let palavraSecreta = '';
  let letrasCorretas = [];
  let letrasErradas = [];

  const palavraEl = document.getElementById('palavra');
  const letrasContainer = document.getElementById('letras-container');
  const statusEl = document.getElementById('status');
  const btnReiniciar = document.getElementById('btn-reiniciar');

  const maxErros = 6;

  // Função para escolher uma palavra aleatória
  function escolherPalavra() {
    const index = Math.floor(Math.random() * palavras.length);
    return palavras[index];
  }

  // Função para mostrar espaços da palavra
  function mostrarPalavra() {
    let display = palavraSecreta.split('').map(letra => {
      return letrasCorretas.includes(letra) ? letra : '_';
    }).join(' ');

    palavraEl.textContent = display;
  }

  // Função para criar os botões de letras A-Z
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

  // Função para desenhar a forca progressivamente
  function desenharForca() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0f0';

    // Limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Base
    ctx.beginPath();
    ctx.moveTo(10, 290);
    ctx.lineTo(240, 290);
    ctx.stroke();

    // Poste vertical
    if (letrasErradas.length > 0) {
      ctx.beginPath();
      ctx.moveTo(50, 290);
      ctx.lineTo(50, 20);
      ctx.stroke();
    }

    // Poste horizontal
    if (letrasErradas.length > 1) {
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(180, 20);
      ctx.stroke();
    }

    // Corda
    if (letrasErradas.length > 2) {
      ctx.beginPath();
      ctx.moveTo(180, 20);
      ctx.lineTo(180, 50);
      ctx.stroke();
    }

    // Cabeça
    if (letrasErradas.length > 3) {
      ctx.beginPath();
      ctx.arc(180, 75, 25, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Corpo
    if (letrasErradas.length > 4) {
      ctx.beginPath();
      ctx.moveTo(180, 100);
      ctx.lineTo(180, 180);
      ctx.stroke();
    }

    // Braços
    if (letrasErradas.length > 5) {
      ctx.beginPath();
      ctx.moveTo(180, 120);
      ctx.lineTo(150, 160);
      ctx.moveTo(180, 120);
      ctx.lineTo(210, 160);
      ctx.stroke();
    }

    // Pernas (opcional: só mostrar depois do erro 6)
    // Se quiser pode colocar o 7° erro para pernas, mas aqui max erros 6.
  }

  // Função chamada ao clicar em uma letra
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

  // Verifica se o jogador ganhou
  function verificarVitoria() {
    const ganhou = palavraSecreta.split('').every(letra => letrasCorretas.includes(letra));
    if (ganhou) {
      statusEl.textContent = '🎉 Você ganhou!';
      bloquearTeclado(true);
      bloquearBotoes(true);
    }
  }

  // Verifica se o jogador perdeu
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

  // Mostra palavra completa quando perde
  function mostrarPalavraCompleta() {
    palavraEl.textContent = palavraSecreta.split('').join(' ');
  }

  // Bloqueia o teclado para não poder mais digitar letras
  function bloquearTeclado(bloquear) {
    if (bloquear) {
      window.removeEventListener('keydown', onKeydown);
    } else {
      window.addEventListener('keydown', onKeydown);
    }
  }

  // Bloqueia os botões de letras
  function bloquearBotoes(bloquear) {
    const botoes = letrasContainer.querySelectorAll('button');
    botoes.forEach(btn => {
      btn.disabled = bloquear;
    });
  }

  // Permite chute pelo teclado também
  function onKeydown(e) {
    const letra = e.key.toUpperCase();
    const botoes = letrasContainer.querySelectorAll('button');
    botoes.forEach(btn => {
      if (btn.textContent === letra && !btn.disabled) {
        btn.click();
      }
    });
  }

  // Reinicia o jogo
  function reiniciar() {
    palavraSecreta = escolherPalavra();
    letrasCorretas = [];
    letrasErradas = [];
    statusEl.textContent = '';
    mostrarPalavra();
    criarLetras();
    desenharForca();
    bloquearTeclado(false);
  }

  // Inicialização
  btnReiniciar.addEventListener('click', reiniciar);

  palavraSecreta = escolherPalavra();
  criarLetras();
  mostrarPalavra();
  desenharForca();
  bloquearTeclado(false);
  window.addEventListener('keydown', onKeydown);
})();
