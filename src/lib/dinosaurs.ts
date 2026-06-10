/**
 * Scientifically grounded species data.
 * Figures follow current consensus estimates (lengths/masses are upper-range
 * adult estimates published in peer-reviewed literature).
 */

export type Era = "Triassic" | "Jurassic" | "Cretaceous";

export interface Species {
  id: string;
  name: string;
  pronunciation: string;
  meaning: string;
  era: Era;
  /** Millions of years ago — [from, to] */
  livedMya: [number, number];
  diet: "Carnivore" | "Herbivore" | "Piscivore";
  lengthMeters: number;
  weightTonnes: number;
  region: string;
  facts: string[];
  /** One-line cinematic tagline used on cards */
  tagline: string;
}

export const SPECIES: Species[] = [
  {
    id: "tyrannosaurus",
    name: "Tyrannosaurus rex",
    pronunciation: "tie-RAN-oh-SORE-us",
    meaning: "Tyrant lizard king",
    era: "Cretaceous",
    livedMya: [68, 66],
    diet: "Carnivore",
    lengthMeters: 12.3,
    weightTonnes: 8.8,
    region: "Western North America",
    tagline: "The apex predator of the Late Cretaceous.",
    facts: [
      "Bite force exceeded 35,000 newtons — the strongest of any land animal ever measured.",
      "Banana-sized serrated teeth could crush bone, and crushed bone appears in fossilised T. rex dung.",
      "Forward-facing eyes gave it binocular vision sharper than a hawk's.",
      "Despite its size, juveniles were fast, slender pursuit hunters.",
    ],
  },
  {
    id: "triceratops",
    name: "Triceratops horridus",
    pronunciation: "try-SERRA-tops",
    meaning: "Three-horned face",
    era: "Cretaceous",
    livedMya: [68, 66],
    diet: "Herbivore",
    lengthMeters: 9,
    weightTonnes: 8,
    region: "Western North America",
    tagline: "A living fortress that stood its ground against T. rex.",
    facts: [
      "Its skull alone could reach 2.5 metres — among the largest of any land animal.",
      "Healed T. rex bite marks on frill fossils prove some battles were survived.",
      "Up to 800 teeth were arranged in shearing batteries, constantly replaced.",
      "The frill was likely for display and species recognition as much as defence.",
    ],
  },
  {
    id: "velociraptor",
    name: "Velociraptor mongoliensis",
    pronunciation: "vel-OSS-ee-rap-tor",
    meaning: "Swift seizer",
    era: "Cretaceous",
    livedMya: [75, 71],
    diet: "Carnivore",
    lengthMeters: 2,
    weightTonnes: 0.015,
    region: "Mongolia & China",
    tagline: "A feathered, turkey-sized hunter with a killing claw.",
    facts: [
      "Quill knobs on a fossil forearm confirm Velociraptor bore true feathers.",
      "The famous 'Fighting Dinosaurs' fossil preserves one locked in combat with a Protoceratops.",
      "Its 6.5 cm sickle claw was used to pin prey, the way eagles do today.",
      "It was the size of a turkey — far smaller than its movie portrayals.",
    ],
  },
  {
    id: "brachiosaurus",
    name: "Brachiosaurus altithorax",
    pronunciation: "BRACK-ee-oh-SORE-us",
    meaning: "Arm lizard",
    era: "Jurassic",
    livedMya: [154, 150],
    diet: "Herbivore",
    lengthMeters: 22,
    weightTonnes: 47,
    region: "Western North America",
    tagline: "A crane of flesh and bone, browsing the treetops.",
    facts: [
      "Unlike most sauropods, its front legs were longer than its hind legs, tilting the body skyward.",
      "It could raise its head roughly 12–13 metres — a four-storey building.",
      "Air sacs throughout its vertebrae kept its colossal neck light enough to lift.",
      "It likely ate hundreds of kilograms of conifer and ginkgo foliage every day.",
    ],
  },
  {
    id: "stegosaurus",
    name: "Stegosaurus stenops",
    pronunciation: "STEG-oh-SORE-us",
    meaning: "Roofed lizard",
    era: "Jurassic",
    livedMya: [155, 145],
    diet: "Herbivore",
    lengthMeters: 9,
    weightTonnes: 7,
    region: "Western North America",
    tagline: "Armoured plates by day, a spiked tail by night.",
    facts: [
      "Its 17 back plates were filled with blood vessels — possibly for display or temperature control.",
      "The four-spiked tail is nicknamed the 'thagomizer'; an Allosaurus vertebra has been found pierced by one.",
      "Its brain was about the size of a walnut for a bus-sized body.",
      "Plates alternated rather than paired, making each animal's silhouette unique.",
    ],
  },
  {
    id: "pteranodon",
    name: "Pteranodon longiceps",
    pronunciation: "teh-RAN-oh-don",
    meaning: "Toothless wing",
    era: "Cretaceous",
    livedMya: [86, 84.5],
    diet: "Piscivore",
    lengthMeters: 7.25,
    weightTonnes: 0.04,
    region: "Niobrara Sea, North America",
    tagline: "Not a dinosaur — a pterosaur that ruled the coastal skies.",
    facts: [
      "Wingspans exceeded 7 metres, yet adults likely weighed under 50 kilograms.",
      "Over 1,100 specimens are known — more than almost any other pterosaur.",
      "It soared hundreds of kilometres over the Western Interior Seaway hunting fish.",
      "Males bore dramatic backswept crests, likely display structures.",
    ],
  },
  {
    id: "mosasaurus",
    name: "Mosasaurus hoffmannii",
    pronunciation: "MOES-ah-SORE-us",
    meaning: "Lizard of the Meuse River",
    era: "Cretaceous",
    livedMya: [82, 66],
    diet: "Carnivore",
    lengthMeters: 13,
    weightTonnes: 10,
    region: "Global oceans",
    tagline: "Not a dinosaur — a marine lizard that owned every ocean.",
    facts: [
      "A second row of teeth on its palate ratcheted struggling prey down its throat.",
      "It was closer kin to monitor lizards and snakes than to any dinosaur.",
      "Its tail ended in a shark-like fluke, discovered only in 2013.",
      "The first skull, found in a Dutch mine in 1764, helped found the science of palaeontology.",
    ],
  },
];

export const getSpecies = (id: string): Species | undefined =>
  SPECIES.find((s) => s.id === id);

/** Aggregate statistics used by the animated counters */
export const ERA_STATS = [
  { label: "Million Years of Reign", value: 179, suffix: "" },
  { label: "Species Described", value: 700, suffix: "+" },
  { label: "Million Years Ago — Extinction", value: 66, suffix: "" },
  { label: "Of All Species Lost", value: 75, suffix: "%" },
] as const;
