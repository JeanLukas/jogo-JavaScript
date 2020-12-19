let timerId = null //armazena chamadas da funçao timeout

function boasVindas(){
alert('Seja Bem Vindo ao meu joguinho, clique no botão verde para proseguir')
}

function iniciaGame(){
var nivel_game = document.getElementById('nivel_game').value
    
    window.location.href = 'game.html?' + nivel_game
}

function IniciaGame(){

   var url = window.location.search

   var nivelGame = url.replace("?", "")

   var tempoSegundos = 0; 

   if(nivelGame == 1){//1 nivel 240 segundos + 48 js
        
    tempoSegundos = 240
   }

   if(nivelGame == 2){//2 nivel 120 segundos + 35 js
    tempoSegundos = 120
   }
   
   if(nivelGame == 3){//3 nivel 60  segundos + 24 js
    tempoSegundos = 60
   }

   if(nivelGame == 4){//4 nivel 30  segundos + 14 js
    tempoSegundos = 30
   }

   if(nivelGame == 5){//5 nivel 15  segundos + 7 js
    tempoSegundos = 15
   }

   //inserindo os segundos
   document.getElementById('cronometro').innerHTML = tempoSegundos
   
   //quantidade de baloes
   let quantidadeJs = 48
   
   criaJs(quantidadeJs)

   //cria as quantidades
   document.getElementById('js_inteiro').innerHTML = quantidadeJs
   document.getElementById('js_estourados').innerHTML = 0

   contagemTempo(tempoSegundos + 1)

   }
   
   function contagemTempo(segundos){

        segundos = segundos - 1

        if(segundos == -1) {
            clearTimeout(timerId) //para o tempo
            gameOver()
            return false
        }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagemTempo("+segundos+")", 1000)

   }

function gameOver(){

    alert('Fim de jogo, você perdeu.')

}

function criaJs(quantidadeJs){

        for( let i = 1; i <= quantidadeJs; i++) {

            let javascript = document.createElement("img")
            javascript.src = 'imagens/jssmall.png'
            javascript.style.margin = '10px'
            javascript.id = 'b' + i
            javascript.onclick = function(){ estourar(this) }
            document.getElementById('fundo').appendChild(javascript)
        }
}

function estourar(e) {
    let idJs = e.id

    document.getElementById(idJs).src = 'imagens/jssmallestourado.png'
    
    pontuacao(-1)
}

function pontuacao(acao){
    var jsInteiro = document.getElementById('js_inteiro').innerHTML
    var jsEstourado = document.getElementById('js_estourado').innerHTML
    
    jsInteiro = parseInt(jsInteiro)
    jsEstourado = parseInt(jsEstourado)

    jsInteiro = jsInteiro + acao
    jsEstourado = jsEstourado - acao

    document.getElementById('js_inteiro').innerHTML = jsInteiro
    document.getElementById('js_inteiro').innerHTML = jsEstourado
    
    situacaoJogo(jsInteiro)
}

function situacaoJogo(jsInteiro, jsEstourado){
    if(jsInteiro == 0){
        alert('Parabéns, você venceu')
        paraJogo()
    }
}

function paraJogo() {
    clearTimeout(timerId)
}