// livro.js
function espacos(texto) {
    return texto.replace(/\+/g, ' ');
}

// Exemplo de uso
const stringOriginal = "Este+é+um+exemplo+de+string+com+caracteres+de+mais.";
const stringModificada = espacos(stringOriginal);

console.log(stringModificada); // Saída: "Este é um exemplo de string com caracteres de mais."
function carregarCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "livroR.css"; // Substitua pelo caminho correto
    link.type = "text/css";

    document.head.appendChild(link); // Adiciona o link ao head
}

// Chame a função para carregar o CSS
carregarCSS();

function getQueryParams() {
    carregarCSS()
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
        var Tautor = espacos(livroItem["autor"])
        var exemplares = +livroItem["exemplares"] || 0;
        var emprestados = +livroItem["emprestados"] || 0;
        console.log(livroItem)
        var TTitulo = espacos(livroItem["titulo"])
        var InforEmprestino =document.getElementById("informacoesEmprestimo")
        
        var disponivel = exemplares-emprestados;
        if (disponivel<=0){
            disponivel = 0
            emprestimo.innerHTML = `<h3 id="indisponivel">Indisponivel</h3>`
        } else if (disponivel>0){
            emprestimo.innerHTML = `<h3 id="disponivel">Disponivel</h3>`
        }
        else {
            emprestimo.innerHTML = `<h3 id="disponivel">Erro</h3>`
        }

        

        imagem.innerHTML = `<img src="${Timagem}" alt="" />`
        titulo.innerHTML= `<h3>Autor: ${Tautor}</h3>`
        informacoes.innerHTML =`<h2 id="titulo2">Informações
        <hr>
        <h3>Titulo: ${TTitulo}</h3>
        <h3>Autor: ${Tautor}</h3>
        <h3>Genero: ${Tgenero}</h3>
        <br>
        <h3 id="descricao">Descrição</h3>
        <hr>
        <p id="textos">${Tdescricao}
        <h2 id="titulo3">Informações de emprestimo</h2>
        <hr>
        <h3>Exemplares: ${exemplares}</h3>
        <h3>Emprestados: ${emprestados}</h3>
        <h3>Disponivel para emprestimo: ${disponivel}</h3>`
        InforEmprestino.innerHTML = `
        `
        

        
    } else {
        document.getElementById('livroDetalhes').textContent = 'Nenhum dado disponível.';
    }
};
