const maxTime = 240;
const minItems = 10;

var timer, game, containerMenu, containerGame, btnStart = null;

function iniApp(){
    btnStart = document.querySelector('#container_action').querySelector('.play');
    btnStart.onclick = function(){
        let lvlValue = document.querySelector('#container_lvl').querySelector('select').value;
        startGame(lvlValue);
    }
    containerMenu = document.querySelector('#container_menu');
    containerGame = document.querySelector('#container_game');
    clearGame();
}


function clearGame(){
    game = {
        time: 0,
        level: 0,
        items: 0,
        nopows: 0,
        pows: 0
    }
    clearInterval(timer);
    containerGame.querySelector('.right').querySelector('.boxGame').innerHTML = "";
    
}

function drawGame(game){
    game.items.forEach(element => {
        containerGame.querySelector('.right').querySelector('.boxGame').append(element)
    });
}


function startGame(lvl){
    game.level = parseInt(lvl);
    game.time = setGameTime(lvl);
    game.items = setGameItems(lvl);

    timer = setInterval(timerCount, 1000);

    containerMenu.style.display = 'none';
    containerGame.style.display = 'grid';
    drawGame(game);
}

function setGameTime(lvl){
    if(lvl < 1){ lvl = 1; };

    return maxTime / lvl;
}

function setGameItems(lvl){
    if(lvl < 1){ lvl = 1; };

    let qtdItems = minItems*lvl;

    game.nopows = qtdItems;

    let itemsArray = new Array(qtdItems);

    for(let i = 0; i < qtdItems; i++){
        let item_ = document.createElement("img");
        item_.src = "./img/jssmall.png";
        item_.id = 'b'+i;
        item_.setAttribute('class','itemJs');
        item_.onclick = function(){
            item_.src = './img/jssmallestourado.png';
            game.nopows -= 1;
            game.pows += 1;

            containerGame.querySelector('.itemsCount').querySelector('div').innerHTML = game.nopows;
            containerGame.querySelector('.itemsPow').querySelector('div').innerHTML = game.pows;
        }
        itemsArray[i] = item_;
    }

    return itemsArray;
}

function timerCount(){
    if(game.nopows < 1){
        alert('Você venceu!');
        let newLevel = game.level += 1;
        
        
    }

    if(game.time < 1){
        alert('Você falhou!');
        clearGame();
        startGame(1);
        return;
    }

    game.time -= 1;
    containerGame.querySelector('.timeBox').querySelector('div').innerHTML = game.time;
}

iniApp();