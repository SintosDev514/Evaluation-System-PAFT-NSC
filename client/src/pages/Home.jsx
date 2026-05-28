import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import events from "../data/events";

const Home = () => {
  return (
    <section className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-300/30"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            PAFT-NSC Evaluation
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Collect feedback and review event performance with clarity.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
            A clean evaluation platform for student events, designed to help
            organizers make better decisions from reliable responses.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              View Dashboard
            </Link>
            <Link
              to="/event/welcome-bsft-freshies-2025"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Evaluate an Event
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Available Events
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Review student activities
          </h2>
          <p className="mt-3 text-slate-600">
            Select an event and submit your feedback to help improve future
            PAFT-NSC programs.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Home;
