(() => {
  const canvas = document.getElementById('forca');
  const ctx = canvas.getContext('2d');

  // Lista de palavras variadas
  let palavras = [
    { palavra: 'JAVASCRIPT', categoria: 'Linguagem de Programação' },
    { palavra: 'HTML', categoria: 'Linguagem de Marcação' },
    { palavra: 'CSS', categoria: 'Linguagem de Estilo' },
    { palavra: 'PYTHON', categoria: 'Linguagem de Programação' },
    { palavra: 'JAVA', categoria: 'Linguagem de Programação' },
    { palavra: 'ALGORITMO', categoria: 'Conceito' },
    { palavra: 'FUNCAO', categoria: 'Conceito' },
    { palavra: 'ARRAY', categoria: 'Estrutura de Dados' },
    { palavra: 'SUPORTE', categoria: 'Tecnologia' },
    { palavra: 'GUITARRA', categoria: 'Objeto' },
    { palavra: 'LIVRO', categoria: 'Objeto' },
    { palavra: 'MOCHILA', categoria: 'Objeto' },
    { palavra: 'JARDIM', categoria: 'Natureza' },
    { palavra: 'TORNEIO', categoria: 'Evento' },
    { palavra: 'MAR', categoria: 'Natureza' },
    { palavra: 'CACHORRO', categoria: 'Animal' },
    { palavra: 'GATO', categoria: 'Animal' },
    { palavra: 'PIZZA', categoria: 'Comida' },
    { palavra: 'BATATA', categoria: 'Comida' },
    { palavra: 'CINEMA', categoria: 'Entretenimento' },
    { palavra: 'FUTEBOL', categoria: 'Esporte' },
    { palavra: 'VÔLEI', categoria: 'Esporte' },
    { palavra: 'CAMISA', categoria: 'Roupas' },
    { palavra: 'CASACO', categoria: 'Roupas' },
    { palavra: 'ESPELHO', categoria: 'Objeto' },
    { palavra: 'MONTANHA', categoria: 'Natureza' },
    { palavra: 'SELVA', categoria: 'Natureza' },
    { palavra: 'MELANCIA', categoria: 'Fruta' },
    { palavra: 'UVA', categoria: 'Fruta' },
    { palavra: 'PARQUE', categoria: 'Lugar' },
    { palavra: 'PLANO', categoria: 'Conceito' },
    { palavra: 'CIDADE', categoria: 'Lugar' },
    { palavra: 'MUSEU', categoria: 'Lugar' },
    { palavra: 'MOTOR', categoria: 'Objeto' },
    { palavra: 'NAVE', categoria: 'Veículo' },
    { palavra: 'CAMPEONATO', categoria: 'Esporte' },
    { palavra: 'CARRINHO', categoria: 'Objeto' },
    { palavra: 'ANIMAL', categoria: 'Animal' },
    { palavra: 'PAPEL', categoria: 'Objeto' },
    { palavra: 'VELA', categoria: 'Objeto' },
    { palavra: 'REMEDIO', categoria: 'Produto' },
    { palavra: 'BICICLETA', categoria: 'Veículo' },
    { palavra: 'ROBOT', categoria: 'Tecnologia' },
    { palavra: 'ROQUE', categoria: 'Jogo' },
    { palavra: 'ESTRELA', categoria: 'Natureza' },
    { palavra: 'CIELO', categoria: 'Natureza' },
    { palavra: 'LUZ', categoria: 'Natureza' },
    { palavra: 'FERRARI', categoria: 'Marca' },
    { palavra: 'OASIS', categoria: 'Lugar' },
    { palavra: 'ARCO', categoria: 'Objeto' },
    { palavra: 'TIJOLO', categoria: 'Material' },
    { palavra: 'FÁBRICA', categoria: 'Lugar' },
    { palavra: 'TELEVISÃO', categoria: 'Tecnologia' },
    { palavra: 'ROCK', categoria: 'Música' },
    { palavra: 'CLUBE', categoria: 'Lugar' },
  ];

  // Embaralha as palavras para evitar repetições consecutivas
  function embaralharPalavras() {
    for (let i = palavras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [palavras[i], palavras[j]] = [palavras[j], palavras[i]];
    }
  }

  let palavraSecreta = '';
  let categoriaSecreta = '';
  let letrasCorretas = [];
  let letrasErradas = [];
  let palavrasDisponiveis = [...palavras]; // Cópia das palavras

  const palavraEl = document.getElementById('palavra');
  const letrasContainer = document.getElementById('letras-container');
  const statusEl = document.getElementById('status');
  const btnReiniciar = document.getElementById('btn-reiniciar');
  const dicaEl = document.getElementById('dica');

  const maxErros = 6;

  // Desenha a base da forca que não muda
  function desenharBaseForca() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0f0';

    // Chão
    ctx.beginPath();
    ctx.moveTo(10, 290);
    ctx.lineTo(240, 290);
    ctx.stroke();

    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(50, 290);
    ctx.lineTo(50, 20);
    ctx.stroke();

    // Poste horizontal
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(180, 20);
    ctx.stroke();

    // Corda
    ctx.beginPath();
    ctx.moveTo(180, 20);
    ctx.lineTo(180, 50);
    ctx.stroke();
  }

  // Desenha o boneco conforme os erros
  function desenharBoneco(erros) {
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 3;

    if (erros > 0) {
      // Cabeça
      ctx.beginPath();
      ctx.arc(180, 75, 25, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (erros > 1) {
      // Tronco
      ctx.beginPath();
      ctx.moveTo(180, 100);
      ctx.lineTo(180, 180);
      ctx.stroke();
    }
    if (erros > 2) {
      // Braço esquerdo
      ctx.beginPath();
      ctx.moveTo(180, 120);
      ctx.lineTo(150, 160);
      ctx.stroke();
    }
    if (erros > 3) {
      // Braço direito
      ctx.beginPath();
      ctx.moveTo(180, 120);
      ctx.lineTo(210, 160);
      ctx.stroke();
    }
    if (erros > 4) {
      // Perna esquerda
      ctx.beginPath();
      ctx.moveTo(180, 180);
      ctx.lineTo(150, 230);
      ctx.stroke();
    }
    if (erros > 5) {
      // Perna direita
      ctx.beginPath();
      ctx.moveTo(180, 180);
      ctx.lineTo(210, 230);
      ctx.stroke();
    }
  }

  function escolherPalavra() {
    if (palavrasDisponiveis.length === 0) {
      // Se todas as palavras foram usadas, reinicia a lista
      palavrasDisponiveis = [...palavras];
      embaralharPalavras();
    }

    const escolhido = palavrasDisponiveis.pop();
    return escolhido;
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

  function chute(letra, btn) {
    if (btn.disabled) return; // evita duplo clique rápido

    btn.disabled = true;

    if (palavraSecreta.includes(letra)) {
      letrasCorretas.push(letra);
      mostrarPalavra();
      verificarVitoria();
    } else {
      letrasErradas.push(letra);
      desenharBaseForca();  // sempre desenha a base
      desenharBoneco(letrasErradas.length);
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
    if (!/^[A-Z]$/.test(letra)) return; // Só letras A-Z

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
    desenharBaseForca(); // já desenha a forca
    bloquearTeclado(false);
  }

  btnReiniciar.addEventListener('click', reiniciar);

  // Inicializa o jogo
  embaralharPalavras();
  reiniciar();
})();