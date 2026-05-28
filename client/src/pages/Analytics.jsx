import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchMeanAnalytics } from "../services/evaluationService";
import ChartCard from "../components/ChartCard";
import EmptyState from "../components/EmptyState";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const chartColors = ["#4E9A61", "#2F7A42", "#9DC79B", "#C6DDC2", "#236133"];

const Analytics = () => {
  const [meanData, setMeanData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMeanAnalytics()
      .then((data) => {
        setMeanData(data);
        setLoading(false);
      })
      .catch((error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      });
  }, [navigate]);

  if (loading) {
    return <EmptyState message="Loading analytics..." />;
  }

  if (!meanData.length) {
    return <EmptyState message="No analytics data available yet." />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Average Mean Rating by Event">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart
              data={meanData}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="eventTitle" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="averageMean"
                fill="#2F7A42"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Event Distribution">
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={meanData}
                dataKey="responses"
                nameKey="eventTitle"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {meanData.map((entry, index) => (
                  <Cell
                    key={entry.eventTitle}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.section>
  );
};

export default Analytics;
