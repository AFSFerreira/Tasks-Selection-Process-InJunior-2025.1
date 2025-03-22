function capitalizeStr(stringPattern) {
    return stringPattern.charAt(0).toUpperCase() + stringPattern.slice(1);
}

function getAge(birthYear) {
    return new Date().getFullYear() - birthYear;
}

function verificarIdades(birthYearArray) {
    let verifiedAges = birthYearArray.map(year => getAge(year) >= 18 ? "maior" : "menor");
    let stringBuffer = "";
    for (let index = 0; index < birthYearArray.length; index++) {
        stringBuffer += `Pessoa ${index + 1}: ${capitalizeStr(verifiedAges[index])} de idade\n`;
    }
    alert(stringBuffer)

    return verifiedAges;
}
