import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import events from "../data/events";
import { submitEvaluation } from "../services/evaluationService";

const ratingLabels = [1, 2, 3, 4, 5];
const activityOptions = [
  "Games",
  "Team Building",
  "Speakers",
  "Food",
  "Awards",
  "Workshops",
  "Social Interaction",
];

const EvaluationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    participantName: "",
    program: "BS Food Technology",
    participantType: "Student",
    email: "",
    eventTitle: event?.title || "",
    ratings: {
      organization: 5,
      timeManagement: 5,
      venue: 5,
      programFlow: 5,
      speakers: 5,
      participation: 5,
      teamwork: 5,
      learning: 5,
      relevance: 5,
      overallExperience: 5,
    },
    activities: [],
    satisfaction: "Excellent",
    enjoyMost: "",
    improvementSuggestions: "",
  });

  const ratingQuestions = useMemo(
    () => [
      { name: "organization", label: "Organization" },
      { name: "timeManagement", label: "Time Management" },
      { name: "venue", label: "Venue" },
      { name: "programFlow", label: "Program Flow" },
      { name: "speakers", label: "Speakers" },
      { name: "participation", label: "Participation" },
      { name: "teamwork", label: "Teamwork" },
      { name: "learning", label: "Learning" },
      { name: "relevance", label: "Relevance" },
      { name: "overallExperience", label: "Overall Experience" },
    ],
    [],
  );

  const handleInput = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRating = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: Number(value) },
    }));
  };

  const handleActivity = (option) => {
    setFormData((prev) => {
      const exists = prev.activities.includes(option);
      return {
        ...prev,
        activities: exists
          ? prev.activities.filter((item) => item !== option)
          : [...prev.activities, option],
      };
    });
  };

  const handleSubmit = async (eventSubmit) => {
    eventSubmit.preventDefault();
    try {
      await submitEvaluation(formData);
      toast.success("Evaluation submitted successfully!");
      navigate("/success");
    } catch (error) {
      toast.error("Unable to submit evaluation. Please try again.");
    }
  };

  if (!event) {
    return <p className="text-center text-slate-700">Event not found.</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/90 p-8 shadow-xl shadow-slate-300/40"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl bg-brand-700/10 p-6">
            <h2 className="text-3xl font-semibold text-slate-900">
              Evaluate {event.title}
            </h2>
            <p className="mt-3 text-slate-600">
              Complete the form below to share your feedback for this event.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-6 shadow-inner shadow-slate-200/70">
            <h3 className="text-xl font-semibold text-slate-900">
              Event details
            </h3>
            <p className="mt-3 text-slate-700">{event.description}</p>
            <p className="mt-2 text-sm text-slate-500">{event.date}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/70"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="font-medium text-slate-700">Full Name</span>
              <input
                value={formData.participantName}
                onChange={(e) => handleInput("participantName", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
                placeholder="Optional"
              />
            </label>
            <label className="space-y-2">
              <span className="font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInput("email", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
                placeholder="Optional email"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="font-medium text-slate-700">
                Participant Type
              </span>
              <select
                value={formData.participantType}
                onChange={(e) => handleInput("participantType", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
              >
                <option>Student</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="font-medium text-slate-700">Satisfaction</span>
              <select
                value={formData.satisfaction}
                onChange={(e) => handleInput("satisfaction", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">
              Rating (1–5)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {ratingQuestions.map((item) => (
                <label
                  key={item.name}
                  className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="block font-medium text-slate-700">
                    {item.label}
                  </span>
                  <select
                    value={formData.ratings[item.name]}
                    onChange={(e) => handleRating(item.name, e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
                  >
                    {ratingLabels.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} ⭐
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Activities</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {activityOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleActivity(option)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    formData.activities.includes(option)
                      ? "border-brand-700 bg-brand-700/15 text-brand-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <label className="space-y-2">
              <span className="font-medium text-slate-700">
                What did you enjoy most?
              </span>
              <textarea
                value={formData.enjoyMost}
                onChange={(e) => handleInput("enjoyMost", e.target.value)}
                rows="3"
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
              />
            </label>
            <label className="space-y-2">
              <span className="font-medium text-slate-700">
                What can be improved?
              </span>
              <textarea
                value={formData.improvementSuggestions}
                onChange={(e) =>
                  handleInput("improvementSuggestions", e.target.value)
                }
                rows="3"
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brand-700 px-6 py-4 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-800"
          >
            Submit Evaluation
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default EvaluationForm;
