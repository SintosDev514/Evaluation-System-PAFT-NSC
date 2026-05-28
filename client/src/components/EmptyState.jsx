const EmptyState = ({ message }) => {
  return (
    <div className="rounded-3xl bg-white p-12 text-center shadow-xl shadow-slate-200/40">
      <p className="text-xl font-semibold text-slate-900">{message}</p>
    </div>
  );
};

export default EmptyState;
