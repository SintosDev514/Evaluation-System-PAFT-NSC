const ResponseTable = ({ rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-max w-full table-auto divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Event</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Mean</th>
            <th className="px-4 py-3">Satisfaction</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Feedback</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((item) => (
            <tr
              key={item._id}
              className="bg-white transition hover:bg-brand-50/40"
            >
              <td className="px-4 py-4 font-medium text-slate-800">
                {item.participantName || "Anonymous"}
              </td>
              <td className="px-4 py-4 text-slate-600">{item.eventTitle}</td>
              <td className="px-4 py-4 text-slate-600">
                {item.participantType}
              </td>
              <td className="px-4 py-4 text-slate-900">
                {item.meanRating.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-slate-600">{item.satisfaction}</td>
              <td className="px-4 py-4 text-slate-600">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-slate-600">
                <div className="max-w-xl break-words whitespace-normal text-sm text-slate-700">
                  {item.enjoyMost || "-"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseTable;
