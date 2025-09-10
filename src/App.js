import React, { useState } from "react";
import { getGlobalQuote } from "./alphaVantage";

function App() {
  //States
  const [symbol, setSymbol] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  //Checks for valid input and calls API if input is valid, throws an error if not
  const handleCheckStock = async () => {
    setError("");
    setQuote(null);

    if (!symbol.trim()) {
      setError("Please enter a stock symbol.");
      return;
    }

    const data = await getGlobalQuote(symbol.toUpperCase());

    if (data && Object.keys(data).length > 0) {
      setQuote(data);
    } else {
      setError("No data found. Try another symbol (BTC, ETH, AAPL)");
    }
  }; 

  //UI
  return (
    <div>
    <div class="header"style={{ fontFamily: "Arial, sans-serif", padding: "20px", fontSize: "45px", color: "green" }}>Stocklens</div>
    <div style={{fontSize:"20px", color:"black"}}>Welcome to Stocklens! Enter a stock symbol in the text box below to get started</div>
      <div id="sub-header"style={{ fontFamily: "Arial, sans-serif", padding: "20px", marginBottom: "10px" }}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g. BTC, ETH, AAPL)"
          style={{ padding: "8px", fontSize: "16px", font: "Verdana" }}
        />
        <button
          onClick={handleCheckStock}
          style={{
            marginLeft: "10px",
            padding: "8px 12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          >Check Stock
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {quote && (
        <div style={{ marginTop: "20px" }}>
          <h2>Stock Data for {quote["01. symbol"]}🪙</h2>
          <p>Price: {quote["05. price"]}</p>
          <p>Change: {quote["09. change"]}</p>
          <p>Change Percent: {quote["10. change percent"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
