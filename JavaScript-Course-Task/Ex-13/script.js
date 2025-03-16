const TIME = [];

function adicionarJogador(nome, idade, posicao, pontuacao) {
    TIME.push({
        nome: nome,
        idade: idade,
        posição: posicao,
        pontuação: pontuacao
    });
}

function buscarPorPosicao(posicao) {
    let setJogadoresPosicao = new Set();
    for (let jogador of TIME) {
        if (jogador.posição == posicao) setJogadoresPosicao.add(jogador);
    }
    return [...setJogadoresPosicao];
}

function listarTime() {
    TIME.forEach(jogador => console.log(jogador));
}

function calcularPontuacaoMedia() {
    return (TIME.reduce((acum, val) => acum + val.pontuação, 0) / TIME.length).toFixed(2);
}


const mensagemMenu = `Escolha uma das alternativas dispostas abaixo:\n
1 - Adicionar jogador\n2 - Buscar por posição
3 - Listar time\n4 - Calcular pontuação média\n5 - Sair`


let respUsuario;
let doLoop = true;
while (doLoop) {
    respUsuario = prompt(mensagemMenu)?.trim();
    // if (userResp === undefined) break;

    if (!/^(1|2|3|4|5)$/.test(respUsuario)) {
        // alert("Erro: Entrada inválida! Escolha uma das alternativas disponíveis presentes no menu principal.");
        continue;
    }

    switch (respUsuario) {
        case "1":
            let nomeJogador = prompt("Digite o nome do novo jogador:")?.trim();
            let idadeJogador = parseInt(prompt("Digite a idade do novo jogador:")?.trim());
            let posicaoJogador = prompt("Digite a posição do novo jogador:")?.trim().toLocaleLowerCase();
            let pontuacaoJogador = parseFloat(prompt("Digite a pontuação do novo jogador:")?.trim());
            adicionarJogador(nomeJogador, idadeJogador, posicaoJogador, pontuacaoJogador);
            break;
        case "2":
            let jogadoresObtidos = buscarPorPosicao(prompt("Informe a posição desejada:")?.trim().toLocaleLowerCase());
            if (jogadoresObtidos.length > 0) {
                console.log("Lista de Jogadores Correspondentes com a Posição Fornecida:");
                jogadoresObtidos.forEach(jogador => console.log(jogador));
            } else console.log("Nenhum jogador com a posição especificada encontrado.");
            break;
        case "3":
            listarTime();
            break;
        case "4":
            console.log(`A pontuação média atual de todos os jogadores é: ${calcularPontuacaoMedia()}.`);
            break;
        case "5":
            doLoop = false;
            break;
    }
}
