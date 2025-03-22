function evalDiscriminant(coefA, coefB, coefC) {
    return coefB * coefB - 4 * coefA * coefC;
}

function getQuadraticEqRoots(coefA, coefB, coefC) {
    let discriminantValue = evalDiscriminant(coefA, coefB, coefC);
    if (discriminantValue < 0) return null;
    let sqrtDisc = Math.sqrt(discriminantValue);

    coefA <<= 1;
    let [bOver2A, sqrtDiscOver2A] = [((-1) * coefB) / coefA, sqrtDisc / coefA];

    return [bOver2A + sqrtDiscOver2A, bOver2A - sqrtDiscOver2A]
}

function main() {
    let quadraticCoefficients = [];

    let qty = 0;
    while (qty < 3) {
        let userValue = parseFloat(prompt(`Insira o valor do coeficiente \'${String.fromCharCode(97 + qty)}\':`)?.trim().replace(",", "."));
        if (isNaN(userValue)) {
            alert("Erro: Entrada inválida. Por favor, insira apenas números reais.");
            continue;
        }
        if (qty === 0 && userValue === 0) {
            alert("Erro: o coeficiente \'a\' não pode ser igual a zero.");
            continue;
        }
        quadraticCoefficients[qty++] = userValue;
    }

    let eqRoots = getQuadraticEqRoots(...quadraticCoefficients);
    if (eqRoots === null) {
        alert(`A equação não possui raízes reais.`);
        return;
    }

    if (eqRoots[0] === eqRoots[1]) {
        alert(`As raízes da equação são: x1, x2 = ${Math.round(eqRoots[1]).toFixed(2)}. (raíz dupla)`);
        return;
    }

    alert(`As raízes da equação são: x1 = ${Math.round(eqRoots[0]).toFixed(2)}, x2 = ${Math.round(eqRoots[1]).toFixed(2)}.`);
}

main();
