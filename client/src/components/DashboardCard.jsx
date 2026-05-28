const DashboardCard = ({ title, value }) => {
  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-2xl shadow-slate-300/20">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>
      <p className="mt-4 text-4xl font-semibold text-slate-900">{value}</p>
    </div>
  );
};

export default DashboardCard;
