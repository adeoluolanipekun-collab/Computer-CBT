import { db } from "./db";
import { questions, subjects } from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function fixPassageQuestions() {
  try {
    // Get English subject
    const englishSubject = await db.query.subjects.findFirst({
      where: eq(subjects.name, "English"),
    });

    if (!englishSubject) {
      console.error("English subject not found");
      return;
    }

    // Updated instruction with gaps instead of answers
    const passageInstruction = `In the following passage, the numbered gaps indicate missing words. Against each number in the list below, four options are given in columns lettered A to D. Choose the word that is the most suitable to fill the numbered gaps in the passage.

A student had a severe attack of malaria and was rushed to the hospital in a private ambulance. He was brought to the ………71………. ward where the doctor on duty was waiting to attend to him. The patient was wheeled into the consulting room on a ………72………. and the nurses stepped aside for the doctor to start his examination. He took out his ………73………. - placed its arms into his ears to listen to the patient's heartbeat. The patient's temperature was taken with a clinical ………74……….

When the doctor completed his diagnosis, he asked the nurse to take the patient to the ………75………. where he was kept under observation for twenty-four hours.

Drugs and injections were ………76………. by the doctor and were administered by the nurses. One of the nurses loaded a ………77………. for an injection to be given to the patient. Two days later, he started to ………78………. and the doctor decided to ………79………. him. He was advised by the doctor to sleep under a ………80………. mosquito net.`;

    // Update question 71 with the corrected passage instruction
    await db
      .update(questions)
      .set({ instruction: passageInstruction })
      .where(
        and(
          eq(questions.subjectId, englishSubject.id),
          eq(questions.questionNumber, 71)
        )
      );

    console.log("✓ Updated passage instruction for question 71");

    // Update questions 71-80 to have minimal question text (just the number)
    const questionUpdates = [
      { num: 71, text: "71.", optionA: "in-patient", optionB: "medical", optionC: "out-patient", optionD: "surgical" },
      { num: 72, text: "72.", optionA: "truck", optionB: "trolley", optionC: "stretcher", optionD: "table" },
      { num: 73, text: "73.", optionA: "telescope", optionB: "microscope", optionC: "periscope", optionD: "stethoscope" },
      { num: 74, text: "74.", optionA: "thermometer", optionB: "hydrometer", optionC: "crucible", optionD: "spatula" },
      { num: 75, text: "75.", optionA: "ward", optionB: "hall", optionC: "room", optionD: "lounge" },
      { num: 76, text: "76.", optionA: "prescribed", optionB: "written", optionC: "authorised", optionD: "ordered" },
      { num: 77, text: "77.", optionA: "capsule", optionB: "syringe", optionC: "vial", optionD: "tube" },
      { num: 78, text: "78.", optionA: "relax", optionB: "recoup", optionC: "recuperate", optionD: "revive" },
      { num: 79, text: "79.", optionA: "discharge", optionB: "release", optionC: "free", optionD: "acquit" },
      { num: 80, text: "80.", optionA: "dyed", optionB: "treated", optionC: "washed", optionD: "sprayed" },
    ];

    for (const q of questionUpdates) {
      await db
        .update(questions)
        .set({
          questionText: q.text,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
        })
        .where(
          and(
            eq(questions.subjectId, englishSubject.id),
            eq(questions.questionNumber, q.num)
          )
        );
      console.log(`✓ Updated question ${q.num}`);
    }

    console.log("\n✅ All passage questions fixed successfully!");
  } catch (error) {
    console.error("Error fixing passage questions:", error);
  }
}

fixPassageQuestions();
