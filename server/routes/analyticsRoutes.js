const express = require("express");
const router = express.Router();
const {
  getAnalyticsData,
  getMeanAnalytics,
  getByEventData,
} = require("../controllers/analyticsController");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", protectAdmin, getAnalyticsData);
router.get("/means", protectAdmin, getMeanAnalytics);
router.get("/by-event", protectAdmin, getByEventData);

module.exports = router;
