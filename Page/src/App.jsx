import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [predictions, setPredictions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trendingStock, setTrendingStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null); // State to track hovered row

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recommendationResponse = await axios.get("http://localhost:5000/recommendations");
        setRecommendations(recommendationResponse.data);

        const trendingResponse = await axios.get("http://localhost:5000/trending-stock");
        setTrendingStock(trendingResponse.data);

        const predictionResponse = await axios.get("http://localhost:5000/predictions", {
          headers: { "Content-Type": "application/json" },
        });
        setPredictions(predictionResponse.data);

        fetch("http://localhost:5000/predictions")
          .then((response) => response.json())
          .then((data) => console.log("Data fetched with fetch API:", data))
          .catch((error) =>
            console.error("Error fetching data with fetch API:", error)
          );
      } catch (err) {
        const errorMsg = err.response
          ? `Error: ${err.response.status} - ${err.response.data}`
          : "Failed to fetch data. Ensure the backend is running and accessible.";
        setError(errorMsg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.header}>Recommendations for Tomorrow</h1>
        {recommendations.length > 0 ? (
          <ul style={styles.list}>
            {recommendations.map((rec, index) => (
              <li key={index} style={styles.listItem}>
                <strong>{rec.symbol}</strong> - Avg Price: ${rec.avg_price.toFixed(2)} - Predicted Trend:{" "}
                {rec.predicted_trend}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noData}>"No recommendations available. Stocks with an 'up' trend may not meet confidence, risk, or movement thresholds to ensure prudent decision-making."</p>
        )}

        <h2 style={styles.subHeader}>Trending Stocks for Today</h2>
        {trendingStock ? (
          <div style={styles.trending}>
            <p><strong>Symbol:</strong> {trendingStock.symbol}</p>
            <p><strong>Highest Price:</strong> ${trendingStock.highest_price.toFixed(2)}</p>
            <p><strong>Timestamp:</strong> {new Date(trendingStock.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p style={styles.noData}>No trending stock data available.</p>
        )}

        <h3 style={styles.header}>Stocks (Predictions)</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Symbol</th>
              <th>Price (Today)</th>
              <th>Timestamp (Today)</th>
              <th>Predicted Trend (Tomorrow)</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction, index) => (
              <tr
                key={index}
                style={{
                  ...styles.tableRow,
                  backgroundColor: hoveredRowIndex === index ? styles.tableRowHover.backgroundColor : (index % 2 === 0 ? styles.tableRowEven.backgroundColor : styles.tableRowOdd.backgroundColor)
                }}
                onMouseEnter={() => setHoveredRowIndex(index)} // Set hovered index
                onMouseLeave={() => setHoveredRowIndex(null)} // Clear hovered index
              >
                <td style={styles.tableCell}>{prediction.symbol}</td>
                <td style={styles.tableCell}>{prediction.price.toFixed(2)}</td>
                <td style={styles.tableCell}>
                  {new Date(prediction.timestamp?.value || prediction.timestamp).toLocaleString()}
                </td>
                <td style={styles.tableCell}>{prediction.predicted_trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    margin: "20px auto",
    maxWidth: "1000px",
    padding: "20px",
    backgroundColor: "#f0f4f8",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "2.5em",
    color: "#2c3e50",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: "1.8em",
    color: "#2980b9",
    marginTop: "30px",
    marginBottom: "10px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    backgroundColor: "#ecf0f1",
    borderBottom: "1px solid #bdc3c7",
  },
  tableRowHover: {
    backgroundColor: "#dfe6e9",
  },
  tableRowEven: {
    backgroundColor: "#ecf0f1",
  },
  tableRowOdd: {
    backgroundColor: "#ffffff",
  },
  tableCell: {
    padding: "10px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    textAlign: "left",
  },
  listItem: {
    margin: "10px 0",
    padding: "15px",
    border: "1px solid #bdc3c7",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  trending: {
    padding: "20px",
    border: "1px solid #bdc3c7",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  loading: {
    fontSize: "1.8em",
    color: "#8e44ad",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: "1.2em",
    textAlign: "center",
  },
  noData: {
    color: "#7f8c8d",
    fontStyle: "italic",
    textAlign: "center",
  },
};

export default App;
