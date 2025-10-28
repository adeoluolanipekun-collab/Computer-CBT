import { db } from "./db";
import { subjects, questions } from "@shared/schema";
import { eq } from "drizzle-orm";

// Define all questions from the PDFs
const questionsBySubject = {
  "Agriculture": [
    { num: 1, text: "Subsistence agriculture is mainly concerned with", a: "food production for export.", b: "food production using family labour.", c: "investment of high capital.", d: "large scale food production.", e: "mechanisation of all farm operations.", answer: "B" },
    { num: 2, text: "The major problem limiting all-year round crop production is", a: "inadequate farm inputs.", b: "pests infestation.", c: "poor marketing.", d: "poor storage facilities.", e: "unpredictable climate.", answer: "D" },
    { num: 3, text: "Most of the land for agricultural purposes in Nigeria are acquired through", a: "donation.", b: "inheritance.", c: "lease.", d: "pledge.", e: "purchase.", answer: "B" },
    { num: 4, text: "The interaction that mainly exists between croaker and shark in the sea is", a: "commensalism.", b: "competition.", c: "parasitism.", d: "predation.", e: "symbiosis.", answer: "D" },
    { num: 5, text: "An environmental factor that has the least influence on agricultural production in Nigeria is", a: "pressure.", b: "rainfall.", c: "sunlight.", d: "temperature.", e: "topography.", answer: "A" },
    { num: 6, text: "Which of the following uses of land should be given more consideration in order to produce sufficient food?", a: "Building of research centres", b: "Construction of food markets", c: "Establishment of botanical gardens", d: "Establishment of game reserves", e: "Establishment of mechanical farms", answer: "E" },
    { num: 7, text: "The chemical reaction in rock formation represented by FeO₂+3H₂O and Fe₂O₃·3H₂O is an example of", a: "carbonation.", b: "hydration.", c: "hydrolysis.", d: "oxidation.", e: "reduction.", answer: "B" },
    { num: 8, text: "Leaching is common on farmland that has soil.", a: "clayey loam", b: "loamy", c: "loam clay", d: "sandy clay", e: "sandy", answer: "E" },
    { num: 9, text: "A fertile soil under the influence of high rainfall may experience poor yield due to", a: "high alkalinity.", b: "lack of microbes.", c: "leaching of nutrients.", d: "low pH values.", e: "soil erosion.", answer: "C" },
    { num: 10, text: "The commonest means of testing soil acidity is by the use of", a: "calorimetric method.", b: "electroanetic method.", c: "litmus paper.", d: "pH scale.", e: "universal method.", answer: "D" },
    { num: 11, text: "Nitrogen deficiency in plants can be detected by the farmer when there are", a: "holes on leaves.", b: "lodging of stems.", c: "mottled leaves.", d: "under-developed roots.", e: "yellowish leaves.", answer: "E" },
    { num: 12, text: "The biotic relationship which exists between microorganisms that live in the part labelled II and the plant itself is [Diagram referenced]", a: "commensalism.", b: "competition.", c: "mutualism.", d: "parasitism.", e: "predation.", answer: "C" },
    { num: 13, text: "Which of the following is not a method of applying fertilizer?", a: "Broadcasting", b: "Dusting", c: "Foliar spray", d: "Side placement", e: "Top dressing", answer: "B" },
    { num: 14, text: "Nitrobacter is important in nitrogen cycle because it converts", a: "ammonia to nitrates.", b: "ammonia to nitrites.", c: "nitrates to nitrites.", d: "nitrites to ammonia.", e: "nitrites to nitrates.", answer: "E" },
    { num: 15, text: "A farming practice that prevents excessive evaporation of water from soil surface is", a: "bush burning.", b: "clean clearing.", c: "flooding.", d: "liming.", e: "mulching.", answer: "E" },
    { num: 16, text: "A major disadvantage of surface irrigation is that", a: "it increases the activities of soil microbes.", b: "it reduces salt concentration in the root area.", c: "it requires less water.", d: "some crops may not tolerate heavy flooding.", e: "the amount of water supplied is regulated.", answer: "D" },
    { num: 17, text: "Siting of feed mills near poultry houses is discouraged because dust particles from the mills cause", a: "dropping of birds wings.", b: "general unthrifiness in birds.", c: "high mortality of birds.", d: "respiratory difficulties in birds.", e: "roughness of birds feathers.", answer: "D" },
    { num: 18, text: "The disadvantage of farm mechanisation in Nigeria is that it", a: "displaces many workers.", b: "increases efficiency of production.", c: "increases scale of operation.", d: "promotes specialisation of labour.", e: "reduces farm hazard.", answer: "A" },
    { num: 19, text: "Which of the following is an advantage of mechanical power? It", a: "increases drudgery in farm work.", b: "increases number of labourers employed.", c: "increases total cost of production.", d: "makes farm operation very timely.", e: "requires technical skills to operate.", answer: "D" },
    { num: 20, text: "Which of the following is a good quality of pasture? It", a: "has low moisture content.", b: "has low nutritive value.", c: "possesses high stem/leaf ratio.", d: "prevents soil erosion.", e: "regenerates after burning.", answer: "D" },
    { num: 21, text: "The common name of Boerhavia diffusa is", a: "amaranthus.", b: "pig weed.", c: "flocks grass.", d: "trianthema.", e: "wild marigold.", answer: "B" },
    { num: 22, text: "An example of crop that is both propagated vegetatively and by seed is", a: "cassava.", b: "okro.", c: "orange.", d: "pineapple.", e: "tomato.", answer: "E" },
    { num: 23, text: "The following are conditions necessary for practising taungya system in Nigeria except", a: "government policies.", b: "lack of jobs.", c: "over population.", d: "scarcity of land.", e: "standard of living.", answer: "C" },
    { num: 24, text: "The forest product that is required in paper industry is", a: "dye.", b: "fibre.", c: "pulp.", d: "resin.", e: "rubber.", answer: "C" },
    { num: 25, text: "Floriculture is a branch of agriculture that deals with the production and management of", a: "cereals.", b: "flowers.", c: "fruits.", d: "legumes.", e: "tubers.", answer: "B" },
    { num: 26, text: "Which of the following groups of crops can be attacked by smut?", a: "Maize, rice and cowpea", b: "Rice, maize and sorghum", c: "Sorghum, sugarcane and rubber", d: "Sugarcane, maize and banana", e: "Tomatoes, rubber and cotton", answer: "B" },
    { num: 27, text: "Cassava mosaic disease is transmitted by", a: "airborne spores.", b: "infected cuttings.", c: "rain drops.", d: "sucking insects.", e: "white flies.", answer: "E" },
    { num: 28, text: "Treatment of seeds before planting is a method of pest control.", a: "biological", b: "chemical", c: "cultural", d: "physical", e: "quarantine", answer: "B" },
    { num: 29, text: "The most destructive pest of cassava foliage is", a: "aphid.", b: "grasshopper.", c: "leaf worm.", d: "rodent.", e: "weaver bird.", answer: "C" },
    { num: 30, text: "The following are common weeds found in the farm except", a: "Boerhavia diffusa.", b: "Cynodon dactylon.", c: "Eleusine indica.", d: "Imperata cylindrica.", e: "Saccharum officinarum.", answer: "E" },
    { num: 31, text: "The correct sequence of food passage in the digestive tract of a ruminant animal is", a: "abomasum > omasum > rumen > reticulum.", b: "omasum > abomasum > reticulum > rumen.", c: "reticulum > rumen > omasum > abomasum.", d: "rumen > omasum > abomasum > reticulum.", e: "rumen > reticulum > omasum > abomasum.", answer: "E" },
    { num: 32, text: "The part of respiratory system responsible for exchange of gases between the lungs and bloodstream is the", a: "alveoli.", b: "diaphragm.", c: "epiglottis.", d: "nostrils.", e: "trachea.", answer: "A" },
    { num: 33, text: "A female fowl above one year is known as", a: "capon.", b: "chick.", c: "cock.", d: "hen.", e: "pullet.", answer: "D" },
    { num: 34, text: "Second candling of eggs should be carried out between after setting.", a: "1 – 3 days", b: "5 – 10 days", c: "12 – 14 days", d: "18 – 19 days", e: "20 – 21 days", answer: "D" },
    { num: 35, text: "The process of separating a suckling kid from nanny is", a: "breeding.", b: "isolation.", c: "kidding.", d: "selection.", e: "weaning.", answer: "E" },
    { num: 36, text: "Which of the following animal feeds is classified as roughage?", a: "Blood meal", b: "Fish meal", c: "Maize bean", d: "Palm kernel cake", e: "Soya bean meal", answer: "C" },
    { num: 37, text: "The anti-sterility vitamin in livestock is vitamin", a: "A.", b: "B.", c: "D.", d: "E.", e: "K.", answer: "E" },
    { num: 38, text: "Which of the following is not a type of grazing?", a: "Controlled", b: "Paddock", c: "Rotational", d: "Strip", e: "Zero", answer: "E" },
    { num: 39, text: "A farm animal disease that can be transmitted from animal to man is", a: "aspergillosis.", b: "brucellosis.", c: "pneumonia.", d: "rinderpest.", e: "tuberculosis.", answer: "B" },
    { num: 40, text: "Which of the following is a symptom of coccidiosis?", a: "Blood stained diarrhoea", b: "Constant coughing", c: "Difficulty in breathing", d: "Inflammation of udder", e: "Nervous disorder", answer: "A" },
    { num: 41, text: "Acaricides are used to control", a: "flies.", b: "hookworms.", c: "ringworm.", d: "roundworms.", e: "Tick", answer: "E" },
    { num: 42, text: "Control of water level in a fish pond with minimal loss of fish can be achieved with the aid of", a: "monk and outer channel.", b: "monk with screen.", c: "screen and outlet.", d: "wooden panel and boughs.", e: "wooden panel and screen.", answer: "B" },
    { num: 43, text: "An example of cartilaginous fish is", a: "catfish.", b: "cod.", c: "dog fish.", d: "gold fish.", e: "mackerel.", answer: "C" },
    { num: 44, text: "The by-product of goat used in the manufacturing of button is", a: "fat.", b: "hoof.", c: "horn.", d: "skin.", e: "tail.", answer: "C" },
    { num: 45, text: "Bee keeping is advantageous in crop production because they", a: "add organic matter to the soil.", b: "help in cross pollination.", c: "improve the soil structure.", d: "increase the activity of soil microbes.", e: "release oxygen for photosynthesis.", answer: "B" },
    { num: 46, text: "Which of the following is not a type of artificial selection?", a: "Family selection", b: "Line selection", c: "Mass selection", d: "Pedigree selection", e: "Progeny selection", answer: "A" },
    { num: 47, text: "A farmer adds more labour and capital to a fixed unit of land at the initial stage of production to", a: "decrease profit margin.", b: "decrease total product.", c: "increase marginal product.", d: "increase production cost.", e: "stabilise produce price.", answer: "C" },
    { num: 48, text: "The quantity of fertilizer acquired and used in an orchard should be written in record.", a: "farm input.", b: "inventory.", c: "labour.", d: "production.", e: "purchase.", answer: "A" },
    { num: 49, text: "The channel of distribution that puts goods in the hands of consumers directly is", a: "assembling.", b: "processing.", c: "production.", d: "retailing.", e: "wholesaling.", answer: "D" },
    { num: 50, text: "The exportation of cashewnut is beneficial to the farmer because it", a: "creates trade relationship.", b: "diversifies economy of a nation.", c: "generates foreign exchange.", d: "improves the standard of living.", e: "supplies industries with raw materials.", answer: "C" }
  ],
  "Biology": [
    { num: 1, text: "In the scientific name Bagleau vivaks, vivaks is the", a: "Genus name.", b: "Species name.", c: "Family name.", d: "Class name.", answer: "B" },
    { num: 2, text: "Which of the following structures is used for locomotion in the organism? [Diagram referenced]", a: "I", b: "II", c: "III", d: "IV", answer: "C" },
    { num: 3, text: "Which of the following processes would be affected if the part labelled I is removed? [Diagram referenced]", a: "Irritability", b: "Nutrition", c: "Locomotion", d: "Reproduction", answer: "C" },
    { num: 4, text: "The sexual reproductive structure in ferns is", a: "sorus.", b: "seed.", c: "radicle.", d: "endosperm.", answer: "A" },
    { num: 5, text: "A disadvantage of complexity in higher organisms is", a: "a high demand for food and oxygen.", b: "specialization of parts of the body.", c: "little amount of energy dissipated in functioning.", d: "ability to function in many specialized roles.", answer: "A" },
    { num: 6, text: "Which of the following living things is not single-celled?", a: "Euglena", b: "Paramecium", c: "Amoeba", d: "Caesalpinia", answer: "D" },
    { num: 7, text: "Synthesis of proteins occurs in the", a: "mitochondrion.", b: "rough endoplasmic reticulum.", c: "Golgi body.", d: "chloroplast.", answer: "B" },
    { num: 8, text: "The process by which a drop of ink spreads uniformly in a beaker of water is called", a: "absorption.", b: "osmosis.", c: "diffusion.", d: "plasmolysis.", answer: "C" },
    { num: 9, text: "The type of reproduction in the leaf is [Diagram referenced]", a: "binary fission.", b: "budding.", c: "spore formation.", d: "vegetative.", answer: "D" },
    { num: 10, text: "The part labelled I is [Diagram referenced]", a: "an adventitious root.", b: "a taproot.", c: "an axillary root.", d: "a fibrous root.", answer: "A" },
    { num: 11, text: "The bone on which the skull rests is known as", a: "odontoid process.", b: "axis.", c: "atlas.", d: "occipital condyle.", answer: "C" },
    { num: 12, text: "The process that takes place in the cells is [Diagram referenced]", a: "transpiration.", b: "phosphorylation.", c: "translocation.", d: "respiration.", answer: "C" },
    { num: 13, text: "The process takes place in the [Diagram referenced]", a: "xylem.", b: "phloem.", c: "epidermis.", d: "pith.", answer: "B" },
    { num: 14, text: "Which of the following processes occurs during exhalation in humans? The", a: "ribs are pulled upward and outward.", b: "space in chest cavity increases.", c: "diaphragm becomes flattened.", d: "diaphragm forms a dome shape.", answer: "D" },
    { num: 15, text: "The parts of the mammalian kidney which contain the tubules are the", a: "medulla and ureter.", b: "pyramid and cortex.", c: "ureter and cortex.", d: "cortex and medulla.", answer: "D" },
    { num: 16, text: "A chemical substance produced in small quantities in one part of the body and carried to other parts where it produces a response is called", a: "urine", b: "lymph", c: "enzyme", d: "hormone", answer: "D" },
    { num: 17, text: "A change in the environment to which an organism responds and also serves as a signal for nerve actions is known as", a: "reaction", b: "incident", c: "stimulus", d: "synapse", answer: "C" },
    { num: 18, text: "The statement that describes the change in the diameter of the pupil is that the diameter of the pupil [Graph referenced]", a: "increased because the light intensity increased.", b: "decreased because the light intensity decreased.", c: "increased because the light intensity decreased.", d: "decreased because the light intensity increased.", answer: "C" },
    { num: 19, text: "The diameter of the pupil remained unchanged at [Graph referenced]", a: "5, 10, and 15 seconds.", b: "5, 10, and 20 seconds.", c: "10, 20, and 25 seconds.", d: "10, 20, and 30 seconds.", answer: "A" },
    { num: 20, text: "The diameter of the pupil remained unchanged for a period because the light intensity was [Graph referenced]", a: "reduced", b: "increased", c: "steady", d: "harmful", answer: "C" },
    { num: 21, text: "A collection of petals is called", a: "calyx", b: "receptacle", c: "stigma", d: "corolla", answer: "D" },
    { num: 22, text: "How many molecules of ATP are produced when one mole of glucose is completely oxidized?", a: "10", b: "24", c: "30", d: "38", answer: "D" },
    { num: 23, text: "The aim of the experiment was to show that", a: "chlorophyll is necessary for photosynthesis", b: "light is necessary for photosynthesis", c: "oxygen is given off during photosynthesis", d: "water is necessary for photosynthesis", answer: "A" },
    { num: 24, text: "The reason for putting the leaf in boiling water was to", a: "decolourize the leaf by removing chlorophyll", b: "soften the leaf", c: "kill the cells and expose starch grains", d: "destroy the chlorophyll", answer: "C" },
    { num: 25, text: "The simple sugars that combine to form sucrose are", a: "glucose + glucose", b: "glucose + galactose", c: "glucose + fructose", d: "fructose + fructose", answer: "C" },
    { num: 26, text: "Which of the following deficiency diseases is caused by lack of Vitamin A?", a: "I", b: "II", c: "III", d: "IV", answer: "B" },
    { num: 27, text: "Which of the following combinations of deficiency disease and remedy is correctly matched?", a: "I – Vitamin K", b: "II – Vitamin D", c: "III – Vitamin C", d: "IV – Vitamin B", answer: "D" },
    { num: 28, text: "The major importance of the water cycle is in", a: "industrialization", b: "conservation", c: "osmoregulation", d: "digestion", answer: "B" },
    { num: 29, text: "The best method of refuse disposal in a community is", a: "composting", b: "incineration", c: "dumping in the sea", d: "dumping in fast flowing water", answer: "B" },
    { num: 30, text: "Which of the following statements is not an adaptive feature of organisms in the desert?", a: "Few sweat glands and leathery skin", b: "Small roots with thin epidermis", c: "Stems with spines", d: "Excretion of uric acid in some animals", answer: "B" },
    { num: 31, text: "Which of the following factors is density-dependent?", a: "Cannibalism", b: "Bushfire", c: "Drought", d: "Flood", answer: "A" },
    { num: 32, text: "Populations of different species of organisms living together and interacting in a habitat is known as", a: "biosphere", b: "community", c: "niche", d: "environment", answer: "B" },
    { num: 33, text: "Water transparency is measured using", a: "hygrometer", b: "anemometer", c: "Six's thermometer", d: "Secchi disc", answer: "D" },
    { num: 34, text: "Which of the following statements about organisms in a food chain is not correct?", a: "Green plants convert solar to chemical energy", b: "Green plants manufacture food from organic compounds", c: "All blue-green algae and green plants are producers", d: "Producers make food from inorganic compounds", answer: "B" },
    { num: 35, text: "The relationship between a tapeworm and its host is", a: "mutualism", b: "commensalism", c: "predation", d: "parasitism", answer: "D" },
    { num: 36, text: "Most tropical plants shed leaves during dry conditions to", a: "reduce growth rate", b: "conserve water", c: "reduce competition", d: "minimize photosynthesis", answer: "B" },
    { num: 37, text: "The practice of warming soup regularly is essential to", a: "inactivate microorganisms", b: "remove excess water", c: "retain the taste", d: "break down cellulose substances", answer: "A" },
    { num: 38, text: "Which of the following qualifies the female Anopheles mosquito as an effective vector of malaria? It", a: "lays few eggs", b: "has sucking mouthparts", c: "makes a buzzing sound", d: "has a small body", answer: "B" },
    { num: 39, text: "The most appropriate method for conserving fish is", a: "use of chemicals", b: "small mesh nets", c: "observing close season regulations", d: "removing spawning grounds", answer: "C" },
    { num: 40, text: "Which of the following about water conservation is not correct?", a: "International laws control fishing methods", b: "Pond resources are exhaustible", c: "Organizing fishing festivals conserves fish", d: "Desertification cannot dry lakes", answer: "C" },
    { num: 41, text: "Natural resources can be conserved by all except", a: "legislation", b: "afforestation", c: "maintaining wetlands", d: "unrestricted hunting", answer: "D" },
    { num: 42, text: "Identical twins can be distinguished by", a: "physiological variation", b: "genetic trait", c: "morphological variation", d: "blood group", answer: "A" },
    { num: 43, text: "Which of the following variations is caused by both genetics and environment?", a: "Obesity", b: "Eye colour", c: "Blood group", d: "Sex", answer: "A" },
    { num: 44, text: "Individuals with blood group AB can donate blood to individuals with", a: "O", b: "A", c: "AB", d: "B", answer: "C" },
    { num: 45, text: "If two parents are sickle-cell carriers, their genotypes would be", a: "HbᴬHbᴬ and HbᴬHbᴬ", b: "HbᴬHbˢ and HbᴬHbˢ", c: "HbᴬHbᴬ and HbˢHbˢ", d: "HbᴬHbˢ and HbˢHbˢ", answer: "B" },
    { num: 46, text: "More combinations of alleles in gametes arise due to", a: "centromere", b: "chiasmata", c: "crossing over", d: "anaphase", answer: "C" },
    { num: 47, text: "Which of the following is not correct about fingerprint as a crime tool?", a: "Unique to a person", b: "Permanent patterns", c: "Patterns more distinct in babies", d: "Imprints on objects handled", answer: "C" },
    { num: 48, text: "Which of the following insects is useful to flowers?", a: "Butterfly", b: "Cockroach", c: "Housefly", d: "Beetle", answer: "A" },
    { num: 49, text: "The division of labour in social insects is an example of", a: "hormonal influence", b: "behavioural adaptation", c: "commensalism", d: "structural adaptation", answer: "B" },
    { num: 50, text: "Which feature is used by chameleons to escape predation?", a: "Fearsome appearance", b: "Curly tail", c: "Offensive smell", d: "Adaptive colouration", answer: "D" }
  ],
  "Chemistry": [
    { num: 1, text: "An alkyl group has a general formula of", a: "CₙH₂ₙ₋₁", b: "CₙH₂ₙ₊₁", c: "CₙH₂ₙ₋₂⁻", d: "CₙH₂ₙ₊₁⁺", answer: "B" },
    { num: 2, text: "The rate of a chemical reaction is affected by all of the following factors except", a: "presence of light", b: "nature of reactants", c: "nature of products", d: "surface area of reactants", answer: "C" },
    { num: 3, text: "Which of the following compounds would produce effervescence when reacted with sodium hydrogen trioxocarbonate (IV)?", a: "CH₃CH₂COOH", b: "CH₃CH₂COOCH₃", c: "CH₃CH₂CH₂OH", d: "CH₃CH₂CHOHCH₃", answer: "A" },
    { num: 4, text: "Consider the following chemical equation: Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s). The species that is reduced is", a: "magnesium atom", b: "copper ions", c: "magnesium ions", d: "copper atom", answer: "B" },
    { num: 5, text: "Which of the following substances would react with ethane to form more than one product?", a: "Argon", b: "Hydrogen", c: "Oxygen", d: "Steam", answer: "C" },
    { num: 6, text: "Which of the following gases would change colour when bubbled into a phenolphthalein solution?", a: "HCl", b: "NH₃", c: "N₂O", d: "H₂S", answer: "B" },
    { num: 7, text: "What is the IUPAC name of HCOOCH₂CH₂CH₃?", a: "Butanoic acid", b: "Butanoate", c: "Methyl propanoate", d: "Propyl methanoate", answer: "D" },
    { num: 8, text: "On heating 100 cm³ of a saturated solution to dryness, 2.5 g of anhydrous salt was obtained. The solubility of the salt would be", a: "40 g dm⁻³", b: "25 g dm⁻³", c: "4.0 g dm⁻³", d: "2.5 g dm⁻³", answer: "B" },
    { num: 9, text: "Which of the following compounds is a member of the hydrocarbon series with the general formula CₙH₂ₙ₋₆?", a: "C₃H₆", b: "C₄H₈", c: "C₅H₈", d: "C₆H₁₂", answer: "D" },
    { num: 10, text: "Consider the following equilibrium reaction: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq). When 0.1 mol dm⁻³ HCl is added to the system, the equilibrium position would shift to the", a: "right and the concentration of Ag⁺ decreases", b: "right and the concentration of Ag⁺ increases", c: "left and the concentration of Ag⁺ decreases", d: "left and the concentration of Ag⁺ increases", answer: "C" },
    { num: 11, text: "Which of the following statements is not a characteristic of a redox reaction?", a: "Oxidation number of species change", b: "A precipitate is produced", c: "It involves transfer of electrons", d: "It occurs between oxidizing and reducing agents", answer: "B" },
    { num: 12, text: "Which of the following substances is a basic salt?", a: "Mg(OH)NO₃", b: "Na₂SO₄", c: "ZnCl₂", d: "KAl(SO₄)₂·12H₂O", answer: "A" },
    { num: 13, text: "In the electrolysis of AgNO₃(aq), the current required to deposit 10.8 g of silver in 1 hr 15 mins is [Ag = 108, 1F = 96500 C]", a: "1.00 A", b: "1.50 A", c: "2.00 A", d: "2.14 A", answer: "D" },
    { num: 14, text: "An aqueous solution of a substance extracted from a plant tasted bitter and has a pH 8. The solution will", a: "turn blue litmus paper red", b: "turn red litmus paper blue", c: "give effervescence with Na₂CO₃", d: "have no effect on methyl orange", answer: "B" },
    { num: 15, text: "How many moles of electrons would be required to produce 1.12 dm³ of hydrogen gas at s.t.p from the half-cell reaction? 2H⁺(aq) + 2e⁻ → H₂(g) [molar volume of a gas at s.t.p = 22.4 dm³]", a: "0.01", b: "0.10", c: "1.00", d: "0.20", answer: "B" },
    { num: 16, text: "When a sample of a gas is heated at constant pressure, the average kinetic energy of its molecules usually", a: "decreases and the volume decreases", b: "decreases and the volume increases", c: "increases and the volume increases", d: "increases and the volume decreases", answer: "C" },
    { num: 17, text: "Graphite can be used in making", a: "electrodes.", b: "electrical wires.", c: "metal plates.", d: "roofing sheets.", answer: "A" },
    { num: 18, text: "A salt whose aqueous solution does not form white precipitate with ammonium trioxocarbonate (IV) contains", a: "lead.", b: "calcium.", c: "iron.", d: "potassium.", answer: "D" },
    { num: 19, text: "When an electrolyte dissolves in water, it would break down into charged particles by", a: "dissociation process.", b: "electrolytic process.", c: "neutralization process.", d: "contact process.", answer: "A" },
    { num: 20, text: "The names of Newlands, Mendeleev and Meyer are associated with the development of", a: "atomic structure.", b: "metallurgy.", c: "periodic table.", d: "electrochemical series.", answer: "C" },
    { num: 21, text: "If an electrochemical cell has a cell emf of –1.26 V, the cell reaction would be", a: "spontaneous.", b: "non-spontaneous.", c: "at equilibrium.", d: "slow.", answer: "B" },
    { num: 22, text: "The random movement of a speck of a solid in a liquid or gas is known as", a: "Brownian motion.", b: "suspension.", c: "diffusion.", d: "osmosis.", answer: "A" },
    { num: 23, text: "The behaviour of real gases deviates from that of ideal gases mostly at", a: "high pressures and low temperatures.", b: "high pressures and high temperatures.", c: "low pressures and high temperatures.", d: "low pressures and low temperatures.", answer: "A" },
    { num: 24, text: "Which of the following gas samples contains 3.0 × 10²³ molecules?", a: "71.0 g of Cl₂", b: "2.0 g of H₂", c: "14.0 g of N₂", d: "38.0 g of F₂", answer: "C" },
    { num: 25, text: "Which of the following statements about Ca(OH)₂ is correct? It is", a: "a strong base.", b: "an alkali.", c: "soluble in water.", d: "slaked to form quicklime.", answer: "B" },
    { num: 26, text: "The empirical formula of the compound with molecular formula C₂H₄O₂ is", a: "CH₂O.", b: "CHO₂.", c: "CHO.", d: "C₂H₄O₂.", answer: "A" },
    { num: 27, text: "When elements ¹²Z and ¹⁷Y combine, they form", a: "a covalent compound ZY₂.", b: "an ionic compound YZ₂.", c: "an ionic compound ZY₂.", d: "a covalent compound YZ₂.", answer: "C" },
    { num: 28, text: "Where on the periodic table would an element with electron configuration 1s²2s²2p⁶3s²3p³ be found?", a: "Group III, period 3", b: "Group III, period 5", c: "Group V, period 5", d: "Group V, period 3", answer: "D" },
    { num: 29, text: "Which of the following salts is insoluble in water?", a: "CaCO₃", b: "CaCl₂", c: "NaCl", d: "Na₂SO₄", answer: "A" },
    { num: 30, text: "How many moles of K⁺ ions are there in 0.12 dm³ of 0.015 mol dm⁻³ K₂SO₄(aq)?", a: "1.8 × 10⁻³ mol", b: "3.6 × 10⁻³ mol", c: "5.4 × 10⁻³ mol", d: "7.2 × 10⁻³ mol", answer: "B" },
    { num: 31, text: "Which of the following atoms would have the strongest attraction for electrons?", a: "Aluminium", b: "Chlorine", c: "Silicon", d: "Sodium", answer: "B" },
    { num: 32, text: "Which of the following compounds contains both covalent and ionic bonds?", a: "NaCl(g)", b: "HCl(g)", c: "NaNO₃(s)", d: "N₂O₅(s)", answer: "C" },
    { num: 33, text: "The atom that would have three unpaired p-electrons is", a: "¹⁴₇N", b: "¹⁹₉F", c: "¹⁶₈O", d: "¹²₆C", answer: "A" },
    { num: 34, text: "The maximum number of electrons that could be accommodated in a shell having the principal quantum number 4 is", a: "4", b: "8", c: "16", d: "32", answer: "D" },
    { num: 35, text: "Sodium chloride would be readily soluble in a", a: "non-polar solvent.", b: "polar solvent.", c: "saturated solvent.", d: "neutral solvent.", answer: "B" },
    { num: 36, text: "Consider the following equation: K₂Cr₂O₇ + 14HCl → 2KCl + 2CrCl₃ + 7H₂O + 3Cl₂. The oxidation number of chromium changes from", a: "+6 to +3", b: "+6 to +2", c: "+7 to +2", d: "+2 to +3", answer: "A" },
    { num: 37, text: "Which of the following elements has the least first ionization energy?", a: "Silicon", b: "Nitrogen", c: "Fluorine", d: "Phosphorus", answer: "A" },
    { num: 38, text: "Which of the following statements is not correct about 3d-orbitals?", a: "It can be partially filled.", b: "It belongs to the quantum number three.", c: "It is in the lower energy level than 4s-orbital.", d: "Pairing of electrons in the orbitals may occur.", answer: "C" },
    { num: 39, text: "Atomic size of elements increases down a group of the periodic table due to", a: "increase in nuclear charge", b: "increase in number of shells", c: "decrease in nuclear charge", d: "decrease in number of shells", answer: "B" },
    { num: 40, text: "Electronegativity is a measure of", a: "ability of an atom to draw electron cloud towards itself in a bond", b: "energy required in removing an electron from an atom", c: "energy released when an electron is added to an atom", d: "magnitude of the charge on an electron", answer: "A" },
    { num: 41, text: "The energy sublevel that is filled with electrons in elements with atomic numbers 21 and 29 is", a: "3s", b: "3d", c: "4p", d: "4d", answer: "B" },
    { num: 42, text: "A major concern of chemistry is the", a: "composition of substances and the changes they undergo", b: "advertisement of chemicals and their levels of toxicity", c: "lucrative index of chemical allied industries and their citing", d: "destructive use of nuclear energy", answer: "A" },
    { num: 43, text: "Which of the following properties is a characteristic of a pure substance?", a: "High boiling point", b: "Colourless solution", c: "Sharp melting point", d: "High density", answer: "C" },
    { num: 44, text: "Graham's law states that at constant temperature and pressure, the", a: "rate of diffusion of a gas is directly proportional to the square of its vapour density", b: "rate of diffusion of a gas is directly proportional to the square root of its vapour density", c: "rate of diffusion of a gas is inversely proportional to the square root of its vapour density", d: "mass of a gas is directly proportional to the square root of its vapour density", answer: "C" },
    { num: 45, text: "Fractional crystallization is used to separate different substances", a: "that have the same solubility in the same solvent", b: "that have different solubilities in the same solvent", c: "with different solubilities in different solvents", d: "that have same solubility in different solvents", answer: "B" },
    { num: 46, text: "Which of the following statements about polythene is correct? It", a: "decays in water.", b: "is not biodegradable.", c: "is a polymer of saturated monomers.", d: "is a product of condensation reaction.", answer: "B" },
    { num: 47, text: "The substance that is a natural polymer is", a: "starch.", b: "nylon.", c: "polystyrene.", d: "chlorophyll.", answer: "A" },
    { num: 48, text: "Consider the following reaction equation: Na₂CO₃·10H₂O(s) →(exposure to air)→ Na₂CO₃(s) + 10H₂O(l). What name is given to this type of reaction?", a: "Decomposition", b: "Deliquescence", c: "Efflorescence", d: "Hygroscopy", answer: "C" },
    { num: 49, text: "Alkanes are hazardous because they are", a: "corrosive.", b: "flammable.", c: "toxic when inhaled.", d: "toxic to the skin.", answer: "B" },
    { num: 50, text: "Which of the following factors should be considered when siting a factory in a particular country? I. Government policy II. The number of ethnic groups III. The official language of the country IV. Availability of raw materials", a: "I and II only", b: "II and III only", c: "I and IV only", d: "III and IV only", answer: "C" }
  ],
  "Christian Religious Studies": [
    { num: 1, text: "According to the second creation story, which of the following were formed out of the ground?", a: "Sun, moon and stars", b: "Firmaments and light", c: "Beast of the field and birds", d: "Fishes and all sea monsters", answer: "C" },
    { num: 2, text: "Which of the following is the reason for which God decided to make a helper fit for man in the garden of Eden? For", a: "communication", b: "companionship", c: "fellowship", d: "procreation", answer: "B" },
    { num: 3, text: "The supremacy of God during creation was manifested by His", a: "consent that a thing be done.", b: "command of let there be.", c: "creation of humankind.", d: "control over the heavens.", answer: "B" },
    { num: 4, text: "Apart from Joseph who was already in Egypt, the offspring of Jacob that migrated from Canaan to Egypt numbered", a: "sixty.", b: "seventy.", c: "eighty.", d: "ninety.", answer: "B" },
    { num: 5, text: "The name Manasseh which Joseph gave to his first son means", a: "a beloved son of Joseph's wife.", b: "God had made Joseph forget his hardship.", c: "God had delivered Joseph from death.", d: "God had forgotten Joseph and his family.", answer: "B" },
    { num: 6, text: "And the Lord said to Moses see, I make you as: God to Pharaoh; and Aaron your brother shall .... Which of the following roles was Aaron assigned?", a: "prophet.", b: "priest.", c: "seer.", d: "servant.", answer: "A" },
    { num: 7, text: "The presence of God among the Israelites is demonstrated by the symbol of", a: "fire and cloud.", b: "smoke and water.", c: "wind and dust.", d: "clouds and wind.", answer: "A" },
    { num: 8, text: "Joshua's success in the promised land was attributed to the fact that he was", a: "carefree about keeping the laws of God.", b: "strong and of good courage.", c: "anointed by Moses personally.", d: "able to take responsibilities.", answer: "B" },
    { num: 9, text: "During the mission of the twelve spies, which of the following tribes did Joshua represent?", a: "Ephraim", b: "Judah", c: "Reuben", d: "Levi", answer: "A" },
    { num: 10, text: "Who among the following kings did God sell the people of Israel to and were oppressed for twenty years?", a: "Ahab", b: "Jabin", c: "Nebuchadnezzar", d: "Asa", answer: "B" },
    { num: 11, text: "Sisera, the commander was killed by Jael whose husband was a", a: "Philistine.", b: "Israelite.", c: "Kenite.", d: "Jebusite.", answer: "C" },
    { num: 12, text: "Which of the following was the major sin attributed to Hophni and Phinehas? They", a: "treated the offering of the Lord with contempt.", b: "took bribes and had no regard for justice.", c: "engaged in idolatry and adultery.", d: "deposed their father from priesthood.", answer: "A" },
    { num: 13, text: "Samuel was said to have failed in matters of parental responsibility because he", a: "made his children to succeed him.", b: "made his children judges over Israel.", c: "did not bring up his children in his ways.", d: "could not maintain unity in his family.", answer: "C" },
    { num: 14, text: "Though you are little in your own eyes, are you not the head of the tribes of Israel? On which occasion was this statement made?", a: "During the sacrifice at Michmash", b: "When the sons of Samuel disobeyed God", c: "When the evil spirit tormented Saul", d: "During the war between Israel and Amalek", answer: "A" },
    { num: 15, text: "One important lesson that could be learnt from David when he spared the life of Saul is", a: "that we must not insult kings despite their wickedness.", b: "to avoid retaliation for wrong done against us.", c: "to pray for all who hate you.", d: "that no king should be killed by his subject.", answer: "B" },
    { num: 16, text: "Which of the following names was given to Solomon by the prophet Nathan when he was born?", a: "Ammon", b: "Absalom", c: "Jedediah", d: "Tamor", answer: "C" },
    { num: 17, text: "... And God said \"Ask what I shall give you\". To whom and where was this request made?", a: "David at Hebron", b: "Solomon at Hebron", c: "David at Gibeon", d: "Solomon at Gibeon", answer: "D" },
    { num: 18, text: "A major mistake attributed to Rehoboam was his decision to", a: "dare Jeroboam to divide the kingdom.", b: "lead Israel to war without God's approval.", c: "worship other gods and marry foreign wives.", d: "follow the negative footsteps of Solomon.", answer: "C" },
    { num: 19, text: "The reason for which the building of the temple came into fulfilment during the time of Solomon was that", a: "David was guilty of shedding blood.", b: "there was relative peace during his reign.", c: "his father had arranged for building materials.", d: "he offered enough sacrifices to God.", answer: "A" },
    { num: 20, text: "When Jezebel decided to cut off the prophets of the Lord, who among the following took a hundred prophets and hid them in a cave?", a: "Elijah", b: "Elisha", c: "Nathan", d: "Obadiah", answer: "D" },
    { num: 21, text: "Elijah ran from Mount Carmel to the city of Jezreel because he was", a: "chased by the Baal prophets.", b: "overjoyed by his journey.", c: "pursued by Ahab the king.", d: "possessed by the spirit of God.", answer: "C" },
    { num: 22, text: "Proclaim a fast and set Naboth on high among the people. Which of the following was Naboth charged with after the proclamation? He was charged with", a: "claiming to be the messiah and king.", b: "cursing God and the King.", c: "instigating riot among the people.", d: "refusing to release the family land to the king.", answer: "B" },
    { num: 23, text: "Which of the following was the reason for which God promised to punish the house of Ahab and not Ahab himself? Ahab", a: "humbled himself.", b: "acted under pressure.", c: "was a righteous man.", d: "acted wisely.", answer: "A" },
    { num: 24, text: "I have found the book of the law in the house of the Lord. The discovery of the law book", a: "revealed the sins of Manasseh.", b: "gave Josiah's reform direction.", c: "called for the revival of the passover.", d: "revealed God's righteousness and purity.", answer: "B" },
    { num: 25, text: "Huldah, the prophetess, pronounced evil upon Judah because the people", a: "had burned incense to other gods.", b: "were marrying foreign women.", c: "were disobedient to the king.", d: "had failed to keep the sabbath.", answer: "A" },
    { num: 26, text: "But the army of the Chaldeans pursued the king and overtook him in the plains of Jericho. This text alludes to the incident where", a: "the Babylonians arrested Zedekiah.", b: "the Babylonians made Zedekiah king.", c: "Nebuchadnezzar's army arrested Jehoiachin.", d: "Nebuchadnezzar's army chased Jehoiachin.", answer: "A" },
    { num: 27, text: "Which of the following ways did Nehemiah demonstrate concern for his nation? He", a: "revived the worship of Yahweh.", b: "rebuilt the temple of Jericho.", c: "reconstructed the walls of Jerusalem.", d: "led the exiles back home.", answer: "C" },
    { num: 28, text: "Then these men came by agreement and found Daniel making petition and supplication before his God. The people reminded the king about the following except the", a: "punishment for defaulters.", b: "power of the treaty.", c: "ban on worship.", d: "freedom of worship.", answer: "D" },
    { num: 29, text: "One immoral act that took place in Israel which was condemned by Amos was that", a: "priests slept with women in the temple.", b: "Nazarites drank wine and slept in the temple.", c: "the rich men took the wives of the poor.", d: "a man and his father went into the same woman.", answer: "D" },
    { num: 30, text: "To win Israel back to Himself, God promised turning the valley of Achor into a place of", a: "peace.", b: "hope.", c: "mercy.", d: "joy.", answer: "B" },
    { num: 31, text: "One significant difference between Matthew's and Mark's account of Jesus' baptism is that", a: "Matthew alone said that John felt inferior to baptise Jesus.", b: "Matthew alone said a voice came from heaven.", c: "Mark alone made mention of Galilee during the baptism.", d: "only Matthew reported that the spirit alighted on Jesus.", answer: "A" },
    { num: 32, text: "Which of the following was the sequence of Jesus' temptation according to Matthew?", a: "Temple → wilderness → mountain", b: "Wilderness → temple → mountain", c: "Mountain → temple → wilderness", d: "Wilderness → mountain → temple", answer: "B" },
    { num: 33, text: "I desire mercy, and not sacrificed for I came not to call the righteous, but sinners. Jesus made this remark when", a: "he called the first disciples by the sea.", b: "the Sadducees accused him of eating with sinners.", c: "the Pharisees accused him of eating with sinners.", d: "he healed the woman with the issue of blood.", answer: "C" },
    { num: 34, text: "Jesus' call of the first four disciples to be \"fishers of men\" implied that they were to", a: "propagate the teachings of Jesus.", b: "convert the Jews into Christians.", c: "win proselytes to Jesus.", d: "be trained to become Rabbis.", answer: "A" },
    { num: 35, text: "I do not say to you seven times, but seventy times seven. By this Jesus meant forgiveness", a: "must be done only seven times.", b: "takes place where there is a plea.", c: "is exercised when offence is repeated severally.", d: "does not need to have any limitation.", answer: "D" },
    { num: 36, text: "One of the major things Christians should do to merit God's forgiveness according to Jesus is", a: "praying without ceasing.", b: "fellowshiping together.", c: "offering sacrifices to God.", d: "forgiving people who offend them.", answer: "D" },
    { num: 37, text: "Which of the following is not a humiliation Jesus suffered during his trial?", a: "They spat on him", b: "His face was covered", c: "They put a crown on his head", d: "The guards received him with blows", answer: "C" },
    { num: 38, text: "A6 soul is very sorrowful, even to death; remain here and watch with me. Where was this remark made by Jesus?", a: "In the garden of Gethsemane", b: "When he was in the palace of Caiaphas", c: "On the way to Golgotha", d: "When he was sent to Herod", answer: "A" },
    { num: 39, text: "Jesus' offer of paradise to the repentant thief on the cross teaches that", a: "God's word must be fulfilled.", b: "repentance is never too late.", c: "Jesus was crucified to save sinners.", d: "people are punished not for their sins.", answer: "B" },
    { num: 40, text: "O foolish men, and slow of heart to believe all that the prophets have spoken! Which people were being referred to as foolish? The", a: "two men travelling to Emmaus.", b: "seventy disciples Jesus sent out.", c: "twelve apostles of Jesus.", d: "women who went to the tomb of Jesus.", answer: "A" },
    { num: 41, text: "Which of the following qualified Matthias as an apostle to replace Judas Iscariot? He", a: "had accompanied the disciples from the time of the baptism of Jesus.", b: "took active part in evangelism from house to house.", c: "was among the early disciples who prayed fervently.", d: "was among the one hundred and twenty disciples who had the Holy Spirit.", answer: "A" },
    { num: 42, text: "The replacement of Judas Iscariot was necessary because the", a: "death of Judas Iscariot was premature.", b: "twelve disciples represented the twelve tribes of Israel.", c: "prophesies of the scripture needed to be fulfilled.", d: "status quo of the twelve must be maintained.", answer: "B" },
    { num: 43, text: "Why did you go to uncircumcised men and eat with them? The uncircumcised men were the", a: "Gentiles of Caesarea.", b: "Gentiles of Joppa.", c: "household of Cornelius.", d: "household of Simon.", answer: "C" },
    { num: 44, text: "From his experience on the road to Damascus, Saul learnt all the following except", a: "persecuting the church meant persecuting the Lord.", b: "his confidence in Judaism was misplaced.", c: "he was specially chosen to preach to the Gentile.", d: "he could successfully promote his own will.", answer: "D" },
    { num: 45, text: "And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved. This statement was made by", a: "Jesus when he was going to heaven.", b: "the seven deacons during their appointment.", c: "Peter before the Sanhedrin.", d: "the apostles on the day of Pentecost.", answer: "C" },
    { num: 46, text: "Which of the following biblical characters was mentioned to have justified his/her faith by works?", a: "Ahab", b: "Jael", c: "Rehab", d: "Barnabas", answer: "C" },
    { num: 47, text: "Is any among you sick? Let him call for the elders of the church and let them pray over him. By this statement, James meant that", a: "we should not pray for ourselves when we are sick.", b: "the prayer of the faithful will save the sick.", c: "elders of the church can perform wonders.", d: "prayer without the elders may not be effective.", answer: "B" },
    { num: 48, text: "Peter's encouragement to Christians to put away all forms of malice implies that", a: "it is a divine command to forgive.", b: "Christians should emulate Christ.", c: "forgiveness heals the heart.", d: "grievances breeds disunity.", answer: "A" },
    { num: 49, text: "The call on Christians to live as free men, yet without using such freedom as a pretext for perpetuating evil was intended for them to", a: "do what is right always.", b: "resist the temptations of the devil.", c: "fight for their right and freedom.", d: "endure suffering and persecutions.", answer: "A" },
    { num: 50, text: "Peter states that God opposes the proud but to the humble, He", a: "provides all their needs.", b: "gives them protection.", c: "grants them success.", d: "grants them grace.", answer: "D" }
  ],
  "Civic Education": [
    { num: 1, text: "Responsible parents perform the following roles except", a: "providing for the welfare of the family members.", b: "sending their children to special centers in order to pass exams.", c: "providing formal education to their wards.", d: "protecting their children from negative peer pressures.", answer: "B" },
    { num: 2, text: "Which of the following methods cannot be described as a way of abusing drugs?", a: "Drinking of mixed alcoholic drinks", b: "Taking an under dose of recommended drugs", c: "Taking drugs as prescribed by physicians", d: "Wrong use of prescribed drugs", answer: "C" },
    { num: 3, text: "The condition that Human Immunodeficiency Virus (HIV) sufferers suffer when the immune system becomes deficient is", a: "cold.", b: "AIDS.", c: "cancer.", d: "diabetes.", answer: "B" },
    { num: 4, text: "Major reasons customs is preached against include all the following except", a: "solidarity with students' union during protest.", b: "disruption of academic activities through riots.", c: "proliferation of dangerous arms for operations.", d: "brutal death of members is almost inevitable.", answer: "A" },
    { num: 5, text: "An effective way to avoid contracting Human Immunodeficiency Virus/Acquired Immune Deficiency Syndrome (HIV/AIDS) is", a: "use of condom frequently.", b: "abstinence from pre-marital sex.", c: "avoid kissing people with HIV/AIDS.", d: "not falling in love with person having HIV/AIDS.", answer: "B" },
    { num: 6, text: "Preparation for responsible parenthood does not include", a: "acquisition of family planning education.", b: "acquisition of religious morality.", c: "pre-marital sex with a faithful partner.", d: "stable source of income.", answer: "C" },
    { num: 7, text: "The legislative organ of government under the 1999 constitution has", a: "unicameral legislature at federal level.", b: "bicameral legislature at federal level.", c: "bicameral legislature at state level.", d: "unicameral legislature in the national assembly.", answer: "B" },
    { num: 8, text: "Nationalism in Nigeria eventually led to", a: "national renaissance.", b: "creation of states.", c: "decolonization.", d: "the end of military rule.", answer: "C" },
    { num: 9, text: "Which of the following conditions give rise to the denial of right to life?", a: "Homicide", b: "Forgery", c: "Protest", d: "Burglary", answer: "A" },
    { num: 10, text: "Activities that act to clog the wheel of societal progress can be described as", a: "family issues.", b: "cultural vices.", c: "religious issues.", d: "social vices.", answer: "D" },
    { num: 11, text: "The four most prominent nationalist leaders of Nigeria at independence were", a: "J. S. Tarka, S. L. Akintola, Aminu Kano and Ernest Ikoli.", b: "Nnamdi Azikiwe, K. O. Mbadiwe, Arthur Richards and Aminu Kano.", c: "Tafawa Balewa, Obafemi Awolowo, Nnamdi Azikiwe and Ahmadu Bello.", d: "Adesoji Aderemi, Shehu Shagari, Obafemi Awolowo and Nnamdi Azikiwe.", answer: "C" },
    { num: 12, text: "Responsible parenthood can complement the activities of government in several ways except by raising", a: "responsible citizens.", b: "citizens who oppose the government.", c: "responsible future leaders.", d: "entrepreneurs in the society.", answer: "B" },
    { num: 13, text: "One importance of constituted authority is that it leads to", a: "maintenance of law and order.", b: "concentration of power.", c: "immunity of elected leaders.", d: "arbitrary use of power.", answer: "A" },
    { num: 14, text: "When two independent countries come together to form an independent state, they are likely to operate a", a: "written constitution.", b: "federal constitution.", c: "confederal constitution.", d: "feudal constitution.", answer: "B" },
    { num: 15, text: "The major problem militating against the effectiveness of the Nigeria public service is", a: "immunity of public office holders.", b: "checks and balances.", c: "bribery and corruption.", d: "bureaucratic red-tapism.", answer: "C" },
    { num: 16, text: "In a democratic state, a way of checkmating representatives who fail to adequately represent the interest of the electorate is", a: "suspension.", b: "recall.", c: "uprising.", d: "impeachment.", answer: "B" },
    { num: 17, text: "Which of the following is a major source of fund for Civil Society Organizations in Nigeria?", a: "Government allocation", b: "Thrift collections", c: "Foreign donations", d: "Rates and taxes", answer: "C" },
    { num: 18, text: "Civil Society Organizations perform the following functions except", a: "contesting election to gain political positions.", b: "agitation for the protection of fundamental human rights.", c: "influencing government policies that benefit the people.", d: "public awareness and campaign for policies of democracy.", answer: "A" },
    { num: 19, text: "The Senate and House of Representatives in Nigeria constitutes the", a: "Federal Congress", b: "National Parliament", c: "Federal Legislature", d: "National Assembly.", answer: "D" },
    { num: 20, text: "A primary ambition of individuals involved in human trafficking that cannot be achieved is", a: "improved programs.", b: "physical and sexual abuse.", c: "financial freedom.", d: "depression and suicidal thought.", answer: "C" },
    { num: 21, text: "The approval of the government budget is the responsibility of the", a: "judiciary.", b: "legislature.", c: "ministers.", d: "executive.", answer: "B" },
    { num: 22, text: "Which of the following is a known cult group in Nigeria?", a: "Rangers", b: "Pirates", c: "Flamingos", d: "Illuminatis", answer: "B" },
    { num: 23, text: "The body in charge of controlling trafficking of drugs in Nigeria is the", a: "Federal Road Safety Corps (FRSC).", b: "National Agency for Food and Drug Administration and Control (NAFDAC).", c: "National Drug Law Enforcement Agency (NDLEA).", d: "Nigerian Institute of Medical Research (NIMR).", answer: "C" },
    { num: 24, text: "Which of the following makes the votes of the poor and the rich equal?", a: "Compulsory voting", b: "Right to vote", c: "Popular participation", d: "Free and fair election", answer: "B" },
    { num: 25, text: "The act of recruiting and trading of persons for the purpose of commercial exploitation is known as", a: "slave trade.", b: "human trafficking.", c: "human rights abuse.", d: "amnesty violations.", answer: "B" },
    { num: 26, text: "Which of these is a disadvantage to the application of the rule of law in a democratic society?", a: "Existence of free and fair election", b: "Granting of immunity to public office holders", c: "Ensuring equal protection of citizens' rights", d: "Promoting popular participation in politics", answer: "B" },
    { num: 27, text: "Teaching children to be satisfied with what they have is a way of encouraging", a: "self-reliance.", b: "orderliness.", c: "contentment.", d: "selflessness.", answer: "C" },
    { num: 28, text: "Law and order can best be maintained in Nigeria through the", a: "making of decree by the various security agencies.", b: "constitutional law enforcement and citizens' common welfare.", c: "prohibition of public protest, terrorism and militancy.", d: "use of modern security gadgets and directive of state security service.", answer: "B" },
    { num: 29, text: "The Universal Declaration of Human Rights (UDHR) was adopted by the", a: "United Nations General Assembly.", b: "United Nations Security Council.", c: "United Nations San-Francisco Conference.", d: "United Nations Trusteeship Council.", answer: "A" },
    { num: 30, text: "Responsible parenting is the ability of parents to", a: "provide qualitative education for their children.", b: "establish profitable business for the family.", c: "meet the basic and social needs of their children.", d: "ensure that rights of their children are safeguarded.", answer: "C" },
    { num: 31, text: "A community which does not associate with neighbouring communities would likely experience", a: "limited access to modern facilities.", b: "corruption among elected officials.", c: "retarded economic development.", d: "disregard for constitutional rights.", answer: "C" },
    { num: 32, text: "Which of the following agencies carries out scrutiny of vehicles for road worthiness in Nigeria?", a: "Nigeria Security and Civil Defence Corps", b: "The Nigerian Police", c: "Vehicle Inspection Office", d: "Nigeria Customs Services", answer: "C" },
    { num: 33, text: "The role of a responsible mother is to", a: "ensure good neighbourliness.", b: "report the husband when necessary.", c: "help the motherless children and orphans.", d: "support the father in meeting family needs.", answer: "D" },
    { num: 34, text: "The human right that is applicable to human beings without reference to their nationality is the right to", a: "life and dignity of human persons.", b: "vote.", c: "acquire assets and landed property.", d: "work.", answer: "A" },
    { num: 35, text: "All regulatory road signs can be categorized into", a: "mandatory and mediative.", b: "punitive and prohibitive.", c: "prohibitive and mandatory.", d: "persuasive and informative.", answer: "C" },
    { num: 36, text: "In order to build an orderly society, a state must have", a: "a tyrannical constituted authority.", b: "a private security system.", c: "constitution and constitutionalism.", d: "limited franchise.", answer: "C" },
    { num: 37, text: "The Yellow colour in traffic light means", a: "wait.", b: "ready.", c: "go.", d: "exit.", answer: "A" },
    { num: 38, text: "The process of supporting the physical, emotional and intellectual development of a child from infancy to adulthood is", a: "parenthood.", b: "motherhood.", c: "childhood.", d: "fatherhood.", answer: "A" },
    { num: 39, text: "Arbitration as a means of resolving conflict must exhibit", a: "bias.", b: "transparency.", c: "controversy.", d: "abridgement.", answer: "B" },
    { num: 40, text: "In order to have a cordial relationship, the parties must", a: "have common economic interests.", b: "share common interests.", c: "be colleagues at work place.", d: "share the same ethnic origin.", answer: "B" },
    { num: 41, text: "A promiscuous person lacks", a: "discipline.", b: "honesty.", c: "diligence.", d: "truthfulness.", answer: "A" },
    { num: 42, text: "On Nigerian roads, pedestrians are expected to walk on the", a: "right-hand side of the road backing on-coming traffic.", b: "left-hand side of the road facing on-coming traffic.", c: "walkways and never attempt to pass through the zebra crossing.", d: "main road following the on-going traffic.", answer: "B" },
    { num: 43, text: "Which of the following is not an importance of responsible parenting in the society?", a: "Reduction in crime rate", b: "Inculcation of good moral values", c: "upbringing of responsible children", d: "Promotion of good international relations", answer: "D" },
    { num: 44, text: "In Nigeria, restriction on franchise is based on", a: "property.", b: "strength.", c: "sex.", d: "age.", answer: "D" },
    { num: 45, text: "Which of the following individuals cannot be classified as a nationalist?", a: "Obafemi Awolowo", b: "Chinua Achebe", c: "Ahmadu Bello", d: "Nnamdi Azikiwe", answer: "B" },
    { num: 46, text: "The duties of citizens include all the following except", a: "payment of taxes.", b: "obedience to law.", c: "maintenance of peace.", d: "payment of school fees.", answer: "D" },
    { num: 47, text: "The acronym NAFDAC stands for", a: "Nigerian Agency for Food Destruction and Administration and Control.", b: "National Administration for Food and Drug Agency and Control.", c: "National Agency for Food and Drug Administration and Control.", d: "Nigeria Agency of Food and Drug Administration and Consumption.", answer: "C" },
    { num: 48, text: "A healthy inter-communal relationship is not associated with", a: "political development.", b: "economic progress.", c: "state of violence.", d: "societal security.", answer: "C" },
    { num: 49, text: "Cult activities are usually characterized by", a: "terrorist activities.", b: "despotic tendencies.", c: "violent disposition.", d: "martial bravery.", answer: "C" },
    { num: 50, text: "Which of the following cannot be termed drug abuse?", a: "Using prescribed drugs the wrong way", b: "Drinking alcohol in excess", c: "Frequent intake of soft drinks", d: "The use of self-medication", answer: "C" }
  ]
};

async function seedQuestions() {
  console.log("🌱 Starting to seed PDF questions...\n");

  try {
    // Get all subjects
    const allSubjects = await db.select().from(subjects);
    console.log(`📚 Found ${allSubjects.length} subjects in database\n`);

    let totalInserted = 0;

    // Process each subject
    for (const [subjectName, questionList] of Object.entries(questionsBySubject)) {
      console.log(`\n📖 Processing ${subjectName}...`);
      
      // Find the subject in the database
      const subject = allSubjects.find(s => s.name === subjectName);
      
      if (!subject) {
        console.error(`❌ Subject "${subjectName}" not found in database. Skipping...`);
        continue;
      }

      console.log(`   Subject ID: ${subject.id}`);
      console.log(`   Questions to insert: ${questionList.length}`);

      // Insert questions for this subject
      let insertedCount = 0;
      for (const q of questionList) {
        try {
          await db.insert(questions).values({
            subjectId: subject.id,
            questionNumber: q.num,
            questionText: q.text,
            optionA: q.a,
            optionB: q.b,
            optionC: q.c,
            optionD: q.d,
            optionE: q.e || null, // Some subjects only have 4 options
            correctOption: q.answer
          });
          insertedCount++;
        } catch (error) {
          console.error(`   ⚠️  Error inserting question ${q.num}: ${error}`);
        }
      }

      console.log(`   ✅ Inserted ${insertedCount}/${questionList.length} questions for ${subjectName}`);
      totalInserted += insertedCount;
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`📊 Total questions inserted: ${totalInserted}/250`);
    console.log(`\n🔍 Verifying database counts...`);

    // Verify the counts for each subject
    for (const subject of allSubjects) {
      const count = await db
        .select()
        .from(questions)
        .where(eq(questions.subjectId, subject.id));
      
      console.log(`   ${subject.name}: ${count.length} questions`);
    }

  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

// Run the seeding function
seedQuestions()
  .then(() => {
    console.log("\n✅ Seeding script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seeding script failed:", error);
    process.exit(1);
  });
