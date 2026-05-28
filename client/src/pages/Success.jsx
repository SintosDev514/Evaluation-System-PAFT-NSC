import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-3xl rounded-3xl bg-white/95 p-10 shadow-xl shadow-slate-300/40"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">
            Thank you for your feedback!
          </h1>
          <p className="mt-4 text-slate-600">
            Your evaluation has been saved successfully. Your insights help make
            future PAFT-NSC events even better.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="rounded-full bg-slate-900 px-8 py-4 text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full border border-brand-700 bg-white px-8 py-4 text-brand-700 transition hover:bg-brand-50"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Success;
