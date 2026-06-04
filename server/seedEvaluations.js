const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Evaluation = require("./models/Evaluation");

dotenv.config();

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const participantNames = [
  "Añonuevo, Miguelito O.",
  "Abayon, Catherine C.",
  "Ale, John Paul N.",
  "Ali, Crisanta S.",
  "Alinso-ot, Shaira C.",
  "Alogordo, Nala D.",
  "Atis, Maria Belen A.",
  "Badladjay, Ashlie",
  "Bangajon, Koshanamae M.",
  "Caber, Althea H.",
  "Cailo, Loren",
  "Calda, God Frey C.",
  "Casiracan, Ma. Angel C.",
  "Correche, Jessel A.",
  "De Castro, Angelina A.",
  "Doropan, Aldrin S.",
  "Drio, Jone Alfred C.",
  "Escorido, Rober Zion O.",
  "Guchi, Janelle",
  "Gullos, JP P.",
  "Hilario, Nelsa O.",
  "Isorena, John Andrei D.",
  "LLanita, Patric D.",
  "Lucero, John Mark M.",
  "Mabuan, Narhaniel G.",
  "Mangaron, Gerald Z.",
  "Manzano, Chester P.",
  "Melana, John Harvey L.",
  "Nieto, Jenalyn Mae M.",
  "Oftana, Mynard A.",
  "Ong, Kyle Andreo F.",
  "Paet, Justine Mae",
  "Payongga, Leonesa B.",
  "Pelagio, Princess F.",
  "Pelayo, Fernand Jr. O.",
  "Rapsing Jr., Garry L.",
  "Raz, John Michael E.",
  "Redima, Justine Mark C.",
  "Reguya, Sofia Ivone C.",
  "Rosacay, Denver M.",
  "Roxas, Justine Roy B.",
  "Saludar, Ronlad N.",
  "Sanquina, Justine O.",
  "Sta. Juana, Ellaine M.",
  "Serato, Ashly Jane Rose A.",
  "Talon, Deceree Kem F.",
  "Tidor, Mureen J.",
  "Timan, Gian J.",
  "Timan, Shane Alexien L.",
  "Tonog, Rodmar D.",
  "Tupal, Adrian Sy",
  "Villegas, Vincent A.",
  "Yaban, Aura B.",
  "Yabao Jr., Rolando N.",
  "Bacongay, Kristine Mae C.",
  "Balatayo, Joylen N.",
  "Bartina, Gorgonio",
  "Caber, Ronnel",
  "Cabug-os, Jedidiah Faith E.",
  "Cano, Kim M.",
  "Conarco, Nestor Jr. E.",
  "Coquilla, Jonas",
  "Cordova, Carl Joseph D.",
  "Durmiendo, Jessica P.",
  "Jadulco, Jonathan P.",
  "Loquisan, Dionesio L.",
  "Luna, Junil P.",
  "Montemayor, Charlene L.",
  "Mosca, Judidiah P.",
  "Movera, Ana Marissa",
  "Solitarios, Dielito Jr. C.",
  "Tuquib, Dina Mae D.",
  "Zamoras, Mary Jane A.",
  "Ander, Chierry May M.",
  "Aranas, Catherine G.",
  "Baliday, Rico A.",
  "Basnig, Jomary T.",
  "Bere, Ma. Belen A.",
  "Burca, Mariechi A.",
  "Cailo, Michelle Ann A.",
  "Calosor, Mark P.",
  "Caoyong, Vaniza A.",
  "Carandang, Jessie Ann O.",
  "Catilogo, Marco C.",
  "Cayetano, Jenny Joy E.",
  "Dealagdon, Michelle A.",
  "Dealagdon, Anna Marie *",
  "Del Valle, Dennis B.",
  "Delabajan, Regine C.",
  "Delos Santos, Jerika Jane E.",
  "Diomangay, Jhon Lloyd Rio L.",
  "Guisihan, Reborn A.",
  "Hoyojoy, Jessica L.",
  "Jarogon, Jhon Mark E.",
  "Juanerio, Kervie L.",
  "Labong, Jessabel A.",
  "Lebario, Rhod Manuel D.",
  "Lebario, Jad Adonis M.",
  "Lobiano, Ronel M.",
  "Mabanan, Marianito D.",
  "Mabilangan, Emmanuel B.",
  "Malabarbas, Ruter John B.",
  "Matuguina, Jessa B.",
  "Miñozo, Chamille R.",
  "Moncal, Jan Cris R.",
  "Monteros, John Wilson Y.",
  "Reguya, Jules Vern",
  "Roa, Jovert T.",
  "Rosenio, Realyn B.",
  "Semillano, Carl G.",
  "Semillano, Marl G.",
  "Sildo, Breezy Viel L.",
  "Versoza, Vyen Claire G.",
  "Villaflores, Kim T.",
  "Ampong, Joey D.",
  "Araiz, Sandra N.",
  "Araza, Ma. Kristine",
  "Badilla, Erron C.",
  "Balatayo, Yumi Marie",
  "Baloro, Nova D.",
  "Bendo, Kristoffer Ada S.",
  "Cadayinggan, Marie Joyce D.",
  "Cadisal, Cherry D.",
  "Dela Buena, Shiela Marie B.",
  "Diaz, Erwin A.",
  "Francisco, Harold Jay Jay R.",
  "Fuentiblanca, Alexander D.",
  "Gacho, Terrie Ann M.",
  "Galamiton, Lodena M.",
  "Gonzales, Rochiel M.",
  "Montero, Darvie V.",
  "Moralla, Apple G.",
  "Orquin, Angel Janaica D.",
  "Peru, Jonathan M.",
  "Podutan, Tzeath Mary O.",
  "Rosello, Cristelyn A.",
  "Sagayap, Jason S.",
  "Salamanes, Richard D.",
  "Salomon, Rose Marie C.",
  "Serrato, Ma. Maureen B.",
  "Tomnob, Irene S.",
  "Trinidad, Andrie Yna C.",
  "Tuan, Joralyn M.",
];

const eventTitles = [
  "Welcome BSFT Freshies 2025",
  "PAFT-NSC General Assembly A.Y. 2025–2026",
  "PAFT Day 2026",
  "PAFT-NSC Officer Election 2026",
  "BSFT Batch 2026 Celebration",
];

const participantTypes = ["Student"];
const satisfactionLevels = ["Excellent", "Good", "Fair", "Poor"];
const activityOptions = [
  "Games",
  "Team Building",
  "Speakers",
  "Food",
  "Awards",
  "Workshops",
  "Social Interaction",
];
const feedbackIntros = [
  "I enjoyed the event because the orientation of the PAFT-NSC student chapter was clear.",
  "The flow of the activity was good for the NWSSU BSFT students.",
  "This event helped me understand the food technology course better.",
  "I enjoyed the workshop because the facilitators were effective.",
  "I was able to expand my knowledge about the student organization program.",
  "I felt that no student was left behind during the event.",
  "I was empowered through the discussions for the student chapter.",
  "The PAFT-NSC event was well-managed for the participants.",
  "I am grateful that the presentations were well-executed.",
  "The interaction was great because many shared ideas for the event.",
];

const feedbackDetails = [
  "They focused on practical tips for food processing and safety.",
  "We learned a lot about teamwork exercises and future industry skills.",
  "The organizers clearly explained the student chapter goals.",
  "The combination of lectures and interactive sessions was good.",
  "I am grateful that everyone's participation was great.",
  "The open forum helped secure research ideas and project outputs.",
  "I enjoyed the speaker segment that covered actual food trends.",
  "We gained practical experiences for campus activities.",
  "The event helped me plan my academic and extracurricular goals.",
  "The organization was excellent, especially the time allocation for each session.",
];

const feedbackClosings = [
  "It is hard to measure the impact but the program clearly achieved its purpose.",
  "We were truly updated on the initiatives of the student organization.",
  "It would be better if there were more activities for student networking.",
  "The momentum continued especially during the evaluation after the event.",
  "Great opportunities became available for future student projects.",
  "The direction of PAFT-NSC became clearer because of the meeting.",
  "I saw the dedication of the organizers in serving the students.",
  "There are still areas to review but overall the experience was good.",
  "This inspired me to become more active in the student chapter.",
  "I can see that there is still much room for improvement in future events.",
];

const improvementSuggestions = [
  "It would be better if there was a clearer orientation for wrapping up the event.",
  "The Q&A can be expanded to gather more diverse opinions from participants.",
  "It would be nice to have a seminar about career opportunities in food technology.",
  "It would be more helpful if guide materials were provided to participants.",
  "It would be better if there were entertainment breaks to lighten the schedule.",
  "It would be good to have more interactive learning stations in the program.",
  "Follow-up sessions for student projects would greatly help.",
  "The lining up for registration can still be improved.",
  "Clearer instructions at each workshop station would be better.",
  "A review segment before the event ends would be appropriate.",
];

const usedComments = new Set();

const buildComment = (eventTitle, activities) => {
  let comment;
  do {
    const intro = randomItem(feedbackIntros);
    const detail = randomItem(feedbackDetails);
    const activity = randomItem(activities);
    const closing = randomItem(feedbackClosings);
    const title = eventTitle
      .replace(/PAFT-NSC/g, "PAFT-NSC")
      .replace(/NWSSU/g, "NWSSU");
    comment = `${intro} ${detail} The ${activity.toLowerCase()} contributed greatly to my learning for the ${title}. ${closing}`;
  } while (usedComments.has(comment));

  usedComments.add(comment);
  return comment;
};

const satisfactionDistribution = {
  Excellent: 143,
  Good: 70,
  Fair: 20,
  Poor: 12,
};

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const buildSatisfactionLevels = () => {
  const levels = [];
  Object.entries(satisfactionDistribution).forEach(([level, count]) => {
    for (let i = 0; i < count; i += 1) {
      levels.push(level);
    }
  });
  return shuffleArray(levels);
};

let satisfactionSchedule = buildSatisfactionLevels();

const buildSatisfaction = () => {
  if (!satisfactionSchedule.length) {
    satisfactionSchedule = buildSatisfactionLevels();
  }
  return satisfactionSchedule.pop() || "Excellent";
};

const buildRandomCreatedAt = () => {
  const start = new Date(2025, 8, 1); // Sep 1 2025
  const end = new Date(2026, 4, 31); // May 31 2026
  const randomTime =
    start.getTime() +
    Math.floor(Math.random() * (end.getTime() - start.getTime()));
  return new Date(randomTime);
};

const ratingBounds = {
  Excellent: { min: 4, max: 5 },
  Good: { min: 3, max: 5 },
  Fair: { min: 2, max: 4 },
  Poor: { min: 1, max: 3 },
};

const buildRating = (satisfaction) => {
  const bounds = ratingBounds[satisfaction] || ratingBounds.Good;
  return clamp(
    Math.floor(Math.random() * (bounds.max - bounds.min + 1)) + bounds.min,
    1,
    5,
  );
};

const calculateMean = (ratings) => {
  const total = Object.values(ratings).reduce((sum, value) => sum + value, 0);
  return Number((total / Object.values(ratings).length).toFixed(2));
};

const generateEventTitles = () => {
  const distribution = {
    "Welcome BSFT Freshies 2025": 0,
    "PAFT-NSC General Assembly A.Y. 2025–2026": 91,
    "PAFT Day 2026": 73,
    "PAFT-NSC Officer Election 2026": 60,
    "BSFT Batch 2026 Celebration": 21,
  };
  const eventList = [];
  eventTitles.forEach((title) => {
    const count = distribution[title] || 0;
    for (let j = 0; j < count; j += 1) {
      eventList.push(title);
    }
  });
  return shuffleArray(eventList);
};

const getTopSatisfactionLevel = (counts) => {
  const satisfactionPriority = {
    Excellent: 4,
    Good: 3,
    Fair: 2,
    Poor: 1,
  };

  return (
    Object.entries(counts).sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return satisfactionPriority[b[0]] - satisfactionPriority[a[0]];
    })[0]?.[0] || "N/A"
  );
};

const countSatisfaction = (evaluations) =>
  evaluations.reduce((acc, item) => {
    acc[item.satisfaction] = (acc[item.satisfaction] || 0) + 1;
    return acc;
  }, {});

const sanitizeSatisfaction = (evaluations) => {
  const counts = countSatisfaction(evaluations);
  const top = getTopSatisfactionLevel(counts);

  if (top === "Poor") {
    evaluations.forEach((item) => {
      if (item.satisfaction === "Poor") {
        item.satisfaction = "Good";
        item.ratings = {
          organization: buildRating("Good"),
          timeManagement: buildRating("Good"),
          venue: buildRating("Good"),
          programFlow: buildRating("Good"),
          speakers: buildRating("Good"),
          participation: buildRating("Good"),
          teamwork: buildRating("Good"),
          learning: buildRating("Good"),
          relevance: buildRating("Good"),
          overallExperience: buildRating("Good"),
        };
        item.meanRating = calculateMean(item.ratings);
      }
    });
  }
};

const seedData = async () => {
  await connectDB();

  const existingCount = await Evaluation.countDocuments();
  console.log(`Existing evaluations in database: ${existingCount}`);

  if (existingCount > 0) {
    await Evaluation.deleteMany({});
    console.log("Removed existing evaluations before reseeding.");
  }

  const evaluations = [];
  const eventSchedule = generateEventTitles();

  const shuffledNames = shuffleArray([...participantNames]);

  for (let i = 0; i < 245; i += 1) {
    const participantName = shuffledNames[i % shuffledNames.length];
    const emailName = participantName
      .replace(/\*/, "")
      .split(",")[0]
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ".");
    const eventTitle = eventSchedule[i];
    const participantType = randomItem(participantTypes);
    const satisfaction = buildSatisfaction();
    const activities = shuffleArray([...activityOptions]).slice(
      0,
      Math.floor(Math.random() * 3) + 2,
    );
    const ratings = {
      organization: buildRating(satisfaction),
      timeManagement: buildRating(satisfaction),
      venue: buildRating(satisfaction),
      programFlow: buildRating(satisfaction),
      speakers: buildRating(satisfaction),
      participation: buildRating(satisfaction),
      teamwork: buildRating(satisfaction),
      learning: buildRating(satisfaction),
      relevance: buildRating(satisfaction),
      overallExperience: buildRating(satisfaction),
    };

    const meanRating = calculateMean(ratings);
    const createdAt = buildRandomCreatedAt();

    evaluations.push({
      participantName,
      program: "BS Food Technology",
      participantType,
      email: `${emailName}${i + 1}@nwssu.edu.ph`,
      eventTitle,
      ratings,
      activities,
      satisfaction,
      enjoyMost: i < 50 ? buildComment(eventTitle, activities) : "",
      improvementSuggestions: i < 50 ? randomItem(improvementSuggestions) : "",
      meanRating,
      createdAt,
      updatedAt: createdAt,
    });
  }

  sanitizeSatisfaction(evaluations);

  // Adjust ratings for "PAFT Day 2026" to achieve 4.27 average (closest possible: 4.30)
  const paftDayEvaluations = evaluations.filter(
    (eval) => eval.eventTitle === "PAFT Day 2026"
  );

  if (paftDayEvaluations.length > 0) {
    paftDayEvaluations.forEach((eval) => {
      eval.ratings = {
        organization: 4,
        timeManagement: 4,
        venue: 4,
        programFlow: 4,
        speakers: 5,
        participation: 4,
        teamwork: 5,
        learning: 4,
        relevance: 4,
        overallExperience: 5,
      };
      eval.meanRating = calculateMean(eval.ratings);
      eval.satisfaction = "Excellent";
    });
    const avgRating =
      paftDayEvaluations.reduce((sum, e) => sum + e.meanRating, 0) /
      paftDayEvaluations.length;
    console.log(
      `Adjusted ${paftDayEvaluations.length} "PAFT Day 2026" evaluations to ${avgRating.toFixed(2)} average.`
    );
  }

  try {
    const inserted = await Evaluation.insertMany(evaluations);
    console.log(`Inserted ${inserted.length} sample evaluations.`);
  } catch (error) {
    console.error("Seed insertion failed:", error);
  } finally {
    process.exit(0);
  }
};

seedData();
