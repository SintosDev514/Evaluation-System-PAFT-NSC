const express = require("express");
const router = express.Router();
const {
  createEvaluation,
  getEvaluations,
} = require("../controllers/evaluationController");
const { protectAdmin } = require("../middleware/authMiddleware");

router.post("/", createEvaluation);
router.get("/", protectAdmin, getEvaluations);

module.exports = router;
