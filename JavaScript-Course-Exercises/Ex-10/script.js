function convertQueueClientsToString(customersQueue, customersCounter = 0) {
    return customersQueue.reduce((stringAcum, currentVal) =>
        stringAcum + `${++customersCounter}° ${currentVal}` +
        (currentVal !== customersQueue[customersQueue.length - 1] ? ", " : "."), "");
}

let queueOfCustomers = [];
const menuMessage = `Bem Vindo ao simulador de fila de espera em uma central 
de atendimento ao cliente! Pressione o botão correspondente para:\n\n1. Novo Cliente 
2. Atender Cliente\n3. Sair\n\n`

let userResp;
let customerBeingServed = null;
let doLoop = true;
while (doLoop) {
    userResp = prompt(menuMessage + 
        "• Cliente sendo Atualmente Atendido: " + (customerBeingServed !== null ? customerBeingServed : "< Nenhum >") + "\n" + 
        "• Estado Atual da Fila: " + (queueOfCustomers.length > 0 ? convertQueueClientsToString(queueOfCustomers)
        : "< Fila Vazia >"))
        ?.trim();

    // if (userResp === undefined) break;

    if (!/^(1|2|3)$/.test(userResp)) {
        // alert("Erro: Entrada inválida! Escolha uma das alternativas disponíveis presentes no menu principal.");
        continue;
    }

    switch (userResp) {
        case "1":
            queueOfCustomers.push(prompt("Insira o nome do novo cliente:"));
            break;
        case "2":
            customerBeingServed = queueOfCustomers.length > 0 ? queueOfCustomers.shift() : customerBeingServed;
            break;
        case "3":
            doLoop = false;
            break;
    }
}
