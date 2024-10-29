import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const url = "https://docs.google.com/spreadsheets/d/1X0qv89SZdiE8W2PSIY6JNvN_duZfnktg/gviz/tq?tqx=out:csv&gid=756807159";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function atualizar() {
    window.location.reload();
    alert("Bem-vindo!");
  }
  function Destaque(livros) {
    // Ordena os livros pela propriedade 'v v' (com espaço)
    livros.sort((a, b) => b["v v"] - a["v v"]);
    
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
        tituloElem.textContent = item["TÍTULO"]; // Acessando a propriedade "TÍTULO" com colchetes
        
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

  function Livro(...item){
    console.log(item)
  alert("fucional")
    
  } 

  // useEffect para buscar dados
  useEffect(() => {
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
    console.log(data)
    if (!loading) {
      Destaque(data)
      const button = document.getElementById('logo');
      if (button) {
        button.onclick = atualizar;
      }

      return () => {
        if (button) {
          button.onclick = null;
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

  /*return (
    <div className="App">
      <h1>Meus Dados</h1>
      <button id="logo">Clique aqui!</button>
      {data.length === 0 ? (
        <div>Nenhum dado encontrado.</div>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((Pessoa, index) => (
              <tr key={index}>
                {Object.values(Pessoa).map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );*/
}

export default App;
