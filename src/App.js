import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const url = "https://docs.google.com/spreadsheets/d/1X0qv89SZdiE8W2PSIY6JNvN_duZfnktg/gviz/tq?tqx=out:csv&gid=756807159";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//atualizar

  function atualizar() {
    window.location.reload();
    alert("Bem-vindo!");
  }

//pesquisar

function pesquisar() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const resultadoDiv = document.getElementById("resultado");
  const livrosDestaqueDiv = document.getElementById("livrosDestaque");

  // Limpa o resultado anterior
  resultadoDiv.innerHTML = "";
  livrosDestaqueDiv.innerHTML = "";

  // Filtra os livros com base no título
  const resultadosFiltrados = data.filter((livro) =>
      livro["TÍTULO"] && livro["TÍTULO"].toLowerCase().includes(termo)
  );

  // Exibe os resultados filtrados
  if (resultadosFiltrados.length > 0) {
      var cont = 1
      resultadosFiltrados.forEach((livro) => {
          const livroDiv = document.createElement("div");
          livroDiv.className = "livro"; // Adiciona uma classe para estilização
          livroDiv.id = "livro"+cont
          
          
          
          const titulo = document.createElement("h3");
          titulo.className = "titulo-livro"; // Classe para o título
          titulo.textContent = livro["TÍTULO"];

          const imagem = document.createElement("img");
          imagem.className = "imagem-livro"; // Classe para a imagem
          imagem.src = livro.IMAGEM;
          
          livroDiv.appendChild(imagem);
          livroDiv.appendChild(titulo);
          
          livrosDestaqueDiv.appendChild(livroDiv);
          var identifi = "livro"+cont
          var elemento = document.getElementById(identifi)
          elemento.onclick = function() {
            Livro(livro)}
          cont ++
      });
  } else {
      resultadoDiv.textContent = "Nenhum resultado encontrado.";
  }
}


  function Destaque(livros) {
    
    
    // Ordena os livros pela propriedade 'v v' (com espaço)
    livros.sort(() => Math.random() - 0.5);


    
    // Seleciona os 10 primeiros livros após a ordenação
    const destacados = livros.slice(0, 10);
    
    console.log("Livros destacados:", destacados);

    // Inicializa o contador
    let cont = 1;

    // Percorre cada livro destacado usando forEach
    destacados.forEach((item) => {
        console.log(`Item: ${item.TÍTULO}, Contador: ${cont}`); // Usando a propriedade correta para título
        
        // Cria o elemento de título e define seu conteúdo
        const tituloElem = document.createElement('h3');
        tituloElem.textContent = item["TÍTULO "]; // Acessando a propriedade "TÍTULO" com colchetes
        
        // Gera o ID e obtém o elemento pelo ID
        const id = "top" + cont;
        const topElem = document.getElementById(id);
        
        // Verifica se o elemento existe antes de adicionar o conteúdo
        if (topElem) {
            // Cria o elemento de imagem e define seus atributos
            const imgElem = document.createElement('img');
            imgElem.src = item.IMAGEM; // Acessando a propriedade "IMAGEM" com colchetes
            
            
            // Adiciona a imagem e o título ao elemento correspondente
            topElem.appendChild(imgElem);
            topElem.appendChild(tituloElem);
            console.log(`Adicionado ao ID "${id}": ${item.TÍTULO}`);
            console.log(item)
            // Adiciona um evento de clique ao elemento
            topElem.onclick = function() {
                Livro(item); // Presumindo que 'Livro' é uma função definida em outro lugar
            };
        } else {
            console.warn(`Elemento com ID "${id}" não encontrado.`);
        }
        
        cont++;
    });
}

function Livro(item) {
  
  // Exibe o objeto para depuração
  console.log(item); // Verifique a estrutura do objeto

  // Cria um objeto URLSearchParams
  const params = new URLSearchParams();

  // Adiciona cada propriedade do item como um parâmetro individualmente
  params.append("titulo", item["TÍTULO "] || '');
  params.append("autor", item["AUTOR"] || '');
  params.append("imagem", item["IMAGEM"] || '');
  params.append("descricao", item["DESCRIÇÃO"] || '');
  params.append("devolucao", item["DEVOLUÇÃO"] || '');
  params.append("emprestados", item["EMPRESTADOS"] || '');
  params.append("exemplares", item["EXEMPLARES"] || '');
  params.append("genero", item["GÊNERO"] || '');
  params.append("situacao", item["SITUAÇÃO"] || '');
  params.append("v_v", item["v v"] || ''); // Note que estamos usando "_" para evitar problemas com espaços

  // Redireciona para a página livro.html com os parâmetros
  window.location.href = 'livro.html?' + params.toString();
}




  // useEffect para buscar dados
  useEffect(() => {
    console.log(data)
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true });
        setData(parsedData.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // useEffect para configurar o botão apenas após o carregamento
  useEffect(() => {
    
    if (!loading) {
      Destaque(data)
      const button = document.getElementById('logo');
      const pesquisar = document.getElementById("pesquisa");
      if (pesquisar){
        pesquisar.onclick = pesquisar;
      }

      if (button) {
        button.onclick = atualizar;
      }

      return () => {
        if (button) {
          button.onclick = null;
        }
        if(pesquisar) {
          pesquisar.onclick = null;
        }
      };
    }
  }, [loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }



  window.pesquisar = pesquisar;
}

export default App;