const express = require("express");
const router = express.Router();
const {
  getAnalyticsData,
  getMeanAnalytics,
} = require("../controllers/analyticsController");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", protectAdmin, getAnalyticsData);
router.get("/means", protectAdmin, getMeanAnalytics);

module.exports = router;
