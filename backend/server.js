// backend/server.js
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5050;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4028", "http://127.0.0.1:4028"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Load data
const DATA_FILE = "./data/card-data.json";
const EQUIP_FILE = "./data/equipment-data.json";

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

// Get all equipment data
app.get("/api/equipment", (req, res) => {
  try {
    const equipment = JSON.parse(fs.readFileSync(EQUIP_FILE, "utf-8"));
    res.json(equipment);
  } catch (error) {
    console.error("Error reading equipment file:", error);
    res.status(500).json({ error: "Failed to load equipment data" });
  }
});
// Get equipment by ID
app.get("/api/equipment/:id", (req, res) => {
  try {
    const equipment = JSON.parse(fs.readFileSync(EQUIP_FILE, "utf-8"));
    const id = req.params.id;
    const item = equipment.find((eq) => eq.id.toString() === id.toString());

    if (!item) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error reading equipment file:", error);
    res.status(500).json({ error: "Failed to load equipment data" });
  }
});
// Get instruction data by type
app.get("/api/instructions/:type", (req, res) => {
  try {
    const instructions = JSON.parse(
      fs.readFileSync("./data/instruction.json", "utf-8")
    );

    const { type } = req.params;
    console.log(type);
    const result = instructions.find(
      (item) => item.type.toLowerCase() === type.toLowerCase()
    );
    if (!result) {
      return res
        .status(404)
        .json({ error: `No instructions found for type: ${type}` });
    }
    res.json(result);
  } catch (error) {
    console.error("Error reading instructions file:", error);
    res.status(500).json({ error: "Failed to load instruction data" });
  }
});

app.get("/api/specifications/:type", (req, res) => {
  try {
    const specs = JSON.parse(
      fs.readFileSync("./data/specification-data.json", "utf-8")
    );
    const item = specs.find((s) => s.type === req.params.type);

    if (!item) {
      return res.status(404).json({ error: "Specification type not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error reading specifications file:", error);
    res.status(500).json({ error: "Failed to load specifications data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
