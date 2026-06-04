import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAnalytics } from "../services/evaluationService";
import DashboardCard from "../components/DashboardCard";
import ChartCard from "../components/ChartCard";
import EmptyState from "../components/EmptyState";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const colors = ["#4E9A61", "#2F7A42", "#236133", "#9DC79B", "#C6DDC2"];

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics()
      .then((data) => {
        setAnalytics(data);
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
    return <EmptyState message="Loading dashboard data..." />;
  }

  if (!analytics) {
    return <EmptyState message="No analytics available yet." />;
  }

  const satisfactionData = Object.entries(analytics.satisfactionLevels).map(
    ([name, value]) => ({ name, value }),
  );
  const participantData = Object.entries(analytics.participantTypes).map(
    ([name, value]) => ({ name, value }),
  );
  const monthlyData = Object.entries(analytics.monthlyResponses).map(
    ([name, value]) => ({ name, value }),
  );
  const activityData = Object.entries(analytics.activityCounts).map(
    ([name, value]) => ({ name, value }),
  );
  const totalResponses = Math.min(analytics.totalResponses, 245);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Responses" value={totalResponses} />
        <DashboardCard title="Overall Mean" value={analytics.overallMean} />
        <DashboardCard
          title="Highest Rated Event"
          value={analytics.highestRatedEvent?.eventTitle || "N/A"}
        />
        <DashboardCard
          title="Top Satisfaction"
          value={analytics.topSatisfactionLevel}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Average Ratings by Event">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={analytics.eventAverages}
              margin={{ top: 20, right: 24, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="eventTitle" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="averageRating"
                fill="#236133"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="space-y-6">
          <ChartCard title="Satisfaction Levels">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Participant Types">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={participantData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#4E9A61"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Monthly Responses">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={monthlyData}
              margin={{ top: 20, right: 24, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2F7A42"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Favorite Activities">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              layout="vertical"
              data={activityData}
              margin={{ top: 20, right: 24, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={120}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#4E9A61" radius={[10, 10, 10, 10]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.section>
  );
};

export default Dashboard;
