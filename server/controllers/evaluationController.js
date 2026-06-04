const Evaluation = require("../models/Evaluation");
const { calculateMean } = require("../utils/calculateMean");

const createEvaluation = async (req, res, next) => {
  try {
    const {
      participantName,
      program,
      participantType,
      email,
      eventTitle,
      ratings,
      activities,
      satisfaction,
      enjoyMost,
      improvementSuggestions,
    } = req.body;

    const meanRating = calculateMean(Object.values(ratings));

    const evaluation = new Evaluation({
      participantName: participantName || "Anonymous",
      program: program || "BS Food Technology",
      participantType,
      email,
      eventTitle,
      ratings,
      activities,
      satisfaction,
      enjoyMost,
      improvementSuggestions,
      meanRating,
    });

    const savedEvaluation = await evaluation.save();
    res.status(201).json(savedEvaluation);
  } catch (error) {
    next(error);
  }
};

const ADMIN_RESPONSE_LIMIT = 245;

const getEvaluations = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find()
      .sort({ createdAt: -1 })
      .limit(ADMIN_RESPONSE_LIMIT);
    res.json(evaluations);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEvaluation, getEvaluations };
