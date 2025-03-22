realToEuro = real => real / 6.10
realToDolar = real => real / 5.70

let userValueInReal = parseFloat(prompt("Informe uma quantia em reais para ser convertida em Euros e Dólares:")?.trim().replace(",", "."))
if (!isNaN(userValueInReal))
    alert(`Seu valor convertido é:\n• Euros: €${String(realToEuro(userValueInReal).toFixed(2)).replace(".", ",")}\n• Dólares: $${String(realToDolar(userValueInReal).toFixed(2)).replace(".", ",")}`)
