function limpar(){
    let divi = document.getElementById("livrosDestaque")
    divi.innerHTML = ""
}
function Destaque(livros) {
    // Ordena os livros pela propriedade 'lidos'
    livros.sort((a, b) => b.vv - a.vv);
    
    // Pega os 10 primeiros livros
    const destacados = livros.slice(0, 10);
    
    console.log(destacados);
    
    // Usa map para percorrer os livros destacados
    let n=0
    let cont =1;
    let lista =[]
    destacados.map((item, index) => {
        console.log(`Item: ${item.titulo}, Índice: ${index}`);
        
        let titulo1 = document.createElement('h3');
        titulo1.textContent = item.titulo; // Usa o item
        console.log(item)
        lista.push(cont)
        let id = "top" + cont; // Gera o ID
        let top1 = document.getElementById(id); // Obtém o elemento pelo ID
        mensagem = "Mensagem "+ cont;
        if (top1) {
             // Verifica se o elemento existe
            let img1 = document.createElement('img');
            img1.src = item.imagem; // Usa o item
            img1.alt = item.descricao; // Usa o item
            
            top1.appendChild(img1);
            top1.appendChild(titulo1);
            console.log(cont)
            Numero = " "+cont
            top1.onclick = function() {
            Livro(Numero, item);};
        } else {
            console.warn(`Elemento com ID "${id}" não encontrado.`);
        }
        n++
        console.log(id);
        cont++;
    });
}

function atualizar() {
    location.reload();
}
function pesquisar(){
    limpar()
    document.getElementById('pesquisa').value = '';
}

function Livro(cot, ...item){
    console.log(item)
    alert(cot)
    
} 



