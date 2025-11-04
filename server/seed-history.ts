import { db } from './db';
import { questions, subjects } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function seedHistory() {
  console.log('Starting to seed History subject and questions...');

  // Check if History subject already exists
  let [historySubject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, 'History'));

  if (!historySubject) {
    // Create History subject
    const [newSubject] = await db
      .insert(subjects)
      .values({
        name: 'History',
        duration: 50,
        questionCount: 50
      })
      .returning();
    
    historySubject = newSubject;
    console.log(`Created History subject: ${historySubject.id}`);
  } else {
    console.log(`Found existing History subject: ${historySubject.id}`);
    
    // Delete existing History questions
    await db.delete(questions).where(eq(questions.subjectId, historySubject.id));
    console.log('Deleted existing History questions');
  }

  const historyQuestions = [
    {
      num: 1,
      text: "Documentary sources of history are classified into two main groups, one of which is",
      a: "travellers' journals source.",
      b: "primary source.",
      c: "praise songs source.",
      d: "diary source.",
      answer: "B"
    },
    {
      num: 2,
      text: "Correction of European misconception of the African past is one of the reasons for studying the",
      a: "European way of life.",
      b: "work of past adventurers.",
      c: "European history.",
      d: "African history.",
      answer: "D"
    },
    {
      num: 3,
      text: "Historical information obtained from the study of present day festivals comes from the work of",
      a: "ethnographers.",
      b: "ethnobotanists.",
      c: "serologists.",
      d: "art historians.",
      answer: "A"
    },
    {
      num: 4,
      text: "Carvings, paintings and weavings are examples of",
      a: "oral tradition.",
      b: "art forms.",
      c: "ethnomusicology.",
      d: "ethnography.",
      answer: "B"
    },
    {
      num: 5,
      text: "The trans-Saharan trade was controlled by the",
      a: "Western Sudanese pirates.",
      b: "Berber merchants.",
      c: "Arab missionaries.",
      d: "Tuareg herders.",
      answer: "B"
    },
    {
      num: 6,
      text: "The trans-Saharan trade was mainly influenced by two important commodities which were",
      a: "gold and horse.",
      b: "donkey and horse.",
      c: "gun and kolanuts.",
      d: "salt and gold.",
      answer: "D"
    },
    {
      num: 7,
      text: "Which of the following was a major effect of the trans-Saharan trade?",
      a: "Growth of towns and cities",
      b: "Adoption of a common currency",
      c: "Colonization of West African states",
      d: "Decline of mining and agriculture",
      answer: "A"
    },
    {
      num: 8,
      text: "Which of the following was not used as a currency during the trans-Saharan trade?",
      a: "Beads",
      b: "Gold",
      c: "Cowrie Shells",
      d: "Iron Coins",
      answer: "D"
    },
    {
      num: 9,
      text: "The group that served as a guide to the trans-Saharan traders was the",
      a: "Berbers.",
      b: "Tuareg.",
      c: "Arabs.",
      d: "Negroes.",
      answer: "B"
    },
    {
      num: 10,
      text: "Islam was brought to West Africa by the",
      a: "Moors.",
      b: "Tuareg.",
      c: "Berbers.",
      d: "Hausa.",
      answer: "C"
    },
    {
      num: 11,
      text: "Which of the following factors encouraged the emergence of Muslim centres in Western Sudan?",
      a: "Education",
      b: "Trade",
      c: "Warfare",
      d: "Agriculture",
      answer: "B"
    },
    {
      num: 12,
      text: "Islam spread into Western Sudan from",
      a: "Southern Africa.",
      b: "Central Africa.",
      c: "East Africa.",
      d: "North Africa.",
      answer: "D"
    },
    {
      num: 13,
      text: "Islam was peacefully accepted by the West Africans because of all the following reasons except",
      a: "waging of jihad by Islamic scholars.",
      b: "acceptance of polygamous marriage.",
      c: "tolerance to some traditional practices.",
      d: "simplicity of doctrine and mode of worship.",
      answer: "A"
    },
    {
      num: 14,
      text: "Rulers in some West African states embraced Islam because it",
      a: "made them extremely rich.",
      b: "reduced the powers of the traditional priests.",
      c: "enhanced their political authority.",
      d: "gained recognition from European explorers.",
      answer: "C"
    },
    {
      num: 15,
      text: "Early European contact with West Africa led to",
      a: "inter-ethnic rivalries among West Africans.",
      b: "European knowledge of numerous places in the region.",
      c: "enslavement of many West African chiefs.",
      d: "establishment of manufacturing industries in the region.",
      answer: "B"
    },
    {
      num: 16,
      text: "The main problem that the Europeans were confronted with when they first arrived in West Africa was",
      a: "shortage of personnel.",
      b: "shortage of resources.",
      c: "opposition to trade.",
      d: "language barrier.",
      answer: "D"
    },
    {
      num: 17,
      text: "Which of the following statements was not an effect of European contact with West Africa?",
      a: "Reduction in commercial activities in the region",
      b: "Diversion of trade from the interior to the coast",
      c: "Eradication of slavery and slave trade",
      d: "Attraction of the missionaries to parts of the region",
      answer: "C"
    },
    {
      num: 18,
      text: "Coastal traders opposed European penetration into the interior of some West African states because the Europeans would",
      a: "destroy their local idols.",
      b: "want to stop ethnic rivalry.",
      c: "disengage them as middlemen.",
      d: "embark on rapid industrialization.",
      answer: "C"
    },
    {
      num: 19,
      text: "The Europeans purposely came to West Africa to embark on all the following except",
      a: "establishment of colonies.",
      b: "promotion and spread of their culture.",
      c: "promotion of African culture.",
      d: "promotion and spread of Christianity.",
      answer: "C"
    },
    {
      num: 20,
      text: "Slaves in West Africa were exchanged for all the following items except",
      a: "gold dust.",
      b: "gun powder.",
      c: "textiles.",
      d: "copper bars.",
      answer: "A"
    },
    {
      num: 21,
      text: "Which of the following factors was not an effect of the trans-Atlantic slave trade in West Africa?",
      a: "Neglect of the indigenous industries",
      b: "Forging of numerous military alliances",
      c: "Neglect of agriculture",
      d: "Increase warfare and destruction of property",
      answer: "B"
    },
    {
      num: 22,
      text: "European demand for slaves reached its peak in the",
      a: "14th century.",
      b: "15th century.",
      c: "18th century.",
      d: "20th century.",
      answer: "C"
    },
    {
      num: 23,
      text: "Britain had great interest in stopping the trans-Atlantic slave trade because she",
      a: "wanted to promote West African culture.",
      b: "needed palm oil for her factories.",
      c: "had powerful chiefs and nobles.",
      d: "acquired the knowledge of planting crops.",
      answer: "B"
    },
    {
      num: 24,
      text: "The group of freed slaves who were settled in Freetown in 1800 was the",
      a: "Maroons.",
      b: "Recaptives.",
      c: "Nova Scotians.",
      d: "British loyalists.",
      answer: "A"
    },
    {
      num: 25,
      text: "Christian missionary activities in West Africa promoted",
      a: "smooth flow of the trade in humans.",
      b: "the development of legitimate trade.",
      c: "religious and ethnic wars.",
      d: "African traditional way of life.",
      answer: "B"
    },
    {
      num: 26,
      text: "One negative effect of Christian missionary activities on the people of West Africa was the",
      a: "establishment of experimental farms.",
      b: "monopolization of the gold trade in the region.",
      c: "exportation of quality goods to the region.",
      d: "condemnation of African cultural belief.",
      answer: "D"
    },
    {
      num: 27,
      text: "The Christian missionaries realized that the success of their work depended largely on",
      a: "helping orphans in the region.",
      b: "the building of many churches.",
      c: "the promotion of Western education.",
      d: "the introduction of European culture.",
      answer: "C"
    },
    {
      num: 28,
      text: "The most important social contribution of the Christian missionaries in West Africa was the",
      a: "promotion of international trade with Europe.",
      b: "establishment of colonies for their home governments.",
      c: "introduction of farm settlements for cash crop production.",
      d: "establishment of organizations to cater for the poor and needy.",
      answer: "D"
    },
    {
      num: 29,
      text: "In what way did the Christian missionaries contribute to the political development of West Africa? The",
      a: "educated elite were trained in the schools established by them.",
      b: "missionaries offered Western education to the traditional rulers only.",
      c: "missionaries sent all the children of the traditional rulers to study in Europe.",
      d: "missionaries employed West Africans to make laws for the people.",
      answer: "A"
    },
    {
      num: 30,
      text: "The phrase 'Scramble for Africa' is often used by historians to refer to the",
      a: "involvement of Europeans in African affairs.",
      b: "division of African lands by the chiefs.",
      c: "mad rush by the Europeans to occupy African territories.",
      d: "mass importation of European goods into Africa.",
      answer: "C"
    },
    {
      num: 31,
      text: "All the following factors contributed to the partition of West Africa except",
      a: "the desire to encourage the rise of powerful West African chiefs.",
      b: "the need to invest surplus capital.",
      c: "the desire to control sources of raw materials.",
      d: "the need to find markets for European goods.",
      answer: "A"
    },
    {
      num: 32,
      text: "The first European country to abandon her colonies in West Africa was",
      a: "Britain.",
      b: "Germany.",
      c: "France.",
      d: "Portugal.",
      answer: "B"
    },
    {
      num: 33,
      text: "Which of the following nations was not a signatory to the Berlin Conference of 1884-85?",
      a: "Norway",
      b: "Germany",
      c: "Britain",
      d: "Belgium",
      answer: "A"
    },
    {
      num: 34,
      text: "One major effect of the Scramble for and Partition of West Africa was the",
      a: "reduction of West African population.",
      b: "accelerated development of social infrastructure.",
      c: "introduction of West Africans to the New World.",
      d: "re-demarcation of West African boundaries.",
      answer: "D"
    },
    {
      num: 35,
      text: "The following were impacts of the Industrial Revolution on West Africa except",
      a: "export of locally produced items to Europe.",
      b: "large scale production of cash crops in the region.",
      c: "setting up of manufacturing industries in the region.",
      d: "introduction and adoption of Western culture.",
      answer: "C"
    },
    {
      num: 36,
      text: "The colonial administration that used traditional rulers was referred to as",
      a: "Assimilation.",
      b: "Direct rule.",
      c: "Indirect rule.",
      d: "Paternalism.",
      answer: "C"
    },
    {
      num: 37,
      text: "Colonial administrative centres were major factors in the",
      a: "growth of urban areas.",
      b: "increase in the number of farmers.",
      c: "development of rural areas.",
      d: "reduction of job opportunities.",
      answer: "A"
    },
    {
      num: 38,
      text: "Which of the following was a French Commune in West Africa?",
      a: "Abidjan",
      b: "Goree",
      c: "Lome",
      d: "Cotonou",
      answer: "B"
    },
    {
      num: 39,
      text: "Which of the following factors did not determine the West African resistance to colonialism?",
      a: "The nature of leadership",
      b: "The introduction of legitimate trade",
      c: "Religious and economic influence",
      d: "Methods adopted by the European imperialists",
      answer: "B"
    },
    {
      num: 40,
      text: "One of the benefits West Africans gained from participating in the two World Wars was the",
      a: "knowledge of assembling armoured cars.",
      b: "opportunity to travel abroad.",
      c: "learning of the art of modern warfare.",
      d: "opportunity to marry European women.",
      answer: "C"
    },
    {
      num: 41,
      text: "The root cause of boundary disputes in West Africa could be traced to",
      a: "frequent migration of citizens.",
      b: "ideological differences among states.",
      c: "intense rivalry among the people before colonialism.",
      d: "the Berlin Conference of 1884-1885.",
      answer: "D"
    },
    {
      num: 42,
      text: "One major effect of boundary disputes on African unity was the",
      a: "disruption of peaceful co-existence.",
      b: "free movement of goods and people across different international borders.",
      c: "establishment of trade relations among states.",
      d: "non-participation of some African countries in the meetings of O.A.U",
      answer: "A"
    },
    {
      num: 43,
      text: "Neo-colonialism is seen as governance by remote control in West Africa because their governments",
      a: "are well managed.",
      b: "often use remote control.",
      c: "are engineered by remote control.",
      d: "could not direct their own affairs.",
      answer: "D"
    },
    {
      num: 44,
      text: "One major problem associated with military regimes in West Africa was that they were",
      a: "submissive to technocrats.",
      b: "respectful to civilians.",
      c: "intolerant to dissent.",
      d: "open to criticism.",
      answer: "C"
    },
    {
      num: 45,
      text: "Which of the following factors did not account for urban development in West Africa after independence?",
      a: "Good communication system",
      b: "Political instability",
      c: "Inter-state trading",
      d: "Establishment of schools",
      answer: "B"
    },
    {
      num: 46,
      text: "In order to entrench themselves in power, some West African leaders began to",
      a: "acquire many landed property.",
      b: "provide the needs of the people.",
      c: "use repressive measures.",
      d: "wear attractive clothes.",
      answer: "C"
    },
    {
      num: 47,
      text: "The Atlantic Charter encouraged the struggle for independence in West Africa because it",
      a: "emphasized self-determination.",
      b: "supported military invasions.",
      c: "encouraged freedom of expression.",
      d: "advocated the formation of labour unions.",
      answer: "A"
    },
    {
      num: 48,
      text: "The Organization of African Unity (O.A.U) was formed in",
      a: "Lagos.",
      b: "Kampala.",
      c: "Addis Ababa.",
      d: "Dakar.",
      answer: "C"
    },
    {
      num: 49,
      text: "All the following were aims of the Organization of African Unity (O.A.U) except",
      a: "improving the lives of all Africans.",
      b: "promoting unity among member states.",
      c: "achieving independence for all African countries.",
      d: "sending all Europeans out of Africa.",
      answer: "D"
    },
    {
      num: 50,
      text: "Free movement of people, goods and services was the principal aim of the",
      a: "Organization of African Unity.",
      b: "Economic Community of West African States.",
      c: "Commonwealth of Nations.",
      d: "Non-Aligned movement.",
      answer: "B"
    }
  ];

  // Insert questions
  for (const q of historyQuestions) {
    await db.insert(questions).values({
      subjectId: historySubject.id,
      questionNumber: q.num,
      questionText: q.text,
      optionA: q.a,
      optionB: q.b,
      optionC: q.c,
      optionD: q.d,
      correctOption: q.answer
    });
  }

  console.log(`✅ Successfully seeded ${historyQuestions.length} History questions!`);
  console.log(`Subject: History | Duration: 50 minutes | Questions will be shuffled`);
}

seedHistory()
  .then(() => {
    console.log("Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding History:", error);
    process.exit(1);
  });
