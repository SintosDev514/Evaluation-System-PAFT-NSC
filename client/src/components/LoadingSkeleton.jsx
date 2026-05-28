const LoadingSkeleton = ({ message = "Loading..." }) => {
  return (
    <div className="rounded-3xl bg-white p-12 text-center shadow-xl shadow-slate-200/40">
      <div className="mb-4 h-8 w-48 animate-pulse rounded-full bg-slate-200" />
      <p className="text-slate-500">{message}</p>
    </div>
  );
};

export default LoadingSkeleton;
