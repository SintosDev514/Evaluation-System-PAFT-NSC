import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import events from "../data/events";

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-300/40">
        <h2 className="text-2xl font-semibold">Event not found</h2>
        <p className="mt-3 text-slate-600">
          Please select a valid event from the home page.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/90 p-8 shadow-xl shadow-slate-300/40"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <img
            src={event.image}
            alt={event.title}
            className="h-72 w-full rounded-3xl object-cover shadow-lg"
          />
          <div className="mt-6 space-y-4">
            <h2 className="text-4xl font-semibold text-slate-900">
              {event.title}
            </h2>
            <p className="text-brand-700 font-semibold">{event.date}</p>
            <p className="text-slate-600">{event.description}</p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-brand-100 px-4 py-2 text-sm text-brand-800">
                BS Food Technology
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                University Activity
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl bg-brand-700/10 p-6">
          <div className="rounded-3xl bg-white p-6 shadow-inner shadow-slate-200/60">
            <h3 className="text-xl font-semibold text-slate-900">
              Event overview
            </h3>
            <p className="mt-4 text-slate-600">
              Share your feedback and help PAFT-NSC plan stronger experiences
              for future batches.
            </p>
          </div>
          <Link
            to={`/evaluate/${event.id}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-800"
          >
            Start Evaluation
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-full border border-brand-700 bg-white px-6 py-3 text-brand-700 hover:bg-brand-50"
          >
            Explore Dashboard
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default EventDetails;
