let serverPath = String(window.location.href);
let relativePathWolfJson = "/Midias/lobinhos.json"

function getSubstringPosition(string, subString, nth_occur) {
    return string.split(subString, nth_occur).join(subString).length;
}

export async function inicializarLocalStorage() {
    if (localStorage.getItem('lobos')) return;

    try {
        const response = await fetch(String(serverPath.substring(0, getSubstringPosition(serverPath, '/', 3))) + relativePathWolfJson);
        if (!response.ok) {
            throw new Error(`Erro ao buscar lobinho.json: ${response.statusText}`);
        }
        const lobos = await response.json();
        localStorage.setItem('lobos', JSON.stringify(lobos));
        console.log('Lobos inicializados no localStorage');
    } catch (error) {
        console.error('Erro ao inicializar o localStorage:', error);
    } finally {
        console.log('Tentativa de inicialização do localStorage concluída');
    }
}


inicializarLocalStorage().then(() => {
    console.log('Inicialização do localStorage concluída');
}).catch(error => {
    console.error('Erro durante a inicialização do localStorage:', error);
});



