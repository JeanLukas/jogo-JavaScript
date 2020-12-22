let timerId = null; //armazena chamadas da funçao timeout

//alerta de
function boasVindas() {
    alert('Seja Bem Vindo ao meu joguinho, clique no botão verde para proseguir');
}

function iniciaGame() {
    var nivel_game = document.getElementById('nivel_game').value;

    window.location.href = 'game.html?' + nivel_game;
}

function IniciaGame() {

    var url = window.location.search;
    var nivelGame = url.replace("?", "");

    var tempoSegundos = 0;
    let quantidadeDeJs = 0;

    var bg = document.getElementById("fundo");
    bg.style.backgroundImage = `url('./imagens/cenario_nivel_${nivelGame}.png')`;


    if (nivelGame == 1) {//1 nivel 240 segundos + 48 js

        tempoSegundos = 100;
        quantidadeDeJs = 50;
    }

    if (nivelGame == 2) {//2 nivel 120 segundos + 35 js

        tempoSegundos = 60;
        quantidadeDeJs = 56;
    }

    if (nivelGame == 3) {//3 nivel 60  segundos + 24 js
        tempoSegundos = 40;
        quantidadeDeJs = 40;
    }

    if (nivelGame == 4) {//4 nivel 30  segundos + 14 js
        tempoSegundos = 30;
        quantidadeDeJs = 40;
    }

    if (nivelGame == 5) {//5 nivel 15  segundos + 7 js
        tempoSegundos = 15;
        quantidadeDeJs = 20;
    }

    //inserindo os segundos
    document.getElementById('cronometro').innerHTML = tempoSegundos;

    //quantidade de baloes
    let quantidadeJs = quantidadeDeJs;

    criaJs(quantidadeJs);

    //cria as quantidades
    document.getElementById('icon_inteiros').innerHTML = quantidadeJs;
    document.getElementById('icon_estourados').innerHTML = 0;

    contagemTempo(tempoSegundos + 1);

}

//contanto os segundos 
function contagemTempo(segundos) {

    segundos = segundos - 1;

    if (segundos == -1) {
        clearTimeout(timerId); //para o tempo
        gameOver();
        return false;
    }
    // mostra os segundos
    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagemTempo(" + segundos + ")", 1000);

}

function gameOver() {

    alert('Fim de jogo, você perdeu.');

    removeEventoEstourar();

} situacaoJogo;

function criaJs(quantidadeJs) {
    var url = window.location.search;
    var nivelGame = url.replace("?", "");

  
    var image = "";
    if(nivelGame == 1){
        image  = "level_1";
    }else if(nivelGame == 2){
        image  = "level_2";
    }else if(nivelGame == 3){
        image = "level_3";
    }else if(nivelGame == 4){
        image = "level_4";
    }else if(nivelGame == 5){
        image = "level_5";
    }
 
    for (let i = 1; i <= quantidadeJs; i++) {
        let javascript = document.createElement("div");
        javascript.style.background = `url("imagens/${image}.png")`; // esse ${} chama tempplate string, tem que usar `` aos invez de ''
        javascript.style.margin = '10px';
        javascript.style.width = "60px";
        javascript.style.height = "60px";
        javascript.style.cursor = "pointer";
        javascript.style.border = "none";
        javascript.id = 'b' + i;
        javascript.onclick = function () { 
            estourar(this);
         }
        document.getElementById('fundo').appendChild(javascript);

    }
}

function estourar(e) {
    let idJs = e.id;

    document.getElementById(idJs).setAttribute("onclick", "");
    document.getElementById(idJs).style.background = "url('imagens/pow1.png')";
    
    pontuacao(-1);
}
function pontuacao(acao) {
    var inteiros = document.getElementById('icon_inteiros').innerHTML;
    var estourados = document.getElementById('icon_estourados').innerHTML;

    inteiros = parseInt(icon_inteiros);
    estourados = parseInt(estourados);

    inteiros = inteiros + acao;
    estourados = estourados - acao;

    document.getElementById('inteiros').innerHTML = inteiros;
    document.getElementById('estourados').innerHTML = estourados;

    situacaoJogo(inteiros);
}
function situacaoJogo(inteiros) {
    if (inteiros == 0) {
        alert('Parabéns, você venceu');
        paraJogo();

    }
}

function removeEventoEstourar() {

    var i = 1;

    while (document.getElementById('b' + 1)) {

        document.getElementById('b' + 1).onclick = '';
        i++;
    }
}
function voltaOpt() {
    window.history.go(-1);
    return false;
}

function paraJogo() {
    clearTimeout(timerId);
}