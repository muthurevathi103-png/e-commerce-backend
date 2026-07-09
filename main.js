const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

const dbConnection = require("./config/dbConnection");

// Database
dbConnection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});