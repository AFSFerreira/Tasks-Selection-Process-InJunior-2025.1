let numbersQuantity = parseInt(prompt("Informe a quantidade de números que serão inseridos no no Array:"));
const arrayOfNumbers = [];
let qtyOrderedNumbers = 0;

for (let qty = 0; qty < numbersQuantity; qty++) {
    arrayOfNumbers.push(parseInt(prompt(`Informe o ${qty + 1}° número: `)?.trim()));
    if (arrayOfNumbers.length < 2) continue;
    qtyOrderedNumbers += arrayOfNumbers[arrayOfNumbers.length - 1] > arrayOfNumbers[arrayOfNumbers.length - 2] ? 1 : 0;
}

alert(`Array Fornecido: [${arrayOfNumbers}]\n\nA quantidade de pares de números consecutivos ordenados presentes no array corresponde a ${qtyOrderedNumbers}.`);
