function encontrarElementoUnico(arrayNumerosInteiros) {
    let valorUnico = arrayNumerosInteiros.reduce((acum, valor) => acum ^= valor, 0);
    alert(`O valor único presente no array fornecido corresponde à \'${valorUnico}\'.`);
    return valorUnico;
}
