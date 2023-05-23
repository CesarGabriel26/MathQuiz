var Falas = [

    ["Bem vindo ao Math Quiz, aqui faremos perguntas basicas de matematica", "img/Alpha/Explicação.png"],
    ["e espero que você se saia bem", "img/Alpha/Explicação.png"],
    ["Este jogo é muit facil de jogar, apenas clique nas opções a baixo", "img/Alpha/Atenção.png"],
    ["e a arraste até o quadrado vasio acima", "img/Alpha/Atenção.png"],
    ["mais cuidado caso erre perdera um lapis (suas vidas)", "img/Alpha/Atenção.png"],
    ["porem se acertar ganhara pontos que serão mostrados no final", "img/Alpha/Explicação.png"],
    ["Boa sorte pequeno(a) guerreiro(a)", "img/Alpha/Boa sorte.png"],


]


let Img = document.getElementById("Img")
let Tutorial = document.getElementById("Tutorial")
let Text_box = document.getElementById("Text_box")

var index = 0
var fim = true


if (Tutorial) {
    Img.src = Falas[index][1]
    Text_box.innerHTML = Falas[index][0]
}

setInterval(ProximaFala, 3000)

function ProximaFala() {
    if (fim) {
        if (index >= 6) {
            Tutorial.remove();
            IniciarJogo()
            fim = false
            return
        }

        index++
        Img.src = Falas[index][1]
        Text_box.innerHTML = Falas[index][0]


    }
}

function SkipFala() {
    Tutorial.remove();
    IniciarJogo()
    fim = false
    return
}