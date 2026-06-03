import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchByEvent } from "../services/evaluationService";
import EmptyState from "../components/EmptyState";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const ratingLabels = {
  organization: "Organization",
  timeManagement: "Time Management",
  venue: "Venue",
  programFlow: "Program Flow",
  speakers: "Speakers",
  participation: "Participation",
  teamwork: "Teamwork",
  learning: "Learning",
  relevance: "Relevance",
  overallExperience: "Overall Experience",
};

const StarRow = ({ count, total }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={14}
        className={star <= count ? "fill-brand-700 text-brand-700" : "text-slate-300"}
      />
    ))}
    <span className="ml-1 text-xs text-slate-500">({total})</span>
  </div>
);

const ByEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchByEvent()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) navigate("/login");
        else setLoading(false);
      });
  }, [navigate]);

  const toggle = (title) =>
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  if (loading) return <EmptyState message="Loading event data..." />;
  if (!events.length) return <EmptyState message="No event data available yet." />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">By Event</h2>
        <p className="mt-2 text-slate-600">
          View respondents, per-question ratings, star distribution, and
          comments for each event.
        </p>
      </div>

      {events.map((event) => (
        <div
          key={event.eventTitle}
          className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-2xl shadow-slate-300/20"
        >
          <button
            onClick={() => toggle(event.eventTitle)}
            className="flex w-full items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {event.eventTitle}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {event.totalRespondents} respondent
                {event.totalRespondents !== 1 ? "s" : ""} &middot; Overall
                Mean: {event.overallMean}
              </p>
            </div>
            {expanded[event.eventTitle] ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>

          {expanded[event.eventTitle] && (
            <div className="mt-6 space-y-8">
              {/* Per-question ratings */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Question
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Average
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Star Distribution
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {event.perQuestion.map((q) => (
                      <tr key={q.question} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">
                          {ratingLabels[q.question] || q.question}
                        </td>
                        <td className="px-4 py-3 text-slate-900">
                          {q.average}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-x-6 gap-y-1">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center gap-1">
                                <span className="text-xs text-slate-600">
                                  {star}★:
                                </span>
                                <span className="text-xs font-semibold text-slate-800">
                                  {q.starDistribution[star]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Respondents */}
              <div>
                <h4 className="mb-3 text-lg font-semibold text-slate-900">
                  Respondents ({event.totalRespondents})
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Name
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Mean
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Satisfaction
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {event.respondents.map((r) => (
                        <tr
                          key={r._id}
                          className="hover:bg-brand-50/40"
                        >
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {r.participantName || "Anonymous"}
                          </td>
                          <td className="px-4 py-3 text-slate-900">
                            {r.meanRating.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {r.satisfaction}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comments */}
              <div>
                <h4 className="mb-3 text-lg font-semibold text-slate-900">
                  Comments
                </h4>
                {event.respondents.some(
                  (r) => r.enjoyMost || r.improvementSuggestions,
                ) ? (
                  <div className="space-y-4">
                    {event.respondents
                      .filter((r) => r.enjoyMost || r.improvementSuggestions)
                      .map((r) => (
                        <div
                          key={r._id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <p className="mb-2 text-sm font-semibold text-slate-800">
                            {r.participantName || "Anonymous"}
                          </p>
                          {r.enjoyMost && (
                            <p className="text-sm text-slate-600">
                              <span className="font-medium text-slate-700">
                                Enjoyed:
                              </span>{" "}
                              {r.enjoyMost}
                            </p>
                          )}
                          {r.improvementSuggestions && (
                            <p className="mt-1 text-sm text-slate-600">
                              <span className="font-medium text-slate-700">
                                Suggestion:
                              </span>{" "}
                              {r.improvementSuggestions}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No comments.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.section>
  );
};

export default ByEvent;
