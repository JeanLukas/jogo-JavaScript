alert('Seja Bem Vindo ao meu joguinho, clique no botão verde para proseguir')

function iniciaGame(){
var nivel_game = document.getElementById('nivel_game').value
    
    window.location.href = 'game.html?' + nivel_game

}

