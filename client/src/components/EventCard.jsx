import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/40 transition-transform duration-300 hover:-translate-y-1"
    >
      <img
        src={event.image}
        alt={event.title}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {event.date}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900">
          {event.title}
        </h3>
        <p className="mt-3 text-slate-600">{event.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/event/${event.id}`}
            className="rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            View Event
          </Link>
          <Link
            to={`/evaluate/${event.id}`}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Evaluate
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
