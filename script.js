// EXEMPLO 1 – Gerar TXT
function abrirEx1() {
  const form = document.getElementById("formulario");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const valores = [];
    for (let i = 1; i <= 5; i++) {
      const valor = document.getElementById(`valor${i}`).value.trim();
      if (valor === "") {
        alert(`O campo Valor ${i} está vazio.`);
        return;
      }
      valores.push(valor);
    }

    const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "valores.txt";
    link.click();
  });
}

// EXEMPLO 2 – Número secreto
function abrirEx2() {
  if (!document.querySelector("h1") || !document.querySelector("p")) return;

  let listaDeNumerosSorteados = [];
  let numeroLimite = 10;
  let numeroSecreto = gerarNumeroAleatorio();
  let tentativas = 1;

  function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if (window.responsiveVoice) {
      responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
  }

  function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
  }

  function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    if (listaDeNumerosSorteados.length == numeroLimite) {
      listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
      return gerarNumeroAleatorio();
    } else {
      listaDeNumerosSorteados.push(numeroEscolhido);
      return numeroEscolhido;
    }
  }

  window.verificarChute = function () {
    const chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Acertou!');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
      exibirTextoNaTela('p', chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior');
      tentativas++;
      limparCampo();
    }
  }

  function limparCampo() {
    document.querySelector('input').value = '';
  }

  window.reiniciarJogo = function () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
  }

  exibirMensagemInicial();
}

// EXEMPLO 3 – Frutas (Arrays)
function abrirEx3() {
  if (!document.getElementById("listaFrutas")) return;

  let frutas = [];

  function atualizarLista() {
    document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
  }

  window.adicionarFruta = function () {
    const input = document.getElementById('frutaInput');
    const valor = input.value.trim();
    if (valor) {
      frutas.push(valor);
      input.value = "";
      atualizarLista();
    }
  }

  window.metodo = function (acao) {
    if (acao === 'push') {
      const fruta = prompt("Digite uma fruta para adicionar no final:");
      if (fruta) frutas.push(fruta);
    } else if (acao === 'pop') {
      frutas.pop();
    } else if (acao === 'shift') {
      frutas.shift();
    } else if (acao === 'unshift') {
      const fruta = prompt("Digite uma fruta para adicionar no início:");
      if (fruta) frutas.unshift(fruta);
    }
    atualizarLista();
  }

  window.verificarBanana = function () {
    const resultado = frutas.includes('banana')
      ? "🍌 Banana está no array!"
      : "🚫 Banana NÃO está no array.";
    document.getElementById('saida').textContent = resultado;
  }

  window.mostrarIndex = function (fruta) {
    const index = frutas.indexOf(fruta);
    const resultado = index !== -1
      ? `A fruta '${fruta}' está na posição ${index}.`
      : `'${fruta}' não foi encontrada.`;
    document.getElementById('saida').textContent = resultado;
  }

  window.mostrarJoin = function () {
    const resultado = "join(', '): " + frutas.join(', ');
    document.getElementById('saida').textContent = resultado;
  }

  window.mostrarSlice = function () {
    const fatiado = frutas.slice(1, 3);
    document.getElementById('saida').textContent = "slice(1, 3): " + JSON.stringify(fatiado);
  }

  window.fazerSplice = function () {
    frutas.splice(1, 1);
    atualizarLista();
    document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
  }

  window.mapMaiusculas = function () {
    const maiusculas = frutas.map(f => f.toUpperCase());
    document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
  }

  window.filtrarGrandes = function () {
    const grandes = frutas.filter(f => f.length > 4);
    document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
  }
}
