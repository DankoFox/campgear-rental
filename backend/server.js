// backend/server.js
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data
const DATA_FILE = "./data/card-data.json";

app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(data);
});

// Add new item
app.post("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  data.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Item added", data });
});

// Delete item by id
app.delete("/api/data/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const id = req.params.id;
  data = data.filter((item) => item.id != id);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Item deleted", data });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
