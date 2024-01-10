//pegando variaveis

const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botoesNumeros = document.querySelectorAll(".num");
const botaoOperadores = document.querySelectorAll(".operador");


//variaveis globais --> estado da calculadora

let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

function atualizaDisplay(){
    display.value = operacaoAtual;
}

function insereNumero(evento){
    if (calculando){ //5+
        operacaoAtual = evento.target.textContent;
        calculando = false;
    }else{
        operacaoAtual += evento.target.textContent; //55185+5155
    }
    atualizaDisplay();
}


function inserePonto(){
    if (operacaoAtual.indexOf("." === -1)){
        operacaoAtual += ".";
        atualizaDisplay()
    }
}

function insereOperador(evento){
    if (operacaoAtual !== ""){
        if (!calculando){ //true 5+
            if (operador !== null){ // 5+5
                calcula();
            }
            valorAnterior = operacaoAtual; //5+6
            operacaoAtual = "";
        }
        operador = evento.target.textContent; //se nenhum operador esta sendo usado, add a variavel oeprador o operador que sera utilizado
    }
}

function calcula(){
    let resultado = null;
    const  operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);

    switch (operador) {
        case "+":
            resultado = operandoAnterior + operandoAtual;
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;
            break;
        case "*":
            resultado = operandoAnterior * operandoAtual;
            break;
        case "/":
            if (operandoAtual !== 0) {
                resultado = operandoAnterior / operandoAtual;
            } else {
                alert("Erro: Divisão por zero não é permitida!");
                return;
            }
            break;
    }
    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    atualizaDisplay();
}
//eventos

//forEach add evento em cada botao
botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero));
botaoPonto.addEventListener("click", inserePonto);
botaoOperadores.forEach((botao) =>
    botao.addEventListener("click", insereOperador)
);botaoIgual.addEventListener("click", () => {
    if (operador !== null && operacaoAtual !== "" && !calculando) {
        calcula();
        operador = null;
    }
});



// A ideia é que, quando o usuário clica em um botão de operação (por exemplo, adição, subtração, etc.),
// a calculadora entra em um estado de cálculo. Nesse estado, o próximo número digitado reinicia a operação. Quando não está em um estado de cálculo, os números
// digitados são adicionados à operação atual. Essa lógica é útil para lidar com a entrada de dígitos e operações em uma calculadora.





