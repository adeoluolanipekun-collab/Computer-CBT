import { db } from "./db";
import { subjects, questions } from "@shared/schema";
import { eq, and } from "drizzle-orm";

interface GeographyQuestion {
  questionNumber: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  instruction?: string;
}

const geographyQuestions: GeographyQuestion[] = [
  // Questions 1-10: Map-based questions
  {
    questionNumber: 1,
    questionText: "What is the scale of the map?",
    optionA: "1 : 50,000",
    optionB: "1 : 100,000",
    optionC: "1 : 150,000",
    optionD: "1 : 200,000",
    correctOption: "D",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 2,
    questionText: "The highest contour on the map is",
    optionA: "800 m",
    optionB: "750 m",
    optionC: "730 m",
    optionD: "700 m",
    correctOption: "B",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 3,
    questionText: "Which area on the map can the trigonometrical station be found?",
    optionA: "North-east",
    optionB: "South-east",
    optionC: "North-west",
    optionD: "South-west",
    correctOption: "B",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 4,
    questionText: "What is the approximate length of the railway line on the map?",
    optionA: "29 km",
    optionB: "37 km",
    optionC: "40 km",
    optionD: "45 km",
    correctOption: "B",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 5,
    questionText: "R. Kafue takes its source from a",
    optionA: "Plateau",
    optionB: "Ridge",
    optionC: "Knoll",
    optionD: "Conical hill",
    correctOption: "B",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 6,
    questionText: "The feature marked P is a",
    optionA: "Mountain",
    optionB: "Spur",
    optionC: "Knoll",
    optionD: "Valley",
    correctOption: "C",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 7,
    questionText: "The northern part of the map is suitable for",
    optionA: "Mining",
    optionB: "Trading",
    optionC: "Lumbering",
    optionD: "Farming",
    correctOption: "C",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 8,
    questionText: "What type of settlement is Alade?",
    optionA: "Nodal",
    optionB: "Coastal",
    optionC: "Dry Valley",
    optionD: "Linear",
    correctOption: "A",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 9,
    questionText: "What is the bearing of the trigonometrical station from Ilo on the map?",
    optionA: "168°",
    optionB: "178°",
    optionC: "190°",
    optionD: "200°",
    correctOption: "B",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  {
    questionNumber: 10,
    questionText: "The most important settlement in the area is",
    optionA: "Ilo",
    optionB: "Ilapo",
    optionC: "Aso",
    optionD: "Alade",
    correctOption: "D",
    instruction: "Study the map of Alade District below and use it to answer questions 1 to 10.\n\n![Alade District Map](@assets/IMAGE 1_1762510955138.jpg)"
  },
  // Questions 11-14: Climate data questions
  {
    questionNumber: 11,
    questionText: "The annual range of temperature for the station is",
    optionA: "1°C",
    optionB: "2°C",
    optionC: "22°C",
    optionD: "28°C",
    correctOption: "B",
    instruction: "Use the climate data below to answer questions 11 to 14.\n\n![Climate Data Table](@assets/IMAGE 2_1762510955140.jpg)"
  },
  {
    questionNumber: 12,
    questionText: "From which climatic region were the data taken?",
    optionA: "Desert",
    optionB: "Mediterranean",
    optionC: "Equatorial",
    optionD: "Tropical Monsoon",
    correctOption: "C",
    instruction: "Use the climate data below to answer questions 11 to 14.\n\n![Climate Data Table](@assets/IMAGE 2_1762510955140.jpg)"
  },
  {
    questionNumber: 13,
    questionText: "Which of the following towns experiences the type of climate represented in the table?",
    optionA: "Gao (Mali)",
    optionB: "Cairo (Egypt)",
    optionC: "Warri (Nigeria)",
    optionD: "London (England)",
    correctOption: "C",
    instruction: "Use the climate data below to answer questions 11 to 14.\n\n![Climate Data Table](@assets/IMAGE 2_1762510955140.jpg)"
  },
  {
    questionNumber: 14,
    questionText: "What is the mean temperature from July to December?",
    optionA: "16.5°C",
    optionB: "17.2°C",
    optionC: "27.5°C",
    optionD: "28.0°C",
    correctOption: "C",
    instruction: "Use the climate data below to answer questions 11 to 14.\n\n![Climate Data Table](@assets/IMAGE 2_1762510955140.jpg)"
  },
  // Questions 15-50: Standard questions
  {
    questionNumber: 15,
    questionText: "In Koppen's Classification of climates, Cs refers to",
    optionA: "Steppe",
    optionB: "Mediterranean",
    optionC: "Tropical Monsoon",
    optionD: "Tropical Continental",
    correctOption: "B"
  },
  {
    questionNumber: 16,
    questionText: "Which of the following features is associated with river capture?",
    optionA: "Delta",
    optionB: "Meander",
    optionC: "Levee",
    optionD: "Wind gap",
    correctOption: "D"
  },
  {
    questionNumber: 17,
    questionText: "Volcanoes that have erupted before and show signs of possible eruption again are said to be",
    optionA: "Weak",
    optionB: "Extinct",
    optionC: "Dormant",
    optionD: "Ongoing",
    correctOption: "C"
  },
  {
    questionNumber: 18,
    questionText: "In the northern hemisphere, summer solstice is experienced on",
    optionA: "September 22",
    optionB: "June 21",
    optionC: "December 22",
    optionD: "March 21",
    correctOption: "B"
  },
  {
    questionNumber: 19,
    questionText: "A community of plants and animals living in harmony within the same physical environment is referred to as",
    optionA: "Environmental interaction",
    optionB: "Terrestrial biocycle",
    optionC: "Ecosystem",
    optionD: "Biosphere",
    correctOption: "C"
  },
  {
    questionNumber: 20,
    questionText: "Sea breeze is most effective at",
    optionA: "Winter",
    optionB: "Day time",
    optionC: "Summer",
    optionD: "Night time",
    correctOption: "B"
  },
  {
    questionNumber: 21,
    questionText: "The nearest planet to the sun is",
    optionA: "Jupiter",
    optionB: "Saturn",
    optionC: "Mercury",
    optionD: "Earth",
    correctOption: "C"
  },
  {
    questionNumber: 22,
    questionText: "The type of rain mostly experienced within the tropics is",
    optionA: "Fog",
    optionB: "Relief",
    optionC: "Frontal",
    optionD: "Convectional",
    correctOption: "D"
  },
  {
    questionNumber: 23,
    questionText: "A feature commonly found in the youthful stage of a river is a",
    optionA: "Levee",
    optionB: "Meander",
    optionC: "Ox-bow lake",
    optionD: "Interlocking spurs",
    correctOption: "D"
  },
  {
    questionNumber: 24,
    questionText: "Which of the following is not a characteristic of Wadis?",
    optionA: "They are river channels",
    optionB: "They occur in tropical areas",
    optionC: "They hold permanent streams",
    optionD: "They have steep craggy walls",
    correctOption: "C"
  },
  {
    questionNumber: 25,
    questionText: "Stalactites and stalagmites are associated with which type of the following rocks?",
    optionA: "Granite",
    optionB: "Sandstone",
    optionC: "Limestone",
    optionD: "Basalt",
    correctOption: "C"
  },
  {
    questionNumber: 26,
    questionText: "What is the time in Accra at Longitude 0° when the local time at Longitude 45°W is 12 noon?",
    optionA: "3.00 pm",
    optionB: "5.00 pm",
    optionC: "7.00 pm",
    optionD: "9.00 pm",
    correctOption: "A"
  },
  {
    questionNumber: 27,
    questionText: "What is the distance between two places on the surface of the Earth which are located 8°N and 10°S on the same longitude?",
    optionA: "1,011 km",
    optionB: "1,998 km",
    optionC: "10,101 km",
    optionD: "17,770 km",
    correctOption: "B"
  },
  {
    questionNumber: 28,
    questionText: "Coastal deposition results in the formation of",
    optionA: "Stack",
    optionB: "Arch",
    optionC: "Cliff",
    optionD: "Beach",
    correctOption: "D"
  },
  {
    questionNumber: 29,
    questionText: "Which of the following pairs of elements are found in the core of the Earth?",
    optionA: "Iron and Silicon",
    optionB: "Iron and Nickel",
    optionC: "Iron and Calcium",
    optionD: "Iron and Magnesium",
    correctOption: "B"
  },
  {
    questionNumber: 30,
    questionText: "In which of the following layers in the atmosphere does temperature increase with altitude?",
    optionA: "Troposphere",
    optionB: "Ionosphere",
    optionC: "Stratosphere",
    optionD: "Exosphere",
    correctOption: "C"
  },
  {
    questionNumber: 31,
    questionText: "Relief rainfall is mostly associated with",
    optionA: "Lowlands",
    optionB: "Penplains",
    optionC: "Highlands",
    optionD: "Deserts",
    correctOption: "C"
  },
  {
    questionNumber: 32,
    questionText: "The extent of coastal erosion depends on",
    optionA: "Amount of fresh water supplied by tributaries",
    optionB: "Depth of the ocean water",
    optionC: "Salinity of the ocean",
    optionD: "Nature of the waves",
    correctOption: "D"
  },
  {
    questionNumber: 33,
    questionText: "The envelope of gases surrounding the Earth's crust is called",
    optionA: "Hydrosphere",
    optionB: "Barysphere",
    optionC: "Atmosphere",
    optionD: "Lithosphere",
    correctOption: "C"
  },
  {
    questionNumber: 34,
    questionText: "Carbonaceous type of sedimentary rocks are made from",
    optionA: "Remains of dead animals",
    optionB: "Vegetable matter",
    optionC: "Molten magma",
    optionD: "Living plants and animals",
    correctOption: "B"
  },
  {
    questionNumber: 35,
    questionText: "Autotrophs, heterotrophs and decomposers are associated with",
    optionA: "Vegetation",
    optionB: "Climate",
    optionC: "Ecosystem",
    optionD: "Geology",
    correctOption: "A"
  },
  {
    questionNumber: 36,
    questionText: "Which of the following pairs of rocks is not correctly shown?",
    optionA: "Clay → Slate",
    optionB: "Limestone → Marble",
    optionC: "Sandstone → Quartzite",
    optionD: "Slate → Graphite",
    correctOption: "D"
  },
  {
    questionNumber: 37,
    questionText: "Cold currents can also cause",
    optionA: "Rise in tide",
    optionB: "Rise in temperature of the area",
    optionC: "Sea level to rise",
    optionD: "Fogs instead of actual rain",
    correctOption: "D"
  },
  {
    questionNumber: 38,
    questionText: "The most predominant occupation of most of the population of West African countries is",
    optionA: "Farming",
    optionB: "Fishing",
    optionC: "Mining",
    optionD: "Teaching",
    correctOption: "A"
  },
  {
    questionNumber: 39,
    questionText: "Which of the following is not a characteristic of subsistence farming?",
    optionA: "The produce is mainly for home consumption",
    optionB: "It is capital intensive",
    optionC: "Simple farming tools are used",
    optionD: "It is labour intensive",
    correctOption: "B"
  },
  {
    questionNumber: 40,
    questionText: "Trans-continental highways link up",
    optionA: "Mining cities",
    optionB: "Countries in a continent",
    optionC: "State headquarters",
    optionD: "Local settlements",
    correctOption: "B"
  },
  {
    questionNumber: 41,
    questionText: "Heavy industries require",
    optionA: "Mostly coal to run them",
    optionB: "Cheap raw materials as inputs",
    optionC: "Generators only as source of electricity",
    optionD: "Large capital to set up",
    correctOption: "D"
  },
  {
    questionNumber: 42,
    questionText: "Which of the following is likely to make petroleum drilling unimportant?",
    optionA: "Depletion of reserves",
    optionB: "Adequate capital",
    optionC: "Adequate skilled labour",
    optionD: "Good management",
    correctOption: "A"
  },
  {
    questionNumber: 43,
    questionText: "Which of the following statements most apply for solar energy production in Tropical Africa?",
    optionA: "Generated without cost",
    optionB: "Imported from Europe",
    optionC: "Produced in higher latitudes",
    optionD: "Cheap and readily accessible",
    correctOption: "D"
  },
  {
    questionNumber: 44,
    questionText: "They are headquarters of governments and are usually capital cities. This best describes",
    optionA: "Market towns",
    optionB: "Administrative towns",
    optionC: "Educational towns",
    optionD: "Mining towns",
    correctOption: "B"
  },
  {
    questionNumber: 45,
    questionText: "One of the usefulness of import tariff on imported goods is the",
    optionA: "Encouragement of importation",
    optionB: "Multiplication of foreign goods",
    optionC: "Protection of infant industries",
    optionD: "Saving of money",
    correctOption: "C"
  },
  {
    questionNumber: 46,
    questionText: "Textile industries are located",
    optionA: "Near the market",
    optionB: "Where water resource is scarce",
    optionC: "In wide plains",
    optionD: "Near sources of raw materials",
    correctOption: "A"
  },
  {
    questionNumber: 47,
    questionText: "Which of the following factors is unique to the development of the aircraft industry in California?",
    optionA: "Availability of cheap labour",
    optionB: "The peaceful political atmosphere",
    optionC: "The government limited support",
    optionD: "Clear sky which favours testing of aircraft",
    correctOption: "A"
  },
  {
    questionNumber: 48,
    questionText: "The ranking of settlements into rural and urban is mostly based on",
    optionA: "Location",
    optionB: "Size",
    optionC: "Pattern",
    optionD: "Population",
    correctOption: "C"
  },
  {
    questionNumber: 49,
    questionText: "All the following agricultural practices are intensive farming techniques except",
    optionA: "Crop rotation",
    optionB: "Crop farming",
    optionC: "Mixed farming",
    optionD: "Market gardening",
    correctOption: "A"
  },
  {
    questionNumber: 50,
    questionText: "Natural increase in population means excess of",
    optionA: "Emigration over immigration",
    optionB: "Immigration over emigration",
    optionC: "Deaths over births",
    optionD: "Births over deaths",
    correctOption: "D"
  }
];

async function seedGeography() {
  console.log("Starting Geography seeding process...");

  // Check if Geography subject exists
  const existingSubject = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, "Geography"));

  let geographySubject;

  if (existingSubject.length === 0) {
    console.log("Creating Geography subject...");
    const [newSubject] = await db
      .insert(subjects)
      .values({
        name: "Geography",
        duration: 50, // 50 minutes for 50 questions
        questionCount: 50,
      })
      .returning();
    geographySubject = newSubject;
    console.log("✅ Geography subject created:", geographySubject.id);
  } else {
    geographySubject = existingSubject[0];
    console.log("✅ Geography subject already exists:", geographySubject.id);
  }

  // Insert questions
  let insertedCount = 0;
  let skippedCount = 0;

  for (const q of geographyQuestions) {
    // Check if question already exists
    const existingQuestion = await db
      .select()
      .from(questions)
      .where(
        and(
          eq(questions.subjectId, geographySubject.id),
          eq(questions.questionNumber, q.questionNumber)
        )
      );

    if (existingQuestion.length > 0) {
      console.log(`⏭️  Question ${q.questionNumber} already exists, skipping...`);
      skippedCount++;
      continue;
    }

    // Insert the question
    await db.insert(questions).values({
      subjectId: geographySubject.id,
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption,
      instruction: q.instruction || null,
    });

    insertedCount++;
    console.log(`✅ Inserted question ${q.questionNumber}`);
  }

  console.log("\n=== Geography Seeding Complete ===");
  console.log(`📊 Total questions: ${geographyQuestions.length}`);
  console.log(`✅ Inserted: ${insertedCount}`);
  console.log(`⏭️  Skipped (already exist): ${skippedCount}`);
  console.log("=====================================\n");
}

seedGeography()
  .then(() => {
    console.log("Geography seeding successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Geography seeding failed:", error);
    process.exit(1);
  });
