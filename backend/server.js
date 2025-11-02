// backend/server.js
import express from "express";
import fs from "fs";
import cors from "cors";
// import mysql from "mysql2";

const app = express();
const PORT = 5050;
//If use DB instead of json use the comment code
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "campgear_db",
//   port: 3307,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL database");
//   }
// });

app.use(
  cors({
    origin: [
      "http://localhost:4028",
      "http://127.0.0.1:4028",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const DATA_FILE = "./data/card-data.json";
const EQUIP_FILE = "./data/equipment-data.json";
const USER_FILE = "./data/user-list.json";
const PURCHASE_LOG_FILE = "./data/purchaseLogs.json";

app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(data);
});

app.post("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  data.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Item added", data });
});

app.delete("/api/data/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const id = req.params.id;
  data = data.filter((item) => item.id != id);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Item deleted", data });
});

app.get("/api/equipment", (req, res) => {
  try {
    const equipment = JSON.parse(fs.readFileSync(EQUIP_FILE, "utf-8"));
    res.json(equipment);
  } catch (error) {
    console.error("Error reading equipment file:", error);
    res.status(500).json({ error: "Failed to load equipment data" });
  }
});
app.post("/api/equipment", (req, res) => {
  try {
    const equipment = JSON.parse(fs.readFileSync(EQUIP_FILE, "utf-8"));
    const newEquipmentData = req.body;

    const requiredFields = [
      "name",
      "brand",
      "type",
      "price",
      "location",
      "availability",
    ];
    for (const field of requiredFields) {
      if (!newEquipmentData[field]) {
        return res.status(400).json({ error: `Field "${field}" is required` });
      }
    }

    // Generate unique random 5-digit ID
    let newId;
    do {
      newId = Math.floor(10000 + Math.random() * 90000); // 10000-99999
    } while (equipment.some((eq) => eq.id === newId));

    // Rebuild object with id on top
    const newEquipment = {
      id: newId,
      ...newEquipmentData,
      image: Array.isArray(newEquipmentData.image)
        ? newEquipmentData.image
        : [],
      features: Array.isArray(newEquipmentData.features)
        ? newEquipmentData.features
        : [],
    };

    equipment.push(newEquipment);
    fs.writeFileSync(EQUIP_FILE, JSON.stringify(equipment, null, 2), "utf-8");

    res.status(201).json(newEquipment);
  } catch (error) {
    console.error("Error creating equipment:", error);
    res.status(500).json({ error: "Failed to create equipment" });
  }
});

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

app.get("/api/instructions/:type", (req, res) => {
  try {
    const instructions = JSON.parse(
      fs.readFileSync("./data/instruction.json", "utf-8")
    );

    const { type } = req.params;
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

app.get("/api/purchase-logs", (req, res) => {
  try {
    const logs = JSON.parse(fs.readFileSync(PURCHASE_LOG_FILE, "utf-8"));
    res.json(logs);
  } catch (error) {
    console.error("Error reading purchase logs:", error);
    res.status(500).json({ error: "Failed to load purchase logs" });
  }
});

app.post("/api/purchase-logs", (req, res) => {
  try {
    // Ensure file exists
    if (!fs.existsSync(PURCHASE_LOG_FILE)) {
      fs.writeFileSync(PURCHASE_LOG_FILE, "[]");
    }

    const logs = JSON.parse(fs.readFileSync(PURCHASE_LOG_FILE, "utf-8"));
    const { total, deliveryOption, timeSlot, items } = req.body;

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      total,
      deliveryOption,
      timeSlot,
      items,
    };

    logs.push(newLog);
    fs.writeFileSync(PURCHASE_LOG_FILE, JSON.stringify(logs, null, 2));

    res.status(200).json({ message: "Purchase logged", newLog });
  } catch (error) {
    console.error("Error writing purchase logs:", error);
    res.status(500).json({ error: "Failed to save purchase log" });
  }
});
export async function addPurchaseLog(total, deliveryOption, timeSlot, items) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, deliveryOption, timeSlot, items }),
    });

    if (!res.ok) throw new Error("Failed to save purchase log");
    const newLog = await res.json();
    console.log("✅ Purchase saved:", newLog);
    return newLog;
  } catch (err) {
    console.error("❌ Error adding purchase log:", err);
    return null;
  }
}

/** ✅ Get all purchase logs */
export async function getPurchaseLogs() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch purchase logs");
    const logs = await res.json();
    console.log("📦 Loaded purchase logs:", logs.length);
    return logs;
  } catch (err) {
    console.error("❌ Error fetching purchase logs:", err);
    return [];
  }
}
// // === Register user using MySQL ===
// app.post("/api/register", (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   // Check if user already exists
//   db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
//     if (err) {
//       console.error(" Database error:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     // Insert new user
//     const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//     db.query(sql, [username, email, password], (err2, result) => {
//       if (err2) {
//         console.error(" Insert error:", err2);
//         return res.status(500).json({ error: "Failed to register user" });
//       }

//       console.log(" New user added:", { id: result.insertId, username, email });
//       res.status(201).json({
//         message: "User registered successfully",
//         user: { id: result.insertId, username, email },
//       });
//     });
//   });
// });

//for json file
app.post("/api/register", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(USER_FILE, "utf-8"));
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = users.find(
      (u) => u.username === username || u.email === email
    );
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));

    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error saving new user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all unique types
app.get("/api/types", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(EQUIP_FILE, "utf-8"));
    // Normalize case and remove duplicates
    const types = [
      ...new Set(data.map((item) => item.type.trim().toLowerCase())),
    ];
    // Return capitalized for nicer display
    const formattedTypes = types.map(
      (t) => t.charAt(0).toUpperCase() + t.slice(1)
    );
    res.json(formattedTypes);
  } catch (error) {
    console.error("Error reading types:", error);
    res.status(500).json({ error: "Failed to load types" });
  }
});

// Get all unique brands
app.get("/api/brands", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(EQUIP_FILE, "utf-8"));
    const brands = [...new Set(data.map((item) => item.brand.trim()))];
    res.json(brands);
  } catch (error) {
    console.error("Error reading brands:", error);
    res.status(500).json({ error: "Failed to load brands" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
