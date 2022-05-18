import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [raspuns, setRaspuns] = useState([]);
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      "tags[0]": "defi",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      "X-RapidAPI-Key": "971b9c7f82msh91a495b4d8f21bcp1ac28ejsn7f82b7c768b7",
    },
  };

  const getCoins = async () => {
    try {
      const resp = await axios.request(options);
      setRaspuns(resp.data.data.coins);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(raspuns);
  useEffect(() => {
    getCoins();
    const interval = setInterval(() => {
      getCoins();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="tabel-coins">
        <div className="cap-tabel">
          <h1>Name</h1>
          <h1>Price</h1>
          <h1>Market Cap</h1>
        </div>

        <div className="all-coins">
          {raspuns.map((rsp) => {
            return (
              <div className="coin-container">
                <div className="container">
                  <img src={rsp.iconUrl} alt="" width={30} height={30} />
                  <h3 style={{ marginLeft: "10px" }}>{rsp.name}</h3>
                </div>
                <div className="container">
                  <h4>{parseFloat(rsp.price).toFixed(3)}$</h4>
                </div>
                <div className="container">
                  <h4> {rsp.marketCap} $ </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
