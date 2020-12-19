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

   var tempoSegundos = 0

   let quantidadeDeJs = 0

   if(nivelGame == 1){//1 nivel 240 segundos + 48 js
        
    tempoSegundos = 240
    quantidadeDeJs = 48
   }

   if(nivelGame == 2){//2 nivel 120 segundos + 35 js
    tempoSegundos = 120
    quantidadeDeJs = 35
   }
   
   if(nivelGame == 3){//3 nivel 60  segundos + 24 js
    tempoSegundos = 60
    quantidadeDeJs = 24
   }

   if(nivelGame == 4){//4 nivel 30  segundos + 14 js
    tempoSegundos = 30
    quantidadeDeJs = 14
   }

   if(nivelGame == 5){//5 nivel 15  segundos + 7 js
    tempoSegundos = 15
     quantidadeDeJs = 7
   }

   //inserindo os segundos
   document.getElementById('cronometro').innerHTML = tempoSegundos
   
   //quantidade de baloes
   let quantidadeJs = quantidadeDeJs
   
   criaJs(quantidadeJs)

   //cria as quantidades
   document.getElementById('js_inteiros').innerHTML = quantidadeJs
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

    removeEventoEstourar()

}situacaoJogo

function criaJs(quantidadeJs){

        for( let i = 1; i <= quantidadeJs; i++) {

            let javascript = document.createElement("img")
            javascript.src = 'imagens/jssmall1.png'
            javascript.style.margin = '10px'
            javascript.id = 'b' + i
            javascript.onclick = function(){ estourar(this) }
            document.getElementById('fundo').appendChild(javascript)
        }
}

function estourar(e) {
    let idJs = e.id

    document.getElementById(idJs).setAttribute("onclick", "")
    document.getElementById(idJs).src = 'imagens/jssmallestourado.png'
    
    pontuacao(-1)
}

function pontuacao(acao){
    var jsInteiros = document.getElementById('js_inteiros').innerHTML
    var jsEstourados = document.getElementById('js_estourados').innerHTML
    
    jsInteiros = parseInt(jsInteiros)
    jsEstourados = parseInt(jsEstourados)

    jsInteiros = jsInteiros + acao
    jsEstourados = jsEstourados - acao

    document.getElementById('js_inteiros').innerHTML = jsInteiros
    document.getElementById('js_estourados').innerHTML = jsEstourados
    
    situacaoJogo(jsInteiros)
}
function situacaoJogo(jsInteiros){
    if(jsInteiros == 0){
        alert('Parabéns, você venceu')
        paraJogo()
    }
}

function removeEventoEstourar(){

    var i = 1 

    while(document.getElementById('b' + 1)){
       
        document.getElementById('b' + 1).onclick = ''
        i++   
    }
}

function paraJogo() {
    clearTimeout(timerId)
}