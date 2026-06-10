/** The three periods of the Mesozoic — the spine of the scroll narrative. */

export interface EraInfo {
  id: string;
  name: string;
  span: string;
  mya: [number, number];
  summary: string;
}

export const ERAS: EraInfo[] = [
  {
    id: "triassic",
    name: "Triassic",
    span: "252 – 201 MYA",
    mya: [252, 201],
    summary:
      "Life rebuilds after Earth's worst extinction. On the supercontinent Pangaea, the first true dinosaurs — small, swift, and two-legged — emerge in the shadows of giant reptiles.",
  },
  {
    id: "jurassic",
    name: "Jurassic",
    span: "201 – 145 MYA",
    mya: [201, 145],
    summary:
      "Pangaea splits, rains return, and forests of conifer and fern blanket the land. Dinosaurs grow into the largest animals ever to walk the Earth.",
  },
  {
    id: "cretaceous",
    name: "Cretaceous",
    span: "145 – 66 MYA",
    mya: [145, 66],
    summary:
      "Flowering plants bloom for the first time. Tyrannosaurs rule the land, pterosaurs the sky, mosasaurs the sea — until a six-mile-wide asteroid ends the age in a single day.",
  },
];
