import { db } from './db';
import { questions, subjects } from '../shared/schema';
import { eq, and } from 'drizzle-orm';

async function fixLiteratureQuestions() {
  console.log('Starting to fix Literature in English questions...');

  // Get Literature in English subject
  const [literatureSubject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, 'Literature in English'));

  if (!literatureSubject) {
    console.error('Literature in English subject not found!');
    return;
  }

  console.log(`Found Literature in English subject: ${literatureSubject.id}`);

  // Questions 9-10: Poetry extract about "little learning"
  const questions9to10 = [
    {
      number: 9,
      text: 'The expression "a little learning is a dangerous thing" means that',
      options: ['a little learning is harmful', 'a lot of learning is dangerous', 'one should learn a lot or nothing', 'learning is generally dangerous'],
      answer: 'C'
    },
    {
      number: 10,
      text: 'The poem is written in',
      options: ['free verse', 'blank verse', 'heroic couplets', 'sonnet form'],
      answer: 'C'
    }
  ];

  // Questions 21-25: Prose passage about Akpause
  const questions21to25 = [
    {
      number: 21,
      text: 'The word "marooned" as used in the passage means',
      options: ['stranded', 'imprisoned', 'punished', 'confined'],
      answer: 'A'
    },
    {
      number: 22,
      text: 'Akpause looked for help from',
      options: ['the mountain', 'the valley', 'the distance', 'the Lord'],
      answer: 'C'
    },
    {
      number: 23,
      text: 'The phrase "the hollow of his person-tree" refers to',
      options: ['his stomach', 'his mind', 'his heart', 'his soul'],
      answer: 'A'
    },
    {
      number: 24,
      text: 'The tone of the passage is one of',
      options: ['hope', 'despair', 'anger', 'confusion'],
      answer: 'B'
    },
    {
      number: 25,
      text: 'The narrative technique used in the passage is',
      options: ['first person', 'second person', 'third person omniscient', 'third person limited'],
      answer: 'C'
    }
  ];

  // Questions 26-30: Poem about "wintering strokes"
  const questions26to30 = [
    {
      number: 26,
      text: 'The "lies" in the poem are described as coming from',
      options: ['the mind', 'the heart', 'the soul', 'the brain'],
      answer: 'B'
    },
    {
      number: 27,
      text: 'The phrase "angels of death" is an example of',
      options: ['simile', 'metaphor', 'personification', 'hyperbole'],
      answer: 'B'
    },
    {
      number: 28,
      text: 'The expression "hopeless hope" is',
      options: ['an oxymoron', 'a paradox', 'a euphemism', 'an irony'],
      answer: 'A'
    },
    {
      number: 29,
      text: 'The tone of the poem is',
      options: ['celebratory', 'accusatory', 'melancholic', 'reflective'],
      answer: 'B'
    },
    {
      number: 30,
      text: 'The poem suggests that the lies have',
      options: ['destroyed the speaker', 'brought peace', 'caused war', 'brought disorder'],
      answer: 'D'
    }
  ];

  // Questions 31-35: A Midsummer Night's Dream Act I
  const questions31to35 = [
    {
      number: 31,
      text: 'The speaker in the extract is',
      options: ['Theseus', 'Philostrate', 'Hippolyta', 'Egeus'],
      answer: 'A'
    },
    {
      number: 32,
      text: 'The speaker wants to',
      options: ['prepare for a funeral', 'organize entertainment', 'start a war', 'hold a meeting'],
      answer: 'B'
    },
    {
      number: 33,
      text: 'The phrase "I wooed thee with my sword" suggests that',
      options: ['Theseus won Hippolyta in battle', 'Theseus threatened Hippolyta', 'Theseus protected Hippolyta', 'Theseus fought for Hippolyta'],
      answer: 'A'
    },
    {
      number: 34,
      text: 'The mood of the extract is',
      options: ['somber', 'festive', 'tense', 'melancholic'],
      answer: 'B'
    },
    {
      number: 35,
      text: 'The extract is from',
      options: ['the beginning of the play', 'the middle of the play', 'near the end of the play', 'the climax of the play'],
      answer: 'A'
    }
  ];

  // Questions 36-40: A Midsummer Night's Dream Act III
  const questions36to40 = [
    {
      number: 36,
      text: 'Speaker X is addressing',
      options: ['Lysander', 'Demetrius', 'Oberon', 'Puck'],
      answer: 'B'
    },
    {
      number: 37,
      text: 'The speakers are',
      options: ['fighting', 'arguing', 'searching', 'hiding'],
      answer: 'B'
    },
    {
      number: 38,
      text: 'The word "recreant" means',
      options: ['coward', 'warrior', 'friend', 'stranger'],
      answer: 'A'
    },
    {
      number: 39,
      text: 'Speaker Y is',
      options: ['Hermia', 'Helena', 'Lysander', 'Demetrius'],
      answer: 'C'
    },
    {
      number: 40,
      text: 'The tone of the exchange is',
      options: ['friendly', 'hostile', 'playful', 'romantic'],
      answer: 'B'
    }
  ];

  // Questions 41-45: A Midsummer Night's Dream Act IV (first extract)
  const questions41to45 = [
    {
      number: 41,
      text: 'The speaker is referring to',
      options: ['Titania', 'Hermia', 'Helena', 'Hippolyta'],
      answer: 'A'
    },
    {
      number: 42,
      text: 'The "hateful fool" refers to',
      options: ['Bottom', 'Puck', 'Lysander', 'Demetrius'],
      answer: 'A'
    },
    {
      number: 43,
      text: 'The speaker\'s attitude is one of',
      options: ['anger', 'pity', 'joy', 'indifference'],
      answer: 'B'
    },
    {
      number: 44,
      text: 'The "coronet of fresh and fragrant flowers" symbolizes',
      options: ['love', 'mockery', 'respect', 'honor'],
      answer: 'A'
    },
    {
      number: 45,
      text: 'The speaker is',
      options: ['Oberon', 'Theseus', 'Puck', 'Bottom'],
      answer: 'A'
    }
  ];

  // Questions 46-50: A Midsummer Night's Dream Act IV (second extract)
  const questions46to50 = [
    {
      number: 46,
      text: 'The speaker of this extract is',
      options: ['Bottom', 'Puck', 'Oberon', 'Theseus'],
      answer: 'A'
    },
    {
      number: 47,
      text: 'The speaker is trying to',
      options: ['describe his dream', 'forget his dream', 'interpret his dream', 'share his dream'],
      answer: 'C'
    },
    {
      number: 48,
      text: 'The confusion of senses in the extract is an example of',
      options: ['synesthesia', 'metaphor', 'simile', 'personification'],
      answer: 'A'
    },
    {
      number: 49,
      text: 'The tone of the speaker is',
      options: ['serious', 'confused', 'angry', 'joyful'],
      answer: 'B'
    },
    {
      number: 50,
      text: 'The phrase "man is but a patched fool" suggests that',
      options: ['humans are wise', 'humans are limited', 'humans are creative', 'humans are powerful'],
      answer: 'B'
    }
  ];

  // Combine all questions
  const allQuestions = [
    ...questions9to10,
    ...questions21to25,
    ...questions26to30,
    ...questions31to35,
    ...questions36to40,
    ...questions41to45,
    ...questions46to50
  ];

  // Update each question
  for (const q of allQuestions) {
    console.log(`Updating question ${q.number}...`);
    
    await db
      .update(questions)
      .set({
        questionText: q.text,
        optionA: q.options[0],
        optionB: q.options[1],
        optionC: q.options[2],
        optionD: q.options[3],
        correctOption: q.answer
      })
      .where(
        and(
          eq(questions.subjectId, literatureSubject.id),
          eq(questions.questionNumber, q.number)
        )
      );
  }

  console.log('✅ Successfully fixed all Literature in English passage-based questions!');
  process.exit(0);
}

fixLiteratureQuestions().catch(error => {
  console.error('Error fixing Literature questions:', error);
  process.exit(1);
});
