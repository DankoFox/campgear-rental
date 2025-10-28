// campgear-rental/pages/AdminDashboard/purchaseLogs.js

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock purchase data (matching your real products)
let mockPurchaseLogs = [
 {
      id: 1,
      total: 520000,
      date: "2025-10-21",
      items: [
        { name: "Tent Alpha", brand: "NaturePro", category: "Camping" },
        { name: "Sleeping Bag Lite", brand: "MountainEdge", category: "Camping" },
      ],
    },
    {
      id: 2,
      total: 310000,
      date: "2025-10-10",
      items: [
        { name: "Trail Boots", brand: "TrekStar", category: "Footwear" },
      ],
    },
    {
      id: 3,
      total: 460000,
      date: "2025-09-28",
      items: [
        { name: "Camping Lantern", brand: "LightMax", category: "Lighting" },
        { name: "Cooking Set", brand: "FirePeak", category: "Kitchen" },
      ],
    },
    {
      id: 4,
      total: 280000,
      date: "2025-09-14",
      items: [
        { name: "Water Bottle", brand: "AquaTrail", category: "Accessories" },
      ],
    },
    {
      id: 5,
      total: 720000,
      date: "2025-09-01",
      items: [
        { name: "Backpack 50L", brand: "HikeMate", category: "Backpacks" },
        { name: "Hiking Socks", brand: "TrekStar", category: "Footwear" },
      ],
    },
    {
      id: 6,
      total: 640000,
      date: "2025-08-27",
      items: [
        { name: "Headlamp X2", brand: "LightMax", category: "Lighting" },
        { name: "Camping Chair", brand: "NaturePro", category: "Camping" },
      ],
    },
    {
      id: 7,
      total: 250000,
      date: "2025-08-12",
      items: [
        { name: "Cooking Pot", brand: "FirePeak", category: "Kitchen" },
      ],
    },
    {
      id: 8,
      total: 810000,
      date: "2025-08-05",
      items: [
        { name: "Tent Omega", brand: "MountainEdge", category: "Camping" },
        { name: "Lantern Mini", brand: "LightMax", category: "Lighting" },
      ],
    },
    {
      id: 9,
      total: 360000,
      date: "2025-07-25",
      items: [
        { name: "Rain Jacket", brand: "SkyGuard", category: "Clothing" },
      ],
    },
    {
      id: 10,
      total: 470000,
      date: "2025-07-12",
      items: [
        { name: "Cooking Stove", brand: "FirePeak", category: "Kitchen" },
        { name: "Fuel Canister", brand: "FirePeak", category: "Kitchen" },
      ],
    },
    {
      id: 11,
      total: 540000,
      date: "2025-07-01",
      items: [
        { name: "Trekking Poles", brand: "TrekStar", category: "Accessories" },
      ],
    },
    {
      id: 12,
      total: 680000,
      date: "2025-06-28",
      items: [
        { name: "Hiking Backpack", brand: "HikeMate", category: "Backpacks" },
      ],
    },
    {
      id: 13,
      total: 380000,
      date: "2025-06-14",
      items: [
        { name: "Thermal Mug", brand: "AquaTrail", category: "Accessories" },
      ],
    },
    {
      id: 14,
      total: 290000,
      date: "2025-06-05",
      items: [
        { name: "Camping Rope", brand: "NaturePro", category: "Camping" },
      ],
    },
    {
      id: 15,
      total: 430000,
      date: "2025-05-30",
      items: [
        { name: "Portable Grill", brand: "FirePeak", category: "Kitchen" },
      ],
    },
    {
      id: 16,
      total: 610000,
      date: "2025-05-18",
      items: [
        { name: "Sleeping Pad", brand: "MountainEdge", category: "Camping" },
        { name: "Lantern Max", brand: "LightMax", category: "Lighting" },
      ],
    },
    {
      id: 17,
      total: 390000,
      date: "2025-05-04",
      items: [
        { name: "Rain Pants", brand: "SkyGuard", category: "Clothing" },
      ],
    },
    {
      id: 18,
      total: 740000,
      date: "2025-04-20",
      items: [
        { name: "Backpack 70L", brand: "HikeMate", category: "Backpacks" },
        { name: "Boots Pro", brand: "TrekStar", category: "Footwear" },
      ],
    },
    {
      id: 19,
      total: 280000,
      date: "2025-04-05",
      items: [
        { name: "Beanie Hat", brand: "SkyGuard", category: "Clothing" },
      ],
    },
    {
      id: 20,
      total: 450000,
      date: "2025-03-22",
      items: [
        { name: "Water Filter", brand: "AquaTrail", category: "Accessories" },
        { name: "Thermal Socks", brand: "TrekStar", category: "Footwear" },
      ],
    },
];

/** ✅ Add a new mock purchase */
export async function addPurchaseLog(total, items) {
  await delay(300);
  const newLog = {
    id: mockPurchaseLogs.length + 1,
    date: new Date().toISOString(),
    total,
    items,
  };
  mockPurchaseLogs.push(newLog);
  console.log("✅ Mock purchase added:", newLog);
  return newLog;
}

/** ✅ Get all mock purchase logs */
export async function getPurchaseLogs() {
  await delay(500);
  console.log("📦 Mock purchase logs fetched:", mockPurchaseLogs.length);
  return mockPurchaseLogs;
}
