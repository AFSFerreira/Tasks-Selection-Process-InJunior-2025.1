let userNumber = parseInt(prompt("Por favor, insira um número inteiro:"));

let isDivBy3 = userNumber % 3 == 0;
let isDivBy5 = userNumber % 5 == 0;

if (isDivBy3 && isDivBy5) console.log("fizzbuzz");
else if (isDivBy3) console.log("fizz");
else if (isDivBy5) console.log("buzz");
