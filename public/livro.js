// livro.js

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

        imagem.innerHTML = `<img src="${livroItem["imagem"]}" alt="${livroItem["descricao"]}" />`
        titulo.innerHTML= `<h3>Autor: ${livroItem["autor"]}</h3>`
        informacoes.innerHTML =`<h2>Informações</h2><br>
        <h3>Autor: ${livroItem["autor"]}</brsss`

        
    } else {
        document.getElementById('livroDetalhes').textContent = 'Nenhum dado disponível.';
    }
};
