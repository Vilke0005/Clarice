import React from 'react';
import Papa from 'papaparse';

const url = "https://docs.google.com/spreadsheets/d/1sCS8U7wHxJlir6CNmV2RuVI490eoRcyXnvVesXQnBUI/gviz/tq?tqx=out:csv&gid=0"
function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Estado de carregamento
  const [error, setError] = React.useState(null); // Estado de erro

  React.useEffect(() => {
    console.log('fetch data !');

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true });
        setData(parsedData.data);
      } catch (err) {
        console.error(err);
        setError(err.message); // Define a mensagem de erro
      } finally {
        setLoading(false); // Define o carregamento como false
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
  console.log(data)
  return (
    <div className="App">
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
  );
}

export default App;

