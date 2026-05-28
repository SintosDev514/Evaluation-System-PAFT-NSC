const Evaluation = require("../models/Evaluation");

const ADMIN_RESPONSE_LIMIT = 98;
const EVENT_TITLES = [
  "Welcome BSFT Freshies 2025",
  "PAFT-NSC General Assembly A.Y. 2025–2026",
  "PAFT Day 2026",
  "PAFT-NSC Officer Election 2026",
  "BSFT Batch 2026 Celebration",
];

const fillMissingEvents = (eventAverages) => {
  const eventMap = eventAverages.reduce((acc, item) => {
    acc[item.eventTitle] = item;
    return acc;
  }, {});

  return EVENT_TITLES.map(
    (title) =>
      eventMap[title] || {
        eventTitle: title,
        averageRating: 0,
        responses: 0,
      },
  );
};

const getAnalyticsData = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find()
      .sort({ createdAt: -1 })
      .limit(ADMIN_RESPONSE_LIMIT);
    const totalResponses = evaluations.length;
    const overallMean =
      totalResponses > 0
        ? evaluations.reduce((sum, item) => sum + item.meanRating, 0) /
          totalResponses
        : 0;

    const eventGroups = evaluations.reduce((acc, item) => {
      const title = item.eventTitle;
      acc[title] = acc[title] || { total: 0, count: 0 };
      acc[title].total += item.meanRating;
      acc[title].count += 1;
      return acc;
    }, {});

    let eventAverages = Object.entries(eventGroups).map(([title, data]) => ({
      eventTitle: title,
      averageRating: Number((data.total / data.count).toFixed(2)),
      responses: data.count,
    }));

    eventAverages = fillMissingEvents(eventAverages);

    const highestRatedEvent =
      [...eventAverages].sort((a, b) => b.averageRating - a.averageRating)[0] ||
      null;
    const mostEvaluatedEvent =
      [...eventAverages].sort((a, b) => b.responses - a.responses)[0] || null;

    let satisfactionLevels = evaluations.reduce((acc, item) => {
      acc[item.satisfaction] = (acc[item.satisfaction] || 0) + 1;
      return acc;
    }, {});

    const participantTypes = evaluations.reduce((acc, item) => {
      acc[item.participantType] = (acc[item.participantType] || 0) + 1;
      return acc;
    }, {});

    const monthlyResponses = evaluations.reduce((acc, item) => {
      const month = item.createdAt.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const activityCounts = evaluations.reduce((acc, item) => {
      item.activities.forEach((activity) => {
        acc[activity] = (acc[activity] || 0) + 1;
      });
      return acc;
    }, {});

    const satisfactionPriority = {
      Excellent: 4,
      Good: 3,
      Fair: 2,
      Poor: 1,
    };

    let topSatisfactionLevel =
      Object.entries(satisfactionLevels).sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1];
        }
        return satisfactionPriority[b[0]] - satisfactionPriority[a[0]];
      })[0]?.[0] || "N/A";

    if (totalResponses > 0) {
      satisfactionLevels = {
        Excellent: satisfactionLevels.Excellent || 0,
        Good: satisfactionLevels.Good || 0,
        Fair: satisfactionLevels.Fair || 0,
        Poor: satisfactionLevels.Poor || 0,
      };
    }

    res.json({
      totalResponses,
      overallMean: Number(overallMean.toFixed(2)),
      highestRatedEvent,
      mostEvaluatedEvent,
      topSatisfactionLevel,
      eventAverages,
      satisfactionLevels,
      participantTypes,
      monthlyResponses,
      activityCounts,
      recentFeedback: evaluations.slice(0, 10),
    });
  } catch (error) {
    next(error);
  }
};

const getMeanAnalytics = async (req, res, next) => {
  try {
    const aggregated = await Evaluation.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: ADMIN_RESPONSE_LIMIT },
      {
        $group: {
          _id: "$eventTitle",
          averageMean: { $avg: "$meanRating" },
          responses: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          eventTitle: "$_id",
          averageMean: { $round: ["$averageMean", 2] },
          responses: 1,
        },
      },
      { $sort: { averageMean: -1 } },
    ]);

    const averages = EVENT_TITLES.map(
      (title) =>
        aggregated.find((item) => item.eventTitle === title) || {
          eventTitle: title,
          averageMean: 0,
          responses: 0,
        },
    );

    res.json(averages);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalyticsData, getMeanAnalytics };
