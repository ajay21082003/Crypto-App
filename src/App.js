import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://openapiv1.coinstats.app/coins', {
          headers: {
            accept: 'application/json',
            'X-API-KEY': 'HWIplVMcZnG7/1rBo3RRS9TyMneC0eCCKYWXzK3ddFo='
          }
        });
        setCurrency(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h2>CryptoScreener</h2>
      <input type="text" placeholder="search.." onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume(24hr)</th>
          </tr>
        </thead>
        <tbody>
          {currency &&
            currency
              .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))
              .map((val) => {
                return (
                  <tr key={val.id}>
                    <td>{val.rank}</td>
                    <td>
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt={val.name} />
                      </a>
                      <p>{val.name}</p>
                    </td>
                    <td>{val.symbol}</td>
                    <td>${val.marketCap}</td>
                    <td className='price'>${val.price.toFixed(4)}</td>
                    <td>{val.availableSupply}</td>
                    <td>{val.volume.toFixed(0)}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
