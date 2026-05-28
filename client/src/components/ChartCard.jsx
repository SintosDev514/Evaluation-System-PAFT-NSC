const ChartCard = ({ title, children }) => {
  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-2xl shadow-slate-300/20">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Live insights
        </span>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;
