function main() {
    let userInput;
    while (true) {
        userInput = prompt("Informe um valor inteiro positivo para calcular seu fatorial:")?.trim();
        if (/[.,]/.test(userInput)) {
            alert("Erro: Entrada inválida. Insira apenas valores inteiros positivos.");
            continue;
        }
        userInput = parseInt(userInput);
        if (isNaN(userInput) || userInput < 0) {
            alert("Erro: Entrada inválida. Insira apenas valores inteiros positivos.");
            continue;
        }
        break;
    }

    let [initialVal, factorialValue] = [userInput, 1];
    while (initialVal > 1) factorialValue *= (initialVal--);

    alert(`O valor do fatorial de ${userInput} corresponde a: ${factorialValue}.`)
}


let userResp = 'S';
while (userResp === 'S') {
    main();
    while (!/^[S|N]$/.test(userResp = prompt("Deseja calcular o fatorial de um novo valor? (\'S\' // \'N\')")?.toUpperCase())) {
        alert("Erro: Alternativa inválida. Escolha apenas entre \'S\' ou \'N\'.");
    }
}
