const express = require("express");
const { BigQuery } = require("@google-cloud/bigquery");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET"],
  })
);

const bigquery = new BigQuery({
  projectId: "stockanalysis-444512",
  keyFilename: "C:/Stock_pred/stockanalysis-444512-3fd7af0c6e0a.json", // Make sure this path is accessible
});

app.get("/predictions", async (req, res) => {
  console.log("Received a request for /predictions"); // Log request
  try {
    const query = `
      SELECT symbol, price, timestamp, predicted_trend
      FROM stockanalysis-444512.stock_analysis.stream_mltobq
      ORDER BY timestamp DESC
      LIMIT 100
    `;
    const [rows] = await bigquery.query(query);
    console.log("Query successful, sending response:", rows); // Log data
    res.json(rows);
  } catch (error) {
    console.error("Error querying BigQuery:", error); // Log error
    res.status(500).send("Error querying BigQuery");
  }
});

app.get("/recommendations", async (req, res) => {
  try {
    const query = `
      SELECT symbol, AVG(price) as avg_price, predicted_trend
      FROM stockanalysis-444512.stock_analysis.stream_mltobq
      WHERE DATE(timestamp) = CURRENT_DATE() - 1
      GROUP BY symbol, predicted_trend
      ORDER BY predicted_trend DESC, avg_price DESC
      LIMIT 5
    `;
    const [rows] = await bigquery.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error querying BigQuery for recommendations:", error);
    res.status(500).send("Error querying for recommendations");
  }
});

app.get("/trending-stock", async (req, res) => {
  try {
    const query = `
      SELECT symbol, MAX(price) as highest_price, timestamp
      FROM stockanalysis-444512.stock_analysis.stream_mltobq
      WHERE DATE(timestamp) = CURRENT_DATE()
      GROUP BY symbol, timestamp
      ORDER BY highest_price DESC
      LIMIT 1
    `;
    const [rows] = await bigquery.query(query);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error querying BigQuery for trending stock:", error);
    res.status(500).send("Error querying for trending stock");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
