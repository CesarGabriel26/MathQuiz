let caixa_resposta = document.getElementById("caixa_resposta")
let caixa_opcoes = document.querySelector(".opcoes")
let caixa_valor2 = document.getElementById("caixa_valor2")
let erro = document.querySelector(".erro")
let Vidas_container = document.querySelector(".vidas")
let pontuacao = document.querySelector(".pontuacao")


var Bloco_Colocado = null

var Valor_sorteado1
var Valor_sorteado2

var OneShot = true

var Vidas_totais = 5
var Vidas_Atuais = 0

var pontuacao_ = 0

setInterval(Mostrar_botao_confirmar, 100);

Atualizar_Vidas("Iniciando")

function IniciarJogo() {
    Reset()

    Valor_sorteado1 = parseInt(Math.random() * 100)
    Valor_sorteado2 = parseInt(Math.random() * 100)


    var resultado = Valor_sorteado1 + Valor_sorteado2

    caixa_valor2.innerHTML = `<p> ${Valor_sorteado2} </p>`

    caixa_resposta.innerHTML = `<p> ${resultado} </p>`

    GerarOpcoes()
}

function Reset() {
    Bloco_Colocado = null
    caixa_opcoes.innerHTML = ""
    caixa_valor2.innerHTML = ""
    caixa_resposta.innerHTML = ""
    OneShot = true
    document.getElementById("caixa").innerHTML = ""
}

function GerarOpcoes() {


    for (let index = 0; index < 10; index++) {
        caixa_opcoes.innerHTML += `<div class= "Cubos_resposta" id="Cubo${index}" draggable="true" ondragstart="drag_(event)"><p>${parseInt(Math.random() * 100)}</p></div>`
    }

    let Cubos = document.querySelectorAll(".Cubos_resposta")


    var id = parseInt(Math.random() * Cubos.length)

    Cubos[id].innerHTML = `<p>${Valor_sorteado1}</p>  `

}

function Mostrar_botao_confirmar() {
    let botao = document.getElementById("BTN")

    if (Bloco_Colocado) {
        botao.style.display = "block"
    } else {
        botao.style.display = "none"
    }

    botao.addEventListener('click', () => {
        Confirmar_Valor_Indicado()
    })
}

function Confirmar_Valor_Indicado() {
    if (Bloco_Colocado) {
        var Valor = Number(Bloco_Colocado.textContent)

        if (Valor == Valor_sorteado1) {
            if (OneShot) {

                PlaySound("../audio/Acerto.mp3", "")
                initConfetti()
                OneShot = false
                pontuacao_ += 500
                pontuacao.innerHTML = pontuacao_
            }
        }else {
            if (OneShot) {
                PlaySound("../audio/Errado.mp3", "")
                OneShot = false
    
                erro.classList.add("error")
    
            }
        }

        if (pontuacao_ >= 10000) {
            
            OneShot = true
            if (OneShot) {
                WinGame()
                OneShot = false
            }
        }

    }
}


function PlaySound(AudioPath, Stado) {
    var sound = document.createElement('audio');
    sound.src = AudioPath;

    OneShot = true
    if (OneShot) {
        sound.play()
        OneShot = false
    }

    sound.addEventListener("ended", () => {
        if (Stado != "GameOver") {
            IniciarJogo()
        }

        if (AudioPath == "../audio/Errado.mp3") {
            erro.classList.remove("error")
            Atualizar_Vidas("")

        }

    })
}

function gamepver() {

    document.body.innerHTML += `
    
    <div id="gameOver">

        <h1>Sua Pontuação foi de</h1>

        <h2 id="Pontos"></h2>


        <br>
        <br>

        <button onclick="location.reload()">Jogar novamente ?</button>

    </div>
    
    `

    let gameover_ = document.getElementById("gameOver")
    gameover_.style.display = "flex"

    let pontos = document.getElementById("Pontos")
    pontos.innerHTML = pontuacao_
}
function WinGame() {

    

    let gameover_ = document.getElementById("WinGame")
    gameover_.style.display = "flex"

    OneShot = true
    if (OneShot) {
        gameover_.innerHTML = `
    
    

    <h1>Parabens Sua Pontuação foi de</h1>

    <h2 id="WinGamePontos"></h2>


    <br>
    <br>

    <button onclick="location.reload()">Jogar novamente ?</button>

    <div style = "display: flex; margin-top: 82px;"> 
    
        <div style = "display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <p>Programação</p>
            <img style = "height: 200px;" src= "img/criadores/Ray.png">
        </div>

        <div style = "display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <p>Arte</p>
            <img style = "height: 200px;"  src= "img/criadores/Ellye.png">
        </div>
    
    </div>

 
    
    `
        OneShot = false
    }

    let pontos = document.getElementById("WinGamePontos")
    pontos.innerHTML = pontuacao_
}

/* Vidas */

function Atualizar_Vidas(Stado) {

    if (Stado == "Iniciando") {
        for (let index = 0; index < Vidas_totais; index++) {
            Vidas_container.innerHTML += ` <img src="img/vida.png" id="Vida"> `
        }

        Vidas_Atuais = Vidas_totais;
        pontuacao.innerHTML = "0"

    } else {

        let vidas = document.querySelectorAll("#Vida");

        vidas[(Vidas_Atuais - 1)].src = "img/vida perdida.png"
        Vidas_Atuais -= 1
        ChecarVida()
    }

}

function ChecarVida() {
    if (Vidas_Atuais == 0) {
        OneShot = true
        if (OneShot) {
            PlaySound("../audio/Vitoria.mp3", "GameOver")
            gamepver()
        }
    }
}


/* Drag and drop */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag_(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    Bloco_Colocado = null
}

function drop(ev) {

    if (!ev.target.id.includes("Cubo")) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");

        if (!ev.target.id.includes("caixa_opcao")) {
            Bloco_Colocado = document.getElementById(data)
        }

        ev.target.appendChild(document.getElementById(data));
    }
}  