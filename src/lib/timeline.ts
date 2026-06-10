/** Milestones of palaeontological discovery, used by the interactive timeline. */

export interface Milestone {
  year: number;
  title: string;
  detail: string;
}

export const DISCOVERY_TIMELINE: Milestone[] = [
  {
    year: 1764,
    title: "The Beast of Maastricht",
    detail:
      "Quarry workers in the Netherlands unearth a colossal jaw — later named Mosasaurus, the first giant fossil reptile recognised by science.",
  },
  {
    year: 1824,
    title: "Megalosaurus Named",
    detail:
      "William Buckland describes Megalosaurus, the first dinosaur ever given a scientific name — two decades before the word 'dinosaur' exists.",
  },
  {
    year: 1842,
    title: "'Dinosauria' Is Born",
    detail:
      "Anatomist Richard Owen coins Dinosauria — 'terrible lizards' — uniting the strange giant bones emerging from English quarries.",
  },
  {
    year: 1861,
    title: "Archaeopteryx",
    detail:
      "A feathered skeleton from Bavarian limestone bridges reptiles and birds, arriving two years after Darwin's Origin of Species.",
  },
  {
    year: 1902,
    title: "T. rex Discovered",
    detail:
      "Barnum Brown excavates the first Tyrannosaurus rex skeleton in the Hell Creek badlands of Montana.",
  },
  {
    year: 1964,
    title: "The Dinosaur Renaissance",
    detail:
      "John Ostrom's agile, bird-like Deinonychus overturns the image of dinosaurs as slow, cold-blooded swamp dwellers.",
  },
  {
    year: 1980,
    title: "The Impact Hypothesis",
    detail:
      "Luis and Walter Alvarez find a global iridium layer — the chemical fingerprint of an asteroid — exactly at the extinction boundary.",
  },
  {
    year: 1996,
    title: "Feathered Dinosaurs",
    detail:
      "Sinosauropteryx, from Liaoning, China, becomes the first dinosaur found with preserved feathers, confirming birds are living dinosaurs.",
  },
  {
    year: 2016,
    title: "Chicxulub Drilled",
    detail:
      "Scientists core the buried impact crater beneath the Yucatán, reading the minutes and hours after the asteroid struck.",
  },
];
