// livro.js
function espacos(texto) {
    return texto.replace(/\+/g, ' ');
}

// Exemplo de uso
const stringOriginal = "Este+é+um+exemplo+de+string+com+caracteres+de+mais.";
const stringModificada = espacos(stringOriginal);

console.log(stringModificada); // Saída: "Este é um exemplo de string com caracteres de mais."

function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(param => {
        const [key, value] = param.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

window.onload = function() {
    const livroItem = getQueryParams();

    if (livroItem) {
        var imagem = document.getElementById("imagem")
        var titulo =document.getElementById("titulo")
        var informacoes = document.getElementById("informacoes")
        var emprestimo =document.getElementById("emprestimo")
        var Timagem = espacos(livroItem["imagem"])
        var Tdescricao = espacos(livroItem["descricao"])
        var Tgenero =espacos(livroItem["genero"])

        imagem.innerHTML = `<img src="${Timagem}" alt="" />`
        titulo.innerHTML= `<h3>Autor: ${livroItem["autor"]}</h3>`
        informacoes.innerHTML =`<h2 id="titulo2">Informações
        <h3>Autor: ${livroItem["autor"]}</h3>
        <h3>Genero: ${livroItem["genero"]}</h3>
        <br>
        <h3 id="descricao">Descrição</h3>
        <p id="textos">${Tdescricao}`

        
    } else {
        document.getElementById('livroDetalhes').textContent = 'Nenhum dado disponível.';
    }
};
