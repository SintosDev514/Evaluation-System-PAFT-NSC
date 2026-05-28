import { Star } from "lucide-react";

const RatingStars = ({ value = 0 }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= value ? "text-brand-700" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
