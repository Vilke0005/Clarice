import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const url = "https://docs.google.com/spreadsheets/d/1sCS8U7wHxJlir6CNmV2RuVI490eoRcyXnvVesXQnBUI/gviz/tq?tqx=out:csv&gid=0";

function App() {
  // Estados
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função de clique
  function atualizar() {
    window.location.reload();
    alert("Bem-vindo!")
}

  // useEffect para configurar o botão
  useEffect(() => {
    const button = document.getElementById('logo');

    if (button) {
      button.onclick = atualizar;
    }

    return () => {
      if (button) {
        button.onclick = null; // Remove o evento de clique
      }
    };
  }, []);

  // useEffect para buscar dados
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch data !');
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

  // Mensagem de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Mensagem de erro
  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Exibindo os dados
  /*return (
    <div className="App">
      <h1>Meus Dados</h1>
      <button id="meuBotao">Clique aqui!</button>
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
