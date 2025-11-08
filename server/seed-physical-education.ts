import { db } from "./db";
import { subjects, questions } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const physicalEducationQuestions = [
  {
    questionNumber: 1,
    questionText: "The following values are associated with sports except",
    options: ["Security", "friendship", "socialization", "cooperation"],
    correctAnswer: "A"
  },
  {
    questionNumber: 2,
    questionText: "The Olympic torch represents",
    options: ["unity and power", "unit and understanding", "symbol of Olympic spirit", "symbol of Olympic loyalty"],
    correctAnswer: "C"
  },
  {
    questionNumber: 3,
    questionText: "Which of the following statements is not associated with the rules of the Olympic Games?",
    options: ["Non possession of criminal records", "Non usage of illegal means to win", "Ability to win at the competition", "Competitor must be a bonafide citizen"],
    correctAnswer: "C"
  },
  {
    questionNumber: 4,
    questionText: "Recreational facilities do not include",
    options: ["swimming pool", "library", "amusement park", "beach"],
    correctAnswer: "B"
  },
  {
    questionNumber: 5,
    questionText: "An example of non recreational activity is",
    options: ["drinking alcohol", "canoeing", "walking", "playing chess"],
    correctAnswer: "A"
  },
  {
    questionNumber: 6,
    questionText: "The pair of traditional sports used in welcoming heroes and heroines in West Africa are",
    options: ["basketball and wrestling", "dance and wrestling", "hockey and dance", "tennis and dance"],
    correctAnswer: "B"
  },
  {
    questionNumber: 7,
    questionText: "Which of the following factors greatly affect sports development in West African countries?",
    options: ["Weather", "Education", "Politics", "Age"],
    correctAnswer: "C"
  },
  {
    questionNumber: 8,
    questionText: "In a tennis game, if the server has three points and the receiver has two points, the score is",
    options: ["40 - 30", "40 - 45", "30 - 15", "30 - 20"],
    correctAnswer: "A"
  },
  {
    questionNumber: 9,
    questionText: "Knockout as a method of elimination in sporting activities is used where there",
    options: ["are many event", "are many teams", "is one team", "is one event"],
    correctAnswer: "B"
  },
  {
    questionNumber: 10,
    questionText: "Which of the following statements Is not an importance of National Sports festival?",
    options: ["Encouragement of moral decadence", "Opportunity for socialization", "Promotion of national unity", "Identification of talents"],
    correctAnswer: "A"
  },
  {
    questionNumber: 11,
    questionText: "Membership of All-Africa Games is limited to",
    options: ["Non-English speaking countries in Africa", "English speaking countries in Africa", "Independent Countries in Africa", "Commonwealth Countries in Africa"],
    correctAnswer: "C"
  },
  {
    questionNumber: 12,
    questionText: "The person labeled II is the",
    options: ["pattern", "student", "supporter", "victim"],
    correctAnswer: "D",
    instruction: "The diagram below illustrates an activity In first Aid care. Study It and answer questions 12 and 13\n\n![First Aid Diagram](@assets/IMAGE 2_1762601431230.png)"
  },
  {
    questionNumber: 13,
    questionText: "The type of accident the person labelled II could have had is",
    options: ["shock", "strain", "fracture", "sprain"],
    correctAnswer: "C",
    instruction: "The diagram below illustrates an activity In first Aid care. Study It and answer questions 12 and 13\n\n![First Aid Diagram](@assets/IMAGE 2_1762601431230.png)"
  },
  {
    questionNumber: 14,
    questionText: "The defect Illustrated in the diagram is",
    options: ["kyphoxis", "scoliosis", "knock knees", "hollow hack"],
    correctAnswer: "A",
    instruction: "The diagram below illustrates a postural defect. Study it and answer questions 14 and 15\n\n![Postural Defect](@assets/IMAGE 1_1762601431230.png)"
  },
  {
    questionNumber: 15,
    questionText: "Which of the following factors could cause the defect illustrated in the diagram",
    options: ["Strengthen the back muscles", "Poor sitting posture", "Overweight", "Insomnia"],
    correctAnswer: "B",
    instruction: "The diagram below illustrates a postural defect. Study it and answer questions 14 and 15\n\n![Postural Defect](@assets/IMAGE 1_1762601431230.png)"
  },
  {
    questionNumber: 16,
    questionText: "Engaging in physical exercise could lead to",
    options: ["increase in size of the muscles", "increase in size of the stomach", "decrease in blood circulation", "decrease in bone density"],
    correctAnswer: "A"
  },
  {
    questionNumber: 17,
    questionText: "Which of the following substances would not aid adenosine triphosphate (ATP) replenishment?",
    options: ["Hydrogen", "Oxygen", "Phosphate", "Lactic acid"],
    correctAnswer: "D"
  },
  {
    questionNumber: 18,
    questionText: "The mineral that regulates actions of the muscles and nerves is",
    options: ["iodine", "iron", "calcium", "potassium"],
    correctAnswer: "C"
  },
  {
    questionNumber: 19,
    questionText: "The plane that divide* the body into right and left parts is",
    options: ["sagital", "frontal", "coronal", "horizontal"],
    correctAnswer: "A"
  },
  {
    questionNumber: 20,
    questionText: "The movement of the arm away from the body is",
    options: ["flexion", "rotation", "abduction", "pronation"],
    correctAnswer: "C"
  },
  {
    questionNumber: 21,
    questionText: "Which of the following best describes physical fitness?",
    options: ["lift heavy load", "overcome stress", "perform work", "relate freely"],
    correctAnswer: "C"
  },
  {
    questionNumber: 22,
    questionText: "Which of the following best describes physical fitness?",
    options: ["lift heavy load", "overcome stress", "perform work", "relate freely"],
    correctAnswer: "C"
  },
  {
    questionNumber: 23,
    questionText: "A long distance walk on foot describes",
    options: ["hiking", "jogging", "striding", "strolling"],
    correctAnswer: "A"
  },
  {
    questionNumber: 24,
    questionText: "To win a match of volleyball game, a team must win ........... sets of playing rounds.",
    options: ["3", "6", "9", "12"],
    correctAnswer: "A"
  },
  {
    questionNumber: 25,
    questionText: "Rotation of players in volleyball is",
    options: ["anticlockwise", "clockwise", "even numbers rotate first", "no define system"],
    correctAnswer: "B"
  },
  {
    questionNumber: 26,
    questionText: "The game of football is solely controlled by",
    options: ["assistant referee", "coach", "commentator", "referee"],
    correctAnswer: "D"
  },
  {
    questionNumber: 27,
    questionText: "Which of the following games is played by hitting the ball with a racket against a wall?",
    options: ["Badminton", "Cricket", "squash", "Tennis"],
    correctAnswer: "C"
  },
  {
    questionNumber: 28,
    questionText: "The following are types of passes in basketball except",
    options: ["bounce", "chest", "hook", "lay-up"],
    correctAnswer: "D"
  },
  {
    questionNumber: 29,
    questionText: "The preliminary race to qualify for the next round is called.........",
    options: ["heat", "middle distance", "pre-qualify", "sprints"],
    correctAnswer: "A"
  },
  {
    questionNumber: 30,
    questionText: "What is the width in metre of an athletic lane?",
    options: ["1.10", "1.15", "1.22", "1.25"],
    correctAnswer: "D"
  },
  {
    questionNumber: 31,
    questionText: "Which of the following is not a recommended sport wear?",
    options: ["Canvas and socks", "gowns", "shorts", "Track suits"],
    correctAnswer: "B"
  },
  {
    questionNumber: 32,
    questionText: "NICEGA is a body responsible for the organization of sports and games among Nigerian",
    options: ["armed forces", "colleges of education", "polytechnics", "secondary schools"],
    correctAnswer: "B"
  },
  {
    questionNumber: 33,
    questionText: "The following are values derived from swimming except",
    options: ["entertainment", "recreational", "safety", "social"],
    correctAnswer: "C"
  },
  {
    questionNumber: 34,
    questionText: "When an athlete beats the gun twice in a track event, he is",
    options: ["allowed one more trial", "disqualified", "placed on the last lane", "suspended"],
    correctAnswer: "B"
  },
  {
    questionNumber: 35,
    questionText: "The end product of fat digestion is",
    options: ["amino acid", "fatty acid", "glucose", "glycogen"],
    correctAnswer: "B"
  },
  {
    questionNumber: 36,
    questionText: "The following are causes of human trafficking except",
    options: ["broken homes", "ignorance", "ill-health", "poverty"],
    correctAnswer: "C"
  },
  {
    questionNumber: 37,
    questionText: "In a game of volleyball, a player is allowed to hit the ball ...... time(s)",
    options: ["5", "4", "1", "3"],
    correctAnswer: "C"
  },
  {
    questionNumber: 38,
    questionText: "Which of the following does not affect woman participation in sports?",
    options: ["culture", "economy", "emotion", "physique"],
    correctAnswer: "C"
  },
  {
    questionNumber: 39,
    questionText: "The ability to perform a specific activity without undue fatigue is called",
    options: ["Agility", "Endurance", "power", "speed"],
    correctAnswer: "B"
  },
  {
    questionNumber: 40,
    questionText: "Straddle style is employed in which of the following jumps?",
    options: ["Astride vault", "High jump", "Long jump", "pole vault"],
    correctAnswer: "B"
  },
  {
    questionNumber: 41,
    questionText: "The glide is a skill used in",
    options: ["Discus throw", "hammer throw", "high jump", "short put throw"],
    correctAnswer: "D"
  },
  {
    questionNumber: 42,
    questionText: "Which of these bodies is responsible for organizing athletic competitions in Nigeria?",
    options: ["AFN", "BFN", "GAN", "HFN"],
    correctAnswer: "A"
  },
  {
    questionNumber: 43,
    questionText: "Which of the following formations of play is most suitable for defensive strategy in soccer?",
    options: ["2:3:5", "2:4:4", "4:2:4", "4:4:2"],
    correctAnswer: "D"
  },
  {
    questionNumber: 44,
    questionText: "An injury resulting from the forceful twisting of the joint is called",
    options: ["Dislocation", "fracture", "sprain", "strain"],
    correctAnswer: "C"
  },
  {
    questionNumber: 45,
    questionText: "Which of the following is not a function of food in the body?",
    options: ["Development", "energy", "growth", "retardation"],
    correctAnswer: "D"
  },
  {
    questionNumber: 46,
    questionText: "The basic aim of administering first aid treatment is to",
    options: ["Assure the victim", "Deliver first aid kits", "Educate the victim", "Save life"],
    correctAnswer: "D"
  },
  {
    questionNumber: 47,
    questionText: "The best technique for receiving a service in the game of volleyball is",
    options: ["Blocking", "digging", "setting", "spiking"],
    correctAnswer: "B"
  },
  {
    questionNumber: 48,
    questionText: "Computer game is played for the following reasons except",
    options: ["Entertainment", "gain recognition", "recreation", "reduce tension"],
    correctAnswer: "B"
  },
  {
    questionNumber: 49,
    questionText: "Which of these is a traditional dance?",
    options: ["Atilogwu", "Gospel", "High life", "Jazz"],
    correctAnswer: "A"
  },
  {
    questionNumber: 50,
    questionText: "Which of the following equipment are used to play badminton game?",
    options: ["Bat and ball", "Bat and shuttle", "Racket and shuttle", "Racket and ball"],
    correctAnswer: "C"
  }
];

async function seedPhysicalEducation() {
  try {
    console.log("Starting Physical Education seeding...");

    const physicalEducationSubject = await db.query.subjects.findFirst({
      where: eq(subjects.name, "Physical Education")
    });

    if (!physicalEducationSubject) {
      console.error("Physical Education subject not found in database");
      console.log("Please ensure the subject has been created first");
      return;
    }

    console.log(`Found Physical Education subject with ID: ${physicalEducationSubject.id}`);

    let insertedCount = 0;
    let skippedCount = 0;

    for (const question of physicalEducationQuestions) {
      if (question.options.length !== 4) {
        console.error(`Question ${question.questionNumber} has invalid options array length: ${question.options.length}`);
        continue;
      }

      if (!['A', 'B', 'C', 'D'].includes(question.correctAnswer)) {
        console.error(`Question ${question.questionNumber} has invalid correct answer: ${question.correctAnswer}`);
        continue;
      }

      if (!question.questionText || question.questionText.trim() === '') {
        console.error(`Question ${question.questionNumber} has empty questionText`);
        continue;
      }

      const existingQuestion = await db.query.questions.findFirst({
        where: and(
          eq(questions.subjectId, physicalEducationSubject.id),
          eq(questions.questionNumber, question.questionNumber)
        )
      });

      if (existingQuestion) {
        console.log(`Question ${question.questionNumber} already exists, skipping...`);
        skippedCount++;
        continue;
      }

      await db.insert(questions).values({
        subjectId: physicalEducationSubject.id,
        questionNumber: question.questionNumber,
        questionText: question.questionText,
        optionA: question.options[0],
        optionB: question.options[1],
        optionC: question.options[2],
        optionD: question.options[3],
        correctOption: question.correctAnswer,
        instruction: question.instruction || null
      });

      insertedCount++;
      console.log(`Inserted question ${question.questionNumber}: ${question.questionText.substring(0, 50)}...`);
    }

    console.log("\n=== Physical Education Seeding Summary ===");
    console.log(`Total questions processed: ${physicalEducationQuestions.length}`);
    console.log(`Questions inserted: ${insertedCount}`);
    console.log(`Questions skipped (already exist): ${skippedCount}`);
    console.log("Physical Education seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding Physical Education questions:", error);
    throw error;
  }
}

seedPhysicalEducation()
  .then(() => {
    console.log("Seed script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
