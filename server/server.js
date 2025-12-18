import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

// ─────────────────────────────────────────────
// Load environment variables
// ─────────────────────────────────────────────
dotenv.config();

// ─────────────────────────────────────────────
// Connect to MongoDB
// ─────────────────────────────────────────────
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────

// CORS – allow frontend to access backend
const allowedOrigins = process.env.CORS_ORIGIN
  ? [process.env.CORS_ORIGIN]
  : true; // allow all in development

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger (useful on EC2)
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Health check (VERY IMPORTANT for EC2 / Load balancers)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lunoré API Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Lunoré API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      products: "/api/products",
      cart: "/api/cart",
      health: "/api/health",
    },
  });
});

// ─────────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error:
      process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ─────────────────────────────────────────────
// Start Server (EC2 SAFE)
// ─────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log("=".repeat(55));
  console.log("🚀 Lunoré API Server started successfully");
  console.log(`📡 Listening on port: ${PORT}`);
  console.log(`🧠 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌍 Accepting external connections (EC2 ready)`);
  console.log("=".repeat(55));
});
