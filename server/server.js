const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const evaluationRoutes = require("./routes/evaluationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "PAFT-NSC Evaluation API is running." });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
