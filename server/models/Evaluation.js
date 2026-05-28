const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  organization: { type: Number, required: true, min: 1, max: 5 },
  timeManagement: { type: Number, required: true, min: 1, max: 5 },
  venue: { type: Number, required: true, min: 1, max: 5 },
  programFlow: { type: Number, required: true, min: 1, max: 5 },
  speakers: { type: Number, required: true, min: 1, max: 5 },
  participation: { type: Number, required: true, min: 1, max: 5 },
  teamwork: { type: Number, required: true, min: 1, max: 5 },
  learning: { type: Number, required: true, min: 1, max: 5 },
  relevance: { type: Number, required: true, min: 1, max: 5 },
  overallExperience: { type: Number, required: true, min: 1, max: 5 },
});

const evaluationSchema = new mongoose.Schema(
  {
    participantName: { type: String, trim: true, default: "Anonymous" },
    program: { type: String, trim: true, default: "BS Food Technology" },
    participantType: {
      type: String,
      enum: ["Student"],
      required: true,
    },
    email: { type: String, trim: true, lowercase: true },
    eventTitle: { type: String, required: true, trim: true },
    ratings: { type: ratingSchema, required: true },
    activities: [{ type: String, trim: true }],
    satisfaction: {
      type: String,
      enum: ["Poor", "Fair", "Good", "Excellent"],
      required: true,
    },
    enjoyMost: { type: String, trim: true },
    improvementSuggestions: { type: String, trim: true },
    meanRating: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
