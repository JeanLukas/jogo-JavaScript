let timerId = null; //armazena chamadas da funçao timeout

//mensagem de boas vindas 
function boasVindas(){
alert('Seja Bem Vindo ao meu joguinho, clique no botão verde para proseguir');
}

//chama do index pro game
function iniciaGame(){
var nivel_game = document.getElementById('nivel_game').value;
    
    window.location.href = 'game.html?' + nivel_game;
}

//começa o game
function IniciaGame(){
    var url = window.location.search;
    var nivelGame = url.replace("?", "");
   var url = window.location.search;

   var nivelGame = url.replace("?", "");

   var tempoSegundos = 0;

   let quantidadeDeJs = 0;

   var bg = document.getElementById("fundo");
    bg.style.backgroundImage = `url('./imagens/cenario_nivel_${nivelGame}.png')`;
   if(nivelGame == 1){//1 nivel 60 segundos + 48 js
        
    tempoSegundos = 60;
    quantidadeDeJs = 48;
   }

   if(nivelGame == 2){//2 nivel 50 segundos + 35 js
    tempoSegundos = 50;
    quantidadeDeJs = 35;
   }
   
   if(nivelGame == 3){//3 nivel 30  segundos + 35 js
    tempoSegundos = 30;
    quantidadeDeJs = 35;
   }

   if(nivelGame == 4){//4 nivel 20  segundos + 30 js
    tempoSegundos = 20;
    quantidadeDeJs = 30;
   }

   if(nivelGame == 5){//5 nivel 15  segundos + 40 js
    tempoSegundos = 15;
     quantidadeDeJs = 40;
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
   
   //conta os segundos
   function contagemTempo(segundos){

        segundos = segundos - 1;

        if(segundos == -1) {
            clearTimeout(timerId); //para o tempo
            gameOver();
            return false;
        }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagemTempo("+segundos+")", 1000);

   }

   //caso você nao consigo acertar tudo perde
function gameOver(){
    
    alert('Fim de jogo, você perdeu.');

    removeEventoEstourar();

}situacaoJogo;

//cria a quantidade e cria as medidas das imagens e muda o mapa no nivel
function criaJs(quantidadeJs){
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

//muda o icone quando "estoura"
function estourar(e) {
    let idJs = e.id;

    document.getElementById(idJs).setAttribute("onclick", "");
    document.getElementById(idJs).style.background = "url('imagens/pow1.png')"
    
    pontuacao(-1);
}

//muda a pontuaçao
function pontuacao(acao){
    var jsInteiros = document.getElementById('icon_inteiros').innerHTML;
    var jsEstourados = document.getElementById('icon_estourados').innerHTML;
    
    jsInteiros = parseInt(jsInteiros);
    jsEstourados = parseInt(jsEstourados);

    jsInteiros = jsInteiros + acao;
    jsEstourados = jsEstourados - acao;

    document.getElementById('icon_inteiros').innerHTML = jsInteiros;
    document.getElementById('icon_estourados').innerHTML = jsEstourados;

    situacaoJogo(jsInteiros);
}
//aparece quando termina antes do tempo
function situacaoJogo(jsInteiros){
    if(jsInteiros == 0){
        alert('Parabéns, você venceu');
        paraJogo();
        
    }
}
//funçao para nao poder clicar mais 
function removeEventoEstourar(){

    var i = 1 ;

    while(document.getElementById('b' + 1)){
       
        document.getElementById('b' + 1).onclick = '';
        i++   ;
    }
}
//botao para voltar no menu de escolher
function voltaOpt() {
    window.history.go(-1);
     return false;
    }

//para o jogo
function paraJogo() {
    clearTimeout(timerId);
}