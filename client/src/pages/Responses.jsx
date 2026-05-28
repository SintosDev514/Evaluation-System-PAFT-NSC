import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchEvaluations } from "../services/evaluationService";
import { exportResponsesToExcel } from "../utils/exportExcel";
import { exportResponsesToPDF } from "../utils/exportPDF";
import EmptyState from "../components/EmptyState";
import ResponseTable from "../components/ResponseTable";

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvaluations()
      .then(setResponses)
      .catch((error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const filteredResponses = useMemo(() => {
    return responses
      .filter((item) =>
        [
          item.participantName,
          item.eventTitle,
          item.participantType,
          item.satisfaction,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        const isDateKey = sortKey === "createdAt";
        const valueA = isDateKey
          ? new Date(a[sortKey]).getTime()
          : Number(a[sortKey]);
        const valueB = isDateKey
          ? new Date(b[sortKey]).getTime()
          : Number(b[sortKey]);

        if (sortOrder === "asc") {
          return valueA - valueB;
        }
        return valueB - valueA;
      });
  }, [responses, search, sortKey, sortOrder]);

  if (!responses.length) {
    return (
      <EmptyState message="No responses found. Share the evaluation link to collect feedback." />
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/40 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Responses</h2>
          <p className="mt-2 text-slate-600">
            Search, sort, and export event evaluations for review.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => exportResponsesToPDF(filteredResponses)}
            className="rounded-full bg-brand-700 px-5 py-3 text-white transition hover:bg-brand-800"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportResponsesToExcel(filteredResponses)}
            className="rounded-full border border-brand-700 bg-white px-5 py-3 text-brand-700 transition hover:bg-brand-50"
          >
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/40 overflow-x-auto">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search responses..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500 sm:w-auto"
            />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
            >
              <option value="createdAt">Date</option>
              <option value="meanRating">Mean Rating</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <ResponseTable rows={filteredResponses} />
        </div>
      </div>
    </motion.section>
  );
};

export default Responses;
