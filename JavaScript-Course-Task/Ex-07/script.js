let userPhrase = prompt("Digite uma frase para verificar se ela representa um palíndromo:");

let userPhraseNormalized = userPhrase.trim().toLowerCase().replace(" ", "");
let userPhraseReversed = userPhraseNormalized.split("").reverse().join("");

alert(`A frase ${userPhrase}${userPhraseNormalized !== userPhraseReversed ? " não" : ""} é um palíndromo!`);
