function fibonacci(n, fibSequence = []) {
    if (n <= 0) return fibSequence;

    if (fibSequence.length <= 1) {
        if (fibSequence.length === 1) fibSequence.push(1);
        if (fibSequence.length === 0) fibSequence.push(0);
    } else {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]);
    }

    return fibonacci(n - 1, fibSequence);
}

let userValue = parseInt(prompt("Informe um número (valor inteiro positivo) de termos desejados da sequência de fibonacci:")?.trim());
if (!isNaN(userValue)) alert("Sequência obtida:\n" + fibonacci(userValue).reduce((acum, current_value) => acum + `• ${current_value};\n`, ""));
